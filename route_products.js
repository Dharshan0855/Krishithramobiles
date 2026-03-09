// ============================================================
// KRISITHRA MOBILES — PRODUCTS ROUTES
// ============================================================

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const { validateProductUpdate } = require('../middleware/validate');

// GET /api/products — All active products
router.get('/', async (req, res) => {
  try {
    const { brand, status, minPrice, maxPrice, search, sort = '-createdAt', page = 1, limit = 50 } = req.query;
    const filter = { isActive: true };

    if (brand) filter.brand = brand;
    if (status) filter.status = status;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { processor: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter)
    ]);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      products
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products/brands — Unique brand list
router.get('/brands', async (req, res) => {
  try {
    const brands = await Product.distinct('brand', { isActive: true });
    res.json({ success: true, brands: brands.sort() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products/featured — Featured products
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ featured: true, isActive: true }).limit(12);
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products/:id — Single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/products — Add product (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT /api/products/:id — Update product (Admin only)
router.put('/:id', protect, validateProductUpdate, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PATCH /api/products/:id/stock — Update stock only (Admin only)
router.patch('/:id/stock', protect, async (req, res) => {
  try {
    const { stock } = req.body;
    if (stock === undefined || stock < 0) {
      return res.status(400).json({ success: false, error: 'Valid stock value required' });
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

    product.stock = stock;
    await product.save(); // triggers pre-save hook for status update
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/products/:id — Soft delete (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Product deactivated' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
