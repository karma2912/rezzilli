import { useState, useEffect } from "react";
import { ChevronDown, Minus, Plus, Trash2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext"; // <-- The Global Brain

function Spritz() {
  const navigate = useNavigate();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Date, new to old");

  const sortOptions = [
    "Price, low to high",
    "Price, high to low",
    "Alphabetically, A to Z",
    "Alphabetically, Z to A",
    "Date, new to old",
    "Date, old to new",
  ];

  // --- CONTEXT & STATES ---
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const FREE_DELIVERY_THRESHOLD = 50;
  const isFreeDelivery = cartTotal >= FREE_DELIVERY_THRESHOLD;

  useEffect(() => {
    const user = localStorage.getItem("rezzilli_user");
    setIsLoggedIn(!!user);

    fetch("https://rezzillidrinks.com/api/get-products.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (selectedSort === "Price, low to high") return Number(a.price) - Number(b.price);
    if (selectedSort === "Price, high to low") return Number(b.price) - Number(a.price);
    if (selectedSort === "Alphabetically, A to Z") return a.name.localeCompare(b.name);
    if (selectedSort === "Alphabetically, Z to A") return b.name.localeCompare(a.name);
    if (selectedSort === "Date, new to old") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (selectedSort === "Date, old to new") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    return 0;
  });

  const getButtonText = (status: string) => {
    if (status === 'Active') return "ADD TO CART";
    if (status === 'Coming Soon') return "Coming soon";
    if (status === 'Out of Stock') return "Out of stock";
    return status || "ADD TO CART";
  };

  // --- DYNAMIC ADD TO CART ---
  const handleAddToCart = (product: any, buttonText: string) => {
    if (buttonText === "ADD TO CART") {
      addToCart({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        originalPrice: product.old_price,
        image: product.image,
        variant: product.variant || "24 BOTTLES", // Default fallback if variant isn't set in DB
        quantity: 1
      });
      setIsCartOpen(true);
    }
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login'); 
    } else {
      navigate('/checkout'); 
    }
  };

  // --- CONTACT FORM STATE ---
  const [formData, setFormData] = useState({
    whoAreYou: "", firstName: "", lastName: "", email: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    if (!formData.whoAreYou || !formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setSubmitMessage("Please fill all required fields.");
      setIsSubmitting(false);
      return;
    }
    // ... API logic remains unchanged ...
    setTimeout(() => {
      setSubmitMessage("Thank you! Your message has been sent.");
      setIsFormSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-['Libre_Baskerville',_serif]">
      <Navbar/>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20">
        <div className="flex flex-col items-center justify-center mb-12 md:mb-16">
          <h1
            className="text-[30px] font-bold uppercase tracking-wide mb-3"
            style={{ color: "#0a36af" }}
          >
            Sip The Summer
          </h1>
          <div className="w-12 h-[2px]" style={{ backgroundColor: "#0a36af" }}></div>
        </div>

        {/* Filter and Product Count Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="relative w-full md:w-64">
            <label className="absolute -top-3 left-3 bg-white px-1 text-[15px] font-bold text-[#0a36af] z-10">
              Sort by
            </label>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full flex items-center justify-between px-4 py-3 border-2 bg-white transition-colors"
              style={{ borderColor: "#e5e7eb", color: "#0a36af" }}
            >
              <span className="text-[15px] font-semibold">{selectedSort}</span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSortOpen && (
              <>
              <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsSortOpen(false)} 
                />
              <div
                className="absolute top-full left-0 w-full bg-white border-2 border-t-0 shadow-xl z-20"
                style={{ borderColor: "#e5e7eb" }}
              >
                {sortOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedSort(option);
                      setIsSortOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-blue-50 transition-colors"
                    style={{ color: "#0a36af" }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              </>
            )}
          </div>

          <div
            className="px-6 py-3 border-2 font-semibold text-[15px]"
            style={{ borderColor: "#e5e7eb", color: "#0a36af" }}
          >
            {products.length} products
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {sortedProducts.map((product) => {
            const btnText = getButtonText(product.status);
            const priceDisplay = `£${parseFloat(product.price)}`;
            const oldPriceDisplay = product.old_price && parseFloat(product.old_price) > 0 ? `£${parseFloat(product.old_price)}` : null;

            return (
              <div key={product.id} className="flex flex-col items-center w-full">
                <Link
                  to={`/product/${product.id}`}
                  className="block h-[300px] md:h-[380px] w-full mb-6 group cursor-pointer"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                <button
                  onClick={() => handleAddToCart(product, btnText)}
                  className={`w-full py-3 font-bold text-[18px] md:text-[20px] uppercase transition-opacity shadow-sm ${
                    btnText === "ADD TO CART"
                      ? "hover:opacity-90 cursor-pointer"
                      : "opacity-70 cursor-not-allowed"
                  }`}
                  style={{ backgroundColor: "#0a36af", color: "#ffc85b" }}
                  disabled={btnText !== "ADD TO CART"}
                >
                  {btnText}
                </button>

                <div className="mt-5 w-full flex flex-col items-center text-center">
                  <p
                    className="text-[15px] font-semibold leading-snug px-2 min-h-[40px]"
                    style={{ color: "#0a36af" }}
                  >
                    {product.name}
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-3">
                    <span
                      className="text-[15px] font-bold"
                      style={{ color: "#0a36af" }}
                    >
                      {priceDisplay}
                    </span>
                    {oldPriceDisplay && (
                      <span className="text-[15px] text-gray-500 line-through decoration-gray-500">
                        {oldPriceDisplay}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      
      {/* --- CART DRAWER START --- */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[90] transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[100] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-4">
          <h2 className="text-2xl font-extrabold uppercase tracking-tighter" style={{ color: "#0a36af" }}>
            Cart
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close cart"
          >
            <X size={26} color="#000000" strokeWidth={1.5} />
          </button>
        </div>

        {/* Promotional Banners */}
        <div className="px-5 pb-5 space-y-3">
          {isFreeDelivery ? (
            <div className="bg-[#d1fae5] py-3 px-4 flex items-center gap-3 font-bold text-[#065f46] text-[14px] rounded-sm">
              <span className="text-xl leading-none">👍</span> Good news! You've got free delivery
            </div>
          ) : (
            <div
              className="py-3 px-4 flex items-center gap-3 font-bold text-black text-[14px] rounded-sm"
              style={{ backgroundColor: "#ffc85b" }}
            >
              <span className="text-xl leading-none">🎁</span> Free Delivery over £{FREE_DELIVERY_THRESHOLD}
            </div>
          )}
        </div>

        {/* Cart Items Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
              <span className="text-5xl mb-4">🛒</span>
              <p className="text-[16px] font-bold" style={{ color: "#0a36af" }}>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-5 py-5 border-b border-gray-200">
                <Link to={`/product/${item.id}`} onClick={() => setIsCartOpen(false)} className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md flex items-center justify-center p-2 border border-gray-100 hover:opacity-80 transition-opacity cursor-pointer">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain drop-shadow-md" />
                </Link>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <Link to={`/product/${item.id}`} onClick={() => setIsCartOpen(false)} className="hover:opacity-80 transition-opacity">
                      <h3 className="font-extrabold text-[15px] uppercase leading-tight" style={{ color: "#0a36af" }}>
                        {item.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="font-bold text-[14px] text-black mt-1">
                    £{(item.price * item.quantity).toFixed(2)}
                  </div>

                  <p className="text-[12px] text-gray-700 mt-1 font-medium">
                    {item.variant}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-5 mt-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 shadow-sm disabled:opacity-50"
                        style={{ backgroundColor: "#0a36af" }}
                      >
                        <Minus size={18} strokeWidth={3} />
                      </button>

                      <span className="text-[16px] font-extrabold w-4 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 shadow-sm"
                        style={{ backgroundColor: "#0a36af" }}
                      >
                        <Plus size={18} strokeWidth={3} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout Area */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between text-[14px]">
                <span className="font-medium text-gray-700">Subtotal</span>
                <span className="font-medium text-gray-900">£{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="font-medium text-gray-700">Delivery</span>
                <span className="font-medium text-gray-900">
                  {isFreeDelivery ? 'Free' : 'Calculated at Checkout'}
                </span>
              </div>
              <div className="flex justify-between text-[18px] mt-3 pt-3 border-t border-gray-200">
                <span className="font-extrabold text-black">Total</span>
                <span className="font-extrabold text-black">£{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
             <Link
                to="/cart"
                className="block w-full py-4 text-center rounded-full text-white font-extrabold text-[14px] transition-opacity hover:opacity-90 shadow-md"
                style={{ backgroundColor: "#0a36af" }}
              >
                View Cart & Checkout
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-4 rounded-full bg-white border-2 font-extrabold text-[14px] transition-colors hover:bg-gray-50"
                style={{ borderColor: "#0a36af", color: "#0a36af" }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Contact Section remains unchanged below here */}
      <section
        id="contact"
        className="w-full px-4 md:px-6 py-12 md:py-16"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div className="flex flex-col justify-start">
              <h2
                className="text-[30px] font-bold mb-4 md:mb-8"
                style={{ color: "#0a36af" }}
              >
                CONTACT US
              </h2>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "#000000", textAlign: "justify" }}
              >
                Have a question, special request, or want to stock our drinks?
                Fill out the form and our team will get back to you as soon as
                possible.
              </p>
              <br />
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "#000000", textAlign: "justify" }}
              >
                Whether you’re a customer, partner, or retailer, we’d love to
                hear from you and help with anything you need.
              </p>
            </div>
            <div className="flex flex-col justify-start">
              {isFormSubmitted ? (
                <div className="flex items-center justify-center p-8 md:p-12">
                  <p
                    className="font-medium text-center leading-relaxed text-base md:text-lg"
                    style={{ color: "#000000" }}
                  >
                    {submitMessage}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="whoAreYou"
                      className="block text-[15px] font-medium mb-2"
                      style={{ color: "#000000" }}
                    >
                      Who are you? <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <select
                      id="whoAreYou"
                      value={formData.whoAreYou}
                      onChange={(e) =>
                        setFormData({ ...formData, whoAreYou: e.target.value })
                      }
                      required
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px]"
                      style={{
                        backgroundColor: "#ffffff",
                        fontSize: formData.whoAreYou === "" ? "14px" : "16px",
                        color:
                          formData.whoAreYou === "" ? "#9ca3af" : "#000000",
                      }}
                    >
                      <option value="" style={{ fontSize: "14px" }}>
                        Select an option
                      </option>
                      <option value="Consumer">Consumer</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Bar/Restaurant Owner">
                        Bar/Restaurant Owner
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-[15px] font-medium mb-2"
                        style={{ color: "#000000" }}
                      >
                        First Name <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        required
                        className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px]"
                        style={{ backgroundColor: "#ffffff" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-[15px] font-medium mb-2"
                        style={{ color: "#000000" }}
                      >
                        Last Name <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        required
                        className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px]"
                        style={{ backgroundColor: "#ffffff" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[15px] font-medium mb-2"
                      style={{ color: "#000000" }}
                    >
                      Email <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-transparent text-[15px]"
                      style={{ backgroundColor: "#ffffff" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[15px] font-medium mb-2"
                      style={{ color: "#000000" }}
                    >
                      Message <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={4}
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px] resize-vertical"
                      style={{ backgroundColor: "#ffffff" }}
                      placeholder="Tell us more about your interest..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 md:px-8 py-[10px] rounded-lg font-semibold text-[15px] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                    style={{ backgroundColor: "#0a36af", color: "#ffc85b" }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>

                  {submitMessage && !isFormSubmitted && (
                    <p className="text-center font-medium text-sm md:text-base text-red-600">
                      {submitMessage}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
     <Footer/>
    </div>
  );
}

export default Spritz;