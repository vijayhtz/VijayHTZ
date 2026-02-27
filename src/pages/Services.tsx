import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { unsplash } from '../unsplash';
import Button from '../components/Button';
import './Services.css';

interface DesignType {
  name: string;
  image: string;
  description: string;
}

interface ServiceItem {
  id: number;
  title: string;
  image: string;
  description: string;
  designs: DesignType[];
}

// Helper to generate default designs (placeholders that will be updated by API)
const generateDesigns = (title: string): DesignType[] => [
  {
    name: `Classic ${title.split(' ')[0]}`,
    image: "", // Will be filled by API
    description: "A timeless and elegant approach ensuring maximum aesthetic appeal. Perfect for traditional events."
  },
  {
    name: `Modern ${title.split(' ')[0]}`,
    image: "", // Will be filled by API
    description: "Clean, contemporary patterns with subtle sophisticated tones for a trendy aesthetic."
  },
  {
    name: `Premium ${title.split(' ')[0]}`,
    image: "", // Will be filled by API
    description: "The ultimate luxury setup with top-tier materials and stunning visuals that wow any guest."
  }
];

const initialServicesData: ServiceItem[] = [
  {
    id: 1, title: "Stage Setup & Design",
    image: "",
    description: "Grand and elegant stage designs using premium materials, florals, and lighting suitable for major events.",
    designs: generateDesigns("Stage")
  },
  {
    id: 2, title: "Mandap / Mandapam Decoration",
    image: "",
    description: "Traditional and contemporary mandap setups to honor your sacred vows with breathtaking decor.",
    designs: generateDesigns("Mandap")
  },
  {
    id: 3, title: "Balloon Art & Theme Balloons",
    image: "",
    description: "Vibrant and thematic balloon arches, columns, and centerpieces perfect for birthdays and baby showers.",
    designs: generateDesigns("Balloon")
  },
  {
    id: 4, title: "Cake Table Decor",
    image: "",
    description: "Beautifully styled cake tables that serve as the focal point for cutting ceremonies at any party.",
    designs: generateDesigns("Table")
  },
  {
    id: 5, title: "Flower Backdrops & Floral Walls",
    image: "",
    description: "Lush, fresh and artificial floral walls that create the perfect romantic backdrop for photographs.",
    designs: generateDesigns("Floral")
  },
  {
    id: 6, title: "Entrance & Gate Decoration",
    image: "",
    description: "Welcoming archways and highly decorated entrance gates to set the mood right from the start.",
    designs: generateDesigns("Entrance")
  },
  {
    id: 7, title: "LED Name Boards & Signage",
    image: "",
    description: "Custom neon signs, welcome boards, and illuminated lettering for personalized event branding.",
    designs: generateDesigns("Signage")
  },
  {
    id: 8, title: "Lighting & Ambient Lighting",
    image: "",
    description: "Professional ambient lighting, fairy lights, and mood uplighting to transform the venue space.",
    designs: generateDesigns("Lighting")
  },
  {
    id: 9, title: "Photobooth & Selfie Zone Setup",
    image: "",
    description: "Interactive and fun photobooths featuring quirky props, bespoke backdrops, and instant appeal.",
    designs: generateDesigns("Photobooth")
  },
  {
    id: 10, title: "Ceiling Drapes & Fabric Decor",
    image: "",
    description: "Elegant silk, chiffon, and satin ceiling drapes to add vertical grace and luxury to your hall.",
    designs: generateDesigns("Fabric")
  },
  {
    id: 11, title: "Chair Covers & Sashes",
    image: "",
    description: "Premium seating arrangements with color-coordinated chair covers, bows, and elegant sashes.",
    designs: generateDesigns("Seating")
  },
  {
    id: 12, title: "Table Centerpieces & Table Decor",
    image: "",
    description: "Stunning table art pieces ranging from crystal candelabras to fresh floating floral centerpieces.",
    designs: generateDesigns("Centerpiece")
  },
  {
    id: 13, title: "Backdrop Arch Designs",
    image: "",
    description: "Creative wooden, acrylic, or floral arches framing the sweethearts or the primary event stage.",
    designs: generateDesigns("Arch")
  },
  {
    id: 14, title: "Floor Stickers & Aisle Decor",
    image: "",
    description: "Custom printed dance floors, monogram stickers, and safely lit walkways for the grand entrance.",
    designs: generateDesigns("Aisle")
  },
  {
    id: 15, title: "Theme & Concept Styling",
    image: "",
    description: "End-to-end bespoke conceptualization from vintage Victorian to contemporary Bohemian styling.",
    designs: generateDesigns("Theme")
  },
  {
    id: 16, title: "Confetti & Special Effects",
    image: "",
    description: "Cold pyros, dry ice fog machines, paper confetti cannons, and bubble machines for special moments.",
    designs: generateDesigns("Effects")
  },
  {
    id: 17, title: "Sound System & DJ Setup",
    image: "",
    description: "High-tier acoustic setups, professional mixers, heavy bass speakers, and expert DJ consoles.",
    designs: generateDesigns("Audio")
  },
  {
    id: 18, title: "Wedding Pandal & Canopy",
    image: "",
    description: "Massive outdoor waterproof pandals and beautifully draped breezy canopies for open ground events.",
    designs: generateDesigns("Canopy")
  },
  {
    id: 19, title: "Traditional South Indian Setups",
    image: "",
    description: "Authentic setups featuring banana leaves, brass deepams, coconut palm weaves, and marigold strings.",
    designs: generateDesigns("Traditional")
  },
  {
    id: 20, title: "Corporate Event Stage & Branding",
    image: "",
    description: "Strictly professional stage setups tailored with company branding, LED walls, and podiums.",
    designs: generateDesigns("Corporate")
  }
];

const Services: React.FC = () => {
  const [servicesData, setServicesData] = useState<ServiceItem[]>(initialServicesData);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [gridLoading, setGridLoading] = useState(true);
  const [modalImageLoading, setModalImageLoading] = useState(false);
  const [showDirectBooking, setShowDirectBooking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    eventDate: ''
  });

  // Fetch images for all services on mount
  useEffect(() => {
    const fetchGridImages = async () => {
      try {
        const result = await unsplash.search.getPhotos({
          query: "event decoration setup",
          perPage: 20,
          orientation: "landscape"
        });

        if (result.response) {
          const fetchedPhotos = result.response.results;
          setServicesData(prev => prev.map((service, index) => ({
            ...service,
            image: fetchedPhotos[index]?.urls.regular || "https://images.unsplash.com/photo-1519741497674-611481863552"
          })));
        }
      } catch (err) {
        console.error("Error fetching grid images:", err);
      } finally {
        setGridLoading(false);
      }
    };

    fetchGridImages();
  }, []);

  const openModal = async (service: ServiceItem) => {
    setSelectedService(service);
    setActiveTab(0);
    document.body.style.overflow = 'hidden';

    // If designs don't have images yet, fetch them
    if (!service.designs[0].image) {
      setModalImageLoading(true);
      try {
        const result = await unsplash.search.getPhotos({
          query: `${service.title} decoration`,
          perPage: 3,
          orientation: "landscape"
        });

        if (result.response) {
          const designPhotos = result.response.results;
          const updatedDesigns = service.designs.map((design, idx) => ({
            ...design,
            image: designPhotos[idx]?.urls.regular || service.image
          }));

          setServicesData(prev => prev.map(s =>
            s.id === service.id ? { ...s, designs: updatedDesigns } : s
          ));
          setSelectedService(prev => prev ? { ...prev, designs: updatedDesigns } : null);
        }
      } catch (err) {
        console.error("Error fetching design images:", err);
      } finally {
        setModalImageLoading(false);
      }
    }
  };

  const closeModal = () => {
    setSelectedService(null);
    setShowDirectBooking(false);
    setBookingForm({ name: '', phone: '', eventDate: '' });
    document.body.style.overflow = 'auto';
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "bookings"), {
        ...bookingForm,
        eventType: selectedService.title,
        packageLevel: selectedService.designs[activeTab].name,
        createdAt: new Date().toISOString(),
        status: 'Pending',
        bookingId: `BKG-${Math.floor(1000 + Math.random() * 9000)}`,
        source: 'Services Modal'
      });

      alert(`Your request for ${selectedService.designs[activeTab].name} has been received! Our team will contact you shortly to confirm the details and location.`);
      closeModal();
    } catch (err) {
      console.error("Error submitting direct booking: ", err);
      alert("Failed to submit booking request. Please try again or use WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title animate-fade-in">Our Premium Services</h1>
          <p className="page-subtitle animate-fade-in">Explore our extensive range of elegant, hand-crafted decor setups.</p>
        </div>
      </section>

      {/* Services Grid List */}
      <section className="section bg-light">
        <div className="container">
          {gridLoading ? (
            <div className="text-center py-5">
              <div className="loading-spinner"></div>
              <p>Loading Premium Services...</p>
            </div>
          ) : (
            <div className="mega-services-grid">
              {servicesData.map((service) => (
                <div key={service.id} className="service-card" onClick={() => openModal(service)}>
                  <div className="service-img-wrapper">
                    <img src={service.image} alt={service.title} loading="lazy" />
                    <div className="service-card-overlay">
                      <span>View Designs</span>
                    </div>
                  </div>
                  <div className="service-card-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <button className="service-read-more">See Types & Designs <ArrowRight size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dynamic Modal for Service Variations */}
      {selectedService && (
        <div className="service-modal-overlay animate-fade-in" onMouseDown={closeModal}>
          <div className="service-modal-content" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={28} />
            </button>

            <div className="modal-layout">
              {/* Left Side: Images & Info */}
              <div className="modal-gallery">
                {modalImageLoading && !selectedService.designs[activeTab].image ? (
                  <div className="modal-image-placeholder">
                    <div className="loading-spinner"></div>
                    <p>Fetching Designs...</p>
                  </div>
                ) : (
                  <img
                    src={selectedService.designs[activeTab].image || selectedService.image}
                    alt={selectedService.designs[activeTab].name}
                    className="modal-active-image animate-fade-in"
                    key={selectedService.designs[activeTab].image || activeTab}
                  />
                )}
              </div>

              {/* Right Side: Options & Actions */}
              <div className="modal-details">
                <h2 className="modal-title">{selectedService.title}</h2>
                <p className="modal-service-desc">{selectedService.description}</p>

                <div className="modal-designs-section">
                  <h4>Select a Design Type:</h4>
                  <div className="design-tabs">
                    {selectedService.designs.map((design, idx) => (
                      <button
                        key={idx}
                        className={`design-tab-btn ${activeTab === idx ? 'active' : ''}`}
                        onClick={() => setActiveTab(idx)}
                      >
                        {design.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="design-specific-info animate-fade-in" key={activeTab}>
                  <div className="flex gap-sm align-start">
                    <CheckCircle className="text-gold mt-1" size={20} />
                    <p>{selectedService.designs[activeTab].description}</p>
                  </div>
                </div>

                {!showDirectBooking ? (
                  <div className="modal-actions mt-4">
                    <Button onClick={() => setShowDirectBooking(true)} variant="primary" className="full-width" size="lg">
                      Book This Specific Design
                    </Button>
                    <a href="https://wa.me/919342720232" className="btn btn-outline full-width text-center mt-2" target="_blank" rel="noopener noreferrer">
                      Discuss on WhatsApp
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="direct-booking-form mt-4 animate-fade-in" style={{ backgroundColor: 'var(--bg-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <h4 style={{ marginBottom: '1rem', color: 'var(--primary-red)' }}>Quick Booking</h4>

                    <div className="form-group mb-2">
                      <input type="text" placeholder="Your Name *" required style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        value={bookingForm.name} onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })} />
                    </div>

                    <div className="form-group mb-2">
                      <input type="tel" placeholder="Phone Number *" required style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        value={bookingForm.phone} onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })} />
                    </div>

                    <div className="form-group mb-3">
                      <input type="date" required min={new Date().toISOString().split('T')[0]} style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        value={bookingForm.eventDate} onChange={(e) => setBookingForm({ ...bookingForm, eventDate: e.target.value })} />
                    </div>

                    <div className="flex gap-sm">
                      <Button type="button" onClick={() => setShowDirectBooking(false)} variant="outline" className="full-width" disabled={loading}>Cancel</Button>
                      <Button type="submit" variant="primary" className="full-width" disabled={loading}>
                        {loading ? 'Submitting...' : 'Confirm'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
