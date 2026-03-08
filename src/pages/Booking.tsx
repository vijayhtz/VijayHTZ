import React, { useState } from 'react';
import { Calendar, Package, FileText, Upload } from 'lucide-react';
import Button from '../components/Button';
import './Booking.css';

const Booking: React.FC = () => {
  // Authentication removed per user request
  const [step, setStep] = useState(1);
  const [loading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    packageLevel: '',
    eventDate: '',
    location: '',
    requirements: '',
    selectedServices: [] as string[]
  });

  const availableServices = [
    "Stage Setup & Design", "Mandap / Mandapam Decoration", "Balloon Art & Theme Balloons",
    "Cake Table Decor", "Flower Backdrops & Floral Walls", "Entrance & Gate Decoration",
    "LED Name Boards & Signage", "Lighting & Ambient Lighting", "Photobooth & Selfie Zone Setup",
    "Ceiling Drapes & Fabric Decor", "Chair Covers & Sashes", "Table Centerpieces & Table Decor",
    "Backdrop Arch Designs", "Floor Stickers & Aisle Decor", "Theme & Concept Styling",
    "Confetti & Special Effects", "Sound System & DJ Setup", "Wedding Pandal & Canopy",
    "Traditional South Indian Setups", "Corporate Event Stage & Branding"
  ];

  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedServices.includes(service);
      const updated = isSelected
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service];
      return { ...prev, selectedServices: updated };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const waNumber = "919342720232";
    const servicesList = formData.selectedServices.length > 0
      ? formData.selectedServices.map(s => '%0A  - ' + s).join('')
      : 'None';

    const msg =
      'New Booking Request - Vijay Tent House' +
      '%0A%0ACustomer: ' + formData.name +
      '%0APhone: ' + formData.phone +
      '%0AEvent: ' + formData.eventType +
      '%0APackage: ' + formData.packageLevel +
      '%0ADate: ' + formData.eventDate +
      '%0ALocation: ' + formData.location +
      '%0A%0ASelected Services:' + servicesList +
      '%0A%0ARequirements: ' + (formData.requirements || 'None');

    window.location.href = 'https://wa.me/' + waNumber + '?text=' + msg;
  };


  return (
    <div className="page-container">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title animate-fade-in">Book Your Event</h1>
          <p className="page-subtitle animate-fade-in">Let's start planning the perfect setup for your special day.</p>
        </div>
      </section>

      <section className="section bg-light booking-section">
        <div className="container">
          <div className="booking-wizard">

            {/* Progress Bar */}
            <div className="wizard-progress">
              <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
                <div className="step-circle">1</div>
                <span>Event Details</span>
              </div>
              <div className="progress-line" />
              <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
                <div className="step-circle">2</div>
                <span>Date & Location</span>
              </div>
              <div className="progress-line" />
              <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                <div className="step-circle">3</div>
                <span>Confirm & Pay</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="booking-form">

              {/* Step 1: Event Details */}
              {step === 1 && (
                <div className="form-step animate-fade-in">
                  <h3 className="form-title"><Package className="form-icon" /> Event Details</h3>

                  <div className="form-group row">
                    <div className="input-field">
                      <label>Your Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
                    </div>
                    <div className="input-field">
                      <label>Phone Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="10-digit number" />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="input-field">
                      <label>Event Type *</label>
                      <select name="eventType" value={formData.eventType} onChange={handleChange} required>
                        <option value="">Select Event Type</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Engagement">Engagement</option>
                        <option value="Corporate">Corporate Event</option>
                        <option value="Baby Shower">Baby Shower</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="input-field">
                      <label>Package Preference *</label>
                      <select name="packageLevel" value={formData.packageLevel} onChange={handleChange} required>
                        <option value="">Select Package</option>
                        <option value="Basic">Basic Package</option>
                        <option value="Standard">Standard Package</option>
                        <option value="Premium">Premium Package</option>
                        <option value="Custom">Custom / I need suggestions</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Select Services from List *</label>
                    <div className="services-checklist" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto', padding: '1rem', background: '#f8f9fa', borderRadius: '4px', border: '1px solid #ddd' }}>
                      {availableServices.map(service => (
                        <label key={service} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                          <input
                            type="checkbox"
                            checked={formData.selectedServices.includes(service)}
                            onChange={() => handleServiceToggle(service)}
                          />
                          {service}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-actions right">
                    <Button type="button" onClick={nextStep} variant="primary">Next Step</Button>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Location */}
              {step === 2 && (
                <div className="form-step animate-fade-in">
                  <h3 className="form-title"><Calendar className="form-icon" /> Date & Location</h3>

                  <div className="form-group">
                    <label>Event Date *</label>
                    <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
                  </div>

                  <div className="form-group">
                    <label>Event Location / Venue Address *</label>
                    <textarea name="location" value={formData.location} onChange={handleChange} required placeholder="Enter full address" rows={3}></textarea>
                  </div>

                  <div className="form-group">
                    <label>Special Requirements / Notes</label>
                    <textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Any specific theme, colors, or rental items needed?" rows={4}></textarea>
                  </div>

                  <div className="form-actions space-between">
                    <Button type="button" onClick={prevStep} variant="outline">Back</Button>
                    <Button type="button" onClick={nextStep} variant="primary">Next Step</Button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm Details & Payment info */}
              {step === 3 && (
                <div className="form-step animate-fade-in">
                  <h3 className="form-title"><FileText className="form-icon" /> Confirm Booking Details</h3>

                  <div className="booking-summary">
                    <div className="summary-card">
                      <div className="summary-row"><span>Name:</span> <strong>{formData.name || 'N/A'}</strong></div>
                      <div className="summary-row"><span>Phone:</span> <strong>{formData.phone || 'N/A'}</strong></div>
                      <div className="summary-row"><span>Event:</span> <strong>{formData.eventType || 'N/A'} ({formData.packageLevel || 'N/A'})</strong></div>
                      <div className="summary-row"><span>Date:</span> <strong>{formData.eventDate || 'N/A'}</strong></div>
                      <div className="summary-row"><span>Location:</span> <strong>{formData.location || 'N/A'}</strong></div>
                    </div>

                    <div className="reference-upload mt-4">
                      <label className="upload-label">
                        <Upload size={20} />
                        <span>Upload Reference Image (Optional)</span>
                        <input type="file" accept="image/*" className="hidden-file-input" />
                      </label>
                      <p className="upload-help">Upload a photo if you have a specific design in mind.</p>
                    </div>

                    <div className="payment-info mt-4">
                      <h4>Payment Integration Ready</h4>
                      <p>We accept advance payments securely via UPI, GPAY, PhonePe, and Cards (Powered by Razorpay).</p>
                    </div>
                  </div>

                  <div className="form-actions space-between mt-4">
                    <Button type="button" onClick={prevStep} variant="outline" disabled={loading}>Back</Button>
                    <Button type="submit" variant="primary" disabled={loading}>
                      {loading ? 'Submitting...' : 'Submit Booking Request'}
                    </Button>
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
