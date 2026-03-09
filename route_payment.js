// ============================================================
// KRISITHRA MOBILES — PAYMENT ROUTES (Razorpay)
// ============================================================

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { validatePayment } = require('../middleware/validate');
const { sendInvoiceEmail } = require('../utils/email');

// Initialise Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// POST /api/payment/create-order — Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { productId, storage, customer } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    if (product.stock <= 0) return res.status(400).json({ success: false, error: 'Out of stock' });

    // Create Razorpay order (amount in paise)
    const rpOrder = await razorpay.orders.create({
      amount: product.price * 100,
      currency: 'INR',
      receipt: 'KRM_' + Date.now(),
      notes: {
        product: product.name,
        brand: product.brand,
        storage: storage || product.storage[0],
        customerPhone: customer?.phone || ''
      }
    });

    res.json({
      success: true,
      razorpayOrderId: rpOrder.id,
      amount: rpOrder.amount,
      currency: rpOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      product: { name: product.name, price: product.price }
    });
  } catch (err) {
    console.error('Razorpay create-order error:', err);
    res.status(500).json({ success: false, error: 'Payment gateway error: ' + err.message });
  }
});

// POST /api/payment/verify — Verify payment signature & confirm order
router.post('/verify', validatePayment, async (req, res) => {
  try {
    const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature, productId, customer, storage } = req.body;

    // ── SIGNATURE VERIFICATION ─────────────────────────────
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ success: false, error: 'Payment signature verification failed' });
    }

    // ── FETCH PRODUCT ──────────────────────────────────────
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

    // ── DEDUCT STOCK ───────────────────────────────────────
    if (product.stock <= 0) {
      return res.status(400).json({ success: false, error: 'Product went out of stock before payment could complete' });
    }
    product.stock -= 1;
    await product.save();

    // ── CREATE / UPDATE ORDER ──────────────────────────────
    const base = Math.round(product.price / 1.18);
    const tax = Math.round((product.price - base) / 2);

    const order = await Order.create({
      product: product._id,
      productSnapshot: {
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        storage: storage || product.storage[0]
      },
      customer,
      pricing: { basePrice: base, cgst: tax, sgst: tax, total: product.price },
      payment: {
        method: 'online',
        status: 'paid',
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        paidAt: new Date()
      },
      status: 'Processing'
    });

    // ── SEND INVOICE EMAIL ─────────────────────────────────
    if (customer?.email) {
      sendInvoiceEmail(order, product).catch(err => console.error('Invoice email failed:', err));
    }

    res.json({
      success: true,
      orderId: order.orderId,
      message: 'Payment verified and order confirmed'
    });
  } catch (err) {
    console.error('Payment verify error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/payment/webhook — Razorpay webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    const body = req.body.toString();

    const expectedSig = crypto.createHmac('sha256', secret).update(body).digest('hex');
    if (expectedSig !== signature) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const event = JSON.parse(body);
    console.log('📩 Razorpay webhook:', event.event);

    if (event.event === 'payment.failed') {
      const paymentId = event.payload.payment.entity.id;
      console.log('❌ Payment failed:', paymentId);
      // Optionally: update order status to failed
    }

    res.json({ received: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
