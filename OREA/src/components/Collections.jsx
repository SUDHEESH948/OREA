import { useState, useMemo } from "react";
import { Icon } from "./Icon";
import { products } from "../data/furnitureData";

export function Collections({
  wish,
  onToggleWish,
  onAddToCart,
  onOpenProduct,
  onViewAll,
}) {
  const [activeTab, setActiveTab] = useState("Best Sellers");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickQty, setQuickQty] = useState(1);

  const displayedProducts = useMemo(() => {
    if (activeTab === "Best Sellers") {
      return products.filter((p) => p.isBestSeller);
    }
    if (activeTab === "New Arrivals") {
      return products.filter((p) => p.isNewArrival);
    }
    if (activeTab === "Trending") {
      return products.filter((p) => p.isTrending);
    }
    if (activeTab === "Living Room") {
      return products.filter((p) => p.category === "Living Room");
    }
    if (activeTab === "Bedroom") {
      return products.filter((p) => p.category === "Bedroom");
    }
    if (activeTab === "Dining") {
      return products.filter((p) => p.category === "Dining Room");
    }
    return products.slice(0, 4);
  }, [activeTab]);

  const bestSellersList = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivalsList = products.filter((p) => p.isNewArrival).slice(0, 4);
  const trendingList = products.filter((p) => p.isTrending).slice(0, 4);

  const handleOpenQuickView = (prod) => {
    setQuickViewProduct(prod);
    setQuickQty(1);
  };

  return (
    <>
      {/* 5. Featured Collections */}
      <section id="collections" className="section product-section reveal">
        <div className="section-heading center">
          <div>
            <span className="eyebrow">CURATED FOR YOUR HOME</span>
            <h2>Furniture, Worth Living With</h2>
          </div>
          <div className="tabs">
            {["Best Sellers", "New Arrivals", "Trending", "Living Room", "Bedroom", "Dining"].map(
              (tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="product-grid">
          {displayedProducts.map((product) => {
            const isWish = wish.includes(product.name);
            const discount = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100,
            );

            return (
              <article className="product-card" key={product.id}>
                <button
                  className={`wish ${isWish ? "active" : ""}`}
                  onClick={() => onToggleWish(product.name)}
                  aria-label="Toggle wishlist"
                >
                  <Icon name="heart" filled={isWish} />
                </button>
                <div
                  className="product-image"
                  onClick={() => onOpenProduct(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onOpenProduct(product);
                  }}
                >
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span>{product.tag}</span>
                  <b
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenQuickView(product);
                    }}
                  >
                    Quick View
                  </b>
                </div>
                <div className="product-info">
                  <div className="info-top-row">
                    <small>{product.category}</small>
                    <span className="stars-mini">★ {product.rating}</span>
                  </div>
                  <h3 onClick={() => onOpenProduct(product)}>{product.name}</h3>
                  <div className="price">
                    <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                    <span className="strike">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                    <span className="discount-pill-mini">{discount}% OFF</span>
                  </div>
                  <button
                    className="product-add-bag"
                    onClick={() => onAddToCart(product.name)}
                  >
                    Add to Bag <Icon name="bag" size={15} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="center-actions">
          <button className="button button-dark" onClick={onViewAll}>
            View All Furniture Collections <Icon name="arrow" size={16} />
          </button>
        </div>
      </section>

      {/* 6. Best Sellers Spotlight */}
      <section className="section spotlight-section reveal">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ICONS OF COMFORT</span>
            <h2>Most Loved Best Sellers</h2>
          </div>
          <button className="text-link" onClick={onViewAll}>
            Browse All Best Sellers <Icon name="arrow" size={15} />
          </button>
        </div>

        <div className="product-grid">
          {bestSellersList.map((product) => {
            const isWish = wish.includes(product.name);
            return (
              <article className="product-card" key={`bs-${product.id}`}>
                <button
                  className={`wish ${isWish ? "active" : ""}`}
                  onClick={() => onToggleWish(product.name)}
                  aria-label="Wishlist"
                >
                  <Icon name="heart" filled={isWish} />
                </button>
                <div
                  className="product-image"
                  onClick={() => onOpenProduct(product)}
                >
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span>Bestseller</span>
                  <b
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenQuickView(product);
                    }}
                  >
                    Quick View
                  </b>
                </div>
                <div className="product-info">
                  <small>{product.category}</small>
                  <h3 onClick={() => onOpenProduct(product)}>{product.name}</h3>
                  <div className="price">
                    <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                    <span className="strike">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <button
                    className="product-add-bag"
                    onClick={() => onAddToCart(product.name)}
                  >
                    Add to Bag <Icon name="bag" size={15} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 7 & 8. New Arrivals & Trending Highlight */}
      <section className="section spotlight-section highlight-bg reveal">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FRESH SILHOUETTES</span>
            <h2>New Arrivals & Trending Designs</h2>
          </div>
          <button className="text-link" onClick={onViewAll}>
            Explore What’s New <Icon name="arrow" size={15} />
          </button>
        </div>

        <div className="product-grid">
          {[...newArrivalsList, ...trendingList].slice(0, 4).map((product) => {
            const isWish = wish.includes(product.name);
            return (
              <article className="product-card" key={`na-${product.id}`}>
                <button
                  className={`wish ${isWish ? "active" : ""}`}
                  onClick={() => onToggleWish(product.name)}
                  aria-label="Wishlist"
                >
                  <Icon name="heart" filled={isWish} />
                </button>
                <div
                  className="product-image"
                  onClick={() => onOpenProduct(product)}
                >
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span>{product.tag}</span>
                  <b
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenQuickView(product);
                    }}
                  >
                    Quick View
                  </b>
                </div>
                <div className="product-info">
                  <small>{product.category}</small>
                  <h3 onClick={() => onOpenProduct(product)}>{product.name}</h3>
                  <div className="price">
                    <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                    <span className="strike">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <button
                    className="product-add-bag"
                    onClick={() => onAddToCart(product.name)}
                  >
                    Add to Bag <Icon name="bag" size={15} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="product-modal" onClick={() => setQuickViewProduct(null)}>
          <div className="pdp-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="overlay-close"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close modal"
            >
              <Icon name="close" size={24} />
            </button>
            <div className="pdp-modal-grid">
              <div className="pdp-modal-img">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
              </div>
              <div className="pdp-modal-details">
                <span className="eyebrow">{quickViewProduct.category}</span>
                <h2>{quickViewProduct.name}</h2>
                <div className="pdp-price">
                  <strong>₹{quickViewProduct.price.toLocaleString("en-IN")}</strong>
                  <span className="strike">
                    ₹{quickViewProduct.originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="pdp-description">{quickViewProduct.description}</p>
                <p className="pdp-material-note">
                  <b>Material:</b> {quickViewProduct.material}
                  <br />
                  <b>Dimensions:</b> {quickViewProduct.dimensions}
                </p>

                <div className="qty-row">
                  <div>
                    <button onClick={() => setQuickQty(Math.max(1, quickQty - 1))}>
                      <Icon name="minus" size={15} />
                    </button>
                    <span>{quickQty}</span>
                    <button onClick={() => setQuickQty(quickQty + 1)}>
                      <Icon name="plus" size={15} />
                    </button>
                  </div>
                  <button
                    className="button button-dark"
                    onClick={() => {
                      onAddToCart(quickViewProduct.name, quickQty);
                      setQuickViewProduct(null);
                    }}
                  >
                    Add to Bag
                  </button>
                </div>

                <button
                  className="text-link"
                  style={{ marginTop: 20 }}
                  onClick={() => {
                    onOpenProduct(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                >
                  View Full Product Page <Icon name="arrow" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
