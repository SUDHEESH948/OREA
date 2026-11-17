import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Categories } from "./Categories";
import { Collections } from "./Collections";
import { Footer } from "./Footer";
import { ProductListingPage } from "./ProductListingPage";
import { ProductDetailPage } from "./ProductDetailPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { AboutPage } from "./AboutPage";
import { ContactPage } from "./ContactPage";
import { CustomFurnitureModal } from "./CustomFurnitureModal";
import { Toast } from "./Toast";
import { products } from "../data/furnitureData";

export default function HomePage() {
  const [currentView, setCurrentView] = useState("home"); // "home" | "shop" | "product" | "cart" | "checkout" | "about" | "contact"
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [wish, setWish] = useState([]);
  const [cart, setCart] = useState([
    { name: "The Aranya Modular Lounge Sofa", qty: 1 },
  ]);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [checkoutTotals, setCheckoutTotals] = useState({
    subtotal: 84900,
    discountAmount: 0,
    deliveryCharge: 0,
    grandTotal: 84900,
  });

  // Observe scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [currentView]);

  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, ...toast }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentView("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleWish = (productName) => {
    setWish((prev) => {
      const exists = prev.includes(productName);
      if (exists) {
        addToast({
          title: "Removed from Wishlist",
          message: productName,
          type: "wishlist",
        });
        return prev.filter((item) => item !== productName);
      } else {
        addToast({
          title: "Added to Wishlist",
          message: `${productName} saved to your curated wishlist.`,
          type: "wishlist",
        });
        return [...prev, productName];
      }
    });
  };

  const handleAddToCart = (productName, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === productName);
      if (existing) {
        return prev.map((item) =>
          item.name === productName ? { ...item, qty: item.qty + quantity } : item,
        );
      }
      return [...prev, { name: productName, qty: quantity }];
    });

    addToast({
      title: "Added to Bag",
      message: `${productName} (x${quantity}) has been added to your shopping bag.`,
      type: "cart",
    });
  };

  const handleBuyNow = (productName, quantity = 1) => {
    handleAddToCart(productName, quantity);
    const prod = products.find((p) => p.name === productName) || { price: 65000 };
    const sub = prod.price * quantity;
    setCheckoutTotals({
      subtotal: sub,
      discountAmount: 0,
      deliveryCharge: 0,
      grandTotal: sub,
    });
    setCurrentView("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateCartQty = (index, newQty) => {
    setCart((prev) =>
      prev.map((item, i) => (i === index ? { ...item, qty: newQty } : item)),
    );
  };

  const handleRemoveFromCart = (index) => {
    const item = cart[index];
    setCart((prev) => prev.filter((_, i) => i !== index));
    if (item) {
      addToast({
        title: "Item Removed",
        message: `${item.name} removed from bag.`,
        type: "info",
      });
    }
  };

  const handleProceedToCheckout = (totals) => {
    setCheckoutTotals(totals);
    setCurrentView("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrderSuccess = (orderId) => {
    setCart([]);
    addToast({
      title: "Commission Placed",
      message: `Order #${orderId} confirmed with White-Glove delivery.`,
      type: "success",
    });
  };

  return (
    <div id="top" className="site-wrapper">
      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Sticky Header with Navigation, Mega Menu, Search and Cart Drawers */}
      <Header
        currentView={currentView}
        selectedCategory={selectedCategory}
        wishCount={wish.length}
        cart={cart}
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectCategory}
        onSelectProduct={handleSelectProduct}
        onOpenCart={() => handleNavigate("cart")}
        onRemoveFromCart={handleRemoveFromCart}
      />

      {/* Main View Router */}
      <main className="main-content">
        {currentView === "home" && (
          <>
            <Hero
              onExplore={() => handleSelectCategory("All")}
              onDiscoverStory={() => handleNavigate("about")}
            />
            <Categories onSelectCategory={handleSelectCategory} />
            <Collections
              wish={wish}
              onToggleWish={handleToggleWish}
              onAddToCart={handleAddToCart}
              onOpenProduct={handleSelectProduct}
              onViewAll={() => handleSelectCategory("All")}
            />
            <Footer
              onSelectCategory={handleSelectCategory}
              onNavigate={handleNavigate}
              onOpenCustomModal={() => setCustomModalOpen(true)}
              onShowToast={addToast}
            />
          </>
        )}

        {currentView === "shop" && (
          <ProductListingPage
            initialCategory={selectedCategory}
            onOpenProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            wish={wish}
            onToggleWish={handleToggleWish}
            onNavigateHome={() => handleNavigate("home")}
          />
        )}

        {currentView === "product" && (
          <ProductDetailPage
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            wish={wish}
            onToggleWish={handleToggleWish}
            onNavigateHome={() => handleNavigate("home")}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === "cart" && (
          <CartPage
            cartItems={cart}
            onUpdateQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveFromCart}
            onProceedToCheckout={handleProceedToCheckout}
            onNavigateShop={() => handleSelectCategory("All")}
          />
        )}

        {currentView === "checkout" && (
          <CheckoutPage
            cartItems={cart}
            totals={checkoutTotals}
            onOrderSuccess={handleOrderSuccess}
            onBackToCart={() => handleNavigate("cart")}
          />
        )}

        {currentView === "about" && (
          <AboutPage
            onNavigateShop={() => handleSelectCategory("All")}
            onOpenCustomModal={() => setCustomModalOpen(true)}
          />
        )}

        {currentView === "contact" && <ContactPage onShowToast={addToast} />}
      </main>

      {/* Custom Bespoke Furniture Commission Modal */}
      <CustomFurnitureModal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
        onBookingSuccess={addToast}
      />
    </div>
  );
}
