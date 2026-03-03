import { Link } from "react-router-dom";
import {
  Gift,
  Plus,
  Search,
  HelpCircle,
  Lock,
  ChevronLeft,
} from "lucide-react";

function Checkout() {
  // Dummy data for the checkout summary
  const checkoutItems = [
    {
      id: 1,
      name: "LEMON ITALIAN SPRITZ",
      variant: "4 Bottles",
      price: "£24.00",
      quantity: 1,
      image: "/image4.png",
    },
    {
      id: 2,
      name: "NON-ALCOHOL ORANGE ITALIAN SPRITZ",
      variant: "24 BOTTLES",
      price: "£110.37",
      quantity: 13,
      image: "/image6.png",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-['Libre_Baskerville',_serif] text-[14px]">
      <div className="w-full lg:w-[55%] xl:w-[55%] bg-white pt-8 pb-20 px-6 lg:px-12 xl:px-24 flex justify-end lg:min-h-screen">
        <div className="w-full max-w-2xl flex flex-col">
          <Link to="/" className="mb-8 block">
            <img src="/rezzilli.png" alt="Rezzilli" className="h-10 md:h-20" />
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-1 text-[#0a36af] hover:opacity-70 font-semibold mb-8 w-fit transition-opacity"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            Return to cart
          </Link>
          <section className="mb-10">
            <h2 className="text-xl font-bold text-black mb-2">
              Purchasing as a gift?
            </h2>
            <p className="text-gray-600 mb-4 text-[14px]">
              Write a personalised gift message, select when to send it. We'll
              handle the rest!
            </p>
            <button className="w-full border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <Gift size={20} className="text-gray-500" /> Add a gift message
              </div>
              <Plus size={20} className="text-gray-500" />
            </button>
            <p className="text-[11px] text-gray-400 mt-2">
              Delivered by <span className="underline">Giftnote</span>
            </p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">Delivery</h2>

            <div className="space-y-3">
              <div className="relative">
                <label className="absolute top-1.5 left-3 text-[11px] text-gray-500">
                  Country/Region
                </label>
                <select className="w-full border border-gray-300 rounded-lg pt-6 pb-2 px-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] appearance-none bg-white">
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Europe</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af]"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af]"
                />
              </div>

              <input
                type="text"
                placeholder="Company (optional)"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af]"
              />

              <div className="relative">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af]"
                />
                <Search
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af]"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af]"
                />
                <input
                  type="text"
                  placeholder="Postcode"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af]"
                />
              </div>

              <div className="relative">
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af]"
                />
                <HelpCircle
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
                />
              </div>
            </div>
          </section>
          <section className="mb-10">
            <h2 className="text-xl font-bold text-black mb-4">
              Shipping method
            </h2>
            <div className="bg-[#f3f4f6] rounded-lg p-5 text-center text-gray-500 text-[14px]">
              Enter your shipping address to view available shipping methods.
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-1">Payment</h2>
            <p className="text-gray-500 text-[13px] mb-4">
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
                  <span className="font-bold text-black">Credit card</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-9 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-blue-900">
                    VISA
                  </div>
                  <div className="w-9 h-6 bg-white border border-gray-200 rounded flex items-center justify-center">
                    <div className="flex">
                      <div className="w-3 h-3 bg-red-500 rounded-full mix-blend-multiply"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full -ml-1 mix-blend-multiply"></div>
                    </div>
                  </div>
                  <div className="w-9 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">
                    +5
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Card number"
                    className="w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] bg-white"
                  />
                  <Lock
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Expiration date (MM / YY)"
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] bg-white"
                  />
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Security code"
                      className="w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] bg-white"
                    />
                    <HelpCircle
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Name on card"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] bg-white"
                />

                <div className="pt-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="billing"
                    className="w-4 h-4 text-[#0a36af] rounded border-gray-300 focus:ring-[#0a36af]"
                    defaultChecked
                  />
                  <label htmlFor="billing" className="text-sm text-gray-700">
                    Use shipping address as billing address
                  </label>
                </div>
              </div>
            </div>
          </section>
          <button
            className="w-full py-4 mt-4 rounded-lg text-white font-extrabold text-[16px] transition-opacity hover:opacity-90 shadow-md"
            style={{ backgroundColor: "#0a36af" }}
          >
            Pay now
          </button>
        </div>
      </div>
      <div className="w-full lg:w-[45%] xl:w-[45%] bg-[#f9fafb] border-t lg:border-t-0 lg:border-l border-gray-200 lg:min-h-screen">
        <div className="lg:sticky lg:top-0 w-full pt-8 lg:pt-14 pb-20 px-6 lg:px-12 xl:px-16 flex justify-start">
          <div className="w-full max-w-md flex flex-col">
            <div className="flex flex-col gap-4 mb-6">
              {checkoutItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0 bg-white border border-gray-200 rounded-lg flex items-center justify-center p-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                    <span
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-white text-[12px] font-bold flex items-center justify-center z-10"
                      style={{ backgroundColor: "rgba(113, 113, 122, 0.9)" }}
                    >
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[14px] leading-tight text-black">
                      {item.name}
                    </h3>
                    <p className="text-[12px] text-gray-500 mt-0.5">
                      {item.variant}
                    </p>
                  </div>
                  <div className="font-medium text-[14px] text-black">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 py-6 border-t border-b border-gray-200 mb-6">
              <input
                type="text"
                placeholder="Voucher or gift card"
                className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#0a36af] focus:ring-1 focus:ring-[#0a36af] bg-white"
              />
              <button className="px-5 py-3 bg-gray-200 text-gray-500 font-semibold rounded-md transition-colors hover:bg-gray-300 hover:text-gray-700">
                Apply
              </button>
            </div>
            <div className="flex flex-col gap-3 text-[14px]">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal &middot; 14 items
                </span>
                <span className="font-medium text-black">£116.86</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-500 text-[13px]">
                  Enter shipping address
                </span>
              </div>

              <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-200">
                <span className="text-[16px] font-bold text-black">Total</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[12px] text-gray-500 font-medium mb-1">
                    GBP
                  </span>
                  <span className="text-[24px] font-extrabold text-black">
                    £116.86
                  </span>
                </div>
              </div>
              <div className="text-right text-[12px] text-gray-500 mt-1">
                Including £19.48 in taxes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
