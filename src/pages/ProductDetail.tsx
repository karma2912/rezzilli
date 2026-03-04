import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Minus, Plus, Trash2, X } from "lucide-react";

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showAlcoholPolicy, setShowAlcoholPolicy] = useState(false);
  const isLoggedIn = false;
  const handleAddToCart = () => {
    setIsCartOpen(true);
  };
  // Dummy product data based on the client's Limoncini mockup
  const product = {
    name: "Limoncini",
    tagline: "Sparkling Sicilian Lemon Italian Spritz",
    price: "£32.99",
    abv: "3.4%",
    size: "275ML",
    image: "/image4.png",
    variant: "24 Bottles",
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-['Libre_Baskerville',_serif] bg-white">
      <header
        className="w-full py-3 px-6 md:py-4 md:px-6 sticky top-0 z-50 header-container"
        style={{ backgroundColor: "#0a36af" }}
      >
        <style>{`
    @media screen and (max-width: 700px) {
      .header-container {
        padding-left: 16px !important;
        padding-right: 16px !important;
      }
    }

    @media screen and (max-width: 560px) {
      .header-nav-row {
        flex-direction: column !important;
        gap: 12px !important;
      }
      .right-actions {
        position: static !important;
        margin-top: 8px;
      }
      .nav-links {
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px !important;
      }
    }

    @media screen and (max-width: 320px) {
      .header-container {
        padding-left: 12px !important;
        padding-right: 12px !important;
      }
      .header-logo {
        height: 28px !important;
      }
      .origins-btn {
        font-size: 11px !important;
      }
    }
  `}</style>
        <div className="max-w-7xl mx-auto flex flex-col items-center relative">
          <img
            src="/rezzilli.png"
            alt="Rezzilli Logo"
            className="h-14 md:h-20 header-logo"
          />
          <div className="w-full flex items-center justify-center header-nav-row mt-1 md:mt-2">
            <nav className="flex items-center justify-center gap-6 md:gap-15 lg:gap-16 nav-links">
              <Link
                to="/"
                className="py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                style={{ color: "#ffc85b" }}
              >
                Origins
              </Link>
              <Link
                to="/"
                className="py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                style={{ color: "#ffc85b" }}
              >
                Why Us
              </Link>
              <div className="relative group">
                <button
                  className="flex items-center gap-1 py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                  style={{ color: "#ffc85b" }}
                >
                  Shop
                  <ChevronDown
                    size={16}
                    className="mt-[2px] transition-transform duration-200 group-hover:rotate-180"
                  />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[150px]">
                  <div
                    className="flex flex-col py-2 shadow-2xl"
                    style={{ backgroundColor: "#0a36af" }}
                  >
                    <Link
                      to="/spritz"
                      className="block px-5 py-2.5 text-start text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
                      style={{ color: "#ffc85b" }}
                    >
                      Spritz
                    </Link>
                    <Link
                      to="/merchandise"
                      className="px-5 py-2.5 text-start text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
                      style={{ color: "#ffc85b" }}
                    >
                      Merchandise
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                to="/"
                className="py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                style={{ color: "#ffc85b" }}
              >
                Events & Updates
              </Link>
              <Link
                to="/"
                className="py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                style={{ color: "#ffc85b" }}
              >
                Contact Us
              </Link>
            </nav>
            <div className="absolute right-0 flex items-center gap-5 px-3 py-1.5 md:px-4 md:py-2 right-actions">
              <div className="relative group flex items-center h-full">
                <button
                  className="hover:opacity-80 transition-opacity flex items-center py-2"
                  aria-label="User Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 md:w-6 md:h-6"
                    style={{ color: "#ffffff" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 md:right-1/2 md:translate-x-1/2 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[140px]">
                  <div
                    className="flex flex-col py-2 shadow-2xl"
                    style={{ backgroundColor: "#0a36af" }}
                  >
                    {!isLoggedIn ? (
                      <Link
                        to="/login"
                        className="block px-5 py-2.5 text-center text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
                        style={{ color: "#ffc85b" }}
                      >
                        Login
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          className="block px-5 py-2.5 text-center text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
                          style={{ color: "#ffc85b" }}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => console.log("Sign out clicked")}
                          className="block w-full px-5 py-2.5 text-center text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
                          style={{ color: "#ffc85b" }}
                        >
                          Sign Out
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Link
                to="/cart"
                className="relative hover:opacity-80 transition-opacity mt-0.5"
                aria-label="Shopping Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 md:w-6 md:h-6"
                  style={{ color: "#ffffff" }}
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
                <span
                  className="absolute -top-2 -right-2.5 rounded-full text-white text-[10px] md:text-[11px] font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center"
                  style={{ backgroundColor: "#5484BA" }}
                >
                  1
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="text-[13px] text-gray-500 font-semibold tracking-wide uppercase">
          <Link to="/" className="hover:text-[#0a36af] transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/spritz" className="hover:text-[#0a36af] transition-colors">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#0a36af]">{product.name}</span>
        </div>
      </div>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-20">
        {/* --- TOP SECTION: Image & Buy Box --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start mb-20">
          {/* Left: Product Image */}
          <div className="w-full bg-white rounded-2xl flex items-center justify-center p-10 lg:p-20 border border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-[300px] lg:max-w-[400px] object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right: Product Details & Buy Box */}
          <div className="w-full flex flex-col pt-4 lg:pt-8">
            <h1
              className="text-3xl font-extrabold uppercase tracking-tighter mb-2"
              style={{ color: "#0a36af" }}
            >
              {product.name}
            </h1>
            <p className="text-[15px] text-gray-600 font-medium mb-6">
              {product.tagline}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-[13px] font-bold uppercase tracking-widest text-gray-800 mb-8 border-b border-gray-200 pb-6">
              <span>ABV {product.abv}</span>
              <span className="text-gray-300">|</span>
              <span>SIZE {product.size}</span>
            </div>

            {/* Price & Variant */}
            <div className="flex flex-col gap-2 mb-8">
              <span className="text-2xl font-extrabold text-black">
                {product.price}
              </span>
              <span className="text-[13px] text-gray-500 font-medium">
                {product.variant}
                {quantity > 1 && (
                  <span className="ml-1.5 font-bold text-[#0a36af]">
                    x{quantity}
                  </span>
                )}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
              {/* Quantity Selector */}
              <div
                className="flex items-center justify-between w-full sm:w-32 h-14 border-2 rounded-xl px-4"
                style={{ borderColor: "rgba(10, 54, 175, 0.2)" }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-[#0a36af] transition-colors"
                >
                  <Minus size={20} strokeWidth={2.5} />
                </button>
                <span
                  className="text-[15px] font-extrabold"
                  style={{ color: "#0a36af" }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 hover:text-[#0a36af] transition-colors"
                >
                  <Plus size={20} strokeWidth={2.5} />
                </button>
              </div>
              <button
                onClick={() => handleAddToCart()}
                className="w-full h-14 rounded-xl font-extrabold text-[15px] uppercase tracking-widest transition-opacity hover:opacity-90 shadow-md"
                style={{ backgroundColor: "#0a36af", color: "#ffc85b" }}
              >
                Add To Cart
              </button>
            </div>

            {/* Delivery Highlight */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#faf9f6] border border-gray-100">
              <span className="text-xl">📦</span>
              <p className="text-[14px] font-medium text-gray-700">
                Free Standard UK Delivery on orders over £50
              </p>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: Expanded Information (Scrollable) --- */}
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-16 pt-16 border-t border-gray-200">
          {/* 1. Description */}
          <div>
            <h2
              className="font-extrabold text-[22px] md:text-[28px] uppercase tracking-wide mb-6"
              style={{ color: "#0a36af" }}
            >
              Product Description
            </h2>
            <div className="text-[15px] leading-relaxed text-gray-700 space-y-4">
              <p>
                Limoncini - Sparkling Alcoholic Sicilian Lemon alcoholic drink
                with natural flavours and 3.4% alcohol volume.
              </p>
              <p>
                <strong className="text-black">Ingredients:</strong> Carbonated
                water, distilled non grain spirit, beet sugar, 10% Sicilian
                lemon juice from concentrate, natural flavours, antioxidant
                (ascorbic acid).
              </p>
              <p>
                <strong className="text-black">Tasting note:</strong> Rezzilli
                is a premium sparkling Sicilian Lemon alcoholic drink made with
                natural flavourings and white Vermouth. Suitable for Vegans and
                Vegetarians. Gluten Free. 3.4% Alc Vol. Best served chilled over
                lots of ice, garnish with a sprig of rosemary, lavender or fresh
                garden mint in a Spritz glass. Not suitable for persons under 18
                years old.
              </p>
            </div>
          </div>

          {/* 2. Delivery */}
          <div>
            <h2
              className="font-extrabold text-[22px] md:text-[28px] uppercase tracking-wide mb-6"
              style={{ color: "#0a36af" }}
            >
              Delivery Information
            </h2>
            <div className="text-[15px] leading-relaxed text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#faf9f6] p-8 rounded-xl border border-gray-100">
              <div>
                <h4 className="font-bold text-black mb-3 text-[16px] underline underline-offset-4 decoration-[#ffc85b]">
                  Standard UK Delivery:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="text-[#0a36af]">&bull;</span> Orders under
                    £50 - £5
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#0a36af]">&bull;</span> Orders over
                    £50 - Free
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-black mb-3 text-[16px] underline underline-offset-4 decoration-[#ffc85b]">
                  Next Day Delivery:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="text-[#0a36af]">&bull;</span> Orders under
                    £50 - £7.95
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#0a36af]">&bull;</span> Orders over
                    £50 - £2.95
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Nutritional Info */}
          <div>
            <h2
              className="font-extrabold text-[22px] md:text-[28px] uppercase tracking-wide mb-6"
              style={{ color: "#0a36af" }}
            >
              Nutritional Information
            </h2>
            <div className="text-[15px] leading-relaxed text-gray-700">
              <p className="font-bold text-black mb-4">
                Typical values (average per 100 ml)
              </p>

              {/* Styled Table */}
              <div className="overflow-hidden border border-gray-200 rounded-lg max-w-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#faf9f6]">
                      <th className="p-4 border-b border-r border-gray-200 font-bold text-black w-1/3">
                        Nutrient
                      </th>
                      <th className="p-4 border-b border-gray-200 font-bold text-black">
                        Amount per 100 ml
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 border-r border-gray-200 font-medium text-black">
                        Energy
                      </td>
                      <td className="p-4">
                        166 kJ / 40 kcal (108 kcal per 275 ml)
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 border-r border-gray-200 font-medium text-black">
                        Fat
                      </td>
                      <td className="p-4">0 g</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 border-r border-gray-200 font-medium text-black">
                        Saturated fat
                      </td>
                      <td className="p-4">0 g</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 border-r border-gray-200 font-medium text-black">
                        Carbohydrate
                      </td>
                      <td className="p-4">3.8 g</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 border-r border-gray-200 font-medium text-black">
                        Sugar (Carbs)
                      </td>
                      <td className="p-4">3.7 g</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 border-r border-gray-200 font-medium text-black">
                        Fiber
                      </td>
                      <td className="p-4">0 g</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 border-r border-gray-200 font-medium text-black">
                        Protein
                      </td>
                      <td className="p-4">0 g</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-r border-gray-200 font-medium text-black">
                        Salt
                      </td>
                      <td className="p-4">0.01 g</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Additional Info */}
              <div className="mt-8 bg-[#faf9f6] p-6 md:p-8 rounded-xl border border-gray-100">
                <p className="font-bold text-black mb-4 text-[16px] uppercase tracking-wide">
                  Additional information
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffc85b] mt-1">&bull;</span> Suitable
                    for vegans and vegetarians.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffc85b] mt-1">&bull;</span> No
                    sweeteners, no preservatives, no artificial flavours.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffc85b] mt-1">&bull;</span> Not
                    recommended for individuals under 18 years of age.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffc85b] mt-1">&bull;</span> The
                    mineral quantities of the water used have been included in
                    the sodium calculation for the salt value.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffc85b] mt-1">&bull;</span> Gluten
                    free
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

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
          <h2 className="text-2xl font-extrabold uppercase tracking-tighter text-black">
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
          {/* Success Banner */}
          <div className="bg-[#d1fae5] py-3 px-4 flex items-center gap-3 font-bold text-[#065f46] text-[14px] rounded-sm">
            <span className="text-xl leading-none">👍</span> Good news! You've
            got free delivery
          </div>
          {/* Info Banner */}
          <div
            className="py-3 px-4 flex items-center gap-3 font-bold text-black text-[14px] rounded-sm"
            style={{ backgroundColor: "#ffc85b" }}
          >
            <span className="text-xl leading-none">🎁</span> Free Delivery over
            £50
          </div>
        </div>

        {/* Cart Items Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-5">
          {/* Cart Item */}
          <div className="flex gap-5 py-5 border-b border-gray-200">
            {/* Thumbnail */}
            <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md flex items-center justify-center p-2 border border-gray-100">
              <img
                src="/image4.png"
                alt="Limoncini"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3
                  className="font-extrabold text-[16px] uppercase leading-tight"
                  style={{ color: "#0a36af" }}
                >
                  LEMON ITALIAN SPRITZ
                </h3>
              </div>

              <div className="font-bold text-[14px] text-black mt-1">
                £24.00
              </div>

              <p className="text-[12px] text-gray-700 mt-1 font-medium">
                24 Bottles
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-5 mt-4">
                <div className="flex items-center gap-4">
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 shadow-sm"
                    style={{ backgroundColor: "#0a36af" }}
                  >
                    <Minus size={18} strokeWidth={3} />
                  </button>

                  <span className="text-[16px] font-extrabold w-4 text-center">
                    1
                  </span>

                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 shadow-sm"
                    style={{ backgroundColor: "#0a36af" }}
                  >
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>

                <button
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
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
              <span className="font-medium text-gray-900">
                Calculated at Checkout
              </span>
            </div>
            <div className="flex justify-between text-[18px] mt-3 pt-3 border-t border-gray-200">
              <span className="font-extrabold text-black">Total</span>
              <span className="font-extrabold text-black">£24.00</span>
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
      </div>
      <footer
        className="w-full px-4 py-8 md:px-6 md:py-12"
        style={{ backgroundColor: "#0a36af" }}
      >
        <div className="max-w-7xl mx-auto text-center space-y-3 md:space-y-4">
          <img
            src="/rezzilli.png"
            alt="REZZILLI"
            className="h-14 md:h-12 mx-auto"
          />
          <a
            href="https://www.instagram.com/rezzillidrinks/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="md:w-7 md:h-7"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <p className="text-[15px]" style={{ color: "#ffffff" }}>
            Email:{" "}
            <a
              href="mailto:hello@rezzillidrinks.com"
              className="hover:underline"
            >
              hello@rezzillidrinks.com
            </a>
          </p>
          <p className="text-[15px]" style={{ color: "#ffffff" }}>
            Contact no. +447832198470
          </p>
          <p className="text-[15px]" style={{ color: "#ffffff" }}>
            Address: 31, West Street, Burton upon Trent, DE11 9DN
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            <button
              onClick={() => setShowPrivacyPolicy(true)}
              className="text-white underline font-medium transition-opacity hover:opacity-80 text-[15px]"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setShowAlcoholPolicy(true)}
              className="text-white underline font-medium transition-opacity hover:opacity-80 text-[15px]"
            >
              Alcohol and Safe Use
            </button>
          </div>
          <p className="text-[15px]" style={{ color: "#ffffff" }}>
            &copy; 2025 REZZILLI. All rights reserved
          </p>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black bg-opacity-50">
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

      {showAlcoholPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black bg-opacity-50">
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
    </div>
  );
}

export default ProductDetail;
