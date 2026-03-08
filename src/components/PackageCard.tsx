import React, { useState } from 'react';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './PackageCard.css';

interface PackageCardProps {
    level: 'Basic' | 'Standard' | 'Premium';
    title: string;
    image?: string;
    features: string[];
    isPopular?: boolean;
    price?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ level, title, image, features, isPopular, price }) => {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const parsePrice = (label?: string): number => {
        if (!label) return 0;
        const num = parseInt(label.replace(/[^0-9]/g, ''), 10);
        return isNaN(num) ? 0 : num;
    };

    const handleAddToCart = () => {
        addItem({
            id: `pkg-${level}-${title}`.replace(/\s+/g, '-').toLowerCase(),
            title: `${level} — ${title}`,
            price: parsePrice(price),
            priceLabel: price || 'Contact for Price',
            image: image || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
            category: 'package',
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    };
    return (
        <div className={`package-card ${isPopular ? 'popular' : ''}`}>
            {isPopular && <div className="popular-badge">Most Popular</div>}

            {image && (
                <div className="package-image">
                    <img src={image} alt={title} loading="lazy" />
                </div>
            )}

            <div className="package-header">
                <h3 className="package-level">{level}</h3>
                <h4 className="package-title">{title}</h4>
            </div>

            <div className="package-features">
                <ul>
                    {features.map((feature, index) => (
                        <li key={index}>
                            <span className="check-icon">✓</span> {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="package-footer">
                {price && (
                    <div className="package-price-badge">
                        <span className="pkg-price-label">Total Package</span>
                        <span className="pkg-price-value">{price}</span>
                    </div>
                )}
                <button
                    className={`pkg-add-to-cart-btn ${added ? 'added' : ''}`}
                    onClick={handleAddToCart}
                >
                    {added
                        ? <><CheckCircle size={16} /> Added to Cart!</>
                        : <><ShoppingCart size={16} /> Book This Package</>}
                </button>
            </div>
        </div>
    );
};

export default PackageCard;
