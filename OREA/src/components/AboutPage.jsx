import { Icon } from "./Icon";
import { IMG } from "../data/furnitureData";

export function AboutPage({ onNavigateShop, onOpenCustomModal }) {
  return (
    <div className="about-page">
      {/* Editorial Hero */}
      <section className="about-hero">
        <img src={IMG.workshop} alt="Master woodcrafters at OREA workshop" />
        <div className="about-hero-shade" />
        <div className="about-hero-content">
          <span className="eyebrow light">OUR HERITAGE & ATELIER</span>
          <h1>
            Furniture Rooted in Craft,
            <br />
            Designed for Modern Living.
          </h1>
          <p>
            At OREA, we believe furniture should feel as good as it looks. Every silhouette is
            an architectural dialogue between timeless joinery, honest natural materials, and
            contemporary Indian homes.
          </p>
        </div>
      </section>

      {/* Craftsmanship Pillars */}
      <section className="about-story-section section">
        <div className="about-story-grid">
          <div className="story-media">
            <img src={IMG.craft} alt="Artisan hand finishing timber" />
          </div>
          <div className="story-text">
            <span className="eyebrow">THE OREA PHILOSOPHY</span>
            <h2>Materials That Age With Grace</h2>
            <p>
              We reject mass-manufactured disposability. Every dining table, modular sofa, and
              curved armchair is crafted from sustainably harvested teak and seasoned hardwoods,
              selected for their character, density, and natural oil content.
            </p>
            <p>
              Our hand-applied natural oil finishes protect the wood while preserving its warmth and
              tactile grain, ensuring that each piece grows richer and more beautiful with every decade of family life.
            </p>
            <div className="about-stats-row">
              <div>
                <strong>100%</strong>
                <small>Seasoned Kiln-Dried Hardwood</small>
              </div>
              <div>
                <strong>10 Yrs</strong>
                <small>Structural Guarantee</small>
              </div>
              <div>
                <strong>140+</strong>
                <small>Indian Cities Delivered</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Atelier Values */}
      <section className="atelier-values-section section">
        <div className="section-heading center">
          <div>
            <span className="eyebrow">OUR COMMITMENT</span>
            <h2>Architectural Principles</h2>
          </div>
        </div>
        <div className="feature-grid">
          <article>
            <span>01</span>
            <h3>Bespoke Engineering</h3>
            <p>Every joint is joined with mortise-and-tenon or dowel craftsmanship for structural integrity that outlives trends.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Tactile Comfort</h3>
            <p>Multi-density high-resilience foam and organic linens are balanced for deep, supportive everyday relaxation.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Custom Dimensions</h3>
            <p>We tailor sofa lengths, timber stains, and fabric rub counts to harmonize with your specific floor layout.</p>
          </article>
          <article>
            <span>04</span>
            <h3>White-Glove Care</h3>
            <p>From our atelier workshop straight to your room, handled exclusively by our trained furniture specialists.</p>
          </article>
        </div>
      </section>

      {/* CTA Box */}
      <section className="about-cta-banner">
        <div className="about-cta-content">
          <span className="eyebrow light">EXPERIENCE THE ATELIER</span>
          <h2>Ready to Furnish Your Sanctuary?</h2>
          <p>Explore our current collections or commission a one-of-a-kind bespoke design with our master artisans.</p>
          <div className="button-row">
            <button className="button button-light" onClick={onNavigateShop}>
              Explore All Collections <Icon name="arrow" size={16} />
            </button>
            <button className="button button-ghost" onClick={onOpenCustomModal}>
              Commission Custom Piece
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
