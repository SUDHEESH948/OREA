import { useState } from "react";
import { Icon } from "./Icon";
import { IMG } from "../data/furnitureData";

export function CustomFurnitureModal({ isOpen, onClose, onBookingSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    roomType: "Living Room",
    dimensions: "",
    preferredWood: "Burmese Teak",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please enter your name and phone number.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      onBookingSuccess({
        title: "Bespoke Request Received",
        message: `Thank you ${formData.name}. Our Master Artisan will call you shortly on ${formData.phone}.`,
        type: "success",
      });
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div
        className="custom-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="overlay-close" onClick={onClose} aria-label="Close modal">
          <Icon name="close" size={24} />
        </button>

        <div className="custom-modal-grid">
          <div className="custom-modal-media">
            <img src={IMG.workshop} alt="Bespoke furniture craftsmanship" />
            <div className="custom-modal-media-overlay">
              <span className="eyebrow light">OREA ATELIER</span>
              <h3>Made Exactly For Your Space</h3>
              <p>
                From custom modular sofa lengths to hand-selected teak timber grain and marble slabs.
              </p>
            </div>
          </div>

          <div className="custom-modal-form-wrap">
            <span className="eyebrow">BESPOKE COMMISSIONS</span>
            <h2>Custom Furniture Design</h2>
            <p>Share your vision and architectural specifications with our dedicated bespoke studio.</p>

            {submitted ? (
              <div className="custom-success-state">
                <Icon name="check" size={32} />
                <h3>Submitting Your Commission...</h3>
                <p>Generating your personalized portfolio request.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="custom-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="ananya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Space / Room Type</label>
                    <select
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    >
                      <option value="Living Room">Living Room Sectional</option>
                      <option value="Dining Room">Dining Table & Credenza</option>
                      <option value="Bedroom">Master Bed & Fluted Wardrobe</option>
                      <option value="Study">Executive Study Desk</option>
                      <option value="Full Villa">Full Home Architecture Edit</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Timber / Finish</label>
                    <select
                      value={formData.preferredWood}
                      onChange={(e) => setFormData({ ...formData, preferredWood: e.target.value })}
                    >
                      <option value="Burmese Teak">Burma Teak (Natural Matte)</option>
                      <option value="American Walnut">American Black Walnut</option>
                      <option value="White Oak">French White Oak</option>
                      <option value="Roman Travertine">Travertine & Wood</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Approximate Dimensions</label>
                    <input
                      placeholder="e.g. 10ft x 4ft wall space"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Special Details or Architectural Drawings</label>
                  <textarea
                    rows={3}
                    placeholder="Describe design inspiration, floor layout, fabric texture preference..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <button type="submit" className="button button-dark full">
                  Book Artisan Consultation <Icon name="arrow" size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
