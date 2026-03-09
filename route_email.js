// ============================================================
// KRISITHRA MOBILES — EMAIL ROUTES
// ============================================================

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { sendOrderConfirmation, sendInvoiceEmail } = require('../utils/email');
const { protect } = require('../middleware/auth');

// POST /api/email/resend-invoice — Resend invoice email (Admin only)
router.post('/resend-invoice', protect, async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ orderId: orderId.toUpperCase() });

    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
    if (!order.customer.email) {
      return res.status(400).json({ success: false, error: 'No email on record for this order' });
    }

    await sendInvoiceEmail(order);
    res.json({ success: true, message: `Invoice resent to ${order.customer.email}` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/email/resend-confirmation — Resend order confirmation (Admin only)
router.post('/resend-confirmation', protect, async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ orderId: orderId.toUpperCase() });

    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
    if (!order.customer.email) {
      return res.status(400).json({ success: false, error: 'No email on record for this order' });
    }

    await sendOrderConfirmation(order);
    res.json({ success: true, message: 'Confirmation email resent' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
