# 🚀 Krisithra Mobiles — Full-Stack E-Commerce

> Premium smartphone e-commerce platform with Razorpay payments, GST invoicing, and admin dashboard.

---

## 📁 Project Structure

```
krisithra-project/
├── frontend/
│   ├── index.html          ← Main HTML page
│   ├── css/
│   │   └── styles.css      ← All styles (dark theme, glassmorphism)
│   ├── js/
│   │   └── app.js          ← All frontend logic (products, orders, admin)
│   └── assets/             ← Images, icons (add your assets here)
│
└── backend/
    ├── server.js           ← Express app entry point
    ├── .env                ← Environment variables (DO NOT commit)
    ├── package.json        ← Dependencies
    ├── config/
    │   ├── db.js           ← MongoDB connection
    │   └── razorpay.js     ← Razorpay instance
    ├── models/
    │   ├── Product.js      ← Product schema (stock, GST, variants)
    │   ├── Order.js        ← Order schema (payment, status tracking)
    │   └── Admin.js        ← Admin schema (bcrypt hashed password)
    ├── routes/
    │   ├── products.js     ← GET/POST/PUT/DELETE products
    │   ├── orders.js       ← Place orders, track, analytics
    │   ├── payment.js      ← Razorpay create + verify + webhook
    │   ├── admin.js        ← Login, dashboard, session
    │   ├── invoice.js      ← PDF invoice download
    │   └── email.js        ← Resend confirmation/invoice emails
    ├── middleware/
    │   ├── auth.js         ← JWT + session + CSRF protection
    │   └── validate.js     ← express-validator rules
    └── utils/
        ├── invoice.js      ← PDFKit invoice generator
        ├── email.js        ← Nodemailer email sender
        └── seed.js         ← Database seeder (run once)
```

---

## ⚡ Quick Start

### 1. Prerequisites
- Node.js v18+
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))
- Razorpay account (test keys from [dashboard.razorpay.com](https://dashboard.razorpay.com))

### 2. Setup Backend

```bash
cd backend
npm install
```

Edit `.env` with your credentials:
```env
MONGODB_URI=mongodb://localhost:27017/krisithra_mobiles
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 3. Seed Database (first time only)

```bash
npm run seed
```

This creates:
- Admin user (`admin` / `krisithra2024`)
- 10 sample products

### 4. Start Backend

```bash
npm run dev      # Development (with nodemon)
npm start        # Production
```

Server starts at → **http://localhost:5000**

### 5. Open Frontend

Simply open `frontend/index.html` in your browser, OR serve it:

```bash
# Using VS Code Live Server, or:
npx serve frontend
```

---

## 🔌 API Reference

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | ❌ | Get all products (supports filters) |
| GET | `/api/products/brands` | ❌ | Unique brand list |
| GET | `/api/products/featured` | ❌ | Featured products |
| GET | `/api/products/:id` | ❌ | Single product |
| POST | `/api/products` | ✅ Admin | Add product |
| PUT | `/api/products/:id` | ✅ Admin | Update product |
| PATCH | `/api/products/:id/stock` | ✅ Admin | Update stock |
| DELETE | `/api/products/:id` | ✅ Admin | Soft delete |

### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | ❌ | Place new order |
| GET | `/api/orders/track/:orderId` | ❌ | Track order status |
| GET | `/api/orders` | ✅ Admin | All orders |
| GET | `/api/orders/analytics` | ✅ Admin | Sales analytics |
| PATCH | `/api/orders/:id/status` | ✅ Admin | Update status |

### Payment
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/payment/create-order` | ❌ | Create Razorpay order |
| POST | `/api/payment/verify` | ❌ | Verify payment + confirm order |
| POST | `/api/payment/webhook` | ❌ | Razorpay webhook |

### Admin
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/admin/login` | ❌ | Login → returns JWT |
| POST | `/api/admin/logout` | ❌ | Destroy session |
| GET | `/api/admin/dashboard` | ✅ Admin | Full dashboard data |
| GET | `/api/admin/me` | ✅ Admin | Current admin info |

### Invoice & Email
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/invoice/:orderId` | ❌ | Download PDF invoice |
| POST | `/api/email/resend-invoice` | ✅ Admin | Resend invoice email |
| POST | `/api/email/resend-confirmation` | ✅ Admin | Resend confirmation |

---

## 💳 Payment Flow

```
1. User clicks "Pay Online"
   → POST /api/payment/create-order  (creates Razorpay order)
   → Razorpay checkout opens

2. User completes payment
   → Razorpay returns payment details

3. Frontend sends payment details
   → POST /api/payment/verify
   → Backend verifies HMAC signature
   → Stock deducted
   → Order saved with "paid" status
   → Invoice PDF generated
   → Email sent to customer
```

---

## 🧾 GST Invoice

- Auto-generated using **PDFKit**
- Includes: CGST 9% + SGST 9% = 18% total
- HSN Code: 8517 (mobile phones)
- Available at: `GET /api/invoice/:orderId`
- Sent as email attachment after payment

---

## 🔐 Admin Authentication

- **JWT-based** with 24h expiry
- **Session fallback** using express-session
- **CSRF protection** via origin header check
- **Rate limiting** on all API routes

Default credentials (change in `.env`):
```
Username: admin
Password: krisithra2024
```

---

## 🌐 Frontend ↔ Backend Integration

To connect the frontend to the live backend, update `app.js`:

```javascript
// At the top of app.js
const API_BASE = 'http://localhost:5000/api';

// Example: Load products from API instead of static array
async function loadProductsFromAPI() {
  const res = await fetch(`${API_BASE}/products?limit=100`);
  const data = await res.json();
  return data.products;
}
```

---

## 🚀 Production Deployment

### Backend (Railway / Render / VPS)
```bash
# Set all .env vars in your hosting dashboard
npm start
```

### Frontend (Netlify / Vercel)
- Upload the `frontend/` folder
- Update `API_BASE` in `app.js` to your live backend URL

### MongoDB Atlas
- Replace `MONGODB_URI` with your Atlas connection string

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Payments | Razorpay |
| PDF | PDFKit |
| Email | Nodemailer (SMTP) |
| Auth | JWT + bcryptjs + express-session |
| Security | Helmet, express-rate-limit, CSRF |

---

## 📞 Support

- 📧 admin@krisithramobiles.in
- 📱 +91 98765 43210
- 🏪 Tiruppur, Tamil Nadu - 641604
- GSTIN: 33XXXXX1234Z1ZV
