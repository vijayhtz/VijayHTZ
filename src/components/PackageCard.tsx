import React from 'react';

import Button from './Button';
import './PackageCard.css';

interface PackageCardProps {
    level: 'Basic' | 'Standard' | 'Premium';
    title: string;
    image?: string;
    features: string[];
    isPopular?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({ level, title, image, features, isPopular }) => {
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
                <Button to="/booking" variant={isPopular ? 'primary' : 'outline'} className="full-width">
                    Book This Package
                </Button>
            </div>
        </div>
    );
};

export default PackageCard;
