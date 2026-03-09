// ============================================================
// KRISITHRA MOBILES — DATABASE SEED SCRIPT
// Run: node utils/seed.js
// ============================================================

require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Product = require('../models/Product');

const seedProducts = [
  { name: "iPhone 15 Pro Max", brand: "Apple", image: "images/apple-iphone-15-pro-max.jpg", display: "6.7\" Super Retina XDR OLED 120Hz", processor: "Apple A17 Pro", camera: "48MP + 12MP + 12MP Triple", battery: "4422 mAh", ram: "8GB", storage: ["256GB","512GB","1TB"], price: 159900, stock: 12, status: "instock", featured: true },
  { name: "Samsung Galaxy S24 Ultra", brand: "Samsung", image: "images/samsung-galaxy-s24-ultra-5g-sm-s928-stylus.jpg", display: "6.8\" QHD+ Dynamic AMOLED 120Hz", processor: "Snapdragon 8 Gen 3", camera: "200MP + 12MP + 10MP + 50MP", battery: "5000 mAh", ram: "12GB", storage: ["256GB","512GB","1TB"], price: 129999, stock: 7, status: "instock", featured: true },
  { name: "Google Pixel 8 Pro", brand: "Google", image: "images/google-pixel-8-pro.jpg", display: "6.7\" LTPO OLED 120Hz", processor: "Google Tensor G3", camera: "50MP + 48MP + 48MP", battery: "5050 mAh", ram: "12GB", storage: ["128GB","256GB","512GB","1TB"], price: 106999, stock: 3, status: "instock", featured: true },
  { name: "Nothing Phone (2)", brand: "Nothing", image: "images/nothing-phone2_.jpg", display: "6.7\" LTPO OLED 120Hz", processor: "Snapdragon 8+ Gen 1", camera: "50MP + 50MP Dual", battery: "4700 mAh", ram: "12GB", storage: ["256GB","512GB"], price: 44999, stock: 15, status: "instock", featured: true },
  { name: "OnePlus 12", brand: "OnePlus", image: "images/oneplus-12.jpg", display: "6.82\" ProXDR LTPO AMOLED 120Hz", processor: "Snapdragon 8 Gen 3", camera: "50MP + 64MP + 48MP Hasselblad", battery: "5400 mAh", ram: "16GB", storage: ["256GB","512GB"], price: 64999, stock: 0, status: "outstock", featured: true },
  { name: "Vivo V70 Elite 5G", brand: "Vivo", image: "images/vivo-v70-elite.jpg", display: "5G · AMOLED Display", processor: "Latest Flagship Chip", camera: "50MP AI Camera", battery: "5000mAh", ram: "12GB", storage: ["512GB"], price: 61999, orig_price: 65999, discount: "6% OFF", color: "Passion Red", stock: 15, status: "instock", source: "Poorvika" },
  { name: "Samsung Galaxy S26 Ultra 5G", brand: "Samsung", image: "images/samsung-galaxy-s26-ultra-new.jpg", display: "5G · Dynamic AMOLED 2X", processor: "Snapdragon 8 Elite", camera: "200MP AI Camera", battery: "5000mAh", ram: "12GB", storage: ["512GB"], price: 139999, orig_price: 159999, discount: "13% OFF", color: "White", stock: 8, status: "instock", source: "Poorvika" },
  { name: "Nothing Phone 3 5G", brand: "Nothing", image: "images/nothing-phone-3-new.jpg", display: "5G · OLED 120Hz", processor: "Snapdragon 8s Gen 4", camera: "64MP AI Camera", battery: "4681mAh", ram: "16GB", storage: ["512GB"], price: 89999, orig_price: 94999, discount: "5% OFF", color: "Black", stock: 10, status: "instock", source: "Poorvika" },
  { name: "Google Pixel 10 Pro 5G", brand: "Google", image: "images/google-pixel-10-pro.jpg", display: "5G · LTPO OLED 120Hz", processor: "Google Tensor G5", camera: "50MP + 48MP + 48MP", battery: "5050mAh", ram: "16GB", storage: ["256GB"], price: 109999, stock: 6, status: "instock", source: "Poorvika" },
  { name: "Nothing Phone (3a) Lite 5G", brand: "Nothing", image: "images/nothing-phone-3a-lite-.jpg", display: "5G · OLED 120Hz", processor: "Snapdragon 7s Gen 3", camera: "48MP AI Camera", battery: "5000mAh", ram: "8GB", storage: ["256GB"], price: 23999, orig_price: 24999, discount: "4% OFF", color: "Blue", stock: 30, status: "instock", source: "Poorvika" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Seed admin
    const adminExists = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
    if (!adminExists) {
      await Admin.create({
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'superadmin'
      });
      console.log(`👤 Admin created: ${process.env.ADMIN_USERNAME}`);
    } else {
      console.log('👤 Admin already exists, skipping.');
    }

    // Seed products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(seedProducts);
      console.log(`📱 ${seedProducts.length} products seeded`);
    } else {
      console.log(`📱 ${productCount} products already in DB, skipping.`);
    }

    console.log('\n🎉 Database seeding complete!\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
