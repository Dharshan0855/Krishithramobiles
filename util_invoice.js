// ============================================================
// KRISITHRA MOBILES — PDF INVOICE GENERATOR (PDFKit)
// ============================================================

const PDFDocument = require('pdfkit');

function numberToWords(num) {
  const a = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  const b = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  if (num < 20) return a[num];
  if (num < 100) return b[Math.floor(num/10)] + (num%10 ? ' ' + a[num%10] : '');
  if (num < 1000) return a[Math.floor(num/100)] + ' Hundred' + (num%100 ? ' ' + numberToWords(num%100) : '');
  if (num < 100000) return numberToWords(Math.floor(num/1000)) + ' Thousand' + (num%1000 ? ' ' + numberToWords(num%1000) : '');
  if (num < 10000000) return numberToWords(Math.floor(num/100000)) + ' Lakh' + (num%100000 ? ' ' + numberToWords(num%100000) : '');
  return numberToWords(Math.floor(num/10000000)) + ' Crore' + (num%10000000 ? ' ' + numberToWords(num%10000000) : '');
}

async function generateInvoicePDF(order) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const buffers = [];
    doc.on('data', chunk => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    const store = {
      name: process.env.STORE_NAME || 'Krisithra Mobiles',
      address: process.env.STORE_ADDRESS || 'Tiruppur, Tamil Nadu - 641604',
      gstin: process.env.STORE_GSTIN || '33XXXXX1234Z1ZV',
      phone: process.env.STORE_PHONE || '+91 98765 43210',
      email: process.env.ADMIN_EMAIL || 'admin@krisithramobiles.in'
    };

    const { orderId, productSnapshot, customer, pricing, payment, createdAt } = order;
    const p = pricing || {};
    const total = productSnapshot?.price || 0;
    const base = p.basePrice || Math.round(total / 1.18);
    const cgst = p.cgst || Math.round((total - base) / 2);
    const sgst = p.sgst || cgst;
    const isPaid = payment?.status === 'paid';
    const invoiceDate = createdAt ? new Date(createdAt).toLocaleDateString('en-IN') : new Date().toLocaleDateString('en-IN');

    // ── HEADER ──────────────────────────────────────────────
    doc.rect(0, 0, doc.page.width, 90).fill('#020814');
    doc.fillColor('#00c8ff').fontSize(22).font('Helvetica-Bold').text(store.name, 50, 20);
    doc.fillColor('#00ffb2').fontSize(9).text('GSTIN: ' + store.gstin, 50, 48);
    doc.fillColor('#aaccee').fontSize(9).text(store.address, 50, 60);
    doc.text(store.phone + ' | ' + store.email, 50, 72);

    // TAX INVOICE title (right aligned)
    doc.fillColor('#ffffff').fontSize(16).font('Helvetica-Bold').text('TAX INVOICE', 350, 28, { align: 'right', width: 195 });
    doc.fillColor('#00c8ff').fontSize(10).font('Helvetica').text('Invoice #: ' + orderId, 350, 52, { align: 'right', width: 195 });
    doc.fillColor('#aaccee').fontSize(9).text('Date: ' + invoiceDate, 350, 66, { align: 'right', width: 195 });

    // Payment status badge
    const badgeColor = isPaid ? '#00ff88' : '#ffcc00';
    const badgeText = isPaid ? '✓  PAID' : '⏳  PENDING';
    doc.rect(440, 76, 105, 16).fill(isPaid ? '#003322' : '#332200');
    doc.fillColor(badgeColor).fontSize(9).font('Helvetica-Bold').text(badgeText, 440, 79, { width: 105, align: 'center' });

    // ── BILL TO ─────────────────────────────────────────────
    doc.moveDown(1);
    doc.rect(50, 105, 240, 80).fill('#080f1e').stroke('#003355');
    doc.fillColor('#00c8ff').fontSize(8).font('Helvetica-Bold').text('BILL TO', 60, 112);
    doc.fillColor('#ffffff').fontSize(11).font('Helvetica-Bold').text(customer?.name || 'Customer', 60, 124);
    doc.fillColor('#aaccee').fontSize(9).font('Helvetica')
       .text(customer?.phone || '', 60, 140)
       .text(customer?.email || '', 60, 153)
       .text(customer?.address || '', 60, 166, { width: 220 });

    // Order Info (right side)
    doc.rect(305, 105, 240, 80).fill('#080f1e').stroke('#003355');
    doc.fillColor('#00c8ff').fontSize(8).font('Helvetica-Bold').text('ORDER DETAILS', 315, 112);
    doc.fillColor('#aaccee').fontSize(9).font('Helvetica')
       .text('Order ID: ' + orderId, 315, 124)
       .text('Payment: ' + (payment?.method || 'N/A').toUpperCase(), 315, 137)
       .text('Razorpay ID: ' + (payment?.razorpayPaymentId || 'N/A'), 315, 150)
       .text('HSN Code: 8517', 315, 163);

    // ── TABLE HEADER ─────────────────────────────────────────
    const tableY = 205;
    doc.rect(50, tableY, 495, 24).fill('#001428');
    doc.fillColor('#00c8ff').fontSize(9).font('Helvetica-Bold')
       .text('DESCRIPTION', 60, tableY + 8)
       .text('QTY', 320, tableY + 8)
       .text('BASE PRICE', 360, tableY + 8)
       .text('GST (18%)', 430, tableY + 8)
       .text('TOTAL', 505, tableY + 8, { align: 'right' });

    // ── TABLE ROW ────────────────────────────────────────────
    const rowY = tableY + 28;
    doc.rect(50, rowY, 495, 45).fill('#050d1a').stroke('#001428');
    doc.fillColor('#ffffff').fontSize(10).font('Helvetica-Bold')
       .text(productSnapshot?.name || 'Product', 60, rowY + 8);
    doc.fillColor('#aaccee').fontSize(8).font('Helvetica')
       .text((productSnapshot?.storage || '') + (productSnapshot?.color ? ' · ' + productSnapshot.color : ''), 60, rowY + 22);
    doc.fillColor('#ffffff').fontSize(10)
       .text('1', 320, rowY + 15)
       .text('₹' + base.toLocaleString('en-IN'), 360, rowY + 15)
       .text('CGST ₹' + cgst.toLocaleString('en-IN'), 430, rowY + 8, { fontSize: 8 });
    doc.fillColor('#aaccee').fontSize(8)
       .text('SGST ₹' + sgst.toLocaleString('en-IN'), 430, rowY + 22);
    doc.fillColor('#00ffb2').fontSize(11).font('Helvetica-Bold')
       .text('₹' + total.toLocaleString('en-IN'), 505, rowY + 15, { align: 'right' });

    // ── TOTAL ROW ────────────────────────────────────────────
    const totalY = rowY + 50;
    doc.rect(50, totalY, 495, 28).fill('#001f44');
    doc.fillColor('#aaccee').fontSize(9).font('Helvetica')
       .text('TOTAL IN WORDS: ' + numberToWords(total) + ' Rupees Only', 60, totalY + 10);
    doc.fillColor('#00c8ff').fontSize(13).font('Helvetica-Bold')
       .text('₹' + total.toLocaleString('en-IN'), 400, totalY + 8, { align: 'right', width: 140 });

    // ── GST SUMMARY ──────────────────────────────────────────
    const gstY = totalY + 45;
    doc.fillColor('#00c8ff').fontSize(8).font('Helvetica-Bold').text('GST SUMMARY', 50, gstY);
    doc.rect(50, gstY + 12, 200, 16).fill('#001428');
    doc.fillColor('#aaccee').fontSize(8).font('Helvetica')
       .text('Taxable Value', 55, gstY + 16)
       .text('CGST @9%', 100, gstY + 16)
       .text('SGST @9%', 145, gstY + 16)
       .text('Total Tax', 190, gstY + 16);
    doc.rect(50, gstY + 28, 200, 16).fill('#050d1a');
    doc.fillColor('#ffffff').fontSize(8)
       .text('₹' + base.toLocaleString('en-IN'), 55, gstY + 33)
       .text('₹' + cgst.toLocaleString('en-IN'), 100, gstY + 33)
       .text('₹' + sgst.toLocaleString('en-IN'), 145, gstY + 33)
       .text('₹' + (cgst + sgst).toLocaleString('en-IN'), 190, gstY + 33);

    // ── FOOTER ───────────────────────────────────────────────
    const footerY = doc.page.height - 80;
    doc.rect(50, footerY - 10, 495, 1).fill('#001428');
    doc.fillColor('#00c8ff').fontSize(9).font('Helvetica-Bold').text('Thank you for shopping with Krisithra Mobiles! 🚀', 50, footerY, { align: 'center', width: 495 });
    doc.fillColor('#aaccee').fontSize(7).font('Helvetica')
       .text('This is a computer-generated invoice. No signature required.', 50, footerY + 14, { align: 'center', width: 495 })
       .text(`For support: ${store.email} | ${store.phone}`, 50, footerY + 26, { align: 'center', width: 495 });
    doc.fillColor('#003355').fontSize(7).text('Krisithra Mobiles · ' + store.address + ' · GSTIN: ' + store.gstin, 50, footerY + 42, { align: 'center', width: 495 });

    doc.end();
  });
}

module.exports = { generateInvoicePDF };
