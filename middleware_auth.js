// ============================================================
// KRISITHRA MOBILES — AUTH MIDDLEWARE
// ============================================================

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// ── JWT AUTH ─────────────────────────────────────────────────
const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.session?.adminToken) {
      token = req.session.adminToken;
    }

    if (!token) {
      return res.status(401).json({ success: false, error: 'Not authorised — login required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, error: 'Admin account not found or disabled' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
};

// ── CSRF TOKEN CHECK ─────────────────────────────────────────
const csrfCheck = (req, res, next) => {
  const origin = req.headers.origin || req.headers.referer;
  const allowed = process.env.FRONTEND_URL || 'http://localhost:3000';
  if (process.env.NODE_ENV === 'production' && origin && !origin.startsWith(allowed)) {
    return res.status(403).json({ success: false, error: 'CSRF check failed' });
  }
  next();
};

// ── SESSION AUTH ─────────────────────────────────────────────
const sessionAuth = (req, res, next) => {
  if (req.session?.adminId) {
    return next();
  }
  return res.status(401).json({ success: false, error: 'Session expired — please login again' });
};

module.exports = { protect, csrfCheck, sessionAuth };
