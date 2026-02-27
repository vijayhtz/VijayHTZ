import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import Button from './Button';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

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
        </ul>

        {/* CTA & Contact (Desktop) */}
        <div className="nav-cta">
          <a href="tel:9342720232" className="nav-call-btn">
            <Phone size={18} /> Call Now
          </a>
        </div>

        {/* Mobile menu icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
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
          <li className="mobile-nav-item mt-4">
            <a href="tel:9342720232" className="mobile-contact">
              <Phone size={18} /> Call Us: 9342720232
            </a>
          </li>
          <li className="mobile-nav-item mt-2">
            <Button to="/booking" variant="primary" size="lg" className="full-width" onClick={closeMenu}>
              Book Now
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
