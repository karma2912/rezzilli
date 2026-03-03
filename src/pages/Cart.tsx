import { Minus, Plus, Trash2, Lock, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = [
    {
      id: 1,
      name: "LEMON ITALIAN SPRITZ",
      variant: "24 BOTTLES",
      price: "£24.00",
      originalPrice: null,
      quantity: 1,
      image: "/image4.png",
    },
    {
      id: 2,
      name: "NON-ALCOHOL ORANGE ITALIAN SPRITZ",
      variant: "24 BOTTLES",
      price: "£19.00",
      originalPrice: "£24.00",
      quantity: 2,
      image: "/image6.png",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-['Libre_Baskerville',_serif]">
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
                      to="merchandise"
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
              <button
                className="hover:opacity-80 transition-opacity"
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
      <div className="w-full pt-10 pb-6 text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tighter text-black mb-2">
          CART
        </h1>
        <p className="text-gray-600 font-medium">3 Items</p>
      </div>
      <div
        className="w-full py-3 text-center font-bold text-black text-[15px] flex items-center justify-center gap-2"
        style={{ backgroundColor: "#ffc85b" }}
      >
        <span className="text-xl leading-none">🎁</span> Free Delivery over £50
      </div>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-lg font-bold uppercase tracking-wide text-black mb-6">
              DELIVER NOW
            </h2>

            <div className="flex flex-col gap-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 pb-8 border-b border-gray-200"
                >
                  <div className="w-24 h-32 md:w-32 md:h-40 flex-shrink-0 bg-gray-50 rounded-md flex items-center justify-center p-2 border border-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>

                  <div className="flex-1 flex justify-between">
                    <div className="flex flex-col justify-start gap-4">
                      <div>
                        <h3
                          className="font-extrabold text-[16px]  uppercase leading-tight"
                          style={{ color: "#0a36af" }}
                        >
                          {item.name}
                        </h3>
                        <p className="text-[14px] text-gray-600 mt-1 font-medium">
                          {item.variant}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 shadow-sm"
                          style={{ backgroundColor: "#0a36af" }}
                        >
                          <Minus size={18} strokeWidth={3} />
                        </button>
                        <span className="text-[16px] font-extrabold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 shadow-sm"
                          style={{ backgroundColor: "#0a36af" }}
                        >
                          <Plus size={18} strokeWidth={3} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right">
                        {item.originalPrice && (
                          <div className="text-gray-400 line-through text-[14px] font-medium mb-1">
                            {item.originalPrice}
                          </div>
                        )}
                        <div
                          className={`font-bold text-[16px] md:text-[18px] ${item.originalPrice ? "text-red-600" : "text-black"}`}
                        >
                          {item.price}
                        </div>
                      </div>

                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors mb-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between text-[15px]">
                <span className="font-medium text-gray-700">Subtotal</span>
                <span className="font-medium text-gray-900">£62.00</span>
              </div>
              <div className="flex justify-between text-[15px]">
                <span className="font-medium text-gray-700">Delivery</span>
                <span className="font-medium text-gray-900">
                  Calculated at Checkout
                </span>
              </div>
              <div className="flex justify-between text-[21px] mt-2 pt-4 border-t border-gray-200">
                <span className="font-extrabold text-black">Total</span>
                <span className="font-extrabold text-black">£62.00</span>
              </div>

              <div className="bg-[#f0f4f8] p-6 rounded-lg mt-4 border border-gray-200 text-center">
                <h4 className="font-extrabold text-[15px] uppercase tracking-wide text-black mb-2">
                  Have a discount code?
                </h4>
                <p className="text-[14px] text-gray-600 mb-4">
                  Enter your code below to apply it to your order
                </p>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Enter discount code"
                    className="w-full px-4 py-3 border border-gray-300 rounded text-[15px] focus:outline-none focus:border-[#0a36af]"
                  />
                  <button
                    className="w-full py-3 rounded text-white font-bold uppercase tracking-wider text-[14px] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#000000" }}
                  >
                    Apply
                  </button>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <button className="w-full py-4 rounded-full bg-white border-2 border-black text-black font-extrabold text-[15px] transition-colors hover:bg-gray-50">
                  Add a gift message
                </button>

                <Link
                  to="/checkout"
                  className="w-full py-4 rounded-full text-white font-extrabold text-[16px] uppercase tracking-wide transition-opacity hover:opacity-90 flex items-center justify-center gap-2 shadow-lg"
                  style={{ backgroundColor: "#0a36af" }}
                >
                  <Lock size={18} strokeWidth={2.5} /> Checkout
                </Link>
              </div>
              <div className="mt-6 text-center">
                <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-3">
                  Accepted payment methods
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap opacity-70">
                  <span className="px-2 py-1 border border-gray-300 rounded text-xs font-bold bg-white">
                    AMEX
                  </span>
                  <span className="px-2 py-1 border border-gray-300 rounded text-xs font-bold bg-white">
                    PAYPAL
                  </span>
                  <span className="px-2 py-1 border border-gray-300 rounded text-xs font-bold bg-white">
                    VISA
                  </span>
                  <span className="px-2 py-1 border border-gray-300 rounded text-xs font-bold bg-white">
                    MASTERCARD
                  </span>
                  <span className="px-2 py-1 border border-gray-300 rounded text-xs font-bold bg-white">
                    APPLE PAY
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cart;
