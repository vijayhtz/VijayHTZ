import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, MessageCircle } from 'lucide-react';
import { unsplash } from '../unsplash';
import Button from '../components/Button';
import EventCard from '../components/EventCard';
import './Home.css';

const Home: React.FC = () => {
  const [eventImages, setEventImages] = useState<string[]>([]);
  const [featuredImages, setFeaturedImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch event images
        const eventResult = await unsplash.search.getPhotos({
          query: "luxury event wedding party",
          perPage: 6,
          orientation: "landscape"
        });
        if (eventResult.response) {
          setEventImages(eventResult.response.results.map(p => p.urls.regular));
        }

        // Fetch featured images
        const featuredResult = await unsplash.search.getPhotos({
          query: "indian wedding decoration",
          perPage: 4,
          orientation: "landscape"
        });
        if (featuredResult.response) {
          setFeaturedImages(featuredResult.response.results.map(p => p.urls.regular));
        }
      } catch (err) {
        console.error("Error fetching home images:", err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content animate-fade-in">
          <p className="hero-welcome">WELCOME TO</p>
          <h1 className="hero-title">Vijay Tent House</h1>
          <p className="hero-subtitle">Making Your Functions Grand & Memorable</p>
          <div className="hero-cta">
            <a href="tel:9342720232" className="hero-btn btn-call">
              <Phone size={20} /> Call Now
            </a>
            <a href="https://wa.me/919342720232" target="_blank" rel="noopener noreferrer" className="hero-btn btn-whatsapp">
              <MessageCircle size={20} /> WhatsApp Order
            </a>
          </div>
        </div>
      </section>

      {/* Events We Handle Section */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Events We Handle</h2>
          <div className="events-grid">
            <EventCard
              title="Wedding"
              image={eventImages[0] || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
              description="Elegant stage setups, premium floral arrangements, and mesmerizing lighting for your big day."
              linkTo="/services"
            />
            <EventCard
              title="Birthday"
              image={eventImages[1] || "https://images.unsplash.com/photo-1530103862676-de8892bf309c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
              description="Vibrant balloon arches, customized themes, and fun setups for all ages."
              linkTo="/services"
            />
            <EventCard
              title="Engagement"
              image={eventImages[2] || "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
              description="Beautiful backdrops and intimate settings to celebrate your new beginning."
              linkTo="/services"
            />
            <EventCard
              title="Corporate Events"
              image={eventImages[3] || "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
              description="Professional stage design, PA systems, and elegant seating arrangements."
              linkTo="/services"
            />
            <EventCard
              title="Baby Shower"
              image={eventImages[4] || "https://images.unsplash.com/photo-1621689262174-da48f57dc621?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
              description="Delicate, thematic decorations to welcome your little one."
              linkTo="/services"
            />
            <EventCard
              title="Housewarming"
              image={eventImages[5] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
              description="Traditional and modern setups to bless your new home."
              linkTo="/services"
            />
          </div>
        </div>
      </section>

      {/* Featured Decorations */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Decorations</h2>
          <div className="featured-gallery">
            <div className="featured-item f-large">
              <img src={featuredImages[0] || "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Wedding Stage" />
              <div className="featured-overlay"><span>Grand Stage Setup</span></div>
            </div>
            <div className="featured-item">
              <img src={featuredImages[1] || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt="Lighting" />
              <div className="featured-overlay"><span>Premium Lighting</span></div>
            </div>
            <div className="featured-item">
              <img src={featuredImages[2] || "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt="Flower Backdrop" />
              <div className="featured-overlay"><span>Floral Backdrop</span></div>
            </div>
            <div className="featured-item f-wide">
              <img src={featuredImages[3] || "https://images.unsplash.com/photo-1533174000255-a63b4644ebad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Balloon Decoration" />
              <div className="featured-overlay"><span>Thematic Balloons</span></div>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Button to="/gallery" variant="outline">View Full Gallery</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="testimonial-text">"Vijay Tent House made our wedding truly magical. The stage decoration was breathtaking, and the whole team was super professional."</p>
              <div className="testimonial-author">
                <div className="author-avatar">A</div>
                <div className="author-info">
                  <h4>Anjali Sharma</h4>
                  <span>Wedding Client</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="testimonial-text">"Booked them for my daughter's 1st birthday. The balloon arch and thematic setup exceeded our expectations. Highly recommended!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">R</div>
                <div className="author-info">
                  <h4>Rahul Verma</h4>
                  <span>Birthday Client</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="testimonial-text">"Excellent service for our corporate annual day. The sound, lighting, and seating arrangements were perfectly organized without a hitch."</p>
              <div className="testimonial-author">
                <div className="author-avatar">P</div>
                <div className="author-info">
                  <h4>Priya Singh</h4>
                  <span>Corporate Client</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="section quick-contact-section">
        <div className="container">
          <div className="quick-contact-box">
            <div className="qc-content">
              <h2>Let's Plan Your Perfect Event</h2>
              <p>Get in touch with us today for a free consultation.</p>
            </div>
            <div className="qc-actions">
              <a href="tel:9342720232" className="qc-btn btn-call">
                <Phone size={20} /> Call Now
              </a>
              <a href="https://wa.me/919342720232" target="_blank" rel="noopener noreferrer" className="qc-btn btn-whatsapp">
                <MessageCircle size={20} /> WhatsApp Us
              </a>
              <a href="#" className="qc-btn btn-location">
                <MapPin size={20} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
