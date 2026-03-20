import { Minus, Plus, Trash2, Lock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext"; 
import { useState, useEffect } from "react";

function Cart() {
  const navigate = useNavigate(); 
  
  // 1. Pulling the dynamic data from your Global Brain!
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("rezzilli_user");
    setIsLoggedIn(!!user);
  }, []);
 console.log(isLoggedIn);
  const FREE_DELIVERY_THRESHOLD = 50;
  const isFreeDelivery = cartTotal >= FREE_DELIVERY_THRESHOLD;

const handleCheckout = () => {
  navigate('/checkout');
};

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
        {/* Dynamic Item Count */}
        <p className="font-medium">{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</p>
      </div>
      
      {/* Dynamic Delivery Banner */}
      <div
        className="w-full py-3 text-center font-bold text-[15px] flex items-center justify-center gap-2 transition-colors"
        style={{ 
          backgroundColor: isFreeDelivery ? "#d1fae5" : "#ffc85b", 
          color: isFreeDelivery ? "#065f46" : "#0a36af" 
        }}
      >
        <span className="text-xl leading-none">{isFreeDelivery ? '👍' : '🎁'}</span> 
        {isFreeDelivery ? "Good news! You've got free delivery" : `Free Delivery over £${FREE_DELIVERY_THRESHOLD}`}
      </div>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-16">
        
        {/* If the cart is empty, show a clean message using your exact text sizing */}
        {cart.length === 0 ? (
          <div className="text-center py-10 flex flex-col items-center">
            <h2 className="text-[20px] font-bold uppercase tracking-wide mb-4">
              Your cart is empty
            </h2>
            <Link 
              to="/spritz" 
              className="text-[15px] font-bold uppercase tracking-wider transition-opacity hover:opacity-70 underline underline-offset-4"
              style={{ color: "#0a36af" }}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-[20px] font-bold uppercase tracking-wide mb-6">
                DELIVER NOW
              </h2>

              <div className="flex flex-col gap-8">
                {/* 2. Mapping through the REAL cart data */}
                {cart.map((item) => (
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
                          {/* Dynamic Minus Button */}
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 shadow-sm disabled:opacity-50"
                            style={{ backgroundColor: "#0a36af" }}
                          >
                            <Minus size={18} strokeWidth={3} />
                          </button>
                          
                          {/* Dynamic Quantity */}
                          <span className="text-[15px] font-extrabold w-4 text-center">
                            {item.quantity}
                          </span>
                          
                          {/* Dynamic Plus Button */}
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 shadow-sm"
                            style={{ backgroundColor: "#0a36af" }}
                          >
                            <Plus size={18} strokeWidth={3} />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <div className="text-right flex flex-col items-end gap-1">
                          {/* Dynamic Item Total Price */}
                          <div className="font-bold text-[15px] leading-none">
                            £{(item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.originalPrice && (
                            <div className="line-through text-[15px] font-medium leading-none">
                              {item.originalPrice}
                            </div>
                          )}
                        </div>

                        {/* Dynamic Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="hover:text-red-500 transition-colors mb-1 cursor-pointer"
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
                  {/* Dynamic Subtotal */}
                  <span className="font-medium">£{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[15px]">
                  <span className="font-medium">Delivery</span>
                  {/* Dynamic Delivery Text */}
                  <span className="font-medium">
                    {isFreeDelivery ? 'Free' : 'Calculated at Checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-[20px] mt-2 pt-4 border-t border-[#0a36af]/20">
                  <span className="font-extrabold">Total</span>
                  {/* Dynamic Grand Total */}
                  <span className="font-extrabold">£{cartTotal.toFixed(2)}</span>
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
        )}
      </main>
    </div>
  );
}

export default Cart;