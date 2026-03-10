import { Minus, Plus, Trash2, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Cart() {
  const navigate = useNavigate(); 
  const isLoggedIn = true;
  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login'); 
    } else {
      navigate('/checkout'); 
    }
  };
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
    <div 
      className="min-h-screen w-full bg-white flex flex-col font-['Libre_Baskerville',_serif] text-[15px]"
      style={{ color: "#0a36af" }}
    >
      <Navbar/>
      <div className="w-full pt-10 pb-6 text-center">
        <h1 
          className="text-[30px] font-extrabold uppercase tracking-tighter mb-2"
        >
          CART
        </h1>
        <p className="font-medium">3 Items</p>
      </div>
      <div
        className="w-full py-3 text-center font-bold text-[15px] flex items-center justify-center gap-2"
        style={{ backgroundColor: "#ffc85b", color: "#0a36af" }}
      >
        <span className="text-xl leading-none">🎁</span> Free Delivery over £50
      </div>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-[20px] font-bold uppercase tracking-wide mb-6">
              DELIVER NOW
            </h2>

            <div className="flex flex-col gap-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 pb-8 border-b border-[#0a36af]/20"
                >
                  <div className="w-24 h-32 md:w-32 md:h-40 flex-shrink-0 bg-gray-50 rounded-md flex items-center justify-center p-2 ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>

                  <div className="flex-1 flex justify-between">
                    <div className="flex flex-col justify-start gap-4">
                      <div>
                        <h3 className="font-extrabold text-[15px] uppercase leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-[15px] mt-1 font-medium">
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
                        <span className="text-[15px] font-extrabold w-4 text-center">
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
                      <div className="text-right flex flex-col items-end gap-1">
                        <div className="font-bold text-[15px] leading-none">
                          {item.price}
                        </div>
                        {item.originalPrice && (
                          <div className="line-through text-[15px] font-medium leading-none">
                            {item.originalPrice}
                          </div>
                        )}
                        
                      </div>

                      <button
                        className="hover:text-red-500 transition-colors mb-1"
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
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">£62.00</span>
              </div>
              <div className="flex justify-between text-[15px]">
                <span className="font-medium">Delivery</span>
                <span className="font-medium">
                  Calculated at Checkout
                </span>
              </div>
              <div className="flex justify-between text-[20px] mt-2 pt-4 border-t border-[#0a36af]/20">
                <span className="font-extrabold">Total</span>
                <span className="font-extrabold">£62.00</span>
              </div>

              <div className="bg-blue-50/50 p-6 rounded-lg mt-4  text-center">
                <h4 className="font-extrabold text-[15px] uppercase tracking-wide mb-2">
                  Have a discount code?
                </h4>
                <p className="text-[15px] mb-4">
                  Enter your code below to apply it to your order
                </p>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Enter discount code"
                    className="w-full px-4 py-3 border border-[#0a36af]/30 rounded text-[15px] focus:outline-none focus:border-[#0a36af]"
                    style={{ color: "#0a36af" }}
                  />
                  <button
                    className="w-full py-3 rounded font-bold uppercase tracking-wider text-[15px] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#0a36af", color: "#ffc85b" }}
                  >
                    Apply
                  </button>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-full text-white font-extrabold text-[15px] uppercase tracking-wide transition-opacity hover:opacity-90 flex items-center justify-center gap-2 shadow-lg"
                  style={{ backgroundColor: "#0a36af" }}
                >
                  <Lock size={18} strokeWidth={2.5} /> Checkout
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-[15px] font-bold uppercase tracking-wide mb-3">
                  Accepted payment methods
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap opacity-80">
                  <span className="px-2 py-1 border border-[#0a36af]/30 rounded text-[15px] font-bold bg-white">
                    AMEX
                  </span>
                  <span className="px-2 py-1 border border-[#0a36af]/30 rounded text-[15px] font-bold bg-white">
                    PAYPAL
                  </span>
                  <span className="px-2 py-1 border border-[#0a36af]/30 rounded text-[15px] font-bold bg-white">
                    VISA
                  </span>
                  <span className="px-2 py-1 border border-[#0a36af]/30 rounded text-[15px] font-bold bg-white">
                    MASTERCARD
                  </span>
                  <span className="px-2 py-1 border border-[#0a36af]/30 rounded text-[15px] font-bold bg-white">
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