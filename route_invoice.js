// ============================================================
// KRISITHRA MOBILES — INVOICE ROUTES
// ============================================================

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { generateInvoicePDF } = require('../utils/invoice');
const { protect } = require('../middleware/auth');

// GET /api/invoice/:orderId — Download PDF invoice
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId.toUpperCase() });
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });

    const pdfBuffer = await generateInvoicePDF(order);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=Invoice_${order.orderId}.pdf`,
      'Content-Length': pdfBuffer.length
    });

    res.end(pdfBuffer);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/invoice/admin/all — List all invoices (Admin only)
router.get('/admin/all', protect, async (req, res) => {
  try {
    const orders = await Order.find({ 'payment.status': 'paid' })
      .select('orderId productSnapshot customer pricing createdAt invoiceGenerated')
      .sort({ createdAt: -1 });

    res.json({ success: true, invoices: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
