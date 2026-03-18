import { useState } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  X, 
  MapPin, 
  Mail, 
  Phone,
  ShoppingBag,
  TrendingUp,
  Calendar,
  Download,
  Award
} from "lucide-react";

// --- DUMMY DATA ---
const mockCustomers = [
  {
    id: "CUST-001",
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+44 7700 900123",
    status: "Active",
    joined_date: "Jan 12, 2026",
    lifetime_value: 345.50,
    total_orders: 6,
    avg_order_value: 57.58,
    address: {
      line1: "12 Floral Way",
      city: "Manchester",
      region: "Greater Manchester",
      zip: "M4 4WQ",
      country: "United Kingdom"
    },
    recent_orders: [
      { id: "ORD-0891", date: "Mar 18, 2026", total: "£48.00", status: "Processing" },
      { id: "ORD-0742", date: "Feb 02, 2026", total: "£62.00", status: "Delivered" },
      { id: "ORD-0610", date: "Jan 15, 2026", total: "£24.00", status: "Delivered" }
    ]
  },
  {
    id: "CUST-002",
    name: "David Chen",
    email: "david.c@example.com",
    phone: "+44 7700 900456",
    status: "Active",
    joined_date: "Mar 01, 2026",
    lifetime_value: 110.37,
    total_orders: 1,
    avg_order_value: 110.37,
    address: {
      line1: "Apt 4B, The Horizon",
      city: "London",
      region: "London",
      zip: "E1 6AN",
      country: "United Kingdom"
    },
    recent_orders: [
      { id: "ORD-0890", date: "Mar 17, 2026", total: "£110.37", status: "Shipped" }
    ]
  },
  {
    id: "CUST-003",
    name: "Emma Watson",
    email: "emma.w@example.com",
    phone: "+44 7700 900789",
    status: "Inactive",
    joined_date: "Nov 05, 2025",
    lifetime_value: 29.00,
    total_orders: 1,
    avg_order_value: 29.00,
    address: {
      line1: "88 High Street",
      city: "Oxford",
      region: "Oxfordshire",
      zip: "OX1 4BG",
      country: "United Kingdom"
    },
    recent_orders: [
      { id: "ORD-0889", date: "Mar 15, 2026", total: "£29.00", status: "Delivered" }
    ]
  },
  {
    id: "CUST-004",
    name: "Michael Brown",
    email: "m.brown@example.com",
    phone: "+44 7700 900999",
    status: "VIP",
    joined_date: "Aug 20, 2025",
    lifetime_value: 850.00,
    total_orders: 12,
    avg_order_value: 70.83,
    address: {
      line1: "42 Kings Road",
      city: "Brighton",
      region: "Oxfordshire",
      zip: "BN1 1NE",
      country: "United Kingdom"
    },
    recent_orders: [
      { id: "ORD-0888", date: "Mar 14, 2026", total: "£72.00", status: "Delivered" },
      { id: "ORD-0812", date: "Feb 28, 2026", total: "£144.00", status: "Delivered" }
    ]
  }
];

function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Filter Logic
  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Helper for Initials Avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Helper for Status Badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2.5 py-1 rounded-md text-xs font-semibold">Active</span>;
      case 'VIP':
        return <span className="bg-indigo-50 text-indigo-700 border border-indigo-200/50 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 w-max"><Award size={12} /> VIP</span>;
      case 'Inactive':
        return <span className="bg-slate-100 text-slate-600 border border-slate-200/50 px-2.5 py-1 rounded-md text-xs font-semibold">Inactive</span>;
      default:
        return <span className="bg-slate-50 text-slate-700 border border-slate-200/50 px-2.5 py-1 rounded-md text-xs font-semibold">{status}</span>;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customers</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your customer relationships and view order history.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          <Download size={16} />
          Export Data
        </button>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        
        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          
          <div className="relative w-full sm:w-48">
            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none cursor-pointer shadow-sm"
            >
              <option value="All">All Customers</option>
              <option value="Active">Active</option>
              <option value="VIP">VIP</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Orders</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lifetime Value</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">No customers found.</td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-100">
                            {getInitials(customer.name)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{customer.name}</p>
                            <p className="text-xs text-slate-500">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-700">{customer.total_orders}</td>
                      <td className="p-4 text-sm font-semibold text-slate-900">£{customer.lifetime_value.toFixed(2)}</td>
                      <td className="p-4">{getStatusBadge(customer.status)}</td>
                      <td className="p-4 text-sm text-slate-600">{customer.joined_date}</td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => setSelectedCustomer(customer)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm"
                        >
                          <Eye size={16} /> View Profile
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* --- SLIDE-OUT CUSTOMER PROFILE DRAWER --- */}
      {selectedCustomer && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setSelectedCustomer(null)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300">
            
            {/* Drawer Header */}
            <div className="px-6 py-6 border-b border-slate-100 bg-white shrink-0 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl shrink-0 border border-indigo-100">
                    {getInitials(selectedCustomer.name)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      {selectedCustomer.name}
                      {selectedCustomer.status === 'VIP' && <Award size={18} className="text-indigo-600" />}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">Customer since {selectedCustomer.joined_date}</p>
                    <div className="mt-2">{getStatusBadge(selectedCustomer.status)}</div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Drawer Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 space-y-6">
              
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-500 mb-2">
                    <TrendingUp size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Lifetime Value</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">£{selectedCustomer.lifetime_value.toFixed(2)}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-500 mb-2">
                    <ShoppingBag size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{selectedCustomer.total_orders}</p>
                  <p className="text-xs text-slate-500 mt-1">Avg. £{selectedCustomer.avg_order_value.toFixed(2)}</p>
                </div>
              </div>

              {/* Contact & Shipping Info */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                  <MapPin size={18} className="text-slate-400" />
                  <h3 className="text-sm font-bold text-slate-900">Contact & Address</h3>
                </div>
                <div className="p-5 text-sm space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-slate-400 shrink-0" />
                      <a href={`mailto:${selectedCustomer.email}`} className="text-indigo-600 hover:underline font-medium">
                        {selectedCustomer.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-slate-400 shrink-0" />
                      <span className="text-slate-700">{selectedCustomer.phone}</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-slate-700 font-medium mb-1">Default Shipping Address</p>
                    <p className="text-slate-600 leading-relaxed">
                      {selectedCustomer.address.line1}<br/>
                      {selectedCustomer.address.city}, {selectedCustomer.address.region} {selectedCustomer.address.zip}<br/>
                      {selectedCustomer.address.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order History Feed */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-slate-400" />
                    <h3 className="text-sm font-bold text-slate-900">Recent Orders</h3>
                  </div>
                  <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">View All</button>
                </div>
                
                <div className="divide-y divide-slate-100">
                  {selectedCustomer.recent_orders.length === 0 ? (
                    <p className="p-5 text-sm text-slate-500 text-center">No orders placed yet.</p>
                  ) : (
                    selectedCustomer.recent_orders.map((order: any, idx: number) => (
                      <div key={idx} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer">
                        <div>
                          <p className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 transition-colors">{order.id}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{order.date}</p>
                        </div>
                        <div className="text-right flex flex-col items-end gap-1.5">
                          <p className="text-sm font-bold text-slate-900">{order.total}</p>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                            order.status === 'Processing' ? 'bg-amber-50 text-amber-700 border border-amber-200/50' :
                            order.status === 'Shipped' ? 'bg-sky-50 text-sky-700 border border-sky-200/50' :
                            'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
            
            {/* Drawer Footer Actions */}
            <div className="p-5 border-t border-slate-200 bg-white shrink-0 flex items-center gap-3">
              <button className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm text-center">
                Reset Password
              </button>
              <button className="flex-1 px-4 py-2.5 bg-indigo-600 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm text-center">
                Send Email
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default Customers;