import { useState } from "react";
import { Icon } from "./Icon";
import { products, IMG } from "../data/furnitureData";

export function CartPage({
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  onNavigateShop,
}) {
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Aggregate items: cartItems is an array of { name, qty } or names
  const aggregatedItems = cartItems.map((item) => {
    const prod = products.find((p) => p.name === item.name) || {
      name: item.name,
      price: 65000,
      originalPrice: 78000,
      image: IMG.sofa,
      category: "Furniture",
      sku: "OREA-GEN-01",
    };
    return {
      ...prod,
      qty: item.qty || 1,
    };
  });

  const subtotal = aggregatedItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const discountAmount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const deliveryCharge = subtotal > 50000 || subtotal === 0 ? 0 : 2500;
  const grandTotal = subtotal - discountAmount + deliveryCharge;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "OREA10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon. Use code 'OREA10' for 10% privilege discount.");
    }
  };

  return (
    <div className="cart-page-wrap">
      <div className="cart-page-header">
        <span className="eyebrow">YOUR SHOPPING EDIT</span>
        <h1>Shopping Bag ({aggregatedItems.length} {aggregatedItems.length === 1 ? "Piece" : "Pieces"})</h1>
      </div>

      {aggregatedItems.length === 0 ? (
        <div className="cart-empty-state">
          <Icon name="bag" size={48} />
          <h2>Your bag is currently empty</h2>
          <p>Explore our curated collections of architectural furniture designed for modern Indian homes.</p>
          <button className="button button-dark" onClick={onNavigateShop}>
            Explore Furniture Catalogue <Icon name="arrow" size={16} />
          </button>
        </div>
      ) : (
        <div className="cart-layout-grid">
          {/* Items List */}
          <div className="cart-items-table">
            <div className="cart-table-head">
              <span>Item Description</span>
              <span>Unit Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span></span>
            </div>

            {aggregatedItems.map((item, idx) => (
              <div className="cart-row" key={`${item.name}-${idx}`}>
                <div className="cart-col-desc">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <small>{item.category}</small>
                    <h3>{item.name}</h3>
                    <span className="cart-item-sku">SKU: {item.sku}</span>
                  </div>
                </div>

                <div className="cart-col-price">
                  <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                  {item.originalPrice > item.price && (
                    <span className="strike">₹{item.originalPrice.toLocaleString("en-IN")}</span>
                  )}
                </div>

                <div className="cart-col-qty">
                  <div className="pdp-qty-selector">
                    <button
                      onClick={() => onUpdateQty(idx, Math.max(1, item.qty - 1))}
                      aria-label="Decrease"
                    >
                      <Icon name="minus" size={13} />
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => onUpdateQty(idx, item.qty + 1)}
                      aria-label="Increase"
                    >
                      <Icon name="plus" size={13} />
                    </button>
                  </div>
                </div>

                <div className="cart-col-total">
                  <strong>₹{(item.price * item.qty).toLocaleString("en-IN")}</strong>
                </div>

                <div className="cart-col-actions">
                  <button
                    onClick={() => onRemoveItem(idx)}
                    aria-label={`Remove ${item.name}`}
                    title="Remove item"
                  >
                    <Icon name="close" size={16} />
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-table-footer">
              <button className="text-link" onClick={onNavigateShop}>
                ← Continue Browsing Collections
              </button>
            </div>
          </div>

          {/* Order Summary & Coupon Card */}
          <div className="cart-summary-col">
            <div className="cart-summary-card">
              <h3>Order Summary</h3>

              <div className="summary-line">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {couponApplied && (
                <div className="summary-line coupon-line">
                  <span>Privilege Discount (10% OREA10)</span>
                  <span className="discount-txt">-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="summary-line">
                <span>White-Glove Delivery & Assembly</span>
                <span>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge.toLocaleString("en-IN")}`}</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-line total-line">
                <strong>Estimated Total</strong>
                <strong>₹{grandTotal.toLocaleString("en-IN")}</strong>
              </div>

              <small className="tax-notice">All Indian taxes (GST) and room installation included.</small>

              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="coupon-form">
                <div className="coupon-input-wrap">
                  <input
                    placeholder="Enter Coupon (e.g. OREA10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                  />
                  <button type="submit" disabled={couponApplied}>
                    {couponApplied ? "Applied ✓" : "Apply"}
                  </button>
                </div>
                {couponError && <p className="coupon-error">{couponError}</p>}
                {!couponApplied && !couponError && (
                  <small className="coupon-tip">Tip: Use promo code <b>OREA10</b> for 10% VIP savings.</small>
                )}
              </form>

              <button
                className="button button-dark full checkout-btn"
                onClick={() => onProceedToCheckout({ subtotal, discountAmount, deliveryCharge, grandTotal })}
              >
                Proceed to Checkout <Icon name="arrow" size={16} />
              </button>

              <div className="cart-perks">
                <div>
                  <Icon name="truck" size={16} />
                  <span>Free White-Glove Placement in 140+ Cities</span>
                </div>
                <div>
                  <Icon name="check" size={16} />
                  <span>10 Years Structural Frame Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
