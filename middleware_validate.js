// ============================================================
// KRISITHRA MOBILES — VALIDATION MIDDLEWARE
// ============================================================

const { body, validationResult } = require('express-validator');

// Check validation results and send errors if any
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
};

// Order validation rules
const validateOrder = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('customer.name').trim().notEmpty().withMessage('Customer name is required'),
  body('customer.phone')
    .matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian mobile number'),
  body('customer.email').optional().isEmail().withMessage('Enter a valid email'),
  body('customer.address').optional().trim(),
  body('storage').notEmpty().withMessage('Storage variant is required'),
  validate
];

// Payment validation rules
const validatePayment = [
  body('orderId').notEmpty().withMessage('Order ID is required'),
  body('razorpayPaymentId').notEmpty().withMessage('Payment ID is required'),
  body('razorpayOrderId').notEmpty().withMessage('Razorpay Order ID is required'),
  body('razorpaySignature').notEmpty().withMessage('Signature is required'),
  validate
];

// Product update validation
const validateProductUpdate = [
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be non-negative'),
  body('status').optional().isIn(['instock', 'outstock', 'restock']).withMessage('Invalid status'),
  validate
];

module.exports = { validate, validateOrder, validatePayment, validateProductUpdate };
