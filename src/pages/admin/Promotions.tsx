import { useState, useEffect } from "react";
import { 
  Search, Filter, Plus, Edit, Trash2, X, Save, Tag, Percent, PoundSterling, Users, Calendar
} from "lucide-react";

const emptyPromo = {
  id: null, code: "", type: "percentage", value: "", 
  min_purchase_amount: 0, usage_limit: "", expiry_date: "", status: "active"
};

function Promotions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  const [promotions, setPromotions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState<any>(emptyPromo);
  const [isSaving, setIsSaving] = useState(false);

  const fetchPromotions = () => {
    setIsLoading(true);
    fetch("https://rezzillidrinks.com/api/get-promotions.php")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.promotions) {
          setPromotions(data.promotions);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("https://rezzillidrinks.com/api/save-promotion.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        alert("Promotion saved successfully!");
        setIsDrawerOpen(false);
        fetchPromotions();
      } else {
        alert(data.message || "Failed to save promotion.");
      }
    } catch (err) {
      alert("Network error.");
    } finally {
      setIsSaving(false);
    }
  };

  // Filter Logic
  const filteredPromos = promotions.filter(promo => {
    const matchesSearch = promo.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || promo.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">Active</span>;
      case 'expired': return <span className="bg-rose-50 text-rose-700 border border-rose-200/50 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">Expired</span>;
      case 'inactive': return <span className="bg-slate-100 text-slate-600 border border-slate-200/50 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">Inactive</span>;
      default: return <span className="bg-slate-50 text-slate-700 border border-slate-200/50 px-2.5 py-1 rounded-md text-xs font-semibold">{status}</span>;
    }
  };

  const openAddDrawer = () => {
    setFormData(emptyPromo);
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (promo: any) => {
    setFormData({
      id: promo.id,
      code: promo.code,
      type: promo.type,
      value: promo.value,
      min_purchase_amount: promo.min_purchase_amount,
      usage_limit: promo.usage_limit || "",
      expiry_date: promo.expiry_date ? promo.expiry_date.split(' ')[0] : "", // Formats YYYY-MM-DD
      status: promo.status
    });
    setIsDrawerOpen(true);
  };

  if (isLoading) {
    return <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Tag size={24} className="text-indigo-600" /> Promotions & Discounts
          </h1>
          <p className="text-slate-500 text-sm mt-1">Create and manage discount codes for your customers.</p>
        </div>
        <button onClick={openAddDrawer} className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus size={18} /> Create Promo Code
        </button>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by code (e.g. SUMMER20)..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm" />
          </div>
          <div className="relative w-full sm:w-48">
            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer shadow-sm">
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Discount Code</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Value</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Usage</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Expires</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPromos.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-slate-500">No promotions found.</td></tr>
                ) : (
                  filteredPromos.map((promo) => (
                    <tr key={promo.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4">
                        <span className="font-mono font-bold text-sm text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 tracking-wide">{promo.code}</span>
                        {promo.min_purchase_amount > 0 && <p className="text-xs text-slate-500 mt-1.5 font-medium">Min spend: £{promo.min_purchase_amount.toFixed(2)}</p>}
                      </td>
                      <td className="p-4 text-sm font-bold text-slate-900">
                        {promo.type === 'percentage' ? `${promo.value}% OFF` : `£${promo.value.toFixed(2)} OFF`}
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[80px]">
                            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: promo.usage_limit ? `${(promo.used_count / promo.usage_limit) * 100}%` : '100%' }}></div>
                          </div>
                          <span className="text-xs font-semibold text-slate-600">{promo.used_count} {promo.usage_limit ? `/ ${promo.usage_limit}` : 'used'}</span>
                        </div>
                      </td>
                      <td className="p-4">{getStatusBadge(promo.status)}</td>
                      <td className="p-4 text-sm text-slate-600 font-medium">
                        {promo.expiry_date ? promo.expiry_date.split(' ')[0] : <span className="text-slate-400 italic">No expiry</span>}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEditDrawer(promo)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Edit"><Edit size={16} /></button>
                          <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Delete"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isDrawerOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setIsDrawerOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{formData.id ? "Edit Promotion" : "Create Promotion"}</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Configure discount rules and limits</p>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 space-y-6">
                
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Discount Code</label>
                    <input type="text" name="code" required value={formData.code} onChange={handleInputChange} placeholder="e.g., SUMMER20" className="w-full font-mono uppercase border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    <p className="text-[11px] text-slate-400 mt-1.5">Customers will enter this code at checkout.</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Discount Value</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setFormData({...formData, type: "percentage"})} className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${formData.type === "percentage" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
                      <Percent size={20} className="mb-1" /><span className="text-xs font-bold">Percentage %</span>
                    </button>
                    <button type="button" onClick={() => setFormData({...formData, type: "fixed"})} className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${formData.type === "fixed" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
                      <PoundSterling size={20} className="mb-1" /><span className="text-xs font-bold">Fixed Amount £</span>
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Discount Value</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 font-bold">{formData.type === 'percentage' ? '%' : '£'}</div>
                      <input type="number" step="0.01" name="value" required value={formData.value} onChange={handleInputChange} placeholder="0.00" className="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Rules & Limits</h3>
                  <div>
                    <label className=" text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5"><PoundSterling size={14}/> Minimum Purchase Amount</label>
                    <input type="number" step="0.01" name="min_purchase_amount" value={formData.min_purchase_amount} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    <p className="text-[11px] text-slate-400 mt-1">Set to 0 to apply to all orders.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className=" text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5"><Users size={14}/> Usage Limit</label>
                      <input type="number" name="usage_limit" placeholder="Unlimited" value={formData.usage_limit} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </div>
                    <div>
                      <label className=" text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5"><Calendar size={14}/> Expiry Date</label>
                      <input type="date" name="expiry_date" value={formData.expiry_date} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Promotion Status</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Toggle to instantly enable or disable this code.</p>
                  </div>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="p-5 border-t border-slate-200 bg-white shrink-0 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsDrawerOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">Cancel</button>
                <button type="submit" disabled={isSaving} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50">
                  <Save size={16} /> {isSaving ? "Saving..." : (formData.id ? "Save Changes" : "Create Code")}
                </button>
              </div>
            </form>

          </div>
        </>
      )}
    </div>
  );
}

export default Promotions;