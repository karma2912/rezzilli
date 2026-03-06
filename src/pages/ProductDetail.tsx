import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const FREE_DELIVERY_THRESHOLD = 50; 
  const cartTotal = 24.00 * quantity;
  const handleAddToCart = () => {
    setIsCartOpen(true);
  };

 const product = {
    name: "Limoncini",
    tagline: "Sparkling Sicilian Lemon Italian Spritz",
    price: "£24.00",
    oldPrice: "£30.00",
    variant: "24 Bottles",
    abv: "3.4%", 
    size: "275ML",
    image: "/image4.png",
    
    description: [
      "Limoncini - Sparkling Alcoholic Sicilian Lemon alcoholic drink with natural flavours and 3.4% alcohol volume.",
      "Ingredients: Carbonated water, distilled non grain spirit, beet sugar, 10% Sicilian lemon juice from concentrate, natural flavours, antioxidant (ascorbic acid).",
      "Tasting note: Rezzilli is a premium sparkling Sicilian Lemon alcoholic drink made with natural flavourings and white Vermouth. Suitable for Vegans and Vegetarians. Gluten Free. 3.4% Alc Vol. Best served chilled over lots of ice, garnish with a sprig of rosemary, lavender or fresh garden mint in a Spritz glass. Not suitable for persons under 18 years old."
    ],
    delivery: {
      standard: ["Orders under £50 - £5", "Orders over £50 - Free"],
      nextDay: ["Orders under £50 - £7.95", "Orders over £50 - £2.95"]
    },
    nutrition: {
      typicalValues: "Typical values (average per 100 ml)",
      table: [
        { label: "Energy", value: "166 kJ / 40 kcal (108 kcal per 275 ml)" },
        { label: "Fat", value: "0 g" },
        { label: "Saturated fat", value: "0 g" },
        { label: "Carbohydrate", value: "3.8 g" },
        { label: "Sugar (Carbs)", value: "3.7 g" },
        { label: "Fiber", value: "0 g" },
        { label: "Protein", value: "0 g" },
        { label: "Salt", value: "0.01 g" }
      ],
      additionalInfo: [
        "Suitable for vegans and vegetarians.",
        "No sweeteners, no preservatives, no artificial flavours.",
        "Not recommended for individuals under 18 years of age.",
        "The mineral quantities of the water used have been included in the sodium calculation for the salt value.",
        "Gluten free"
      ]
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-['Libre_Baskerville',_serif] bg-white">
      <Navbar/>
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
              className="text-[30px] font-extrabold uppercase tracking-tighter mb-2"
              style={{ color: "#0a36af" }}
            >
              {product.name}
            </h1>
            <p className="text-[20px] text-gray-600 font-medium mb-6" style={{ color: "#0a36af" }}> 
              {product.tagline}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-[15px] font-bold uppercase tracking-widest text-gray-800 mb-8 border-b border-gray-200 pb-6">
              <span>ABV {product.abv}</span>
              <span className="text-gray-300">|</span>
              <span>SIZE {product.size}</span>
            </div>

            {/* Price & Variant */}
           <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-[20px] font-extrabold text-black">
                  {product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-[15px] text-gray-400 line-through font-semibold">
                    {product.oldPrice}
                  </span>
                )}
              </div>
              <span className="text-[15px] text-gray-500 font-medium">
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
                  onClick={() => setQuantity(quantity < 10 ? quantity + 1 : 10)}
                  className="text-gray-500 hover:text-[#0a36af] transition-colors"
                >
                  <Plus size={20} strokeWidth={2.5} />
                </button>
              </div>
              <button
                onClick={() => handleAddToCart()}
                className="w-full h-14 rounded-xl font-extrabold text-[20px] uppercase tracking-widest transition-opacity hover:opacity-90 shadow-md"
                style={{ backgroundColor: "#0a36af", color: "#ffc85b" }}
              >
                Add To Cart
              </button>
            </div>

            {/* Delivery Highlight */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#faf9f6] border border-gray-100">
              <span className="text-xl">📦</span>
              <p className="text-[15px] font-medium text-gray-700">
                Free Standard UK Delivery on orders over £50
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto flex flex-col gap-16 pt-4">
          
          {/* 1. Dynamic Description */}
          {product.description && (
            <div>
              <h2
                className="font-extrabold text-[20px] uppercase tracking-wide mb-6"
                style={{ color: "#0a36af" }}
              >
                Product Description
              </h2>
              <div className="text-[15px] leading-relaxed text-gray-700 space-y-4">
                {product.description.map((paragraph, index) => (
                  <p key={index}>
                    {/* Simple trick to make 'Ingredients:' and 'Tasting note:' bold dynamically */}
                    {paragraph.includes("Ingredients:") ? (
                      <><strong className="text-black">Ingredients:</strong>{paragraph.split("Ingredients:")[1]}</>
                    ) : paragraph.includes("Tasting note:") ? (
                      <><strong className="text-black">Tasting note:</strong>{paragraph.split("Tasting note:")[1]}</>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* 2. Dynamic Delivery */}
          {product.delivery && (
            <div>
              <h2
                className="font-extrabold text-[20px] uppercase tracking-wide mb-6"
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
                    {product.delivery.standard.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-black">&bull;</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-3 text-[16px] underline underline-offset-4 decoration-[#ffc85b]">
                    Next Day Delivery:
                  </h4>
                  <ul className="space-y-3">
                    {product.delivery.nextDay.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-black">&bull;</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 3. Dynamic Nutritional Info (Will completely hide for Merchandise!) */}
          {product.nutrition && (
            <div>
              <h2
                className="font-extrabold text-[20px] uppercase tracking-wide mb-6"
                style={{ color: "#0a36af" }}
              >
                Nutritional Information
              </h2>
              <div className="text-[15px] leading-relaxed text-gray-700">
                <p className="font-bold text-black mb-4">
                  {product.nutrition.typicalValues}
                </p>

                {/* Dynamic Styled Table */}
                <div className="overflow-hidden border border-gray-200 rounded-lg max-w-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#faf9f6]">
                        <th className="p-4 border-b border-r border-gray-200 font-bold text-black w-1/3">Nutrient</th>
                        <th className="p-4 border-b border-gray-200 font-bold text-black">Amount per 100 ml</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.nutrition.table.map((row, i) => (
                        <tr key={i} className={i !== product.nutrition.table.length - 1 ? "border-b border-gray-200" : ""}>
                          <td className="p-4 border-r border-gray-200 font-medium text-black">{row.label}</td>
                          <td className="p-4">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Dynamic Additional Info */}
                {product.nutrition.additionalInfo && (
                  <div className="mt-8">
                    <p className="font-bold text-black mb-4 text-[15px] uppercase tracking-wide">
                      ADDITIONAL INFORMATION
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      {product.nutrition.additionalInfo.map((info, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-black mt-1">&bull;</span> {info}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

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
          {cartTotal >= FREE_DELIVERY_THRESHOLD ? (
            <div className="bg-[#d1fae5] py-3 px-4 flex items-center gap-3 font-bold text-[#065f46] text-[14px] rounded-sm">
              <span className="text-xl leading-none">👍</span> Good news! You've
              got free delivery
            </div>
          ) : (
            <div
              className="py-3 px-4 flex items-center gap-3 font-bold text-black text-[14px] rounded-sm"
              style={{ backgroundColor: "#ffc85b" }}
            >
              <span className="text-xl leading-none">🎁</span> Free Delivery over
              £{FREE_DELIVERY_THRESHOLD}
            </div>
          )}
        </div>

        {/* Cart Items Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-5">
          {/* Cart Item */}
          <div className="flex gap-5 py-5 border-b border-gray-200">
            {/* Thumbnail */}
            <Link to="/product/2" className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md flex items-center justify-center p-2 border border-gray-100 hover:opacity-80 transition-opacity cursor-pointer">
              <img
                src="/image4.png"
                alt="Limoncini"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </Link>

            {/* Details */}
            <div className="flex-1 flex flex-col">
             <div className="flex items-start justify-between gap-2">
                <Link to="/product/2" className="hover:opacity-80 transition-opacity">
                  <h3
                    className="font-extrabold text-[16px] uppercase leading-tight"
                    style={{ color: "#0a36af" }}
                  >
                    LEMON ITALIAN SPRITZ
                  </h3>
                </Link>
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
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 shadow-sm cursor-pointer"
                    style={{ backgroundColor: "#0a36af" }}
                  >
                    <Minus size={18} strokeWidth={3} />
                  </button>

                  <span className="text-[16px] font-extrabold w-4 text-center">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity(quantity < 10 ? quantity + 1 : 10)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 shadow-sm cursor-pointer"
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
              <span className="font-bold" style={{ color: "#0a36af" }}>Subtotal</span>
              <span className="font-bold" style={{ color: "#0a36af" }}>£{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="font-bold" style={{ color: "#0a36af" }}>Delivery</span>
              <span className="font-bold" style={{ color: "#0a36af" }}>
                Calculated at Checkout
              </span>
            </div>
            <div className="flex justify-between text-[18px] mt-3 pt-3 border-t border-gray-200">
              <span className="font-extrabold" style={{ color: "#0a36af" }}>Total</span>
              <span className="font-extrabold" style={{ color: "#0a36af" }}>£{cartTotal.toFixed(2)}</span>
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
      <Footer/>
    </div>
  );
}

export default ProductDetail;
