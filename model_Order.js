// ============================================================
// KRISITHRA MOBILES — ORDER MODEL
// ============================================================

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    default: () => 'KRM-' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 100).toString().padStart(2, '0')
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productSnapshot: {
    name: String,
    brand: String,
    price: Number,
    image: String,
    storage: String,
    color: String
  },
  customer: {
    name: { type: String, required: true },
    email: { type: String, default: '' },
    phone: { type: String, required: true },
    address: { type: String, default: '' }
  },
  pricing: {
    basePrice: Number,
    cgst: Number,
    sgst: Number,
    total: Number
  },
  payment: {
    method: {
      type: String,
      enum: ['online', 'whatsapp', 'cod', 'pending'],
      default: 'pending'
    },
    status: {
      type: String,
      enum: ['paid', 'pending', 'failed', 'refunded'],
      default: 'pending'
    },
    razorpayOrderId: { type: String, default: '' },
    razorpayPaymentId: { type: String, default: '' },
    razorpaySignature: { type: String, default: '' },
    paidAt: { type: Date, default: null }
  },
  status: {
    type: String,
    enum: ['Order Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Order Placed'
  },
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    note: String
  }],
  invoiceGenerated: { type: Boolean, default: false },
  invoiceEmailSent: { type: Boolean, default: false },
  notes: { type: String, default: '' }
}, {
  timestamps: true
});

// Auto-compute GST breakdown before save
OrderSchema.pre('save', function (next) {
  if (this.productSnapshot && this.productSnapshot.price) {
    const total = this.productSnapshot.price;
    const base = Math.round(total / 1.18);
    const tax = Math.round((total - base) / 2);
    this.pricing = { basePrice: base, cgst: tax, sgst: tax, total };
  }
  // Track status history
  if (this.isModified('status')) {
    this.statusHistory.push({ status: this.status, timestamp: new Date() });
  }
  next();
});

// Indexes
OrderSchema.index({ orderId: 1 });
OrderSchema.index({ 'customer.phone': 1 });
OrderSchema.index({ 'payment.status': 1 });
OrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', OrderSchema);
