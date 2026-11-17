import { useState } from "react";
import { Icon } from "./Icon";
import { products } from "../data/furnitureData";

export function ProductDetailPage({
  product,
  onAddToCart,
  onBuyNow,
  wish,
  onToggleWish,
  onNavigateHome,
  onSelectProduct,
}) {
  const [selectedAngle, setSelectedAngle] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(
    product.availableMaterials ? product.availableMaterials[0] : "Solid Wood",
  );
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("specifications"); // "specifications" | "care" | "reviews"
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Reviews state
  const [reviewsList, setReviewsList] = useState([
    {
      author: "Vikram Singhania",
      city: "Bengaluru",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "The timber craftsmanship on this piece is breathtaking. The white-glove delivery crew installed it seamlessly in our living room. Truly international luxury standard.",
    },
    {
      author: "Meera Sen",
      city: "Mumbai",
      rating: 5,
      date: "1 month ago",
      comment:
        "Fabric texture is extremely plush and easy to maintain. It matches the serene warm aesthetic of our apartment perfectly. Highly recommend OREA.",
    },
  ]);
  const [newReview, setNewReview] = useState({ name: "", city: "", comment: "", rating: 5 });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) return null;

  const angles = product.angles || [product.image];
  const activeImage = angles[selectedAngle] || product.image;
  const isWish = wish.includes(product.name);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      setPincodeStatus({
        success: true,
        text: `✓ Free White-Glove Delivery available to ${pincode}. Expected arrival within 3–5 business days.`,
      });
    } else {
      setPincodeStatus({
        success: false,
        text: "Please enter a valid 6-digit Indian PIN code (e.g. 560001)",
      });
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    setReviewsList([
      {
        author: newReview.name,
        city: newReview.city || "Verified Buyer",
        rating: Number(newReview.rating),
        date: "Just now",
        comment: newReview.comment,
      },
      ...reviewsList,
    ]);
    setReviewSubmitted(true);
    setNewReview({ name: "", city: "", comment: "", rating: 5 });
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="pdp-page-container">
      {/* Breadcrumb Navigation */}
      <nav className="pdp-breadcrumbs">
        <button onClick={onNavigateHome}>Home</button>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="current">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="pdp-main-grid">
        {/* Gallery Section */}
        <div className="pdp-gallery-col">
          <div className="pdp-thumbnails">
            {angles.map((img, idx) => (
              <button
                key={idx}
                className={`thumb-btn ${selectedAngle === idx ? "active" : ""}`}
                onClick={() => setSelectedAngle(idx)}
                aria-label={`View angle ${idx + 1}`}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>

          <div
            className="pdp-featured-image-wrap"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              className="pdp-hero-image"
              src={activeImage}
              alt={product.name}
            />
            {isZoomed && (
              <div
                className="image-zoom-overlay"
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              />
            )}
            <span className="zoom-hint">Hover to zoom</span>
            <button
              className={`pdp-wish-trigger ${isWish ? "active" : ""}`}
              onClick={() => onToggleWish(product.name)}
              aria-label="Toggle wishlist"
            >
              <Icon name="heart" filled={isWish} size={20} />
            </button>
          </div>
        </div>

        {/* Product Details Column */}
        <div className="pdp-info-col">
          <div className="pdp-meta-top">
            <span className="pdp-badge">{product.tag}</span>
            <span className="pdp-sku">SKU: {product.sku}</span>
          </div>

          <h1 className="pdp-title">{product.name}</h1>

          <div className="pdp-rating-row">
            <div className="stars">★ ★ ★ ★ ★</div>
            <span className="rating-val">{product.rating}</span>
            <span className="review-count">({product.reviewCount} Verified Client Reviews)</span>
            <span className="stock-tag in-stock">● In Stock Ready to Ship</span>
          </div>

          <div className="pdp-price-box">
            <div className="price-main">
              <strong>₹{product.price.toLocaleString("en-IN")}</strong>
              <span className="strike">₹{product.originalPrice.toLocaleString("en-IN")}</span>
              <span className="discount-pill">{discount}% OFF</span>
            </div>
            <small className="tax-inclusive">Inclusive of all taxes & white-glove delivery installation</small>
          </div>

          <p className="pdp-summary">{product.description}</p>

          {/* Color Selection */}
          {product.availableColors && (
            <div className="pdp-option-group">
              <label>
                Selected Finish: <b>{product.availableColors[selectedColorIndex].name}</b>
              </label>
              <div className="pdp-color-swatches">
                {product.availableColors.map((color, idx) => (
                  <button
                    key={color.name}
                    className={`swatch-btn ${selectedColorIndex === idx ? "active" : ""}`}
                    onClick={() => setSelectedColorIndex(idx)}
                    title={color.name}
                  >
                    <span style={{ background: color.hex }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Material Selection */}
          {product.availableMaterials && (
            <div className="pdp-option-group">
              <label>
                Material Grade: <b>{selectedMaterial}</b>
              </label>
              <div className="pdp-material-pills">
                {product.availableMaterials.map((mat) => (
                  <button
                    key={mat}
                    className={`mat-pill ${selectedMaterial === mat ? "active" : ""}`}
                    onClick={() => setSelectedMaterial(mat)}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA Buttons */}
          <div className="pdp-action-area">
            <div className="pdp-qty-selector">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">
                <Icon name="minus" size={15} />
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Increase">
                <Icon name="plus" size={15} />
              </button>
            </div>

            <button
              className="button button-dark pdp-add-cart-btn"
              onClick={() => onAddToCart(product.name, qty)}
            >
              Add to Bag <Icon name="bag" size={16} />
            </button>

            <button
              className="button button-primary pdp-buy-now-btn"
              onClick={() => onBuyNow(product.name, qty)}
            >
              Buy Now
            </button>
          </div>

          {/* WhatsApp Direct Enquiry */}
          <a
            className="pdp-whatsapp-btn"
            href={`https://wa.me/?text=Hello%20OREA%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}%20(SKU%3A%20${product.sku}).%20Please%20share%20fabric%20swatches%20and%20delivery%20timeline.`}
            target="_blank"
            rel="noreferrer"
          >
            <span>Ask a Furniture Specialist on WhatsApp</span>
            <Icon name="arrow" size={15} />
          </a>

          {/* PIN Code Delivery Checker */}
          <div className="pdp-pincode-card">
            <div className="pincode-icon">
              <Icon name="truck" size={20} />
            </div>
            <div className="pincode-body">
              <strong>Check White-Glove Delivery Timeline</strong>
              <form onSubmit={handleCheckPincode} className="pincode-form">
                <input
                  placeholder="Enter 6-digit Indian PIN code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                />
                <button type="submit">Check</button>
              </form>
              {pincodeStatus && (
                <p className={`pincode-status ${pincodeStatus.success ? "success" : "error"}`}>
                  {pincodeStatus.text}
                </p>
              )}
            </div>
          </div>

          {/* Assurances */}
          <div className="pdp-assurances">
            <div>
              <Icon name="check" size={16} />
              <span>10 Years Structural Warranty</span>
            </div>
            <div>
              <Icon name="truck" size={16} />
              <span>Free Assembly & Room Placement</span>
            </div>
            <div>
              <Icon name="user" size={16} />
              <span>Dedicated Design Concierge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Specifications, Care & Maintenance, Reviews */}
      <section className="pdp-tabs-section">
        <div className="pdp-tabs-header">
          <button
            className={activeTab === "specifications" ? "active" : ""}
            onClick={() => setActiveTab("specifications")}
          >
            Specifications & Dimensions
          </button>
          <button
            className={activeTab === "care" ? "active" : ""}
            onClick={() => setActiveTab("care")}
          >
            Care, Assembly & Warranty
          </button>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Client Reviews ({reviewsList.length})
          </button>
        </div>

        <div className="pdp-tabs-content">
          {activeTab === "specifications" && (
            <div className="specifications-tab">
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Dimensions</span>
                  <strong className="spec-value">{product.dimensions}</strong>
                </div>
                {product.specifications &&
                  product.specifications.map((spec) => (
                    <div className="spec-item" key={spec.label}>
                      <span className="spec-label">{spec.label}</span>
                      <strong className="spec-value">{spec.value}</strong>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "care" && (
            <div className="care-tab">
              <div className="care-cards">
                <article>
                  <h4>Timber Maintenance</h4>
                  <p>
                    Wipe clean using a soft microfiber cloth dampened slightly with natural wood
                    nourishing oil. Avoid harsh abrasive cleaners and direct exposure to thermal radiators.
                  </p>
                </article>
                <article>
                  <h4>Upholstery Care</h4>
                  <p>
                    Vacuum fabric cushions weekly with a soft brush attachment. Blot liquid spills immediately
                    using a clean dry cloth. Stain-resistant coatings allow easy spot clean with distilled water.
                  </p>
                </article>
                <article>
                  <h4>White-Glove Assembly</h4>
                  <p>
                    Each piece is brought into your chosen room, unboxed, inspected, leveled, and completely
                    assembled by trained OREA specialists. All packaging materials are recycled responsibly.
                  </p>
                </article>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="reviews-tab">
              <div className="reviews-layout">
                {/* Left: Existing Reviews */}
                <div className="reviews-list">
                  <h3>Client Stories</h3>
                  {reviewsList.map((rev, i) => (
                    <div className="review-card" key={i}>
                      <div className="rev-head">
                        <div>
                          <strong>{rev.author}</strong>
                          <span className="rev-city">· {rev.city} (Verified Client)</span>
                        </div>
                        <span className="rev-date">{rev.date}</span>
                      </div>
                      <div className="stars">{"★".repeat(rev.rating)}</div>
                      <p>{rev.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Right: Submit Review Form */}
                <div className="add-review-card">
                  <h3>Share Your Experience</h3>
                  {reviewSubmitted ? (
                    <div className="review-success">
                      <Icon name="check" size={24} />
                      <p>Thank you for submitting your review. It has been posted to this collection.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleAddReview} className="review-form">
                      <div className="form-group">
                        <label>Your Name *</label>
                        <input
                          required
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          placeholder="e.g. Rahul Kapoor"
                        />
                      </div>
                      <div className="form-group">
                        <label>City *</label>
                        <input
                          required
                          value={newReview.city}
                          onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                          placeholder="e.g. New Delhi"
                        />
                      </div>
                      <div className="form-group">
                        <label>Rating</label>
                        <select
                          value={newReview.rating}
                          onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                        >
                          <option value="5">5 Stars — Flawless</option>
                          <option value="4">4 Stars — Very Satisfied</option>
                          <option value="3">3 Stars — Average</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Your Review *</label>
                        <textarea
                          rows={3}
                          required
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          placeholder="Describe the comfort, woodwork quality, and showroom service..."
                        />
                      </div>
                      <button type="submit" className="button button-dark full">
                        Submit Review
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products: Complete the Room */}
      <section className="pdp-related-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CURATED COMPANIONS</span>
            <h2>Complete the Architectural Space</h2>
          </div>
        </div>
        <div className="pdp-related-grid">
          {related.map((rel) => (
            <article className="plp-card" key={rel.id}>
              <div className="plp-card-media">
                <button
                  className="card-image-wrap"
                  onClick={() => {
                    onSelectProduct(rel);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <img src={rel.image} alt={rel.name} />
                  <b className="quick-view-cue">View Piece</b>
                </button>
              </div>
              <div className="plp-card-content">
                <small>{rel.category}</small>
                <h3
                  onClick={() => {
                    onSelectProduct(rel);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {rel.name}
                </h3>
                <div className="card-pricing">
                  <strong>₹{rel.price.toLocaleString("en-IN")}</strong>
                  <span className="strike">₹{rel.originalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Mobile Sticky Action Bar */}
      <div className="mobile-sticky-action-bar">
        <div className="sticky-price">
          <small>Total Price</small>
          <strong>₹{(product.price * qty).toLocaleString("en-IN")}</strong>
        </div>
        <div className="sticky-buttons">
          <button
            className="button button-dark"
            onClick={() => onAddToCart(product.name, qty)}
          >
            Add to Bag
          </button>
          <button
            className="button button-primary"
            onClick={() => onBuyNow(product.name, qty)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
