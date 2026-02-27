import React, { useState } from 'react';
import { Calendar, Package, FileText, Upload } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import Button from '../components/Button';
import './Booking.css';

const Booking: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    packageLevel: '',
    eventDate: '',
    location: '',
    requirements: ''
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "bookings"), {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'Pending',
        bookingId: `BKG-${Math.floor(1000 + Math.random() * 9000)}`
      });

      alert("Booking request submitted successfully! We will contact you shortly to confirm and process the advance payment.");

      // Reset form after submission
      setStep(1);
      setFormData({
        name: '', phone: '', eventType: '', packageLevel: '', eventDate: '', location: '', requirements: ''
      });
    } catch (err) {
      console.error("Error submitting booking: ", err);
      alert("Failed to submit booking request. Please try again.");
    } finally {
      setLoading(false);
    }
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
