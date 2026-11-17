import { useState } from "react";
import { Icon } from "./Icon";
import { IMG } from "../data/furnitureData";

export function ContactPage({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    showroom: "Bengaluru Flagship",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please enter your name and contact phone number.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      onShowToast({
        title: "Showroom Appointment Requested",
        message: `Thank you ${formData.name}. Our concierge will confirm your visit to ${formData.showroom}.`,
        type: "success",
      });
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        showroom: "Bengaluru Flagship",
        date: "",
        message: "",
      });
    }, 1000);
  };

  const showrooms = [
    {
      city: "Bengaluru Flagship Atelier",
      address: "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
      phone: "+91 80 4123 9800",
      hours: "Monday – Sunday: 10:30 AM – 8:30 PM",
      image: IMG.showroom,
    },
    {
      city: "Mumbai Design Studio",
      address: "Laxmi Industrial Estate, New Link Road, Andheri West, Mumbai 400053",
      phone: "+91 22 6789 4400",
      hours: "Tuesday – Sunday: 11:00 AM – 8:00 PM",
      image: IMG.living,
    },
    {
      city: "New Delhi Experience Center",
      address: "The Design District, MG Road, Sultanpur, New Delhi 110030",
      phone: "+91 11 2680 7711",
      hours: "Monday – Sunday: 10:30 AM – 8:00 PM",
      image: IMG.dining,
    },
  ];

  return (
    <div className="contact-page">
      <div className="contact-page-header">
        <span className="eyebrow">GET IN TOUCH</span>
        <h1>We’d Love to Welcome You</h1>
        <p>
          Visit our experiential flagship studios to test proportions, feel natural linen grades,
          and discover tailored furniture guidance with our design concierge.
        </p>
      </div>

      {/* Showroom Cards */}
      <section className="showroom-locations-grid">
        {showrooms.map((s) => (
          <article className="showroom-card" key={s.city}>
            <div className="showroom-card-img">
              <img src={s.image} alt={s.city} />
              <span className="showroom-city-tag">{s.city}</span>
            </div>
            <div className="showroom-card-body">
              <h3>{s.city}</h3>
              <p className="showroom-address">{s.address}</p>
              <div className="showroom-meta">
                <span><b>Phone:</b> {s.phone}</span>
                <span><b>Hours:</b> {s.hours}</span>
              </div>
              <div className="showroom-cta-row">
                <a
                  className="button button-ghost-dark full"
                  href={`https://wa.me/?text=Hello%20OREA%2C%20I%20would%20like%20to%20visit%20your%20${encodeURIComponent(s.city)}.`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp Studio <Icon name="arrow" size={14} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Booking & Enquiry Form */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          <div className="form-info-side">
            <span className="eyebrow">PERSONAL CONCIERGE</span>
            <h2>Book a Private Showroom Consultation</h2>
            <p>
              Schedule a personalized 1-on-1 walkthrough with an interior architect. We’ll have fabric swatches,
              timber blocks, and spatial CAD layouts ready for your home blueprint.
            </p>
            <div className="concierge-perks">
              <div>
                <Icon name="check" size={16} />
                <span>Complimentary 3D room furniture layout planning</span>
              </div>
              <div>
                <Icon name="check" size={16} />
                <span>Exclusive physical fabric & timber swatch kit</span>
              </div>
              <div>
                <Icon name="check" size={16} />
                <span>Direct artisan workshop commission guidance</span>
              </div>
            </div>
          </div>

          <div className="form-input-side">
            {submitted ? (
              <div className="form-success-box">
                <Icon name="check" size={32} />
                <h3>Appointment Requested!</h3>
                <p>Our concierge will verify your booking slot within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="concierge-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      required
                      placeholder="e.g. Priyanshu Dave"
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
                      placeholder="priyanshu@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Select Showroom</label>
                    <select
                      value={formData.showroom}
                      onChange={(e) => setFormData({ ...formData, showroom: e.target.value })}
                    >
                      <option value="Bengaluru Flagship">Bengaluru Flagship (Indiranagar)</option>
                      <option value="Mumbai Studio">Mumbai Design Studio (Andheri West)</option>
                      <option value="New Delhi Experience Center">New Delhi Studio (MG Road)</option>
                      <option value="Virtual Video Consultation">Virtual Video Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Preferred Date & Time</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Space Details & Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us which collections or furniture pieces you are exploring..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="button button-dark full">
                  Confirm Consultation Request <Icon name="arrow" size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
