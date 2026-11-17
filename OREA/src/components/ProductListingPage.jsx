import { useState, useMemo } from "react";
import { Icon } from "./Icon";
import { products, categories } from "../data/furnitureData";

export function ProductListingPage({
  initialCategory,
  onOpenProduct,
  onAddToCart,
  wish,
  onToggleWish,
  onNavigateHome,
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [availabilityOnly, setAvailabilityOnly] = useState(false);
  const [priceRange, setPriceRange] = useState(160000);
  const [sortBy, setSortBy] = useState("popularity");
  const [searchFilter, setSearchFilter] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available filter options
  const materials = ["All", "Solid Teak", "Solid Oak", "Solid Walnut", "Bouclé", "Linen", "Italian Leather", "Travertine"];
  const colors = ["All", "Oatmeal Beige", "Warm Beige", "Ivory White", "Warm Walnut", "Charcoal Slate"];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "All") {
          const matchCat =
            p.category.toLowerCase() === selectedCategory.toLowerCase() ||
            p.type.toLowerCase().includes(selectedCategory.toLowerCase());
          if (!matchCat) return false;
        }
        // Material filter
        if (selectedMaterial !== "All") {
          if (!p.material.toLowerCase().includes(selectedMaterial.toLowerCase())) return false;
        }
        // Color filter
        if (selectedColor !== "All") {
          if (!p.color.toLowerCase().includes(selectedColor.toLowerCase())) return false;
        }
        // Availability
        if (availabilityOnly && !p.inStock) {
          return false;
        }
        // Price filter
        if (p.price > priceRange) {
          return false;
        }
        // Text Search filter
        if (searchFilter.trim()) {
          const q = searchFilter.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.material.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q);
          if (!matches) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        // default popularity
        return b.reviewCount - a.reviewCount;
      });
  }, [selectedCategory, selectedMaterial, selectedColor, availabilityOnly, priceRange, sortBy, searchFilter]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedMaterial("All");
    setSelectedColor("All");
    setAvailabilityOnly(false);
    setPriceRange(160000);
    setSearchFilter("");
    setSortBy("popularity");
  };

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedMaterial !== "All" ? 1 : 0) +
    (selectedColor !== "All" ? 1 : 0) +
    (availabilityOnly ? 1 : 0) +
    (priceRange < 160000 ? 1 : 0) +
    (searchFilter ? 1 : 0);

  return (
    <div className="plp-page">
      {/* Breadcrumb & Header */}
      <div className="plp-header">
        <div className="plp-breadcrumbs">
          <button onClick={onNavigateHome}>Home</button>
          <span>/</span>
          <span>Furniture Catalogue</span>
          {selectedCategory !== "All" && (
            <>
              <span>/</span>
              <span className="current">{selectedCategory}</span>
            </>
          )}
        </div>
        <div className="plp-title-row">
          <div>
            <span className="eyebrow">THE ARCHITECTURAL EDIT</span>
            <h1>
              {selectedCategory === "All"
                ? "All Furniture Collections"
                : `${selectedCategory} Collection`}
            </h1>
            <p>
              Handcrafted in solid seasoned timbers, curated Italian upholstery, and sculptural
              contours designed for enduring Indian homes.
            </p>
          </div>
          <div className="plp-results-meta">
            <span>Showing <b>{filteredProducts.length}</b> handcrafted pieces</span>
          </div>
        </div>
      </div>

      {/* Control Bar: View switch, Sort, Mobile filter button, Search */}
      <div className="plp-controls-bar">
        <div className="plp-search-box">
          <Icon name="search" size={16} />
          <input
            placeholder="Search timber, chairs, sofas..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          {searchFilter && (
            <button onClick={() => setSearchFilter("")} aria-label="Clear search">
              <Icon name="close" size={12} />
            </button>
          )}
        </div>

        <div className="plp-controls-right">
          <button
            className="mobile-filter-trigger"
            onClick={() => setMobileFilterOpen(true)}
          >
            <Icon name="menu" size={15} />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          <div className="plp-sort-wrap">
            <label htmlFor="plp-sort">Sort By:</label>
            <select
              id="plp-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Most Popular</option>
              <option value="newest">New Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="plp-view-switch">
            <button
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
              title="Grid View"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="1" width="6" height="6" rx="1" />
                <rect x="9" y="1" width="6" height="6" rx="1" />
                <rect x="1" y="9" width="6" height="6" rx="1" />
                <rect x="9" y="9" width="6" height="6" rx="1" />
              </svg>
            </button>
            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
              aria-label="List View"
              title="List View"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="2" width="14" height="3" rx="0.5" />
                <rect x="1" y="7" width="14" height="3" rx="0.5" />
                <rect x="1" y="12" width="14" height="3" rx="0.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="plp-layout">
        {/* Filter Sidebar (Desktop) */}
        <aside className={`plp-sidebar ${mobileFilterOpen ? "mobile-open" : ""}`}>
          <div className="sidebar-head">
            <h3>Filter Collection</h3>
            {activeFiltersCount > 0 && (
              <button className="reset-btn" onClick={resetFilters}>
                Clear All ({activeFiltersCount})
              </button>
            )}
            <button
              className="close-sidebar-mobile"
              onClick={() => setMobileFilterOpen(false)}
              aria-label="Close filters"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h4>Categories</h4>
            <div className="filter-options">
              <label className={selectedCategory === "All" ? "selected" : ""}>
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === "All"}
                  onChange={() => setSelectedCategory("All")}
                />
                <span>All Collections</span>
                <small>{products.length}</small>
              </label>
              {categories.slice(0, 6).map((cat) => (
                <label
                  key={cat.id}
                  className={selectedCategory === cat.name ? "selected" : ""}
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat.name}
                    onChange={() => setSelectedCategory(cat.name)}
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <h4>Max Price: ₹{priceRange.toLocaleString("en-IN")}</h4>
            <input
              type="range"
              min="25000"
              max="160000"
              step="5000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="price-slider"
            />
            <div className="price-labels">
              <span>₹25,000</span>
              <span>₹1,60,000+</span>
            </div>
          </div>

          {/* Material Filter */}
          <div className="filter-group">
            <h4>Primary Material</h4>
            <div className="tag-filter-options">
              {materials.map((mat) => (
                <button
                  key={mat}
                  className={`tag-btn ${selectedMaterial === mat ? "active" : ""}`}
                  onClick={() => setSelectedMaterial(mat)}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Colour Filter */}
          <div className="filter-group">
            <h4>Colour Palette</h4>
            <div className="color-filter-options">
              {colors.map((c) => (
                <button
                  key={c}
                  className={`color-filter-btn ${selectedColor === c ? "active" : ""}`}
                  onClick={() => setSelectedColor(c)}
                >
                  <span
                    className="color-dot"
                    style={{
                      background:
                        c === "Oatmeal Beige"
                          ? "#E3DAC9"
                          : c === "Warm Beige"
                          ? "#E8DCCB"
                          : c === "Ivory White"
                          ? "#FAF8F5"
                          : c === "Warm Walnut"
                          ? "#6E523E"
                          : c === "Charcoal Slate"
                          ? "#424244"
                          : "#CCCCCC",
                    }}
                  />
                  <span>{c}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="filter-group">
            <h4>Stock Availability</h4>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={availabilityOnly}
                onChange={(e) => setAvailabilityOnly(e.target.checked)}
              />
              <span>In-Stock Ready to Ship</span>
            </label>
          </div>

          <div className="sidebar-footer-mobile">
            <button
              className="button button-dark full"
              onClick={() => setMobileFilterOpen(false)}
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        </aside>

        {/* Product Catalog Grid / List */}
        <div className="plp-main">
          {filteredProducts.length === 0 ? (
            <div className="plp-empty">
              <Icon name="search" size={42} />
              <h3>No matching furniture found</h3>
              <p>Try resetting some filters or searching for another piece of furniture.</p>
              <button className="button button-dark" onClick={resetFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "plp-grid" : "plp-list"}>
              {filteredProducts.map((product) => {
                const isWish = wish.includes(product.name);
                const discount = Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100,
                );

                return (
                  <article className="plp-card" key={product.id}>
                    <div className="plp-card-media">
                      <button
                        className={`wish ${isWish ? "active" : ""}`}
                        onClick={() => onToggleWish(product.name)}
                        aria-label="Wishlist"
                      >
                        <Icon name="heart" filled={isWish} />
                      </button>

                      <span className="card-badge">{product.tag}</span>

                      <button
                        className="card-image-wrap"
                        onClick={() => onOpenProduct(product)}
                      >
                        <img
                          className="main-img"
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                        />
                        {product.secondaryImage && (
                          <img
                            className="hover-img"
                            src={product.secondaryImage}
                            alt=""
                            loading="lazy"
                          />
                        )}
                        <b className="quick-view-cue">Quick View</b>
                      </button>
                    </div>

                    <div className="plp-card-content">
                      <div className="plp-card-category-rating">
                        <small>{product.category}</small>
                        <div className="rating-tag">
                          <span>★ {product.rating}</span>
                          <span className="review-num">({product.reviewCount})</span>
                        </div>
                      </div>

                      <h3 onClick={() => onOpenProduct(product)}>{product.name}</h3>

                      <p className="card-materials">{product.material}</p>

                      <div className="card-pricing">
                        <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                        <span className="strike">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="discount-chip">{discount}% OFF</span>
                      </div>

                      <div className="card-action-btns">
                        <button
                          className="card-add-btn"
                          onClick={() => onAddToCart(product.name)}
                        >
                          Add to Bag <Icon name="bag" size={15} />
                        </button>
                        <button
                          className="card-view-btn"
                          onClick={() => onOpenProduct(product)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
