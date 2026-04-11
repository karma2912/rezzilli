import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Minus, Plus, Trash2, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  // --- CONTEXT & STATES ---
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const FREE_DELIVERY_THRESHOLD = 50;
  const isFreeDelivery = cartTotal >= FREE_DELIVERY_THRESHOLD;

  // --- FETCH SPECIFIC PRODUCT ---
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    fetch(`https://rezzillidrinks.com/api/get-products.php?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data.success && data.product) {
          setProduct(data.product);
        } else {
          setError("Product not found.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Network error. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  // --- DYNAMIC ADD TO CART (With Auto-Stock Check) ---
  const handleAddToCart = () => {
    const stockCount = Number(product?.stock) || 0;
    
    // Only allow adding to cart if Active AND Stock is greater than 0
    if (product && product.status === "Active" && stockCount > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        originalPrice:
          product.old_price && parseFloat(product.old_price) > 0
            ? `£${parseFloat(product.old_price).toFixed(2)}`
            : null,
        image: product.image,
        variant: product.variant || "Standard",
        quantity: quantity,
      });
      setIsCartOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col font-['Libre_Baskerville',_serif] bg-white">
        <Navbar />
        <main className="flex-grow w-full flex items-center justify-center">
          <p
            className="text-[20px] font-bold uppercase tracking-widest animate-pulse"
            style={{ color: "#0a36af" }}
          >
            Loading...
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen w-full flex flex-col font-['Libre_Baskerville',_serif] bg-white">
        <Navbar />
        <main className="flex-grow w-full flex items-center justify-center">
          <p className="text-[20px] font-bold text-red-500 uppercase tracking-widest">
            {error || "Product not found"}
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const priceValue = parseFloat(product.price);
  
  // --- AUTOMATIC STOCK & STATUS LOGIC ---
  const stockCount = Number(product.stock) || 0;
  const isActive = product.status === "Active";
  const isAvailable = isActive && stockCount > 0;

  let btnText = "ADD TO CART";
  if (!isActive) {
    btnText = product.status || "Coming Soon";
  } else if (stockCount <= 0) {
    btnText = "OUT OF STOCK";
  }

  return (
    <div className="min-h-screen w-full flex flex-col font-['Libre_Baskerville',_serif] bg-white">
      <Navbar />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-20 py-12">
        {/* --- TOP SECTION: Image & Buy Box --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start mb-20">
          <div className="w-full bg-white rounded-2xl flex items-center justify-center p-10 lg:p-20 border border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full max-w-[300px] lg:max-w-[400px] object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="w-full flex flex-col pt-4 lg:pt-8">
            <h1
              className="text-[30px] font-extrabold uppercase tracking-tighter mb-2"
              style={{ color: "#0a36af" }}
            >
              {product.name}
            </h1>

            {product.tagline && (
              <p
                className="text-[20px] text-gray-600 font-medium mb-6"
                style={{ color: "#0a36af" }}
              >
                {product.tagline}
              </p>
            )}

            {(product.abv || product.size) && (
              <div
                className="flex items-center gap-4 text-[15px] font-bold uppercase tracking-widest mb-8 border-b border-gray-200 pb-6"
                style={{ color: "#0a36af" }}
              >
                {product.abv && <span>ABV {product.abv}</span>}
                {product.abv && product.size && (
                  <span className="text-gray-300">|</span>
                )}
                {product.size && <span>SIZE {product.size}</span>}
              </div>
            )}

            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-center gap-3">
                <span
                  className="text-[20px] font-extrabold"
                  style={{ color: "#0a36af" }}
                >
                  £{priceValue.toFixed(2)}
                </span>

                {product.old_price && parseFloat(product.old_price) > 0 && (
                  <span
                    className="text-[20px] line-through font-semibold"
                    style={{ color: "#0a36af" }}
                  >
                    £{parseFloat(product.old_price).toFixed(2)}
                  </span>
                )}
              </div>

              {product.variant && (
                <span
                  className="text-[15px] font-medium"
                  style={{ color: "#0a36af" }}
                >
                  {product.variant}
                  {quantity > 1 && (
                    <span className="ml-1.5 font-bold">x{quantity}</span>
                  )}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
              <div
                className="flex items-center justify-between w-full sm:w-32 h-14 border-2 rounded-xl px-4"
                style={{ borderColor: "rgba(10, 54, 175, 0.2)" }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, Number(quantity) - 1))}
                  className="text-gray-500 hover:text-[#0a36af] transition-colors cursor-pointer"
                >
                  <Minus size={20} strokeWidth={2.5} />
                </button>

                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity === 0 ? "" : quantity}
                  onChange={(e) => {
                    const num = parseInt(e.target.value);
                    setQuantity(isNaN(num) ? 0 : num > 10 ? 10 : num);
                  }}
                  onBlur={() => {
                    if (quantity < 1) setQuantity(1);
                  }}
                  className="text-[15px] font-extrabold text-center w-12 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  style={{ color: "#0a36af" }}
                />

                <button
                  onClick={() =>
                    setQuantity(
                      Number(quantity) < 10 ? Number(quantity) + 1 : 10,
                    )
                  }
                  className="text-gray-500 hover:text-[#0a36af] transition-colors cursor-pointer"
                >
                  <Plus size={20} strokeWidth={2.5} />
                </button>
              </div>

              <button
                onClick={() => isAvailable && handleAddToCart()}
                disabled={!isAvailable}
                className={`w-full h-14 rounded-xl font-extrabold text-[20px] uppercase tracking-widest transition-opacity shadow-md ${isAvailable ? "hover:opacity-90 cursor-pointer" : "opacity-70 cursor-not-allowed"}`}
                style={{ backgroundColor: "#0a36af", color: "#ffc85b" }}
              >
                {btnText}
              </button>
            </div>

            {/* --- FIXED: Hide entire box if Admin explicitly left the banner blank --- */}
            {product.delivery?.banner !== "" && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#faf9f6] border border-gray-100">
                <span className="text-xl">📦</span>
                <p
                  className="text-[15px] font-medium"
                  style={{ color: "#0a36af" }}
                >
                  {product.delivery?.banner || `Free Standard UK Delivery on orders over £${FREE_DELIVERY_THRESHOLD}`}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto flex flex-col gap-16 pt-4">
          {product.description && Array.isArray(product.description) && product.description.length > 0 && (
            <div>
              <h2
                className="font-extrabold text-[30px] uppercase tracking-wide mb-6"
                style={{ color: "#0a36af" }}
              >
                Product Description
              </h2>
              <div
                className="text-[15px] leading-relaxed space-y-4"
                style={{ color: "#0a36af" }}
              >
                {product.description.map((paragraph: string, index: number) => (
                  <p key={index}>
                    {paragraph.includes("Ingredients:") ? (
                      <>
                        <strong style={{ color: "#0a36af" }}>
                          Ingredients:
                        </strong>
                        {paragraph.split("Ingredients:")[1]}
                      </>
                    ) : paragraph.includes("Tasting note:") ? (
                      <>
                        <strong style={{ color: "#0a36af" }}>
                          Tasting note:
                        </strong>
                        {paragraph.split("Tasting note:")[1]}
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
              </div>
            </div>
          )}

          {product.delivery && (
            <div>
              <h2
                className="font-extrabold text-[30px] uppercase tracking-wide mb-6"
                style={{ color: "#0a36af" }}
              >
                Delivery Information
              </h2>
              <div
                className="text-[15px] leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#faf9f6] p-8 rounded-xl border border-gray-100"
                style={{ color: "#0a36af" }}
              >
                {product.delivery.standard && Array.isArray(product.delivery.standard) && (
                  <div>
                    <h4 className="font-bold mb-3 text-[16px] underline underline-offset-4 decoration-[#ffc85b]">
                      Standard UK Delivery:
                    </h4>
                    <ul className="list-disc pl-5 space-y-3">
                      {product.delivery.standard.map(
                        (item: string, i: number) => (
                          <li key={i} className="pl-1">
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
                {product.delivery.nextDay && Array.isArray(product.delivery.nextDay) && (
                  <div>
                    <h4 className="font-bold mb-3 text-[16px] underline underline-offset-4 decoration-[#ffc85b]">
                      Next Day Delivery:
                    </h4>
                    <ul className="list-disc pl-5 space-y-3">
                      {product.delivery.nextDay.map(
                        (item: string, i: number) => (
                          <li key={i} className="pl-1">
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {product.nutrition && product.nutrition.table && Array.isArray(product.nutrition.table) && (
            <div>
              <h2
                className="font-extrabold text-[30px] uppercase tracking-wide mb-6"
                style={{ color: "#0a36af" }}
              >
                Nutritional Information
              </h2>
              <div
                className="text-[15px] leading-relaxed"
                style={{ color: "#0a36af" }}
              >
                {product.nutrition.typicalValues && (
                  <p className="font-bold mb-4">
                    {product.nutrition.typicalValues}
                  </p>
                )}

                <div className="overflow-hidden border border-[#0a36af]/20 rounded-lg max-w-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#faf9f6]">
                        <th className="p-4 border-b border-r border-[#0a36af]/20 font-bold w-1/3">
                          Nutrient
                        </th>
                        <th className="p-4 border-b border-[#0a36af]/20 font-bold">
                          Amount per 100 ml
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.nutrition.table.map((row: any, i: number) => (
                        <tr
                          key={i}
                          className={
                            i !== product.nutrition.table.length - 1
                              ? "border-b border-[#0a36af]/20"
                              : ""
                          }
                        >
                          <td className="p-4 border-r border-[#0a36af]/20 font-medium">
                            {row.label}
                          </td>
                          <td className="p-4">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {product.nutrition.additionalInfo &&
                  Array.isArray(product.nutrition.additionalInfo) &&
                  product.nutrition.additionalInfo.length > 0 && (
                    <div className="mt-8">
                      <p className="font-bold mb-4 text-[15px] uppercase tracking-wide">
                        ADDITIONAL INFORMATION
                      </p>
                      <ul className="list-disc pl-5 space-y-3">
                        {product.nutrition.additionalInfo.map(
                          (info: string, i: number) => (
                            <li key={i} className="pl-1">
                              {info}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          )}
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
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[100] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-5 pb-4">
          <h2
            className="text-2xl font-extrabold uppercase tracking-tighter"
            style={{ color: "#0a36af" }}
          >
            Cart
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X size={26} color="#000000" strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-5 pb-5 space-y-3">
          {isFreeDelivery ? (
            <div className="bg-[#d1fae5] py-3 px-4 flex items-center gap-3 font-bold text-[#065f46] text-[14px] rounded-sm">
              <span className="text-xl leading-none">👍</span> Good news! You've
              got free delivery
            </div>
          ) : (
            <div
              className="py-3 px-4 flex items-center gap-3 font-bold text-black text-[14px] rounded-sm"
              style={{ color: "#0a36af", backgroundColor: "#ffc85b" }}
            >
              <span className="text-xl leading-none">🎁</span> Free Delivery
              over £{FREE_DELIVERY_THRESHOLD}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-70">
              <span className="text-5xl mb-4">🛒</span>
              <p className="text-[16px] font-bold" style={{ color: "#0a36af" }}>
                Your cart is empty
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 py-5 border-b border-gray-200"
              >
                <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md flex items-center justify-center p-2 border border-gray-100 hover:opacity-80 transition-opacity cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                      onClick={() => setIsCartOpen(false)}
                    >
                      <h3
                        className="font-extrabold text-[16px] uppercase leading-tight"
                        style={{ color: "#0a36af" }}
                      >
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  <div className="font-bold text-[14px] text-black mt-1">
                    £{(item.price * item.quantity).toFixed(2)}
                  </div>
                  <p className="text-[12px] text-gray-700 mt-1 font-medium">
                    {item.variant}
                  </p>

                  <div className="flex items-center gap-5 mt-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 shadow-sm cursor-pointer"
                        style={{ backgroundColor: "#0a36af" }}
                      >
                        <Minus size={18} strokeWidth={3} />
                      </button>
                      <span className="text-[16px] font-extrabold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.min(10, item.quantity + 1),
                          )
                        }
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 shadow-sm cursor-pointer"
                        style={{ backgroundColor: "#0a36af" }}
                      >
                        <Plus size={18} strokeWidth={3} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between text-[14px]">
                <span className="font-bold" style={{ color: "#0a36af" }}>
                  Subtotal
                </span>
                <span className="font-bold" style={{ color: "#0a36af" }}>
                  £{cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="font-bold" style={{ color: "#0a36af" }}>
                  Delivery
                </span>
                <span className="font-bold" style={{ color: "#0a36af" }}>
                  {isFreeDelivery ? "Free" : "Calculated at Checkout"}
                </span>
              </div>
              <div className="flex justify-between text-[18px] mt-3 pt-3 border-t border-gray-200">
                <span className="font-extrabold" style={{ color: "#0a36af" }}>
                  Total
                </span>
                <span className="font-extrabold" style={{ color: "#0a36af" }}>
                  £{cartTotal.toFixed(2)}
                </span>
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
      <Footer />
    </div>
  );
}

export default ProductDetail;