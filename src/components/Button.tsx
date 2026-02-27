import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    to?: string;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    to,
    onClick,
    className = '',
    type = 'button',
    disabled = false
}) => {
    const baseClass = `btn btn-${variant} btn-${size} ${className} ${disabled ? 'btn-disabled' : ''}`;

    if (to) {
        return (
            <Link to={to} className={baseClass}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={baseClass} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
