import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, HelpCircle, Lock, ChevronLeft, Mail, KeyRound } from "lucide-react";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, cartCount, clearCart } = useCart();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  const getInitialEmail = () => {
    const userStr = localStorage.getItem("rezzilli_user");
    if (userStr) {
      try { return JSON.parse(userStr).email || ""; } catch (e) {}
    }
    return "";
  };

  const [formData, setFormData] = useState({
    email: getInitialEmail(),
    password: "", 
    country: "United Kingdom",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    postcode: "",
    phone: "",
    giftMessage: "",
  });

  // --- ERROR TRACKING STATE ---
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);

  const [discountCodeInput, setDiscountCodeInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    type: string;
    value: number;
  } | null>(null);
  const [discountError, setDiscountError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear red border when user starts typing in that field
    if (missingFields.includes(name)) {
      setMissingFields(prev => prev.filter(f => f !== name));
    }
  };

  // --- LIVE EMAIL CHECKING LOGIC ---
  useEffect(() => {
    const checkEmail = async () => {
      const isValidEmail = formData.email.includes('@') && formData.email.includes('.');
      if (!isValidEmail) {
        setIsEmailRegistered(false);
        return;
      }
      
      setIsValidatingEmail(true);
      try {
        const response = await fetch(`https://rezzillidrinks.com/api/check-email.php?email=${encodeURIComponent(formData.email)}`);
        const data = await response.json();
        setIsEmailRegistered(data.exists);
      } catch (err) {
        console.error("Email check failed", err);
      } finally {
        setIsValidatingEmail(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (!localStorage.getItem("rezzilli_user")) {
        checkEmail();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.email]);

  const handleApplyDiscount = async () => {
    if (!discountCodeInput.trim()) return;
    setDiscountError("");

    try {
      const response = await fetch(
        "https://rezzillidrinks.com/api/validate-discount.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: discountCodeInput,
            cartTotal: cartTotal,
          }),
        },
      );
      const data = await response.json();

      if (data.success) {
        setAppliedDiscount({
          code: discountCodeInput.toUpperCase(),
          type: data.type,
          value: data.value,
        });
        setDiscountCodeInput("");
      } else {
        setDiscountError(data.message || "Invalid code");
      }
    } catch (err) {
      setDiscountError("Network error validating code.");
    }
  };

  const FREE_DELIVERY_THRESHOLD = 50;
  const deliveryFee = cartTotal >= FREE_DELIVERY_THRESHOLD ? 0 : 5.0;

  const discountValue = appliedDiscount
    ? appliedDiscount.type === "percentage"
      ? cartTotal * (appliedDiscount.value / 100)
      : appliedDiscount.value
    : 0;

  const finalTotal = cartTotal + deliveryFee - discountValue;
  const vatAmount = finalTotal - finalTotal / 1.2;

  const handlePayNow = async () => {
    const isGuestCheckout = !localStorage.getItem("rezzilli_user");
    const needsPassword = isGuestCheckout && !isEmailRegistered && !isValidatingEmail;

    // 1. Identify which mandatory fields are empty
    const requiredFields = ["email", "firstName", "lastName", "address", "city", "postcode", "phone"];
    if (needsPassword) requiredFields.push("password");

    const missing = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    // 2. If any are missing, highlight them red and stop
    if (missing.length > 0) {
      setMissingFields(missing);
      setError("Please fill in the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const userString = localStorage.getItem("rezzilli_user");
    const user = userString ? JSON.parse(userString) : null;

    const orderPayload = {
      user_id: user ? user.id : null, 
      email: formData.email, 
      password: !isEmailRegistered ? formData.password : "", 
      cartItems: cart,
      total_amount: finalTotal,
      shipping_fee: deliveryFee,
      discount_code: appliedDiscount?.code || null,
      discount_amount: discountValue,
      gift_message: formData.giftMessage,
      shipping: {
        name: `${formData.firstName} ${formData.lastName}`,
        company: formData.company,
        line1: formData.address,
        line2: formData.apartment,
        city: formData.city,
        region: formData.city,
        zip: formData.postcode,
        country: formData.country,
        phone: formData.phone,
      },
      payment_method: "Credit Card (Mock)",
      payment_status: "Paid",
    };

    try {
      const response = await fetch(
        "https://rezzillidrinks.com/api/create-order.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        },
      );
      const data = await response.json();

      if (data.success) {
        clearCart();
        alert("Order placed successfully!");
        navigate("/profile");
      } else {
        // This is where "Missing required order details" is being set!
        setError(data.message || "Failed to place order.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to dynamically assign red border if field is missing
  const getInputClass = (fieldName: string) => {
    const isMissing = missingFields.includes(fieldName);
    return `w-full rounded-lg p-3 focus:outline-none focus:ring-1 text-[15px] transition-colors border ${
      isMissing 
        ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50" 
        : "border-gray-300 focus:border-[#0a36af] focus:ring-[#0a36af] bg-white"
    }`;
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-['Libre_Baskerville',_serif] text-[15px]">
      <div className="w-full lg:w-[55%] xl:w-[55%] bg-white pt-8 pb-20 px-6 lg:px-12 xl:px-24 flex justify-end lg:min-h-screen">
        <div className="w-full max-w-2xl flex flex-col">
          <Link to="/" className="mb-8 block">
            <img src="/rezzilli.png" alt="Rezzilli" className="h-10 md:h-20" />
          </Link>
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/cart"
              className="flex items-center gap-1 text-[#0a36af] hover:opacity-70 font-semibold transition-opacity text-[15px]"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
              Return to cart
            </Link>
          </div>

          <section className="mb-10">
            <h2 className="text-[20px] font-bold text-black mb-2">
              Purchasing as a gift?
            </h2>
            <p className="text-gray-600 mb-4 text-[15px]">
              Write a personalised gift message and we will handle the rest.
            </p>
            <textarea
              name="giftMessage"
              value={formData.giftMessage}
              onChange={handleInputChange}
              placeholder="Write a personalised gift message and we will handle the rest."
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] min-h-[100px] resize-y text-[15px]"
            ></textarea>
          </section>

          <section className="mb-10">
            <h2 className="text-[20px] font-bold text-black mb-4">Contact & Delivery</h2>
            
            <div className="space-y-3">
              
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address *"
                  className={`${getInputClass('email')} pr-10`}
                />
                <Mail size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {!localStorage.getItem("rezzilli_user") && (
                <>
                  {formData.email.includes('@') && formData.email.includes('.') && !isEmailRegistered && !isValidatingEmail && (
                    <div className="relative pb-3 transition-all duration-300">
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a password for your new account *"
                        className={`${getInputClass('password')} pr-10`}
                      />
                      <KeyRound size={18} className="absolute right-3 top-1/2 -translate-y-[calc(50%+6px)] text-gray-400" />
                    </div>
                  )}

                  {isEmailRegistered && (
                    <div className="pb-3 px-1">
                      <p className="text-[13px] font-semibold" style={{ color: "#0a36af" }}>
                        Account found. You can complete your purchase as a guest, or <Link to="/login" className="underline font-bold hover:text-blue-800">log in</Link>.
                      </p>
                    </div>
                  )}
                </>
              )}

              <div className="relative">
                <label className="absolute top-1 left-3 text-[15px] text-gray-500 scale-75 origin-top-left">
                  Country/Region
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg pt-7 pb-2 px-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] appearance-none bg-white text-[15px]"
                >
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Europe</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name *"
                  className={getInputClass('firstName')}
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name *"
                  className={getInputClass('lastName')}
                />
              </div>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company (optional)"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] text-[15px]"
              />
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address *"
                  className={`${getInputClass('address')} pr-10`}
                />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] text-[15px]"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City *"
                  className={getInputClass('city')}
                />
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  placeholder="Postcode *"
                  className={getInputClass('postcode')}
                />
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone *"
                  className={`${getInputClass('phone')} pr-10`}
                />
                <HelpCircle size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-[20px] font-bold text-black mb-4">
              Shipping method
            </h2>
            <div
              className="bg-[#f3f4f6] rounded-lg p-5 text-center text-[15px]"
              style={{ color: "#0a36af" }}
            >
              {cartTotal >= FREE_DELIVERY_THRESHOLD
                ? "Standard Delivery - Free (Applies to your order!)"
                : "Enter your full shipping address to view available shipping methods."}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[20px] font-bold text-black mb-1">Payment</h2>
            <p className="text-gray-500 text-[15px] mb-4">
              All transactions are secure and encrypted.
            </p>
            <div
              className="border-[1.5px] rounded-lg overflow-hidden"
              style={{ borderColor: "#0a36af" }}
            >
              <div className="bg-blue-50/30 p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-4 border-[#0a36af] bg-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-[#0a36af] rounded-full"></div>
                  </div>
                  <span className="font-bold text-black text-[15px]">Credit card</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-10 h-7 bg-white border border-gray-200 rounded flex items-center justify-center text-[15px] font-bold text-blue-900 scale-75 origin-right">VISA</div>
                  <div className="w-10 h-7 bg-white border border-gray-200 rounded flex items-center justify-center scale-75 origin-right">
                    <div className="flex">
                      <div className="w-3.5 h-3.5 bg-red-500 rounded-full mix-blend-multiply"></div>
                      <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full -ml-1 mix-blend-multiply"></div>
                    </div>
                  </div>
                  <div className="w-10 h-7 bg-white border border-gray-200 rounded flex items-center justify-center text-[15px] font-bold text-gray-600 scale-75 origin-right">+5</div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Card number"
                    className="w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] bg-white text-[15px]"
                  />
                  <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Expiration date (MM / YY)"
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] bg-white text-[15px]"
                  />
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Security code"
                      className="w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] bg-white text-[15px]"
                    />
                    <HelpCircle size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Name on card"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] bg-white text-[15px]"
                />

                <div className="pt-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="billing"
                    className="w-4 h-4 text-[#0a36af] rounded border-gray-300 focus:ring-[#0a36af]"
                    defaultChecked
                  />
                  <label htmlFor="billing" className="text-[15px] text-gray-700">
                    Use shipping address as billing address
                  </label>
                </div>
              </div>
            </div>
          </section>

          {error && (
            <p className="text-red-500 font-bold mb-3 text-center">{error}</p>
          )}
          <button
            onClick={handlePayNow}
            disabled={isSubmitting}
            className="w-full py-4 mt-2 rounded-lg text-white font-extrabold text-[15px] transition-opacity hover:opacity-90 shadow-md disabled:opacity-50 uppercase tracking-wide"
            style={{ backgroundColor: "#0a36af" }}
          >
            {isSubmitting ? "Processing Securely..." : "Pay now"}
          </button>
        </div>
      </div>

      <div
        className="w-full lg:w-[45%] xl:w-[45%] bg-[#f9fafb] border-t lg:border-t-0 lg:border-l border-gray-200 lg:min-h-screen"
        style={{ color: "#0a36af" }}
      >
        <div className="lg:sticky lg:top-0 w-full pt-8 lg:pt-14 pb-20 px-6 lg:px-12 xl:px-16 flex justify-start">
          <div className="w-full max-w-md flex flex-col">
            <div className="flex flex-col gap-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0 bg-white border border-gray-200 rounded-lg flex items-center justify-center p-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                    <span
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-[15px] font-bold flex items-center justify-center z-10"
                      style={{ backgroundColor: "rgba(113, 113, 122, 0.9)" }}
                    >
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[15px] leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-[15px] mt-0.5">{item.variant}</p>
                  </div>
                  <div className="font-medium text-[15px]">
                    £{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 py-6 border-t border-b border-gray-200 mb-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Discount code"
                  value={discountCodeInput}
                  onChange={(e) => setDiscountCodeInput(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] bg-white text-[15px] text-[#0a36af] placeholder-[#0a36af]"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="px-5 py-3 bg-gray-200 font-semibold rounded-md transition-colors hover:bg-gray-300 text-[15px]"
                  style={{ color: "#0a36af" }}
                >
                  Apply
                </button>
              </div>
              {discountError && (
                <p className="text-red-500 text-sm font-semibold">
                  {discountError}
                </p>
              )}
              {appliedDiscount && (
                <p className="text-green-600 text-sm font-semibold">
                  Code {appliedDiscount.code} applied successfully!
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 text-[15px]">
              <div className="flex justify-between">
                <span>
                  Subtotal &middot; {cartCount}{" "}
                  {cartCount === 1 ? "item" : "items"}
                </span>
                <span className="font-medium">£{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {deliveryFee === 0 ? "Free" : `£${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              {appliedDiscount && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({appliedDiscount.code})</span>
                  <span className="font-medium">
                    -£{discountValue.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>VAT (Included)</span>
                <span className="font-medium">£{vatAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-200">
                <span className="text-[20px] font-bold">Total</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[15px] font-medium mb-1">GBP</span>
                  <span className="text-[20px] font-extrabold">
                    £{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;