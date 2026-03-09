// ============================================================
// KRISITHRA MOBILES — SERVER ENTRY POINT
// ============================================================

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// ── CONNECT MONGODB ──────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ── MIDDLEWARE ───────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Global rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, error: 'Too many requests, please slow down.' }
});
app.use('/api/', limiter);

// Stricter limiter for payment routes
const paymentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: { success: false, error: 'Too many payment requests.' }
});

// ── STATIC FILES ─────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '../frontend')));

// ── API ROUTES ───────────────────────────────────────────────
app.use('/api/products', require('./routes/products'));
app.use('/api/orders',   require('./routes/orders'));
app.use('/api/payment',  paymentLimiter, require('./routes/payment'));
app.use('/api/admin',    require('./routes/admin'));
app.use('/api/invoice',  require('./routes/invoice'));
app.use('/api/email',    require('./routes/email'));

// ── SERVE FRONTEND ───────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ── GLOBAL ERROR HANDLER ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Server error' : err.message
  });
});

// ── START SERVER ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Krisithra Mobiles Server running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV}`);
  console.log(`🛢  Database: ${process.env.MONGODB_URI}\n`);
});

module.exports = app;
