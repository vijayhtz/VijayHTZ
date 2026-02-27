import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react';
import Button from '../components/Button';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="page-container">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title animate-fade-in">Contact Us</h1>
          <p className="page-subtitle animate-fade-in">We'd love to hear from you. Get in touch to discuss your next big event.</p>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="contact-grid">

            {/* Contact Info */}
            <div className="contact-info-wrapper">
              <h2 className="section-title text-left" style={{ marginBottom: '2rem' }}>Get in Touch</h2>
              <p className="contact-desc">
                Whether you have a question about our services, packages, or want to discuss a custom decoration setup, our team is ready to answer all your questions.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon-box"><Phone size={24} /></div>
                  <div className="contact-item-text">
                    <h3>Call Us</h3>
                    <p><a href="tel:9342720232">9342720232</a></p>
                    <span className="contact-note">Available Everyday, 9 AM - 9 PM</span>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-box whatsapp"><MessageCircle size={24} /></div>
                  <div className="contact-item-text">
                    <h3>WhatsApp</h3>
                    <p><a href="https://wa.me/919342720232" target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></p>
                    <span className="contact-note">Quick responses within an hour</span>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-box"><MapPin size={24} /></div>
                  <div className="contact-item-text">
                    <h3>Visit Our Office</h3>
                    <p>(selvapuram , coimbatore -26)</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-box"><Clock size={24} /></div>
                  <div className="contact-item-text">
                    <h3>Business Hours</h3>
                    <p>Monday - Sunday: 9:00 AM - 9:00 PM</p>
                    <p>Open on all public holidays for events.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <div className="contact-form-card">
                <h3>Send us a Message</h3>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group row">
                    <div className="input-field">
                      <label>Your Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                    </div>
                    <div className="input-field">
                      <label>Your Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="input-field">
                      <label>Phone Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="10-digit number" />
                    </div>
                    <div className="input-field">
                      <label>Subject</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Write your message here..."
                      rows={5}
                    ></textarea>
                  </div>

                  <div className="form-submit">
                    <Button type="submit" variant="primary" className="full-width">Send Message</Button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        {/* Replace with actual Google Maps Embed Iframe */}
        <div className="map-placeholder">
          <MapPin size={48} className="map-icon-large" />
          <p>Google Maps Location Embed</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
