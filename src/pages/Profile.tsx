import { Pencil, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // --- DYNAMIC DATA STATES ---
  const [user, setUser] = useState({ id: "", name: "Loading...", email: "Loading..." });
  const [addresses, setAddresses] = useState<any[]>([{
      company: "XXX", line1: "xwincwin ninin", line2: "nisncisncis", city: "Mumbai",
      region: "Maharashtra", zip: "401303", country: "India", phone: "+919920312153", is_default: true
  }]);
  const [orders, setOrders] = useState([{
      id: "ORD-9823-XYZ", date: "March 1, 2026", status: "Processing", total: "£48.00",
      items: [{ name: "LEMON ITALIAN SPRITZ 275ml x 24 BOTTLES", quantity: 2, image: "/image4.png" }],
  }]);

  // --- EDIT NAME STATES ---
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);

  // --- ADD ADDRESS MODAL STATES ---
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    company: "", line1: "", line2: "", city: "", region: "", zip: "", phone: ""
  });

  // --- LOAD DATA ON PAGE LOAD ---
  useEffect(() => {
    const storedUser = localStorage.getItem("rezzilli_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setNewName(parsedUser.name); // Pre-fill the edit name input

      // Fetch real addresses from the database
      fetch(`https://rezzillidrinks.com/api/get-profile.php?user_id=${parsedUser.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.addresses) {
            setAddresses(data.addresses);
          } else {
            setAddresses([]); // Clear dummy data if they have no addresses
          }
        })
        .catch(err => console.error("Error fetching addresses:", err));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // --- SUBMIT NEW ADDRESS ---
  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAddress(true);
    try {
      const response = await fetch("https://rezzillidrinks.com/api/add-address.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...addressForm, user_id: user.id }),
      });
      const data = await response.json();
      if (data.success) {
        setShowAddressModal(false);
        setAddressForm({ company: "", line1: "", line2: "", city: "", region: "", zip: "", phone: "" });
        window.location.reload(); // Reload to fetch the new address instantly
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmittingAddress(false);
    }
  };

  // --- SAVE UPDATED NAME ---
  const handleNameSave = async () => {
    if (!newName.trim() || newName === user.name) {
      setIsEditingName(false);
      return;
    }
    
    setIsSavingName(true);
    try {
      const response = await fetch("https://rezzillidrinks.com/api/update-name.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, name: newName }),
      });
      const data = await response.json();
      if (data.success) {
        // Update local state
        setUser({ ...user, name: newName });
        // Update local storage so Navbar doesn't revert
        localStorage.setItem("rezzilli_user", JSON.stringify({ ...user, name: newName }));
        setIsEditingName(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Network error updating name.");
    } finally {
      setIsSavingName(false);
    }
  };

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
        <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-12" style={{ color: "#0a36af" }}>
          {activeTab === "profile" ? "Profile" : "Order History"}
        </h1>

        {/* Conditional Rendering based on activeTab */}
        {activeTab === "profile" ? (
          /* PROFILE VIEW */
          <div className="w-full max-w-2xl flex flex-col gap-12">
            <div className="flex flex-col gap-8">
              
              {/* --- EDITABLE NAME SECTION --- */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-gray-500 text-[12px] font-bold uppercase tracking-wide">
                    Name
                  </span>
                  {!isEditingName && (
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-gray-400 hover:text-[#0a36af] transition-colors"
                      aria-label="Edit Name"
                    >
                      <Pencil size={14} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
                
                {isEditingName ? (
                  <div className="flex items-center gap-4">
                    <input 
                      type="text" 
                      value={newName} 
                      onChange={(e) => setNewName(e.target.value)} 
                      className="border-b-2 border-[#0a36af] focus:outline-none text-[16px] text-black font-medium pb-1"
                      autoFocus
                    />
                    <button 
                      onClick={handleNameSave}
                      disabled={isSavingName}
                      className="text-[12px] font-bold uppercase tracking-widest text-white px-3 py-1.5 rounded transition-opacity hover:opacity-80 disabled:opacity-50"
                      style={{ backgroundColor: "#0a36af" }}
                    >
                      {isSavingName ? "Saving..." : "Save"}
                    </button>
                    <button 
                      onClick={() => { setIsEditingName(false); setNewName(user.name); }}
                      className="text-[12px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <p className="text-[16px] text-black font-medium">{user.name}</p>
                )}
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
                  onClick={() => setShowAddressModal(true)}
                  className="flex items-center gap-1 font-bold text-[12px] uppercase tracking-wide transition-opacity hover:opacity-70"
                  style={{ color: "#0a36af" }}
                >
                  <Plus size={16} strokeWidth={3} /> Add
                </button>
              </div>

              {/* Dynamic Addresses Map */}
              {addresses.length === 0 ? (
                <p className="text-gray-500 italic text-[15px]">No addresses saved yet.</p>
              ) : (
                addresses.map((address, index) => (
                  <div key={index} className="bg-[#faf9f6] border border-gray-200 rounded-xl p-6 md:p-8 relative transition-all hover:shadow-md mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-500 text-[12px] font-bold uppercase tracking-wide">
                        {address.is_default ? "Default address" : "Address"}
                      </span>
                      <button className="text-gray-400 hover:text-[#0a36af] transition-colors" aria-label="Edit Address">
                        <Pencil size={16} strokeWidth={2.5} />
                      </button>
                    </div>

                    <div className="text-black text-[15px] leading-loose">
                      <p className="font-bold text-[16px] mb-1">{user.name}</p>
                      {address.company && <p>{address.company}</p>}
                      <p>{address.line1}</p>
                      {address.line2 && <p>{address.line2}</p>}
                      <p>{address.zip} {address.city} {address.region}</p>
                      <p>{address.country}</p>
                      {address.phone && <p className="mt-2 text-gray-600">{address.phone}</p>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* ORDERS VIEW */
          <div className="w-full flex flex-col gap-6">
            {orders.map((order, orderIndex) => (
              <div key={orderIndex} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
                <div className="bg-gray-50 p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wide">Order Placed</span>
                    <span className="text-[15px] font-semibold text-black">{order.date}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wide">Total</span>
                    <span className="text-[15px] font-semibold text-black">{order.total}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wide">Order ID</span>
                    <span className="text-[15px] font-semibold text-black">{order.id}</span>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-[#0a36af] text-[12px] font-bold uppercase rounded-full">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="p-4 md:p-6 bg-white">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-6 mb-4 last:mb-0">
                      <div className="w-20 h-24 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center p-2 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-[15px] font-bold text-black uppercase leading-snug" style={{ color: "#0a36af" }}>{item.name}</h3>
                        <p className="text-[14px] text-gray-600 mt-2">
                          Quantity: <span className="font-semibold text-black">{item.quantity}</span>
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 flex gap-4">
                    <button className="px-5 py-2 border-2 rounded-lg font-bold text-[14px] transition-colors" style={{ borderColor: "#0a36af", color: "#0a36af" }}>
                      Track Package
                    </button>
                    <button className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold text-[14px] hover:bg-gray-200 transition-colors">
                      View Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- ADD ADDRESS MODAL --- */}
      {showAddressModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#faf9f6] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 flex justify-between items-center" style={{ backgroundColor: "#0a36af" }}>
              <h2 className="text-lg font-extrabold text-white uppercase tracking-widest">Add New Address</h2>
              <button onClick={() => setShowAddressModal(false)} className="text-white hover:text-[#ffc85b] text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleAddressSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[14px] font-bold mb-1" style={{ color: "#0a36af" }}>Street Address *</label>
                  <input type="text" required value={addressForm.line1} onChange={e => setAddressForm({...addressForm, line1: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-[15px] focus:outline-none focus:border-[#0a36af]" />
                </div>
                <div>
                  <label className="block text-[14px] font-bold mb-1" style={{ color: "#0a36af" }}>Apartment, suite, etc.</label>
                  <input type="text" value={addressForm.line2} onChange={e => setAddressForm({...addressForm, line2: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-[15px] focus:outline-none focus:border-[#0a36af]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-bold mb-1" style={{ color: "#0a36af" }}>City *</label>
                    <input type="text" required value={addressForm.city} onChange={e => setAddressForm({...addressForm, city: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-[15px] focus:outline-none focus:border-[#0a36af]" />
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold mb-1" style={{ color: "#0a36af" }}>Region/County *</label>
                    <input type="text" required value={addressForm.region} onChange={e => setAddressForm({...addressForm, region: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-[15px] focus:outline-none focus:border-[#0a36af]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-bold mb-1" style={{ color: "#0a36af" }}>Postcode *</label>
                    <input type="text" required value={addressForm.zip} onChange={e => setAddressForm({...addressForm, zip: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-[15px] focus:outline-none focus:border-[#0a36af]" />
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold mb-1" style={{ color: "#0a36af" }}>Phone</label>
                    <input type="text" value={addressForm.phone} onChange={e => setAddressForm({...addressForm, phone: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-[15px] focus:outline-none focus:border-[#0a36af]" />
                  </div>
                </div>
                <button type="submit" disabled={isSubmittingAddress} className="mt-4 w-full py-3 rounded-lg font-bold text-[14px] uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50" style={{ backgroundColor: "#0a36af", color: "#ffc85b" }}>
                  {isSubmittingAddress ? "Saving..." : "Save Address"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer/>
    </div>
  );
}

export default Profile;