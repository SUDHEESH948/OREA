import { useState, useRef, useEffect } from "react";
import { Icon } from "./Icon";
import { Brand } from "./Brand";
import { IMG, products } from "../data/furnitureData";

export function Header({
  currentView,
  selectedCategory,
  wishCount,
  cart,
  onNavigate,
  onSelectCategory,
  onSelectProduct,
  onOpenCart,
  onRemoveFromCart,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState("Living Room");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [searchOpen]);

  const searchSuggestions = [
    "Modular Sofas",
    "Solid Teak Dining Sets",
    "Upholstered Beds",
    "Travertine Coffee Tables",
    "Bouclé Swivel Chairs",
    "Executive Desks",
  ];

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.material.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const handleNavClick = (view, category) => {
    setMegaOpen(false);
    setMenuOpen(false);
    if (category) {
      onSelectCategory(category);
    } else {
      onNavigate(view);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navButtons = [
    { label: "Home", isHome: true },
    { label: "Living Room", category: "Living Room" },
    { label: "Bedroom", category: "Bedroom" },
    { label: "Dining Room", category: "Dining Room" },
    { label: "Collections", category: "All" },
  ];

  return (
    <>
      <header className="site-header">
        {/* Main Sticky Navigation Shell */}
        <div className="nav-shell">
          <button
            className="mobile-trigger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open mobile navigation"
          >
            <Icon name="menu" size={20} />
          </button>

          <div
            onClick={() => handleNavClick("home")}
            style={{ cursor: "pointer" }}
          >
            <Brand />
          </div>

          {/* 5 Core Navigation Buttons */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navButtons.map((item) => {
              const isActive = item.isHome
                ? currentView === "home"
                : currentView === "shop" &&
                  (selectedCategory === item.category ||
                    (item.category === "All" && selectedCategory === "All"));

              return (
                <button
                  key={item.label}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onMouseEnter={() => {
                    if (!item.isHome) {
                      setActiveMegaCategory(item.category === "All" ? "Living Room" : item.category);
                      setMegaOpen(true);
                    }
                  }}
                  onFocus={() => {
                    if (!item.isHome) {
                      setActiveMegaCategory(item.category === "All" ? "Living Room" : item.category);
                      setMegaOpen(true);
                    }
                  }}
                  onClick={() => {
                    if (item.isHome) handleNavClick("home");
                    else handleNavClick("shop", item.category);
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="nav-actions">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search furniture catalog"
              title="Search"
            >
              <Icon name="search" size={19} />
            </button>

            <button
              className="hide-mobile"
              aria-label="Wishlist"
              title="Wishlist"
              onClick={() => handleNavClick("shop")}
            >
              <Icon name="heart" size={19} />
              {wishCount > 0 && <b>{wishCount}</b>}
            </button>

            <button
              className="hide-mobile"
              aria-label="Account"
              title="Account"
              onClick={() =>
                alert(
                  "OREA Privilege Client Portal: Logged in as Guest VIP Member",
                )
              }
            >
              <Icon name="user" size={19} />
            </button>

            <button
              onClick={() => {
                if (onOpenCart) onOpenCart();
                else setCartDrawerOpen(true);
              }}
              aria-label="Shopping bag"
              title="Shopping Bag"
            >
              <Icon name="bag" size={19} />
              {cart.length > 0 && <b>{cart.length}</b>}
            </button>
          </div>
        </div>

        {/* Functional Full-Width Mega Menu */}
        <div
          className={`mega-menu ${megaOpen ? "open" : ""}`}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <div className="mega-links-col">
            <div className="mega-col">
              <small>LIVING & LOUNGE</small>
              <button onClick={() => handleNavClick("shop", "Living Room")}>
                Modular Sectionals
              </button>
              <button onClick={() => handleNavClick("shop", "Living Room")}>
                Curved Accent Chairs
              </button>
              <button onClick={() => handleNavClick("shop", "Living Room")}>
                Travertine Coffee Tables
              </button>
              <button onClick={() => handleNavClick("shop", "Living Room")}>
                Fluted TV Consoles
              </button>
            </div>
            <div className="mega-col">
              <small>BEDROOM & SANCTUARY</small>
              <button onClick={() => handleNavClick("shop", "Bedroom")}>
                Upholstered Beds
              </button>
              <button onClick={() => handleNavClick("shop", "Bedroom")}>
                Glass Master Wardrobes
              </button>
              <button onClick={() => handleNavClick("shop", "Bedroom")}>
                Solid Teak Nightstands
              </button>
              <button onClick={() => handleNavClick("shop", "Bedroom")}>
                Linen Dressing Benches
              </button>
            </div>
            <div className="mega-col">
              <small>DINING, ATELIER & STUDIO</small>
              <button onClick={() => handleNavClick("shop", "Dining Room")}>
                Burmese Teak Dining Sets
              </button>
              <button
                onClick={() => handleNavClick("shop", "Office Furniture")}
              >
                Executive Study Desks
              </button>
              <button
                onClick={() => handleNavClick("shop", "Outdoor Furniture")}
              >
                Outdoor Teak Loungers
              </button>
              <button onClick={() => handleNavClick("about")}>
                Our Atelier Story
              </button>
              <button onClick={() => handleNavClick("contact")}>
                Showrooms & Contact
              </button>
            </div>
          </div>

          <div className="mega-feature-card">
            <img
              src={
                activeMegaCategory === "Bedroom"
                  ? IMG.bed
                  : activeMegaCategory === "Dining Room"
                    ? IMG.dining
                    : IMG.living
              }
              alt="Curated furniture edit"
            />
            <div className="mega-feature-overlay">
              <span className="eyebrow light">
                THE {activeMegaCategory.toUpperCase()} EDIT
              </span>
              <h4>Architectural Proportions & Natural Timber</h4>
              <button
                className="text-link"
                onClick={() => handleNavClick("shop", activeMegaCategory)}
              >
                Explore Collection <Icon name="arrow" size={14} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="drawer-head">
          <Brand />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation drawer"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <nav className="mobile-nav-links">
          <button onClick={() => handleNavClick("home")}>Home</button>
          <button onClick={() => handleNavClick("shop", "Living Room")}>
            Living Room
          </button>
          <button onClick={() => handleNavClick("shop", "Bedroom")}>
            Bedroom
          </button>
          <button onClick={() => handleNavClick("shop", "Dining Room")}>
            Dining Room
          </button>
          <button onClick={() => handleNavClick("shop", "Office Furniture")}>
            Office Furniture
          </button>
          <button onClick={() => handleNavClick("shop", "Outdoor Furniture")}>
            Outdoor Furniture
          </button>
          <button onClick={() => handleNavClick("shop", "All")}>
            All Collections
          </button>
          <button onClick={() => handleNavClick("about")}>About OREA</button>
          <button onClick={() => handleNavClick("contact")}>
            Contact & Showrooms
          </button>
        </nav>
        <div className="mobile-drawer-footer">
          <p>Handcrafted for timeless living in beautiful Indian homes.</p>
          <a
            href="https://www.instagram.com/orea.india/"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="instagram" size={16} /> @orea.india
          </a>
        </div>
      </div>

      {/* Live Search Panel Overlay */}
      <div className={`search-panel ${searchOpen ? "open" : ""}`}>
        <button
          className="overlay-close"
          onClick={() => setSearchOpen(false)}
          aria-label="Close search"
        >
          <Icon name="close" size={26} />
        </button>

        <div className="search-panel-box">
          <span className="eyebrow">EXPLORE OREA CATALOGUE</span>
          <div className="search-input-field">
            <input
              ref={searchInputRef}
              placeholder="Search sofas, teak dining, beds, study desks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Icon name="search" size={24} />
          </div>

          {/* Quick Suggestions */}
          {!searchQuery && (
            <div className="search-suggestions-row">
              <span>Popular Searches:</span>
              <div className="suggestion-chips">
                {searchSuggestions.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results Preview */}
          {searchResults.length > 0 && (
            <div className="search-results-preview-grid">
              {searchResults.slice(0, 6).map((prod) => (
                <div
                  className="search-result-card"
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    setSearchOpen(false);
                  }}
                >
                  <img src={prod.image} alt={prod.name} />
                  <div>
                    <small>{prod.category}</small>
                    <h4>{prod.name}</h4>
                    <strong>₹{prod.price.toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Shopping Bag Drawer (Slide-out) */}
      <div
        className={`drawer-overlay ${cartDrawerOpen ? "open" : ""}`}
        onClick={() => setCartDrawerOpen(false)}
      />
      <aside className={`cart-drawer ${cartDrawerOpen ? "open" : ""}`}>
        <div className="drawer-head">
          <h2>
            Shopping Bag <span>{cart.length}</span>
          </h2>
          <button
            onClick={() => setCartDrawerOpen(false)}
            aria-label="Close cart"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-bag">
            <Icon name="bag" size={44} />
            <h3>Your bag is currently empty</h3>
            <p>
              Discover thoughtfully designed architectural furniture for your
              home.
            </p>
            <button
              className="button button-dark"
              onClick={() => {
                setCartDrawerOpen(false);
                handleNavClick("shop", "All");
              }}
            >
              Explore Furniture Catalogue
            </button>
          </div>
        ) : (
          <div className="cart-content">
            {cart.map((item, idx) => {
              const prod = products.find((p) => p.name === item.name) || {
                name: item.name,
                image: IMG.sofa,
                price: 65000,
              };
              return (
                <div className="cart-item" key={`${item.name}-${idx}`}>
                  <img src={prod.image} alt={item.name} />
                  <div>
                    <small>OREA INDIA</small>
                    <h3>{item.name}</h3>
                    <strong>₹{prod.price.toLocaleString("en-IN")}</strong>
                    <button
                      onClick={() => onRemoveFromCart(idx)}
                      className="cart-remove-link"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="cart-note">
              <Icon name="truck" size={18} />
              <span>Complimentary White-Glove Delivery & Installation.</span>
            </div>

            <div className="drawer-cart-buttons">
              <button
                className="button button-dark full"
                onClick={() => {
                  setCartDrawerOpen(false);
                  handleNavClick("cart");
                }}
              >
                View Full Bag & Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
