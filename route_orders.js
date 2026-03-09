// ============================================================
// KRISITHRA MOBILES — ORDERS ROUTES
// ============================================================

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validate');
const { sendOrderConfirmation } = require('../utils/email');
const { generateInvoicePDF } = require('../utils/invoice');

// POST /api/orders — Place new order
router.post('/', validateOrder, async (req, res) => {
  try {
    const { productId, customer, storage, color, paymentMethod = 'pending' } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    if (product.stock <= 0 || product.status === 'outstock') {
      return res.status(400).json({ success: false, error: 'Product is out of stock' });
    }

    const order = await Order.create({
      product: product._id,
      productSnapshot: {
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        storage: storage || product.storage[0],
        color: color || product.color
      },
      customer,
      payment: { method: paymentMethod }
    });

    // Optionally send confirmation email
    if (customer.email) {
      sendOrderConfirmation(order, product).catch(console.error);
    }

    res.status(201).json({ success: true, order: { orderId: order.orderId, _id: order._id } });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /api/orders/track/:orderId — Track order by ID
router.get('/track/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId.toUpperCase() });
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });

    res.json({
      success: true,
      order: {
        orderId: order.orderId,
        product: order.productSnapshot.name,
        status: order.status,
        statusHistory: order.statusHistory,
        payment: { status: order.payment.status, method: order.payment.method },
        pricing: order.pricing,
        createdAt: order.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/orders — All orders (Admin only)
router.get('/', protect, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, paymentStatus } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (paymentStatus) filter['payment.status'] = paymentStatus;

    const skip = (Number(page) - 1) * Number(limit);
    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Order.countDocuments(filter)
    ]);

    res.json({ success: true, total, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/orders/analytics — Sales analytics (Admin only)
router.get('/analytics', protect, async (req, res) => {
  try {
    const [totalOrders, paidOrders, revenueResult, stockResult] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ 'payment.status': 'paid' }),
      Order.aggregate([
        { $match: { 'payment.status': 'paid' } },
        { $group: { _id: null, total: { $sum: '$pricing.total' } } }
      ]),
      Product.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, totalStock: { $sum: '$stock' }, totalProducts: { $sum: 1 } } }
      ])
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;
    const totalStock = stockResult[0]?.totalStock || 0;
    const totalProducts = stockResult[0]?.totalProducts || 0;

    res.json({
      success: true,
      analytics: { totalOrders, paidOrders, totalRevenue, totalStock, totalProducts }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/orders/:id/status — Update order status (Admin only)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Order Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
