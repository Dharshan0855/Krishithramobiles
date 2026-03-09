// ============================================================
// KRISITHRA MOBILES — EMAIL UTILITY (Nodemailer)
// ============================================================

const nodemailer = require('nodemailer');
const { generateInvoicePDF } = require('./invoice');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter
transporter.verify().then(() => {
  console.log('✉️  Email transporter ready');
}).catch(err => {
  console.warn('⚠️  Email transporter not configured:', err.message);
});

// ── HTML EMAIL TEMPLATE ──────────────────────────────────────
function orderEmailHTML(order, type = 'confirmation') {
  const { orderId, productSnapshot, customer, pricing, payment } = order;
  const total = productSnapshot?.price || 0;
  const isPaid = payment?.status === 'paid';
  const statusColor = isPaid ? '#00ff88' : '#ffcc00';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; background: #020814; font-family: 'Segoe UI', Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; background: #050d1a; border: 1px solid rgba(0,200,255,0.2); }
    .header { background: linear-gradient(135deg, #020814, #001428); padding: 30px; text-align: center; border-bottom: 2px solid #00c8ff; }
    .logo { font-size: 24px; font-weight: 900; background: linear-gradient(90deg, #00c8ff, #00ffb2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 3px; }
    .tagline { color: rgba(180,210,240,0.6); font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin-top: 6px; }
    .body { padding: 30px; }
    h2 { color: #ffffff; font-size: 18px; margin-bottom: 6px; }
    p { color: rgba(180,210,240,0.8); font-size: 14px; line-height: 1.7; }
    .order-box { background: rgba(0,200,255,0.05); border: 1px solid rgba(0,200,255,0.2); border-radius: 10px; padding: 20px; margin: 20px 0; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(0,200,255,0.08); }
    .row:last-child { border-bottom: none; }
    .label { color: rgba(180,210,240,0.6); font-size: 13px; }
    .value { color: #ffffff; font-size: 13px; font-weight: 600; }
    .total-row { background: rgba(0,200,255,0.08); border-radius: 6px; padding: 12px 0; margin-top: 10px; }
    .total-value { color: #00c8ff; font-size: 18px; font-weight: 800; }
    .status-badge { display: inline-block; padding: 4px 14px; border-radius: 100px; font-size: 12px; font-weight: 700; background: ${isPaid ? 'rgba(0,255,136,0.15)' : 'rgba(255,204,0,0.15)'}; color: ${statusColor}; border: 1px solid ${statusColor}40; }
    .cta-btn { display: inline-block; margin: 20px 0; padding: 14px 36px; background: linear-gradient(135deg, #00c8ff, #00ffb2); color: #020814; font-weight: 800; text-decoration: none; border-radius: 6px; font-size: 14px; letter-spacing: 1px; }
    .footer { background: #020814; padding: 20px; text-align: center; border-top: 1px solid rgba(0,200,255,0.1); }
    .footer p { color: rgba(120,160,200,0.5); font-size: 11px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">KRISITHRA MOBILES</div>
      <div class="tagline">Future in Your Hands</div>
    </div>
    <div class="body">
      <h2>${type === 'invoice' ? '🧾 Your Invoice is Ready' : '✅ Order Confirmed!'}</h2>
      <p>Hi <strong style="color:#fff">${customer?.name || 'Customer'}</strong>, ${type === 'invoice' ? 'your GST invoice is attached to this email.' : 'your order has been placed successfully.'}</p>

      <div class="order-box">
        <div class="row">
          <span class="label">Order ID</span>
          <span class="value" style="color:#00c8ff">${orderId}</span>
        </div>
        <div class="row">
          <span class="label">Product</span>
          <span class="value">${productSnapshot?.name || 'Product'}</span>
        </div>
        <div class="row">
          <span class="label">Variant</span>
          <span class="value">${productSnapshot?.storage || ''} ${productSnapshot?.color ? '· ' + productSnapshot.color : ''}</span>
        </div>
        <div class="row">
          <span class="label">Payment Status</span>
          <span class="value"><span class="status-badge">${isPaid ? '✅ PAID' : '⏳ PENDING'}</span></span>
        </div>
        <div class="row total-row">
          <span class="label" style="font-size:14px;font-weight:700;color:#fff">Total Amount</span>
          <span class="total-value">₹${total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <p style="font-size:12px;color:rgba(120,160,200,0.5)">
        Base Price: ₹${(pricing?.basePrice || Math.round(total/1.18)).toLocaleString('en-IN')} +
        CGST: ₹${(pricing?.cgst || 0).toLocaleString('en-IN')} +
        SGST: ₹${(pricing?.sgst || 0).toLocaleString('en-IN')}
      </p>

      ${type === 'invoice' ? '<p>📎 Your GST invoice (PDF) is attached. Please keep it for your records.</p>' : '<p>📦 We\'ll notify you once your order is shipped. Track your order anytime at krisithramobiles.in.</p>'}
    </div>
    <div class="footer">
      <p>Krisithra Mobiles · Tiruppur, Tamil Nadu · ${process.env.STORE_PHONE || '+91 98765 43210'}</p>
      <p>GSTIN: ${process.env.STORE_GSTIN || '33XXXXX1234Z1ZV'} | This is an automated email.</p>
    </div>
  </div>
</body>
</html>`;
}

// ── SEND ORDER CONFIRMATION EMAIL ────────────────────────────
async function sendOrderConfirmation(order) {
  if (!order.customer?.email) return;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: order.customer.email,
    subject: `✅ Order Confirmed — ${order.orderId} | Krisithra Mobiles`,
    html: orderEmailHTML(order, 'confirmation')
  });
  console.log(`📧 Order confirmation sent to ${order.customer.email}`);
}

// ── SEND INVOICE EMAIL ───────────────────────────────────────
async function sendInvoiceEmail(order) {
  if (!order.customer?.email) return;

  const pdfBuffer = await generateInvoicePDF(order);

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: order.customer.email,
    subject: `🧾 GST Invoice — ${order.orderId} | Krisithra Mobiles`,
    html: orderEmailHTML(order, 'invoice'),
    attachments: [{
      filename: `Invoice_${order.orderId}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf'
    }]
  });
  console.log(`📧 Invoice email sent to ${order.customer.email}`);
}

module.exports = { sendOrderConfirmation, sendInvoiceEmail };
