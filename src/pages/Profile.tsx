import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const user = {
    name: "Rusi Karanjia",
    email: "karanjia.rusi@gmail.com",
    address: {
      company: "XXX",
      line1: "xwincwin ninin",
      line2: "nisncisncis",
      city: "Mumbai",
      region: "Maharashtra",
      zip: "401303",
      country: "India",
      phone: "+919920312153",
    },
  };

  const dummyOrder = {
    id: "ORD-9823-XYZ",
    date: "March 1, 2026",
    status: "Processing",
    total: "£48.00",
    items: [
      {
        name: "LEMON ITALIAN SPRITZ 275ml x 24 BOTTLES",
        quantity: 2,
        image: "/image4.png",
      },
    ],
  };
  const [activeTab, setActiveTab] = useState("profile"); 

  return (
    <div className="min-h-screen w-full flex flex-col font-['Libre_Baskerville',_serif] bg-white">
      
      <Navbar/>

      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-10 md:py-16 flex flex-col">
        {/* Top Navigation Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-12">
          <button
            onClick={() => setActiveTab("orders")}
            className={`font-bold text-[15px] pb-4 transition-colors ${activeTab === "orders" ? "border-b-[3px] -mb-[2px]" : "text-gray-500 hover:text-[#0a36af]"}`}
            style={{
              borderColor: activeTab === "orders" ? "#0a36af" : "transparent",
              color: activeTab === "orders" ? "#0a36af" : undefined,
            }}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`font-bold text-[15px] pb-4 transition-colors ${activeTab === "profile" ? "border-b-[3px] -mb-[2px]" : "text-gray-500 hover:text-[#0a36af]"}`}
            style={{
              borderColor: activeTab === "profile" ? "#0a36af" : "transparent",
              color: activeTab === "profile" ? "#0a36af" : undefined,
            }}
          >
            Profile
          </button>
        </div>

        {/* Page Title */}
        <h1
          className="text-3xl font-extrabold uppercase tracking-tight mb-12"
          style={{ color: "#0a36af" }}
        >
          {activeTab === "profile" ? "Profile" : "Order History"}
        </h1>

        {/* Conditional Rendering based on activeTab */}
        {activeTab === "profile" ? (
          /* PROFILE VIEW */
          <div className="w-full max-w-2xl flex flex-col gap-12">
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-gray-500 text-[12px] font-bold uppercase tracking-wide">
                    Name
                  </span>
                  <button
                    className="text-gray-400 hover:text-[#0a36af] transition-colors"
                    aria-label="Edit Name"
                  >
                    <Pencil size={14} strokeWidth={2.5} />
                  </button>
                </div>
                <p className="text-[16px] text-black font-medium">
                  {user.name}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-gray-500 text-[12px] font-bold uppercase tracking-wide">
                    Email
                  </span>
                </div>
                <p className="text-[16px] text-black font-medium">
                  {user.email}
                </p>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div>
              <div className="flex items-center gap-6 mb-8">
                <h2 className="text-xl font-bold text-black uppercase tracking-wide">
                  Addresses
                </h2>
                <button
                  className="flex items-center gap-1 font-bold text-[12px] uppercase tracking-wide transition-opacity hover:opacity-70"
                  style={{ color: "#0a36af" }}
                >
                  <Plus size={16} strokeWidth={3} /> Add
                </button>
              </div>

              <div className="bg-[#faf9f6] border border-gray-200 rounded-xl p-6 md:p-8 relative transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 text-[12px] font-bold uppercase tracking-wide">
                    Default address
                  </span>
                  <button
                    className="text-gray-400 hover:text-[#0a36af] transition-colors"
                    aria-label="Edit Address"
                  >
                    <Pencil size={16} strokeWidth={2.5} />
                  </button>
                </div>

                <div className="text-black text-[15px] leading-loose">
                  <p className="font-bold text-[16px] mb-1">{user.name}</p>
                  <p>{user.address.company}</p>
                  <p>{user.address.line1}</p>
                  <p>{user.address.line2}</p>
                  <p>
                    {user.address.zip} {user.address.city} {user.address.region}
                  </p>
                  <p>{user.address.country}</p>
                  <p className="mt-2 text-gray-600">{user.address.phone}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ORDERS VIEW */
          <div className="w-full flex flex-col gap-6">
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              {/* Order Header */}
              <div className="bg-gray-50 p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wide">
                    Order Placed
                  </span>
                  <span className="text-[15px] font-semibold text-black">
                    {dummyOrder.date}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wide">
                    Total
                  </span>
                  <span className="text-[15px] font-semibold text-black">
                    {dummyOrder.total}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wide">
                    Order ID
                  </span>
                  <span className="text-[15px] font-semibold text-black">
                    {dummyOrder.id}
                  </span>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-[#0a36af] text-[12px] font-bold uppercase rounded-full">
                    {dummyOrder.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 md:p-6 bg-white">
                {dummyOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6">
                    <div className="w-20 h-24 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center p-2 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3
                        className="text-[15px] font-bold text-black uppercase leading-snug"
                        style={{ color: "#0a36af" }}
                      >
                        {item.name}
                      </h3>
                      <p className="text-[14px] text-gray-600 mt-2">
                        Quantity:{" "}
                        <span className="font-semibold text-black">
                          {item.quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}

                <div className="mt-6 flex gap-4">
                  <button
                    className="px-5 py-2 border-2 rounded-lg font-bold text-[14px] transition-colors"
                    style={{ borderColor: "#0a36af", color: "#0a36af" }}
                  >
                    Track Package
                  </button>
                  <button className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold text-[14px] hover:bg-gray-200 transition-colors">
                    View Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default Profile;
