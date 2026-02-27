import React from 'react';
import { Award, Heart, Users, CheckCircle } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="page-container">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title animate-fade-in">About Us</h1>
          <p className="page-subtitle animate-fade-in">The story behind the magic of Vijay Tent House since 2001.</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="section-title text-left">Our Shop Story</h2>
              <p className="about-text">
                Established in 2001, <strong>Vijay Tent House</strong> started as a small rental business. Over the past two decades, we have grown into one of the most trusted event management and decoration companies in the city.
              </p>
              <p className="about-text">
                Our journey has been fueled by a passion for creating beautiful spaces and unforgettable moments. From intimate birthday parties to grand royal weddings, we pour our heart into every detail, ensuring your event is as unique as you are.
              </p>

              <div className="stats-grid mt-4">
                <div className="stat-item">
                  <div className="stat-number">20+</div>
                  <div className="stat-label">Years of Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">5000+</div>
                  <div className="stat-label">Events Managed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Client Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="about-image-wrapper">
              <div className="about-image-shape"></div>
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&w=800&q=80"
                alt="Event Setup Team"
                className="about-image"
              />
              <div className="experience-badge">
                <span className="exp-year">2001</span>
                <span>Since</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><Award size={32} /></div>
              <h3>Unmatched Quality</h3>
              <p>We use only premium materials, fresh florals, and high-end lighting to ensure your event looks absolutely stunning.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><Users size={32} /></div>
              <h3>Professional Team</h3>
              <p>Our experienced decorators and event coordinators handle everything seamlessly from setup to teardown.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><Heart size={32} /></div>
              <h3>Personalized Approach</h3>
              <p>We listen to your vision and customize every aspect of the decor to reflect your personality and style.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><CheckCircle size={32} /></div>
              <h3>Reliable Execution</h3>
              <p>Timely setup and dedicated on-site support means you can enjoy your event without any stress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team (Optional visual) */}
      <section className="section pb-0">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to create something magical?</h2>
            <p>Our team is excited to hear your ideas.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
