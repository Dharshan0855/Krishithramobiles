// ============================================================
// KRISITHRA MOBILES — ADMIN ROUTES
// ============================================================

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, csrfCheck } = require('../middleware/auth');

// POST /api/admin/login — Admin login
router.post('/login', csrfCheck, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password required' });
    }

    // Find admin
    const admin = await Admin.findOne({ username: username.toLowerCase() });
    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    req.session.adminId = admin._id;
    req.session.adminToken = token;

    res.json({
      success: true,
      token,
      admin: { username: admin.username, email: admin.email, role: admin.role }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/admin/logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logged out' });
});

// GET /api/admin/dashboard — Full dashboard data (Admin only)
router.get('/dashboard', protect, async (req, res) => {
  try {
    const [
      totalOrders,
      paidOrders,
      pendingOrders,
      revenueAgg,
      stockAgg,
      recentOrders,
      lowStockProducts,
      brandStats
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ 'payment.status': 'paid' }),
      Order.countDocuments({ 'payment.status': 'pending' }),
      Order.aggregate([
        { $match: { 'payment.status': 'paid' } },
        { $group: { _id: null, total: { $sum: '$pricing.total' }, count: { $sum: 1 } } }
      ]),
      Product.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, totalStock: { $sum: '$stock' }, totalProducts: { $sum: 1 } } }
      ]),
      Order.find().sort({ createdAt: -1 }).limit(10),
      Product.find({ stock: { $lte: 3 }, isActive: true }).select('name brand stock status'),
      Product.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$brand', count: { $sum: 1 }, totalStock: { $sum: '$stock' } } },
        { $sort: { count: -1 } }
      ])
    ]);

    res.json({
      success: true,
      dashboard: {
        analytics: {
          totalOrders,
          paidOrders,
          pendingOrders,
          totalRevenue: revenueAgg[0]?.total || 0,
          totalProducts: stockAgg[0]?.totalProducts || 0,
          totalStock: stockAgg[0]?.totalStock || 0
        },
        recentOrders,
        lowStockProducts,
        brandStats
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/admin/me — Current admin info
router.get('/me', protect, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

// POST /api/admin/seed — Seed initial admin (run once)
router.post('/seed', async (req, res) => {
  try {
    const exists = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
    if (exists) return res.json({ success: false, message: 'Admin already exists' });

    const admin = await Admin.create({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'superadmin'
    });

    res.json({ success: true, message: 'Admin created', username: admin.username });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
