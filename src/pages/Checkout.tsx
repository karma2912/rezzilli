import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, HelpCircle, Lock, ChevronLeft, Mail, EyeOff, Eye, X } from "lucide-react";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, cartCount, clearCart } = useCart();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  const getInitialUserData = () => {
    const userStr = localStorage.getItem("rezzilli_user");
    if (userStr) {
      try { 
        const user = JSON.parse(userStr);
        // Split the full name "Yash Rajak" into "Yash" and "Rajak"
        const nameParts = (user.name || "").trim().split(" ");
        return {
          email: user.email || "",
          firstName: nameParts[0] || "",
          lastName: nameParts.length > 1 ? nameParts.slice(1).join(" ") : ""
        };
      } catch (e) {}
    }
    return { email: "", firstName: "", lastName: "" };
  };

  const initialUser = getInitialUserData();

  const [formData, setFormData] = useState({
    email: initialUser.email,
    password: "", 
    country: "United Kingdom",
    firstName: initialUser.firstName, 
    lastName: initialUser.lastName,   
    company: "",
    address: "",
    apartment: "",
    city: "",
    postcode: "",
    phone: "",
    giftMessage: "",
  });

  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  // --- ERROR TRACKING STATE ---
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showAlcoholPolicy, setShowAlcoholPolicy] = useState(false);
  const [showRefundPolicy, setShowRefundPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);

 const location = useLocation();
  const passedDiscount = location.state?.preAppliedDiscount || null;
  const [discountCodeInput, setDiscountCodeInput] = useState(passedDiscount?.code || "");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; type: string; value: number; } | null>(passedDiscount);
  const [isApplying, setIsApplying] = useState(false); // Adding this for the loading state
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

  // --- FETCH SAVED ADDRESSES FOR LOGGED IN USERS ---
  useEffect(() => {
    const userStr = localStorage.getItem("rezzilli_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      // Call your profile API to get their saved data
      fetch(`https://rezzillidrinks.com/api/get-profile.php?user_id=${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.addresses && data.addresses.length > 0) {
            setSavedAddresses(data.addresses);
            
            // Auto-fill the form with their default/first address
            const defaultAddr = data.addresses[0];
            setFormData(prev => ({
              ...prev,
              firstName: defaultAddr.first_name || prev.firstName,
              lastName: defaultAddr.last_name || prev.lastName,
              address: defaultAddr.line1 || "",       
              apartment: defaultAddr.line2 || "",    
              city: defaultAddr.city || "",
              postcode: defaultAddr.zip || "",       
              country: defaultAddr.country || "United Kingdom",
              phone: defaultAddr.phone || prev.phone
            }));
          }
        })
        .catch(err => console.error("Failed to fetch addresses:", err));
    }
  }, []);

  const handleApplyDiscount = async () => {
    if (!discountCodeInput.trim()) return;
    
    setIsApplying(true); // <-- Added loading state here
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
      } else {
        setDiscountError(data.message || "Invalid code");
      }
    } catch (err) {
      setDiscountError("Network error validating code.");
    } finally {
      setIsApplying(false); 
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

  const handleAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    if (value === "new") {
      // Clear the address fields so they can type a new one
      setFormData(prev => ({
        ...prev, address: "", apartment: "", city: "", postcode: ""
      }));
    } else {
      // Find the selected address from our array and populate the form
      const selected = savedAddresses.find(a => a.id.toString() === value);
      if (selected) {
        setFormData(prev => ({
          ...prev,
          firstName: selected.first_name || prev.firstName,
          lastName: selected.last_name || prev.lastName,
          address: selected.line1 || "",     
          apartment: selected.line2 || "",    
          city: selected.city || "",
          postcode: selected.zip || "",         
          country: selected.country || "United Kingdom",
          phone: selected.phone || prev.phone
        }));
      }
    }
  };

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
    <>
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-['Libre_Baskerville',_serif] text-[15px]">
      <div className="w-full lg:w-[55%] xl:w-[55%] bg-white pt-8 pb-20 px-6 lg:px-12 xl:px-24 flex justify-end lg:min-h-screen">
        <div className="w-full max-w-2xl flex flex-col">
          <Link to="/" className="mb-8 block">
            <img src="/rezzilli.png" loading="lazy" alt="Rezzilli" className="h-10 md:h-20" />
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
              {savedAddresses.length > 0 && (
                  <div className="mb-6 p-4 border border-[#0a36af]/20 bg-blue-50/30 rounded-lg">
                    <label className="block text-[15px] font-bold text-[#0a36af] mb-2">
                      Saved Addresses
                    </label>
                    <select 
                      onChange={handleAddressSelect}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] bg-white text-[15px]"
                    >
                      {savedAddresses.map((addr) => (
    <option key={addr.id} value={addr.id}>
      {addr.line1}, {addr.city} {addr.zip}
    </option>
  ))}
                      <option value="new">+ Enter a new address</option>
                    </select>
                  </div>
                )}
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
                        type={showPassword ? "text" : "password"} // <-- DYNAMIC TYPE
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a password for your new account *"
                        className={`${getInputClass('password')} pr-10`}
                      />
                      {/* --- NEW EYE TOGGLE BUTTON --- */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-[calc(50%+6px)] text-gray-400 hover:text-[#0a36af] transition-colors focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
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
          <div className="border-t border-gray-200 mt-8 pt-5 flex flex-wrap gap-x-5 gap-y-2 justify-start items-center font-sans">
            <button onClick={() => setShowPrivacyPolicy(true)} className="text-[#0a36af] hover:underline text-[13px] transition-opacity">Privacy policy</button>
            <button onClick={() => setShowAlcoholPolicy(true)} className="text-[#0a36af] hover:underline text-[13px] transition-opacity">Alcohol and Safe Use</button>
            <button onClick={() => setShowRefundPolicy(true)} className="text-[#0a36af] hover:underline text-[13px] transition-opacity">Refund policy</button>
            <button onClick={() => setShowTermsOfService(true)} className="text-[#0a36af] hover:underline text-[13px] transition-opacity">Terms of service</button>
          </div>
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
                      loading="lazy"
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
                    <p className="text-[15px] mt-0.5 capitalize">{item.variant?.toLowerCase()}</p>
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    {item.originalPrice && parseFloat(item.originalPrice) > item.price && (
                      <span className="text-[13px] text-gray-400 line-through mb-0.5">
                        £{(parseFloat(item.originalPrice) * item.quantity).toFixed(2)}
                      </span>
                    )}
                    <span className="font-medium text-[15px] text-[#0a36af]">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
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
                  onChange={(e) => setDiscountCodeInput(e.target.value.toUpperCase())}
                  disabled={!!appliedDiscount}
                  className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] text-[15px] text-[#0a36af] placeholder-[#0a36af] disabled:bg-gray-100 disabled:text-gray-500 uppercase"
                />
                <button
                  onClick={handleApplyDiscount}
                  disabled={!!appliedDiscount || isApplying || !discountCodeInput.trim()}
                  className="px-5 py-3 bg-gray-200 font-semibold rounded-md transition-colors hover:bg-gray-300 text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ color: "#0a36af" }}
                >
                  {isApplying ? "..." : appliedDiscount ? "Applied" : "Apply"}
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
    {showPrivacyPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black bg-opacity-50 font-['Libre_Baskerville',_serif] text-left">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
              <h2
                className="text-xl md:text-2xl font-bold"
                style={{ color: "#0a36af" }}
              >
                Privacy Policy
              </h2>
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X
                  size={20}
                  className="md:w-6 md:h-6"
                  style={{ color: "#0a36af" }}
                />
              </button>
            </div>
            <div className="px-4 py-4 md:px-6 md:py-6 space-y-4 md:space-y-6 text-gray-800">
              <p className="text-[15px] leading-relaxed">
                This Privacy Policy is a general template for a UK based drinks
                brand website, Rezzilli Drinks, reflecting common UK GDPR
                requirements for such a business.
              </p>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Introduction
                </h3>
                <p className="text-[15px] leading-relaxed">
                  By using the Rezzilli Drinks website and related online
                  services ("Services"), you agree to the practices described in
                  this Privacy Policy. If you do not agree with any part of this
                  Policy, you should stop using the Services.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  This Privacy Policy explains how Rezzilli Drinks ("Rezzilli
                  Drinks", "we", "us", "our") collects, uses, shares and
                  protects your personal information, and describes the rights
                  you may have under applicable data protection laws, including
                  UK GDPR.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Information we collect
                </h3>
                <p className="text-[15px] leading-relaxed">
                  We collect personal information that you voluntarily provide
                  to us when you contact us, request information about our
                  products or Services, or otherwise interact with us.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  The type of information we collect may include your name and
                  email address, and any other information you choose to provide
                  in your communications with us.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  Certain information is collected automatically when you visit
                  or use the Services, such as your IP address, browser type,
                  device information, operating system, language settings,
                  approximate location, access times, pages viewed and other
                  technical usage data.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  This technical information helps us operate, secure and
                  improve the Services and supports our internal analytics and
                  reporting.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  How we use your information
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  We use your personal information to operate and administer the
                  Services, respond to enquiries, provide information you
                  request, and manage our relationship with you.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  We also process information to maintain the security of our
                  systems, prevent fraud or misuse, and comply with legal or
                  regulatory obligations.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  We may process your information where necessary to protect the
                  vital interests of an individual, for example where we need to
                  act to prevent serious harm.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  Where required, we may use your information for additional
                  purposes with your consent, and will inform you of those
                  purposes at the time.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Legal bases for processing
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  We only process your personal information where there is a
                  lawful basis to do so under applicable data protection laws,
                  including UK GDPR.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  Depending on the context, this may include your consent, our
                  legitimate interests in operating and improving the Services,
                  compliance with legal obligations, performance of a contract
                  with you, or protection of vital interests.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  When we rely on consent, you are free to withdraw it at any
                  time, without affecting the lawfulness of processing carried
                  out before withdrawal.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  If processing is based on other legal grounds (such as legal
                  obligation or legitimate interests), we will explain those
                  grounds where required by law.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Sharing your information
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  We may share your personal information with trusted third
                  party vendors, service providers, contractors or agents who
                  perform services on our behalf and require access to such
                  information to carry out that work.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  These third parties are bound by contractual obligations to
                  use your information only in accordance with our instructions,
                  to protect it appropriately and not to disclose it to other
                  organisations.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  We may also share personal information in connection with
                  corporate transactions such as a merger, acquisition, sale of
                  assets, financing or similar business transfer, where such
                  sharing is necessary for the transaction.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  In addition, we may disclose information if required to do so
                  by law, regulation, court order or to respond to lawful
                  requests from public authorities.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Data retention
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  We keep your personal information only for as long as
                  necessary to fulfil the purposes described in this Privacy
                  Policy, unless a longer retention period is required or
                  permitted by law (for example, for tax, accounting or
                  regulatory reasons).
                </p>
                <p className="text-base leading-relaxed mt-2">
                  When there is no ongoing legitimate business need to process
                  your information, we will delete or anonymise it, or, if that
                  is not possible (for example, because it is stored in backup
                  archives), we will securely store it and isolate it from
                  further processing until deletion is possible.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Data security
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  We implement appropriate technical and organisational security
                  measures designed to protect the personal information we
                  process, including safeguards to prevent unauthorised access,
                  use, alteration or disclosure.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  However, no method of transmission over the internet or method
                  of electronic storage is completely secure, and we cannot
                  guarantee absolute security of your information.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  You are responsible for using secure networks and taking
                  reasonable steps to protect your own device and credentials
                  when accessing the Services.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  Any transmission of personal information to the Services is at
                  your own risk and should be done within a secure environment
                  where possible.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Children's privacy
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  The Services are not intended for, and we do not knowingly
                  collect personal information from, anyone under 18 years of
                  age.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  By using the Services, you confirm that you are at least 18
                  years old, or that you are the parent or guardian of a minor
                  using the Services with your permission.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  If we become aware that we have collected personal information
                  from someone under 18, we will take reasonable steps to delete
                  such information as soon as practicable.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  If you believe a child has provided us with personal
                  information, please contact us so we can investigate and take
                  appropriate action.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Your privacy rights
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  Depending on your place of residence and applicable law (for
                  example in the UK, EEA or Switzerland), you may have rights in
                  relation to your personal information.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  These can include the right to request access to and a copy of
                  your data, to request correction or deletion, to restrict or
                  object to processing, and, where applicable, to request data
                  portability or to challenge automated decision making.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  You can exercise these rights by contacting us using the
                  details provided below, and we will respond in accordance with
                  applicable data protection laws.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  You may also have the right to lodge a complaint with your
                  local supervisory authority, such as the UK Information
                  Commissioner's Office (ICO) or the relevant authority in your
                  country or region.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  If we rely on your consent for any processing, you may
                  withdraw that consent at any time by contacting us, without
                  affecting processing carried out before withdrawal or
                  processing based on other lawful grounds.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  If you have questions or concerns about your privacy rights,
                  you can contact us using the contact information below.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Do Not Track
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  Some web browsers and mobile operating systems offer a "Do Not
                  Track" ("DNT") setting that you can enable to signal your
                  privacy preference.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  At present there is no widely accepted industry standard for
                  recognising and responding to DNT signals, so the Services do
                  not currently respond to such signals.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  If a standard for online tracking is adopted in the future
                  that we are required to follow, we will update this Privacy
                  Policy to explain how we respond to DNT signals.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  You can adjust your browser or device settings and cookie
                  preferences to manage certain tracking technologies.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Changes to this Privacy Policy
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices, technologies, legal requirements or
                  other factors.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  When we make changes, we will revise the "Last updated" date
                  at the beginning of this document, and the updated version
                  will be effective when it becomes accessible via the Services.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  Where required by law, we may provide additional notice of
                  material changes, such as by displaying a prominent notice on
                  the website or contacting you directly.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  You are encouraged to review this Privacy Policy periodically
                  to stay informed about how we handle your personal
                  information.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Contacting Rezzilli Drinks
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  If you have any questions or comments about this Privacy
                  Policy, our privacy practices, or your rights, you can contact
                  Rezzilli Drinks using the contact email address or postal
                  address published on our website.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  You may also use these contact details to submit any request
                  to access, update or delete the personal information we hold
                  about you, subject to applicable law.
                </p>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 md:px-6 md:py-4 flex justify-end">
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold text-sm md:text-base transition-all hover:opacity-90"
                style={{ backgroundColor: "#0a36af", color: "#ffffff" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alcohol Policy Modal */}
      {showAlcoholPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black bg-opacity-50 font-['Libre_Baskerville',_serif] text-left">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
              <h2
                className="text-xl md:text-2xl font-bold"
                style={{ color: "#0a36af" }}
              >
                Alcohol and Safe Use
              </h2>
              <button
                onClick={() => setShowAlcoholPolicy(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X
                  size={20}
                  className="md:w-6 md:h-6"
                  style={{ color: "#0a36af" }}
                />
              </button>
            </div>
            <div className="px-4 py-4 md:px-6 md:py-6 space-y-4 md:space-y-6 text-gray-800">
              <p className="text-sm md:text-base leading-relaxed">
                When consumed in moderation, beer and other alcoholic drinks can
                be part of a balanced lifestyle, but it is essential to
                understand both the potential risks and the importance of
                responsible consumption.
              </p>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Responsible consumption
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  Alcohol producers increasingly promote responsible drinking,
                  aiming to reduce harmful use and help consumers make informed
                  decisions about what they drink and how often they drink it.
                  Many brands highlight responsible use on packaging, in
                  advertising, and by offering products with different Alcohol
                  by Volume (ABV), including low- and no-alcohol options to
                  support moderation.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Health considerations
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  Drinking alcohol is a personal choice, and individuals should
                  consider their own risks and potential benefits before
                  consuming it. Research indicates links between alcohol
                  consumption and various health conditions, and even moderate
                  drinking may increase risks such as cardiovascular problems,
                  diabetes, and certain cancers for some people.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  When not to drink
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  Excessive alcohol use can lead to serious long-term
                  consequences, including physical dependence or addiction, and
                  should always be avoided. Some groups should not drink at all,
                  such as those below the legal drinking age, people who are
                  pregnant, anyone about to drive or operate machinery, and
                  individuals who have difficulty controlling their drinking.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Guidelines and further information
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  Many governments publish low-risk drinking guidelines to help
                  consumers understand recommended limits and make safer choices
                  about alcohol use. Public health organizations and specialist
                  bodies provide evidence-based information on alcohol and
                  health, including the World Health Organization (WHO), the
                  National Institute on Alcohol Abuse and Alcoholism (NIAAA),
                  national health services, and international alliances focused
                  on responsible drinking.
                </p>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 md:px-6 md:py-4 flex justify-end">
              <button
                onClick={() => setShowAlcoholPolicy(false)}
                className="px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold text-sm md:text-base transition-all hover:opacity-90"
                style={{ backgroundColor: "#0a36af", color: "#ffffff" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showRefundPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black bg-opacity-50 font-['Libre_Baskerville',_serif] text-left">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold" style={{ color: "#0a36af" }}>
                Cancellations, Returns & Refunds
              </h2>
              <button onClick={() => setShowRefundPolicy(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="md:w-6 md:h-6" style={{ color: "#0a36af" }} />
              </button>
            </div>
            <div className="px-4 py-4 md:px-6 md:py-6 space-y-4 md:space-y-6 text-gray-800">
              <p className="text-sm md:text-base leading-relaxed">This policy explains how you can cancel an order, return products, and receive refunds for purchases made on the Rezzilli Drinks website.</p>
              
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>1. Order Cancellations</h3>
                <p className="text-sm md:text-base leading-relaxed">You may request a cancellation only before your order has been processed or dispatched.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm md:text-base leading-relaxed">
                  <li>Orders are processed shortly after placement.</li>
                  <li>Orders placed before daily cut-off times (e.g. for next-day delivery) may be processed immediately and may not be eligible for cancellation.</li>
                  <li>Once your order has been processed or dispatched, it cannot be cancelled.</li>
                </ul>
                <p className="text-sm md:text-base leading-relaxed mt-2">If your order has already been dispatched, it will need to be handled as a return (see Section 2).</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>2. Returns Eligibility</h3>
                <p className="text-sm md:text-base leading-relaxed">You may return products for a refund within 14 days of delivery, provided that:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm md:text-base leading-relaxed">
                  <li>The product is unused, unopened, and in its original condition and packaging</li>
                  <li>The product is not damaged due to improper handling after delivery</li>
                </ul>
                <p className="text-sm md:text-base leading-relaxed mt-2">We reserve the right to refuse or reduce a refund if the returned product does not meet these conditions.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>3. How to Request a Return</h3>
                <p className="text-sm md:text-base leading-relaxed">To initiate a return, you must contact us with:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm md:text-base leading-relaxed">
                  <li>Your name</li>
                  <li>Order reference number</li>
                  <li>Product(s) you wish to return</li>
                </ul>
                <p className="text-sm md:text-base leading-relaxed mt-2">Once approved, we will provide return instructions. Products must be returned in accordance with these instructions.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>4. Return Shipping Responsibility</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm md:text-base leading-relaxed">
                  <li>You are responsible for the cost of returning the product, unless the item is faulty, incorrect, or misdescribed.</li>
                  <li>Returned goods remain your responsibility until they are received by us.</li>
                  <li>You must ensure that items are securely packaged to prevent damage in transit.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>5. Damaged or Used Returns</h3>
                <p className="text-sm md:text-base leading-relaxed">If returned products show signs of use, damage, or mishandling:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm md:text-base leading-relaxed">
                  <li>We may reduce the refund amount to reflect the loss in value, or</li>
                  <li>Refuse the return if the product is no longer in a resellable condition</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>6. Refunds</h3>
                <p className="text-sm md:text-base leading-relaxed">Once your return is received and inspected:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm md:text-base leading-relaxed">
                  <li>Refunds will be processed to your original payment method</li>
                  <li>Refunds are typically issued within a reasonable timeframe after approval</li>
                </ul>
                <p className="text-sm md:text-base leading-relaxed mt-2">Delivery charges may not be refunded unless the return is due to our error.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>7. Faulty, Incorrect, or Misdescribed Products</h3>
                <p className="text-sm md:text-base leading-relaxed">If you receive a product that is faulty, damaged in transit, incorrect, or not as described:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm md:text-base leading-relaxed">
                  <li>Please contact us promptly with details and supporting evidence (e.g. photos)</li>
                  <li>We will arrange a replacement, refund, or other appropriate resolution in line with your legal rights</li>
                </ul>
                <p className="text-sm md:text-base leading-relaxed mt-2">In such cases, we will cover any reasonable return shipping costs.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>8. Refused Deliveries & Failed Deliveries</h3>
                <p className="text-sm md:text-base leading-relaxed">If you refuse delivery or fail to accept delivery:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm md:text-base leading-relaxed">
                  <li>We may deduct shipping costs, return charges, and any other costs incurred before processing a refund</li>
                  <li>Any applicable customs duties or charges will also be deducted where relevant</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>9. Important Notes</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm md:text-base leading-relaxed">
                  <li>Orders placed outside stated delivery conditions or eligibility criteria may not qualify for cancellation or refund</li>
                  <li>Minimum order value requirements and delivery restrictions must be met at the time of purchase</li>
                  <li>This policy does not affect your statutory rights under applicable consumer laws</li>
                </ul>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 md:px-6 md:py-4 flex justify-end">
              <button onClick={() => setShowRefundPolicy(false)} className="px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold text-sm md:text-base transition-all hover:opacity-90" style={{ backgroundColor: "#0a36af", color: "#ffffff" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsOfService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black bg-opacity-50 font-['Libre_Baskerville',_serif] text-left">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold" style={{ color: "#0a36af" }}>
                Terms of Service
              </h2>
              <button onClick={() => setShowTermsOfService(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="md:w-6 md:h-6" style={{ color: "#0a36af" }} />
              </button>
            </div>
            <div className="px-4 py-4 md:px-6 md:py-6 space-y-4 md:space-y-6 text-gray-800">
              
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>1. THESE TERMS</h3>
                <p className="text-sm md:text-base leading-relaxed font-bold">1.1 What these terms cover</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">These terms and conditions apply when you buy products from Rezzilli Drinks through our website.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">1.2 Why you should read them</p>
                <p className="text-sm md:text-base leading-relaxed">Please read these terms carefully before placing an order. They explain who we are, how we supply products, how orders are accepted, how changes and cancellations work, and what to do if something goes wrong.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>2. INFORMATION ABOUT US AND HOW TO CONTACT US</h3>
                <p className="text-sm md:text-base leading-relaxed font-bold">2.1 Who we are</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">We are Rezzilli Drinks.<br/>Insert your full legal entity name, company number, VAT number, and registered office here.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">2.2 How to contact us</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">You can contact us by phone at +44 7832 198470 or by post at 31, West Street, Burton upon Trent, DE11 9DN. You may also add your customer support email address here.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">2.3 How we may contact you</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">If we need to contact you, we may do so by telephone, email, or post using the details you gave us when placing your order.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">2.4 "Writing" includes emails</p>
                <p className="text-sm md:text-base leading-relaxed">When we use the words "writing" or "written" in these terms, this includes emails.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>3. OUR CONTRACT WITH YOU</h3>
                <p className="text-sm md:text-base leading-relaxed font-bold">3.1 How we accept your order</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">Your order is accepted when we email you to confirm it. At that point, a contract comes into existence between you and us.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">3.2 If we cannot accept your order</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">If we are unable to accept your order, or part of it, we will let you know and refund any amount already paid. This may happen if a product is out of stock, if there is an error in the price or description, or if we cannot meet a requested delivery date.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">3.3 Your order number</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">We will assign an order number to your purchase and share it with you when your order is accepted.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">3.4 Where we sell</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">Our website is intended for customers in the United Kingdom unless we say otherwise on the site.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">3.5 Alcohol products</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">If a product contains alcohol, we will only supply it where it is lawful to do so and only to customers who meet the applicable legal age requirement.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">3.6 Age confirmation</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">By using our website to purchase alcohol, you confirm that you are of legal age to buy alcohol in your jurisdiction and that you will not purchase age-restricted products unlawfully.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">3.7 International delivery</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">If we offer delivery outside the United Kingdom, your order may be subject to local duties, taxes, and import rules. You are responsible for checking and paying any such charges unless we state otherwise.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">3.8 Local laws</p>
                <p className="text-sm md:text-base leading-relaxed">You must comply with all laws and regulations that apply in the country where the products are delivered.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>4. OUR PRODUCTS</h3>
                <p className="text-sm md:text-base leading-relaxed font-bold">4.1 Product images</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">Product images on our website are for illustration only. Colours, appearance, and presentation may vary slightly from the images shown.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">4.2 Packaging</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">Packaging may vary from the images shown on our website.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">4.3 Product nature</p>
                <p className="text-sm md:text-base leading-relaxed">Our products are drinks and may include alcoholic and non-alcoholic beverages, depending on the product listing.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>5. YOUR RIGHTS TO MAKE CHANGES</h3>
                <p className="text-sm md:text-base leading-relaxed">If you want to change an order you have placed, please contact us as soon as possible. We will let you know whether the change is possible. If it is, we will tell you about any change in price, delivery time, or other details and ask you to confirm whether you want to proceed.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>6. OUR RIGHTS TO MAKE CHANGES</h3>
                <p className="text-sm md:text-base leading-relaxed font-bold">6.1 Minor changes</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">We may make minor changes to products to reflect changes in law, regulatory requirements, or technical improvements.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">6.2 Significant changes</p>
                <p className="text-sm md:text-base leading-relaxed">If we make a significant change to a product or to these terms, we will notify you. If the change affects an order you have already placed, you may contact us before the change takes effect to end the contract and receive a refund for any undelivered products.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>7. PROVIDING THE PRODUCTS</h3>
                <p className="text-sm md:text-base leading-relaxed font-bold">7.1 Delivery costs</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">Delivery charges will be shown on our website at checkout.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">7.2 When we will provide the products</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">We will tell you during checkout when we expect to deliver the products.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">7.3 Delays outside our control</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">If delivery is delayed by an event outside our control, we will let you know as soon as reasonably possible. If the delay is substantial, you may contact us to end the contract and receive a refund for undelivered products.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">7.4 Delivery responsibility</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">Once products are delivered to the address you provide, responsibility for the goods passes to you.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">7.5 Information we need from you</p>
                <p className="text-sm md:text-base leading-relaxed">We may need information such as your name, address, phone number, email address, age confirmation, and payment details. If you do not provide the information we need in a reasonable time, we may delay or cancel the order.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>8. YOUR RIGHTS TO END THE CONTRACT</h3>
                <p className="text-sm md:text-base leading-relaxed font-bold">8.1 General</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">Your right to end the contract depends on what you bought, whether there is a problem with the product, and when you choose to cancel.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">8.2 Ending because of something we did</p>
                <p className="text-sm md:text-base leading-relaxed mb-2">You may end the contract and receive a refund if:</p>
                <ul className="list-disc pl-5 mb-3 space-y-1 text-sm md:text-base leading-relaxed">
                  <li>we tell you about an upcoming change you do not agree to;</li>
                  <li>we tell you there was an error in the price or description and you do not want to continue;</li>
                  <li>there is a risk of significant delay because of events outside our control;</li>
                  <li>we suspend supply for more than 14 days for technical reasons;</li>
                  <li>or you have a legal right to end the contract because of something we did wrong.</li>
                </ul>
                <p className="text-sm md:text-base leading-relaxed font-bold">8.3 Change of mind</p>
                <p className="text-sm md:text-base leading-relaxed mb-3">For many online purchases, you may have the legal right to change your mind within 14 days.</p>
                <p className="text-sm md:text-base leading-relaxed font-bold">8.4 Products where change of mind does not apply</p>
                <p className="text-sm md:text-base leading-relaxed mb-2">This right does not usually apply to:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm md:text-base leading-relaxed">
                  <li>perishable goods;</li>
                  <li>sealed items that are unsealed after delivery where health or hygiene is relevant;</li>
                  <li>digital content once download or streaming has begun;</li>
                  <li>or products that become inseparably mixed with other items after delivery.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>9. HOW TO END THE CONTRACT</h3>
                <p className="text-sm md:text-base leading-relaxed">To cancel or return an order, contact us using the details on our website or the contact details in section 2. Please include your name, order number, and the email address used to place the order.</p>
                <p className="text-sm md:text-base leading-relaxed mt-2">If you return goods, they must be sent back in accordance with the return instructions we give you. Unless we agree otherwise, products should be returned in a reasonably safe and saleable condition.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>10. RETURNS, REFUNDS AND CANCELLATIONS</h3>
                <p className="text-sm md:text-base leading-relaxed">If an item is faulty, damaged, incorrect, or misdescribed, please contact us promptly with your order details and supporting photos if needed. We will review the issue and let you know whether a refund, replacement, or other remedy is available.</p>
                <p className="text-sm md:text-base leading-relaxed mt-2">For returned products, refunds will be issued to the original payment method once the return has been received and inspected, or once we have sufficient evidence that the product was returned, depending on the circumstances.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>11. IF THERE IS A PROBLEM WITH THE PRODUCT</h3>
                <p className="text-sm md:text-base leading-relaxed">If you have any questions or complaints about a product, please contact us using the details on our website. Nothing in these terms affects your statutory rights.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>12. PRICE AND PAYMENT</h3>
                <p className="text-sm md:text-base leading-relaxed">The price of the product will be the price shown at checkout at the time you place your order. We take reasonable care to ensure that prices are correct, but errors may occasionally occur.</p>
                <p className="text-sm md:text-base leading-relaxed mt-2">Payment must be made using the payment methods shown at checkout. For goods, payment is usually taken before dispatch.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>13. OUR RESPONSIBILITY FOR LOSS OR DAMAGE</h3>
                <p className="text-sm md:text-base leading-relaxed">We are responsible for foreseeable loss or damage caused by our breach of these terms or by our failure to use reasonable care and skill. We do not exclude or limit liability where it would be unlawful to do so.</p>
                <p className="text-sm md:text-base leading-relaxed mt-2">We are not responsible for business losses. Our products are intended for personal and domestic use unless we expressly agree otherwise.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>14. HOW WE MAY USE YOUR PERSONAL INFORMATION</h3>
                <p className="text-sm md:text-base leading-relaxed">We will use your personal information to process your order, deliver your products, take payment, and communicate with you about your purchase. We will handle personal data in accordance with our Privacy Policy.</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0a36af" }}>15. OTHER IMPORTANT TERMS</h3>
                <p className="text-sm md:text-base leading-relaxed">We may transfer our rights and obligations under these terms to another organisation, but this will not affect your rights.</p>
                <p className="text-sm md:text-base leading-relaxed mt-2">If a court finds any part of these terms unenforceable, the rest will continue to apply.</p>
                <p className="text-sm md:text-base leading-relaxed mt-2">These terms are governed by the laws of England and Wales, and the courts of England and Wales will have jurisdiction, unless mandatory local consumer law applies.</p>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 md:px-6 md:py-4 flex justify-end">
              <button onClick={() => setShowTermsOfService(false)} className="px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold text-sm md:text-base transition-all hover:opacity-90" style={{ backgroundColor: "#0a36af", color: "#ffffff" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;