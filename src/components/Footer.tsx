import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Instagram, Facebook, Youtube } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer section">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & About */}
          <div className="footer-col">
            <h2 className="footer-brand">
              Vijay Tent House <span className="since">Since 2001</span>
            </h2>
            <p className="footer-desc">
              Creating magical events with stunning decorations. Specializing in elegant stage setups, vibrant balloon decor, and premium event rentals.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon"><Facebook size={20} /></a>
              <a href="#" className="social-icon"><Instagram size={20} /></a>
              <a href="#" className="social-icon"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/packages">Our Packages</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/booking">Book Now</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>123 Event Street, Celebration City, IN 123456</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <a href="tel:9342720232">9342720232</a>
              </li>
              <li>
                <MessageCircle size={18} className="contact-icon" />
                <a href="https://wa.me/919342720232" target="_blank" rel="noopener noreferrer">WhatsApp: 9342720232</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Vijay Tent House. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
