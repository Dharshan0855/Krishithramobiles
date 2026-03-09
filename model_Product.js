// ============================================================
// KRISITHRA MOBILES — PRODUCT MODEL
// ============================================================

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true,
    index: true
  },
  display: { type: String, default: '6.7" AMOLED Display' },
  processor: { type: String, default: 'Latest Processor' },
  camera: { type: String, default: '50MP Camera' },
  battery: { type: String, default: '5000mAh' },
  ram: { type: String, required: true },
  storage: { type: [String], required: true },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  orig_price: { type: Number, default: null },
  discount: { type: String, default: '' },
  color: { type: String, default: '' },
  stock: {
    type: Number,
    required: true,
    default: 10,
    min: [0, 'Stock cannot be negative']
  },
  status: {
    type: String,
    enum: ['instock', 'outstock', 'restock'],
    default: 'instock'
  },
  image: { type: String, default: '' },
  product_url: { type: String, default: '' },
  source: { type: String, default: 'Krisithra' },
  featured: { type: Boolean, default: false },
  network: { type: String, default: '5G' },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Auto-update status based on stock
ProductSchema.pre('save', function (next) {
  if (this.stock === 0) this.status = 'outstock';
  else if (this.status === 'outstock' && this.stock > 0) this.status = 'instock';
  next();
});

// Virtual: GST breakdown
ProductSchema.virtual('gstBreakdown').get(function () {
  const base = Math.round(this.price / 1.18);
  const cgst = Math.round((this.price - base) / 2);
  const sgst = cgst;
  return { base, cgst, sgst, total: this.price };
});

// Indexes
ProductSchema.index({ brand: 1, price: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ featured: 1 });

module.exports = mongoose.model('Product', ProductSchema);
