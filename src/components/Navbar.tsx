import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingCart, LogOut, Shield } from 'lucide-react';
import Button from './Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { totalCount } = useCart();
  const { user, userProfile } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeMenu();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Order', path: '/packages' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <h1>Vijay Tent House</h1>
          <span className="since-text">Since 2001</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.name} className="nav-item">
              <Link
                to={link.path}
                className={`nav-links ${location.pathname === link.path ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {/* My Cart */}
          <li className="nav-item">
            <Link
              to="/cart"
              className={`nav-links cart-nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <ShoppingCart size={17} />
              My Cart
              {totalCount > 0 && (
                <span className="cart-badge">{totalCount > 9 ? '9+' : totalCount}</span>
              )}
            </Link>
          </li>

          {user && (userProfile?.role === 'admin' || user.email === 'admin@vijaytent.com') && (
            <li className="nav-item">
              <Link to="/admin" className={`nav-links ${location.pathname === '/admin' ? 'active' : ''}`} onClick={closeMenu}>
                <Shield size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Admin
              </Link>
            </li>
          )}
        </ul>

        {/* CTA & Contact (Desktop) */}
        <div className="nav-cta">
          {user ? (
            <button onClick={handleLogout} className="nav-call-btn" style={{ background: 'transparent', color: 'var(--text-dark)', border: '1px solid #ccc' }}>
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link to="/login" className="nav-call-btn">
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
            {totalCount > 0 && !isOpen && (
              <span className="cart-badge mobile-menu-badge">{totalCount > 9 ? '9+' : totalCount}</span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-menu">
          {navLinks.map((link) => (
            <li key={`mobile-${link.name}`} className="mobile-nav-item">
              <Link
                to={link.path}
                className={`mobile-nav-links ${location.pathname === link.path ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {/* My Cart mobile */}
          <li className="mobile-nav-item">
            <Link
              to="/cart"
              className={`mobile-nav-links mobile-cart-link ${location.pathname === '/cart' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <ShoppingCart size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />
              My Cart
              {totalCount > 0 && (
                <span className="cart-badge" style={{ marginLeft: 6 }}>{totalCount > 9 ? '9+' : totalCount}</span>
              )}
            </Link>
          </li>
          {user && (userProfile?.role === 'admin' || user.email === 'admin@vijaytent.com') && (
            <li className="mobile-nav-item">
              <Link to="/admin" className={`mobile-nav-links ${location.pathname === '/admin' ? 'active' : ''}`} onClick={closeMenu}>
                <Shield size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Admin Panel
              </Link>
            </li>
          )}
          <li className="mobile-nav-item mt-4">
            <a href="tel:9342720232" className="mobile-contact">
              <Phone size={18} /> Call Us: 9342720232
            </a>
          </li>
          <li className="mobile-nav-item mt-2">
            {user ? (
              <Button onClick={handleLogout} variant="outline" size="lg" className="full-width">
                <LogOut size={18} /> Logout
              </Button>
            ) : (
              <Button to="/login" variant="primary" size="lg" className="full-width" onClick={closeMenu}>
                Login
              </Button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
