import { useState } from "react";
import { Icon } from "./Icon";
import { Brand } from "./Brand";
import { IMG, videos } from "../data/furnitureData";

export function Footer({
  onSelectCategory,
  onNavigate,
  onOpenCustomModal,
  onShowToast,
}) {
  const [testimonial, setTestimonial] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const testimonialsList = [
    {
      quote:
        "The Aranya sectional transformed our Bengaluru penthouse. The depth of the cushioning and the tactile warmth of the bouclé are incomparable. The white-glove team assembled it without a trace of dust.",
      author: "Aditi & Rajiv Singhal",
      city: "Indiranagar, Bengaluru",
      product: "The Aranya Modular Lounge Sofa",
      rating: 5,
    },
    {
      quote:
        "We commissioned a custom 8-seater Burmese teak dining table through the OREA Atelier. The grain matching and bullnose edge finishing reflect world-class joinery. It has become the heart of our family gatherings.",
      author: "Dr. K. Narayanan",
      city: "Bandra West, Mumbai",
      product: "Bespoke Burmese Teak Dining Commission",
      rating: 5,
    },
    {
      quote:
        "Finding honest solid wood furniture with contemporary, minimalist proportions in India used to be nearly impossible. OREA delivers European luxury aesthetic with authentic Indian craftsmanship.",
      author: "Siddharth Oberoi",
      city: "Golf Links, New Delhi",
      product: "Aira Sanctuary Bed & Veda Media Console",
      rating: 5,
    },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setNewsletterSuccess(true);
    if (onShowToast) {
      onShowToast({
        title: "Subscribed to The OREA Letter",
        message: "Thank you for joining our private circle. Enjoy exclusive previews and design stories.",
        type: "success",
      });
    }
    setNewsletterEmail("");
  };

  return (
    <>
      {/* 9. Premium Craftsmanship Story */}
      <section id="about" className="story reveal">
        <div className="story-image">
          <img src={IMG.workshop} alt="Master furniture artisan shaping solid Burmese teak" />
          <span>Crafted by human hands.</span>
        </div>
        <div className="story-copy">
          <span className="eyebrow">THE OREA ATELIER</span>
          <h2>
            More Than Furniture.
            <br />
            It’s About the Way You Live.
          </h2>
          <p>
            At OREA, we believe furniture should feel as good as it looks. Every piece is
            conceived as an architectural dialogue between sustainably harvested kiln-dried timber,
            time-honored mortise-and-tenon joinery, and tactile natural textiles.
          </p>
          <div className="story-points">
            <span>
              <Icon name="check" size={17} /> Certified FSC Seasoned Hardwoods
            </span>
            <span>
              <Icon name="check" size={17} /> Multi-Density Ergonomic Foam
            </span>
            <span>
              <Icon name="check" size={17} /> Non-Toxic Eco Polyurethane & Oils
            </span>
            <span>
              <Icon name="check" size={17} /> Personalized White-Glove Installation
            </span>
          </div>
          <button className="text-link" onClick={() => onNavigate("about")}>
            Discover Our Atelier Story <Icon name="arrow" size={16} />
          </button>
        </div>
      </section>

      {/* 10. Custom Furniture Showcase */}
      <section className="section custom-showcase-section reveal">
        <div className="custom-showcase-card">
          <div className="custom-copy">
            <span className="eyebrow light">BESPOKE ARCHITECTURAL SERVICE</span>
            <h2>
              Tailored Exactly
              <br />
              to Your Floor Plan.
            </h2>
            <p>
              Looking for a 12-foot modular sectional, a specific Italian leather hue, or a custom
              Calacatta marble dining slab? Our master atelier collaborates directly with architects,
              designers, and homeowners to engineer bespoke commissions.
            </p>
            <div className="custom-cta-row">
              <button
                className="button button-light"
                onClick={onOpenCustomModal}
              >
                Commission Bespoke Piece <Icon name="arrow" size={16} />
              </button>
              <a
                className="button button-ghost"
                href="https://wa.me/?text=Hello%20OREA%2C%20I%20would%20like%20to%20discuss%20a%20custom%20furniture%20commission."
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Atelier Lead
              </a>
            </div>
          </div>
          <div className="custom-media">
            <img src={IMG.craft} alt="Artisan tailoring custom furniture upholstery" />
          </div>
        </div>
      </section>

      {/* Showroom Experience */}
      <section id="showroom" className="section showroom reveal">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPERIENTIAL STUDIOS</span>
            <h2>
              Experience the Furniture
              <br />
              Before You Bring It Home.
            </h2>
          </div>
          <p>
            Feel the density of our cushions. See the grain of seasoned Burmese teak in natural sunlight.
            Our flagship studios in Bengaluru, Mumbai, and New Delhi welcome you.
          </p>
        </div>
        <div className="showroom-grid">
          <div className="showroom-main">
            <img src={IMG.showroom} alt="Flagship furniture showroom space" />
            <span>FLAGSHIP LIVING ATELIER</span>
          </div>
          <div>
            <img src={IMG.dining} alt="Dining furniture collection display" />
            <span>DINING SUITES</span>
          </div>
          <div>
            <img src={IMG.bed} alt="Bedroom sanctuary display" />
            <span>BEDROOM EDIT</span>
          </div>
        </div>
        <div className="center-actions">
          <button className="button button-dark" onClick={() => onNavigate("contact")}>
            Explore Our Showrooms & Studios <Icon name="arrow" size={17} />
          </button>
        </div>
      </section>

      {/* Behind the Scenes / Real Furniture Stories */}
      <section id="journal" className="journal section reveal">
        <div className="section-heading">
          <div>
            <span className="eyebrow light">BEHIND THE SCENES</span>
            <h2>Real Furniture Stories</h2>
          </div>
          <p>
            From careful hand finishing to architectural walkthroughs, witness the craftsmanship
            behind each OREA creation.
          </p>
        </div>
        <div className="video-grid">
          {videos.map(([title, image, type], index) => (
            <button
              className={`video-card ${index === 0 ? "video-large" : ""}`}
              key={title}
              onClick={() => window.open("https://www.instagram.com/orea.india/", "_blank")}
            >
              <img src={image} alt={title} />
              <span className="play">
                <Icon name="play" filled />
              </span>
              <div>
                <small>{type}</small>
                <h3>{title}</h3>
              </div>
            </button>
          ))}
        </div>
        <div className="center-actions">
          <a
            className="button button-light"
            href="https://www.instagram.com/orea.india/"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="instagram" size={18} /> Follow @orea.india on Instagram
          </a>
        </div>
      </section>

      {/* 11. Why Choose Us */}
      <section className="section why reveal">
        <div className="section-heading center">
          <div>
            <span className="eyebrow">THE OREA PROMISE</span>
            <h2>Comfort, With Uncompromising Confidence</h2>
          </div>
        </div>
        <div className="feature-grid">
          <article>
            <span>01</span>
            <h3>Master Joinery</h3>
            <p>Constructed with traditional mortise-and-tenon craftsmanship and kiln-dried solid timber frames.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Architectural Designs</h3>
            <p>Clean, serene silhouettes inspired by modern Indian architecture and international luxury.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Dedicated Concierge</h3>
            <p>Personalized spatial planning and fabric swatches delivered to your home prior to ordering.</p>
          </article>
          <article>
            <span>04</span>
            <h3>White-Glove Delivery</h3>
            <p>Professional room placement, assembly, leveling, and packaging removal across 140+ cities.</p>
          </article>
        </div>
      </section>

      {/* 12. Customer Testimonials */}
      <section className="testimonial reveal">
        <div className="testimonial-title">
          <span className="eyebrow">CLIENT REVIEWS</span>
          <h2>Homes Made More Beautiful</h2>
          <p>Verified stories and photographs from clients across India who welcomed OREA into their spaces.</p>
        </div>
        <div className="testimonial-card">
          <span className="quote">“</span>
          <div className="stars">
            {"★".repeat(testimonialsList[testimonial].rating)}
          </div>
          <blockquote>"{testimonialsList[testimonial].quote}"</blockquote>
          <div className="customer">
            <span>—</span>
            <div>
              <strong>{testimonialsList[testimonial].author}</strong>
              <small>
                {testimonialsList[testimonial].city} · {testimonialsList[testimonial].product}
              </small>
            </div>
          </div>
          <div className="slider-buttons">
            <button
              onClick={() =>
                setTestimonial((prev) =>
                  prev === 0 ? testimonialsList.length - 1 : prev - 1,
                )
              }
              aria-label="Previous story"
            >
              ←
            </button>
            <span>
              {testimonial + 1} / {testimonialsList.length}
            </span>
            <button
              onClick={() =>
                setTestimonial((prev) =>
                  prev === testimonialsList.length - 1 ? 0 : prev + 1,
                )
              }
              aria-label="Next story"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* 13. Instagram Gallery */}
      <section className="instagram section reveal">
        <div className="section-heading center">
          <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <Icon name="instagram" size={23} />
            </div>
            <span className="eyebrow">@OREA.INDIA</span>
            <h2>Get Inspired. Live Beautifully.</h2>
          </div>
        </div>
        <div className="insta-grid">
          {[IMG.living, IMG.sofa, IMG.dining, IMG.bed, IMG.room].map((image, i) => (
            <a
              href="https://www.instagram.com/orea.india/"
              target="_blank"
              rel="noreferrer"
              key={image}
              aria-label={`View OREA Instagram post ${i + 1}`}
            >
              <img src={image} alt={`OREA furniture inspiration ${i + 1}`} loading="lazy" />
              <span>
                <Icon name="instagram" size={24} />
              </span>
            </a>
          ))}
        </div>
        <div className="center-actions">
          <a
            className="text-link"
            href="https://www.instagram.com/orea.india/"
            target="_blank"
            rel="noreferrer"
          >
            Follow OREA on Instagram <Icon name="arrow" size={16} />
          </a>
        </div>
      </section>

      {/* Contact Banner */}
      <section id="contact" className="contact reveal">
        <img src={IMG.warmRoom} alt="Inviting living room furniture setting" />
        <div className="contact-shade" />
        <div>
          <span className="eyebrow light">WE’D LOVE TO WELCOME YOU</span>
          <h2>
            Let’s Find the Perfect Furniture
            <br />
            for Your Home.
          </h2>
          <p>
            Connect with our team for spatial guidance, fabric swatch boxes, and showroom consultations.
          </p>
          <div className="button-row">
            <button className="button button-light" onClick={() => onNavigate("contact")}>
              Contact Concierge
            </button>
            <a
              className="button button-ghost"
              href="https://wa.me/?text=Hello%20OREA%2C%20I%20would%20like%20to%20enquire%20about%20your%20furniture%20collection."
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Enquiry
            </a>
            <button className="button button-ghost" onClick={() => onNavigate("contact")}>
              Visit Flagship Showroom
            </button>
          </div>
        </div>
      </section>

      {/* 14. Newsletter & 15. Complete Footer */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <Brand light />
            <p>
              Contemporary architectural furniture for homes that value comfort, craft, and
              considered proportion.
            </p>
            <div className="socials">
              <a
                href="https://www.instagram.com/orea.india/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Icon name="instagram" />
              </a>
              <a href="#" aria-label="Facebook">
                f
              </a>
              <a href="#" aria-label="YouTube">
                ▶
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Shop</h4>
            <button onClick={() => onSelectCategory("Living Room")}>Living Room</button>
            <button onClick={() => onSelectCategory("Bedroom")}>Bedroom</button>
            <button onClick={() => onSelectCategory("Dining Room")}>Dining Room</button>
            <button onClick={() => onSelectCategory("Office Furniture")}>Office Furniture</button>
            <button onClick={() => onSelectCategory("Outdoor Furniture")}>Outdoor Furniture</button>
            <button onClick={() => onSelectCategory("All")}>All Collections</button>
          </div>

          <div className="footer-links">
            <h4>OREA</h4>
            <button onClick={() => onNavigate("about")}>Our Atelier Story</button>
            <button onClick={() => onNavigate("contact")}>Showrooms</button>
            <button onClick={onOpenCustomModal}>Bespoke Commissions</button>
            <button onClick={() => onNavigate("contact")}>Private Consultation</button>
          </div>

          <div className="footer-links">
            <h4>Client Care</h4>
            <button onClick={() => onNavigate("contact")}>White-Glove Delivery</button>
            <button onClick={() => onNavigate("about")}>Warranty & Care Guide</button>
            <button onClick={() => onNavigate("contact")}>Returns Policy</button>
            <button onClick={() => onNavigate("contact")}>Privacy & Terms</button>
          </div>

          <div className="newsletter">
            <span className="eyebrow light">THE OREA LETTER</span>
            <h3>
              Beautiful ideas,
              <br />
              delivered occasionally.
            </h3>
            {newsletterSuccess ? (
              <p className="newsletter-success">✓ You are subscribed to our private circular.</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit}>
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    aria-label="Email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button type="submit" aria-label="Subscribe">
                    <Icon name="arrow" />
                  </button>
                </div>
              </form>
            )}
            <small>By subscribing, you agree to our privacy policy. No spam, ever.</small>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} OREA INDIA ATELIER. All rights reserved.</span>
          <span>Architectural Furniture for Beautiful Living.</span>
        </div>
      </footer>
    </>
  );
}
