import React, { useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Printer, Download, MessageCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../context/CartContext';
import './Invoice.css';

interface InvoiceState {
    customer: { name: string; phone: string; email: string };
    items: CartItem[];
    totalPrice: number;
    gst: number;
    grandTotal: number;
}

const Invoice: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const invoiceRef = useRef<HTMLDivElement>(null);

    const state = location.state as InvoiceState | null;

    if (!state) {
        return (
            <div className="page-container invoice-page">
                <section className="section">
                    <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                        <h2 style={{ color: 'var(--primary-red)' }}>No invoice data found.</h2>
                        <p>Please go back and place your order from the cart.</p>
                        <Link to="/cart" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>← Back to Cart</Link>
                    </div>
                </section>
            </div>
        );
    }

    const { customer, items, totalPrice, gst, grandTotal } = state;
    const now = new Date();
    const orderId = `VTH-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderDate = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    const handlePrint = () => window.print();

    const handleDownloadPDF = () => {
        // Use browser's print-to-PDF
        window.print();
    };

    const handleShareWhatsAppImage = async () => {
        if (!invoiceRef.current) return;

        try {
            const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
            canvas.toBlob(async (blob) => {
                if (!blob) {
                    alert("Failed to generate invoice image.");
                    return;
                }

                const file = new File([blob], `invoice-${orderId}.png`, { type: 'image/png' });

                // Try native Web Share API
                if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            files: [file],
                            title: `Invoice ${orderId}`,
                            text: `Hello Vijay Tent House, here is my order invoice ${orderId}`,
                        });
                    } catch (err) {
                        console.error('Error sharing:', err);
                        downloadImageFallback(blob);
                    }
                } else {
                    // Fallback for desktop / unsupported browsers
                    downloadImageFallback(blob);
                }
            });
        } catch (err) {
            console.error("html2canvas error:", err);
            alert("Error generating image.");
        }
    };

    const downloadImageFallback = (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${orderId}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Open WhatsApp Web with a text message and let the user attach the downloaded image manually
        const waNumber = "919342720232";
        const msg = `Hi, I just generated an invoice (${orderId}). I will attach the image here!`;
        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');

        // Alert to instruct the user
        setTimeout(() => {
            alert("The invoice image has been downloaded!\n\nPlease attach and send it in the WhatsApp chat that is opening.");
        }, 500);
    };

    const handleDone = () => {
        clearCart();
        navigate('/');
    };

    return (
        <div className="page-container invoice-page">
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title animate-fade-in">
                        <CheckCircle size={36} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                        Order Confirmed!
                    </h1>
                    <p className="page-subtitle animate-fade-in">Your invoice has been generated. Save or print it for your records.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/* Action buttons (above invoice, not printed) */}
                    <div className="invoice-actions" style={{ borderTop: 'none', paddingBottom: 0 }}>
                        <button className="inv-btn inv-btn-outline" onClick={() => navigate(-1)}>
                            <ArrowLeft size={16} /> Back to Cart
                        </button>
                        <button className="inv-btn inv-btn-primary" onClick={handlePrint}>
                            <Printer size={16} /> Print Invoice
                        </button>
                        <button className="inv-btn inv-btn-primary" onClick={handleDownloadPDF}>
                            <Download size={16} /> Download PDF
                        </button>
                        <button className="inv-btn inv-btn-wa" onClick={handleShareWhatsAppImage}>
                            <MessageCircle size={16} /> Share Image on WhatsApp
                        </button>
                    </div>

                    {/* ── INVOICE DOCUMENT ── */}
                    <div className="invoice-container" ref={invoiceRef}>
                        {/* Header */}
                        <div className="invoice-header">
                            <div className="invoice-brand">
                                <h2>Vijay Tent House</h2>
                                <p>Premium Event Decoration Services</p>
                                <p>Since 2001 · Trusted by 5000+ Events</p>
                                <p>📞 9342720232</p>
                            </div>
                            <div className="invoice-meta">
                                <h3>INVOICE</h3>
                                <p>Date: {orderDate}</p>
                                <div className="invoice-order-id">{orderId}</div>
                            </div>
                        </div>

                        {/* Customer & Vendor Info */}
                        <div className="invoice-parties">
                            <div className="invoice-party">
                                <h4>Bill To</h4>
                                <p className="party-name">{customer.name}</p>
                                <p>📞 {customer.phone}</p>
                                {customer.email && <p>✉ {customer.email}</p>}
                            </div>
                            <div className="invoice-party">
                                <h4>From</h4>
                                <p className="party-name">Vijay Tent House</p>
                                <p>Event Decoration Specialists</p>
                                <p>Tamil Nadu, India</p>
                                <p>GSTIN: 33XXXXX0000X1ZX</p>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="invoice-body">
                            <h4>Order Details</h4>
                            <table className="invoice-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Service / Product</th>
                                        <th>Type</th>
                                        <th>Unit Price</th>
                                        <th>Qty</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, idx) => (
                                        <tr key={item.id}>
                                            <td>{idx + 1}</td>
                                            <td>
                                                <div className="invoice-item-name">{item.title}</div>
                                                <div className="invoice-item-cat">{item.category}</div>
                                            </td>
                                            <td style={{ textTransform: 'capitalize' }}>{item.category}</td>
                                            <td>{item.priceLabel}</td>
                                            <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                                            <td>₹{(item.price * item.quantity).toLocaleString('en-IN')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="invoice-totals">
                            <table className="invoice-totals-table">
                                <tbody>
                                    <tr>
                                        <td>Subtotal</td>
                                        <td>₹{totalPrice.toLocaleString('en-IN')}</td>
                                    </tr>
                                    <tr>
                                        <td>GST @ 18%</td>
                                        <td>₹{gst.toLocaleString('en-IN')}</td>
                                    </tr>
                                    <tr className="totals-divider"><td colSpan={2}></td></tr>
                                    <tr className="totals-grand">
                                        <td>Grand Total</td>
                                        <td>₹{grandTotal.toLocaleString('en-IN')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Footer note */}
                        <div className="invoice-footer-note">
                            Thank you for choosing <strong>Vijay Tent House</strong>. For queries, call{' '}
                            <strong>9342720232</strong>. This is a computer-generated invoice.
                        </div>
                    </div>

                    {/* Done button */}
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <button className="inv-btn inv-btn-primary" onClick={handleDone} style={{ padding: '1rem 3rem', fontSize: '1.05rem' }}>
                            ✓ Done — Return to Home
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Invoice;
