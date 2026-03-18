import { useState } from "react";
import { 
  Store, 
  Truck, 
  CreditCard, 
  Shield, 
  Save, 
  Globe,
  Mail,
  Phone,
  PoundSterling,
  Eye,
  EyeOff
} from "lucide-react";

function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  // --- MOCK SETTINGS STATE ---
  const [settings, setSettings] = useState({
    storeName: "Rezzilli Drinks",
    contactEmail: "hello@rezzillidrinks.com",
    supportPhone: "+44 7832 198470",
    currency: "GBP (£)",
    standardShippingFee: "5.00",
    freeShippingThreshold: "50.00",
    stripeMode: "Test", // 'Test' or 'Live'
    stripePublicKey: "pk_test_51NxXXXXXXXXXXXXXXXXXXXXX",
    stripeSecretKey: "sk_test_51NxXXXXXXXXXXXXXXXXXXXXX"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings updated successfully! These changes are now live.");
    }, 800);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your store preferences, shipping rules, and payment gateways.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-70"
        >
          <Save size={18} />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="p-8 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Vertical Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "general" ? "bg-white text-indigo-600 shadow-sm border border-slate-200" : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 border border-transparent"
              }`}
            >
              <Store size={18} className={activeTab === "general" ? "text-indigo-600" : "text-slate-400"} />
              General Details
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "shipping" ? "bg-white text-indigo-600 shadow-sm border border-slate-200" : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 border border-transparent"
              }`}
            >
              <Truck size={18} className={activeTab === "shipping" ? "text-indigo-600" : "text-slate-400"} />
              Shipping Rules
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "payments" ? "bg-white text-indigo-600 shadow-sm border border-slate-200" : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 border border-transparent"
              }`}
            >
              <CreditCard size={18} className={activeTab === "payments" ? "text-indigo-600" : "text-slate-400"} />
              Payment Gateway
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "security" ? "bg-white text-indigo-600 shadow-sm border border-slate-200" : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 border border-transparent"
              }`}
            >
              <Shield size={18} className={activeTab === "security" ? "text-indigo-600" : "text-slate-400"} />
              Admin Security
            </button>
          </nav>
        </div>

        {/* Right Side: Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* --- GENERAL TAB --- */}
          {activeTab === "general" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
              <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Store Profile</h2>
              
              <div className="space-y-5 max-w-2xl">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Store Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Globe size={18} />
                    </div>
                    <input 
                      type="text" 
                      name="storeName"
                      value={settings.storeName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Support Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail size={18} />
                      </div>
                      <input 
                        type="email" 
                        name="contactEmail"
                        value={settings.contactEmail}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Support Phone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone size={18} />
                      </div>
                      <input 
                        type="text" 
                        name="supportPhone"
                        value={settings.supportPhone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Store Currency</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <PoundSterling size={18} />
                    </div>
                    <select 
                      name="currency"
                      value={settings.currency}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none bg-white"
                    >
                      <option value="GBP (£)">GBP (£) - British Pound</option>
                      <option value="USD ($)">USD ($) - US Dollar</option>
                      <option value="EUR (€)">EUR (€) - Euro</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- SHIPPING TAB --- */}
          {activeTab === "shipping" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
              <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Shipping Rates & Logic</h2>
              
              <div className="space-y-6 max-w-2xl">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Standard Delivery Setup</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Flat Rate Fee (£)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        name="standardShippingFee"
                        value={settings.standardShippingFee}
                        onChange={handleInputChange}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Free Shipping Threshold (£)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        name="freeShippingThreshold"
                        value={settings.freeShippingThreshold}
                        onChange={handleInputChange}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                      <p className="text-xs text-slate-500 mt-1.5">Orders over this amount will not be charged the flat rate fee.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- PAYMENTS TAB --- */}
          {activeTab === "payments" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-lg font-bold text-slate-900">Stripe Integration</h2>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${settings.stripeMode === 'Live' ? 'text-emerald-600' : 'text-amber-500'}`}>
                    {settings.stripeMode} Mode
                  </span>
                  <button 
                    onClick={() => setSettings(prev => ({ ...prev, stripeMode: prev.stripeMode === 'Test' ? 'Live' : 'Test' }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${settings.stripeMode === 'Live' ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.stripeMode === 'Live' ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-5 max-w-2xl">
                <div className={`p-4 rounded-lg border ${settings.stripeMode === 'Live' ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'} mb-6`}>
                  <p className={`text-sm ${settings.stripeMode === 'Live' ? 'text-emerald-800' : 'text-amber-800'}`}>
                    {settings.stripeMode === 'Live' 
                      ? "Warning: Live mode is active. Real customer credit cards will be charged."
                      : "Test mode is active. You can use Stripe's test card numbers to safely simulate purchases."}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Publishable Key</label>
                  <input 
                    type="text" 
                    name="stripePublicKey"
                    value={settings.stripePublicKey}
                    onChange={handleInputChange}
                    className="w-full font-mono border border-slate-300 rounded-lg p-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Secret Key</label>
                  <div className="relative">
                    <input 
                      type={showSecretKey ? "text" : "password"} 
                      name="stripeSecretKey"
                      value={settings.stripeSecretKey}
                      onChange={handleInputChange}
                      className="w-full font-mono border border-slate-300 rounded-lg p-2.5 pr-10 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowSecretKey(!showSecretKey)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showSecretKey ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">Keep this key secret. Your PHP backend uses this to authorize charges.</p>
                </div>
              </div>
            </div>
          )}

          {/* --- SECURITY TAB --- */}
          {activeTab === "security" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
              <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Admin Credentials</h2>
              
              <div className="space-y-5 max-w-xl">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Current Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter current password"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">New Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter new password"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Confirm New Password</label>
                  <input 
                    type="password" 
                    placeholder="Confirm new password"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div className="pt-2">
                  <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Settings;