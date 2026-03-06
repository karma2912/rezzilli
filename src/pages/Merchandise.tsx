import { useState } from "react";
import { ChevronDown, Minus, Plus, Trash2, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Merchandise() {
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

  
  const products = [
    {
      id: 1,
      name: "NON-ALCOHOL ORANGE ITALIAN Merchandise",
      image: "/image6.png",
      buttonText: "Coming soon",
      price: "£24",
      oldPrice: "£30",
    },
    {
      id: 2,
      name: "LEMON ITALIAN Merchandise",
      image: "/image4.png", // Update with your actual Limoncini bottle image
      buttonText: "ADD TO CART",
      price: "£24",
      oldPrice: "£30",
    },
    {
      id: 3,
      name: "ORANGE ITALIAN Merchandise 275ml x 24 BOTTLES",
      image: "/image5.png", // Update with your actual Arancini bottle image
      buttonText: "Coming soon",
      price: "£24",
      oldPrice: "£30",
    },
  ];

  const [formData, setFormData] = useState({
    whoAreYou: "",
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    if (
      !formData.whoAreYou ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      setSubmitMessage("Please fill all required fields.");
      setIsSubmitting(false);
      return;
    }

    const API_URL = "/api/contact";

    try {
      const payload = {
        whoAreYou: formData.whoAreYou.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Submission failed");
      }

      setSubmitMessage(
        data.message || "Thank you! Your message has been sent.",
      );
      setIsFormSubmitted(true);

      setFormData({
        whoAreYou: "",
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Submission Error:", error);
      setSubmitMessage(
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCart = (buttonText: string) => {
    if (buttonText === "ADD TO CART") {
      setIsCartOpen(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-['Libre_Baskerville',_serif]">
      
      <Navbar/>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20">
        {/* Title */}
        <div className="flex justify-center mb-12 md:mb-16">
          <h1
            className="text-[28px] font-bold uppercase tracking-wide border-b-4 pb-2"
            style={{ color: "#0a36af", borderColor: "#0a36af" }}
          >
            Sip The Summer
          </h1>
        </div>

        {/* Filter and Product Count Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="relative w-full md:w-64">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-[12px] font-bold text-[#0a36af] z-10">
              Sort by
            </label>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full flex items-center justify-between px-4 py-3 border-2 bg-white transition-colors"
              style={{ borderColor: "#0a36af", color: "#0a36af" }}
            >
              <span className="text-[14px] font-semibold">{selectedSort}</span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSortOpen && (
              <div
                className="absolute top-full left-0 w-full bg-white border-2 border-t-0 shadow-xl z-20"
                style={{ borderColor: "#0a36af" }}
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
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center w-full">
              <div className="h-[300px] md:h-[380px] w-full flex items-center justify-center mb-6">
                Merchandise Images
              </div>

              <button
                onClick={() => handleAddToCart(product.buttonText)}
                className={`w-full py-3 border-[2px] border-black font-bold text-[18px] md:text-[20px] uppercase transition-opacity shadow-sm ${
                  product.buttonText === "ADD TO CART" 
                    ? "hover:opacity-90 cursor-pointer" 
                    : "opacity-70 cursor-not-allowed"
                }`}
                style={{ backgroundColor: "#0a36af", color: "#ffc85b" }}
                disabled={product.buttonText !== "ADD TO CART"}
              >
                {product.buttonText}
              </button>

              <div className="mt-5 w-full flex flex-col items-center text-center">
                <p
                  className="text-[13px] md:text-[14px] font-semibold uppercase leading-snug px-2 min-h-[40px]"
                  style={{ color: "#0a36af" }}
                >
                  Merchandise Name
                </p>
                <div className="mt-3 flex items-center justify-center gap-3">
                  <span className="text-[16px] font-bold" style={{ color: "#0a36af" }}>
                    Merchandise Price
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {/* --- CART DRAWER START --- */}
      
     {/* Background Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[90] transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[100] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-4">
          <h2 className="text-2xl font-extrabold uppercase tracking-tighter text-black">Cart</h2>
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
          {/* Success Banner */}
          <div className="bg-[#d1fae5] py-3 px-4 flex items-center gap-3 font-bold text-[#065f46] text-[14px] rounded-sm">
            <span className="text-xl leading-none">👍</span> Good news! You've got free delivery
          </div>
          {/* Info Banner */}
          <div className="py-3 px-4 flex items-center gap-3 font-bold text-black text-[14px] rounded-sm" style={{ backgroundColor: "#ffc85b" }}>
            <span className="text-xl leading-none">🎁</span> Free Delivery over £50
          </div>
        </div>

        {/* Cart Items Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-5">
          
          {/* Cart Item */}
          <div className="flex gap-5 py-5 border-b border-gray-200">
            {/* Thumbnail */}
            <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md flex items-center justify-center p-2 border border-gray-100">
              <img src="/image4.png" alt="Limoncini" className="w-full h-full object-contain drop-shadow-md" />
            </div>
            
            {/* Details */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-extrabold text-[16px] uppercase leading-tight" style={{ color: "#0a36af" }}>
                  LEMON ITALIAN Merchandise
                </h3>
              </div>
              
              <div className="font-bold text-[14px] text-black mt-1">
                £24.00
              </div>
              
              <p className="text-[12px] text-gray-700 mt-1 font-medium">24 Bottles</p>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-5 mt-4">
                <div className="flex items-center gap-4">
                  <button 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 shadow-sm" 
                    style={{ backgroundColor: "#0a36af" }}
                  >
                    <Minus size={18} strokeWidth={3} />
                  </button>
                  
                  <span className="text-[16px] font-extrabold w-4 text-center">1</span>
                  
                  <button 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 shadow-sm" 
                    style={{ backgroundColor: "#0a36af" }}
                  >
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
                
                <button className="text-gray-500 hover:text-red-500 transition-colors" aria-label="Remove item">
                  <Trash2 size={22} />
                </button>
              </div>
            </div>
          </div>
          
        </div>

        {/* Footer / Checkout Area */}
        <div className="border-t border-gray-200 p-6 bg-white">
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex justify-between text-[14px]">
              <span className="font-medium text-gray-700">Subtotal</span>
              <span className="font-medium text-gray-900">£24.00</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="font-medium text-gray-700">Delivery</span>
              <span className="font-medium text-gray-900">Calculated at Checkout</span>
            </div>
            <div className="flex justify-between text-[18px] mt-3 pt-3 border-t border-gray-200">
              <span className="font-extrabold text-black">Total</span>
              <span className="font-extrabold text-black">£24.00</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button 
              className="w-full py-4 rounded-full text-white font-extrabold text-[14px] transition-opacity hover:opacity-90 shadow-md" 
              style={{ backgroundColor: "#0a36af" }}
            >
              View Basket & Checkout
            </button>
            
            <button 
              onClick={() => setIsCartOpen(false)} 
              className="w-full py-4 rounded-full bg-white border-2 font-extrabold text-[14px] transition-colors hover:bg-gray-50"
              style={{ borderColor: "#0a36af", color: "#0a36af" }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
        </div>
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

export default Merchandise;
