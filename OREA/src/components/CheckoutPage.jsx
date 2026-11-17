import { useState } from "react";
import { Icon } from "./Icon";
import { Brand } from "./Brand";

export function CheckoutPage({
  cartItems,
  totals,
  onOrderSuccess,
  onBackToCart,
}) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const [formData, setFormData] = useState({
    firstName: "Aditya",
    lastName: "Verma",
    email: "aditya.verma@example.com",
    phone: "9876543210",
    address: "Penthouse 4B, Prestige Kingfisher Towers, Lavelle Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
    deliveryOption: "white-glove",
    paymentMethod: "card",
    cardNumber: "•••• •••• •••• 4242",
    cardExpiry: "12/28",
    cardCvc: "•••",
    upiId: "aditya@oksbi",
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.address || !formData.pincode) {
      alert("Please complete all shipping address fields.");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = `OREA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
    if (onOrderSuccess) {
      onOrderSuccess(generatedId);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (orderComplete) {
    return (
      <div className="order-confirmation-page">
        <div className="confirmation-card">
          <div className="confirmation-icon">
            <Icon name="check" size={36} />
          </div>
          <span className="eyebrow">ORDER CONFIRMED</span>
          <h1>Thank You for Choosing OREA</h1>
          <p className="order-lead">
            Your architectural furniture commission has been placed successfully. An artisan advisor
            will reach out within 24 hours to coordinate room measurements and delivery transit.
          </p>

          <div className="order-info-pill">
            <div>
              <small>Order Number</small>
              <strong>{orderId}</strong>
            </div>
            <div>
              <small>Estimated White-Glove Delivery</small>
              <strong>3–5 Business Days</strong>
            </div>
            <div>
              <small>Delivery Address</small>
              <strong>{formData.city}, {formData.state} - {formData.pincode}</strong>
            </div>
          </div>

          <div className="confirmation-items">
            <h3>Items in this Order</h3>
            {cartItems.map((item, idx) => (
              <div className="conf-item-row" key={idx}>
                <span>{item.name} (x{item.qty || 1})</span>
                <strong>Confirmed</strong>
              </div>
            ))}
          </div>

          <div className="confirmation-actions">
            <button className="button button-dark" onClick={() => window.location.reload()}>
              Return to Home
            </button>
            <button
              className="button button-ghost-dark"
              onClick={() => window.print()}
            >
              Print Order Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-wrap">
      {/* Checkout Navbar */}
      <div className="checkout-nav">
        <Brand />
        <div className="checkout-steps-indicator">
          <span className={step >= 1 ? "step-active" : ""}>1. Delivery Address</span>
          <span className="step-sep">›</span>
          <span className={step >= 2 ? "step-active" : ""}>2. Payment Method</span>
        </div>
        <button className="checkout-back-btn" onClick={onBackToCart}>
          Back to Bag
        </button>
      </div>

      <div className="checkout-main-grid">
        {/* Left Form Column */}
        <div className="checkout-form-col">
          {step === 1 && (
            <form onSubmit={handleShippingSubmit} className="checkout-step-form">
              <div className="step-title-row">
                <h2>1. Delivery Address & Contact</h2>
                <small>Where shall we place your furniture?</small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number (for White-Glove delivery) *</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Street Address / Apartment & Villa *</label>
                <input
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="form-row three-col">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>PIN Code *</label>
                  <input
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>
              </div>

              <div className="shipping-option-box">
                <h3>Select Delivery Method</h3>
                <label className="radio-card selected">
                  <input
                    type="radio"
                    name="delivery"
                    checked={formData.deliveryOption === "white-glove"}
                    onChange={() => setFormData({ ...formData, deliveryOption: "white-glove" })}
                  />
                  <div>
                    <strong>Complimentary White-Glove Placement & Assembly</strong>
                    <p>Carried into your room of choice, unboxed, assembled, and leveled with packaging removal.</p>
                  </div>
                  <span className="free-tag">Included</span>
                </label>
              </div>

              <button type="submit" className="button button-dark full">
                Continue to Payment <Icon name="arrow" size={16} />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePlaceOrder} className="checkout-step-form">
              <div className="step-title-row">
                <h2>2. Secure Payment</h2>
                <small>Select your preferred payment method</small>
              </div>

              <div className="payment-method-selector">
                <label className={`payment-pill ${formData.paymentMethod === "card" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === "card"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "card" })}
                  />
                  <span>Credit / Debit Card</span>
                </label>
                <label className={`payment-pill ${formData.paymentMethod === "upi" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === "upi"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "upi" })}
                  />
                  <span>Instant UPI / QR</span>
                </label>
                <label className={`payment-pill ${formData.paymentMethod === "cod" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === "cod"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                  />
                  <span>Pay on Delivery</span>
                </label>
              </div>

              {formData.paymentMethod === "card" && (
                <div className="card-fields-box">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Security CVC</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === "upi" && (
                <div className="card-fields-box">
                  <div className="form-group">
                    <label>Virtual Payment Address (UPI ID)</label>
                    <input
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                      placeholder="username@okhdfcbank"
                    />
                  </div>
                  <small className="help-text">You will receive an approval notification in Google Pay, PhonePe or Paytm.</small>
                </div>
              )}

              {formData.paymentMethod === "cod" && (
                <div className="card-fields-box">
                  <p>
                    Pay by Card, UPI, or Cheque upon white-glove inspection at your premises. A nominal
                    booking verification call will take place prior to dispatch.
                  </p>
                </div>
              )}

              <div className="checkout-btn-group">
                <button
                  type="button"
                  className="button button-ghost-dark"
                  onClick={() => setStep(1)}
                >
                  ← Back to Address
                </button>
                <button type="submit" className="button button-dark">
                  Place Furniture Order (₹{totals.grandTotal.toLocaleString("en-IN")})
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Order Summary Sidebar */}
        <div className="checkout-summary-col">
          <div className="checkout-summary-card">
            <h3>Order Summary</h3>
            <div className="checkout-items-preview">
              {cartItems.map((item, i) => (
                <div className="summary-preview-item" key={i}>
                  <div className="item-name-qty">
                    <strong>{item.name}</strong>
                    <span>Quantity: {item.qty || 1}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-line">
              <span>Subtotal</span>
              <span>₹{totals.subtotal.toLocaleString("en-IN")}</span>
            </div>
            {totals.discountAmount > 0 && (
              <div className="summary-line coupon-line">
                <span>Privilege Discount</span>
                <span>-₹{totals.discountAmount.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="summary-line">
              <span>White-Glove Delivery</span>
              <span>FREE</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-line total-line">
              <strong>Grand Total</strong>
              <strong>₹{totals.grandTotal.toLocaleString("en-IN")}</strong>
            </div>

            <div className="security-badges">
              <Icon name="check" size={16} />
              <span>256-Bit SSL Bank Encrypted Transaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
