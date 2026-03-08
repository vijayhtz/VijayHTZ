import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const GST_RATE = 0.18;

const Cart: React.FC = () => {
    const { items, removeItem, updateQuantity, totalPrice } = useCart();
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [customer, setCustomer] = useState({ name: '', phone: '', email: '' });

    const gst = Math.round(totalPrice * GST_RATE);
    const grandTotal = totalPrice + gst;

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!customer.name || !customer.phone) return;
        navigate('/invoice', { state: { customer, items, totalPrice, gst, grandTotal } });
    };

    const buildWhatsApp = () => {
        const lines = items.map(i => `• ${i.title} × ${i.quantity} = ₹${(i.price * i.quantity).toLocaleString('en-IN')}`).join('%0A');
        const msg =
            `*New Decoration Order*%0A%0A` +
            `*Name:* ${customer.name || 'Customer'}%0A` +
            `*Phone:* ${customer.phone || 'N/A'}%0A%0A` +
            `*Items:%0A${lines}%0A%0A` +
            `*Subtotal:* ₹${totalPrice.toLocaleString('en-IN')}%0A` +
            `*GST (18%%):* ₹${gst.toLocaleString('en-IN')}%0A` +
            `*Grand Total:* ₹${grandTotal.toLocaleString('en-IN')}`;
        return `https://wa.me/919342720232?text=${msg}`;
    };

    if (items.length === 0) {
        return (
            <div className="page-container cart-page">
                <section className="page-header">
                    <div className="container">
                        <h1 className="page-title animate-fade-in">My Cart</h1>
                        <p className="page-subtitle animate-fade-in">Your selected decoration services</p>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="cart-empty">
                            <div className="cart-empty-icon">🛒</div>
                            <h2>Your cart is empty</h2>
                            <p>Add services or packages to get started!</p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/services" className="btn btn-primary">Browse Services</Link>
                                <Link to="/packages" className="btn btn-outline">View Packages</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="page-container cart-page">
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title animate-fade-in">My Cart</h1>
                    <p className="page-subtitle animate-fade-in">{items.length} item{items.length !== 1 ? 's' : ''} selected</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="cart-layout">
                        {/* Items Panel */}
                        <div className="cart-items-panel">
                            <h2>Selected Services</h2>
                            {items.map(item => (
                                <div key={item.id} className="cart-item-card">
                                    <img
                                        src={item.image || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400'}
                                        alt={item.title}
                                        className="cart-item-img"
                                    />
                                    <div className="cart-item-info">
                                        <span className="cart-item-category">{item.category}</span>
                                        <div className="cart-item-title">{item.title}</div>
                                        <div className="cart-item-unit-price">Unit: {item.priceLabel}</div>
                                        <div className="cart-item-controls">
                                            <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                            <span className="qty-display">{item.quantity}</span>
                                            <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className="cart-item-right">
                                        <button className="cart-remove-btn" title="Remove" onClick={() => removeItem(item.id)}>
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="cart-item-subtotal">
                                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Panel */}
                        <div className="order-summary-panel">
                            <h2>Order Summary</h2>
                            <div className="summary-row">
                                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="summary-row tax">
                                <span>GST (18%)</span>
                                <span>₹{gst.toLocaleString('en-IN')}</span>
                            </div>
                            <hr className="summary-divider" />
                            <div className="summary-row total">
                                <span>Grand Total</span>
                                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                            </div>

                            {!showForm ? (
                                <>
                                    <button className="checkout-btn" onClick={() => setShowForm(true)}>
                                        <ShoppingBag size={18} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                        Place Order & Get Invoice
                                    </button>
                                    <a href={buildWhatsApp()} target="_blank" rel="noopener noreferrer" className="whatsapp-checkout-btn">
                                        <MessageCircle size={18} /> Order via WhatsApp
                                    </a>
                                </>
                            ) : (
                                <form className="checkout-form" onSubmit={handlePlaceOrder}>
                                    <h4 style={{ marginBottom: '0.75rem', color: 'var(--primary-red)' }}>Your Details</h4>
                                    <input
                                        type="text" required placeholder="Full Name *"
                                        value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })}
                                    />
                                    <input
                                        type="tel" required placeholder="Phone Number *"
                                        value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                                    />
                                    <input
                                        type="email" placeholder="Email (optional)"
                                        value={customer.email} onChange={e => setCustomer({ ...customer, email: e.target.value })}
                                    />
                                    <button type="submit" className="checkout-btn">Generate Invoice →</button>
                                    <button type="button" onClick={() => setShowForm(false)}
                                        style={{ width: '100%', marginTop: '0.5rem', background: 'none', border: '1px solid #ccc', borderRadius: 'var(--radius-md)', padding: '0.75rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
                                        Cancel
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Cart;
