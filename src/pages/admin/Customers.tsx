import { useState, useEffect } from "react";
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
  Award,
  ChevronLeft,
  Package,
  CreditCard,
  Gift,
} from "lucide-react";

function Customers() {
  // --- Replace the top of your Customers function with this ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // DYNAMIC DATA STATES
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isViewingAllOrders, setIsViewingAllOrders] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<any>(null);

  // FETCH REAL CUSTOMERS FROM DATABASE
  useEffect(() => {
    fetch("https://rezzillidrinks.com/api/get-customers.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.customers) {
          setCustomers(data.customers);
        }
      })
      .catch((err) => console.error("Error fetching customers:", err))
      .finally(() => setIsLoading(false));
  }, []);

  // Update filteredCustomers to use the dynamic state:
  const filteredCustomers = customers.filter((customer) => {
    // ... rest of your filter logic remains exactly the same!
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200/50 px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider">
            {status}
          </span>
        );
      case "Shipped":
        return (
          <span className="bg-sky-50 text-sky-700 border border-sky-200/50 px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider">
            {status}
          </span>
        );
      case "Delivered":
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider">
            {status}
          </span>
        );
      default:
        return (
          <span className="bg-slate-50 text-slate-700 border border-slate-200/50 px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider">
            {status}
          </span>
        );
    }
  };

  const handleCloseDrawer = () => {
    setSelectedCustomer(null);
    setIsViewingAllOrders(false);
    setSelectedOrderDetails(null);
  };

  const handleOpenDrawer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsViewingAllOrders(false);
    setSelectedOrderDetails(null);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Customers
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your customer relationships and view order history.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          <Download size={16} /> Export Data
        </button>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          <div className="relative w-full sm:w-48">
            <Filter
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
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
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Lifetime Value
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No customers found.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-100">
                            {getInitials(customer.name)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {customer.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-700">
                        {customer.total_orders}
                      </td>
                      <td className="p-4 text-sm font-semibold text-slate-900">
                        £{customer.lifetime_value.toFixed(2)}
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        {customer.joined_date}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleOpenDrawer(customer)}
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

      {/* --- SLIDE-OUT DRAWER --- */}
      {selectedCustomer && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
            onClick={handleCloseDrawer}
          />

          <div className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300">
            {/* Drawer Header (Always visible) */}
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
                      {selectedCustomer.status === "VIP" && (
                        <Award size={18} className="text-indigo-600" />
                      )}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                      Customer since {selectedCustomer.joined_date}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseDrawer}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* --- DRAWER CONTENT NAVIGATION ROUTER --- */}
            {selectedOrderDetails ? (
              /* 3. DRILL-DOWN VIEW: SPECIFIC ORDER DETAILS */
              <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 space-y-4">
                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors mb-2"
                >
                  <ChevronLeft size={16} /> Back
                </button>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Order ID
                    </p>
                    <p className="font-bold text-slate-900">
                      {selectedOrderDetails.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Status
                    </p>
                    {getOrderStatusBadge(selectedOrderDetails.status)}
                  </div>
                </div>

                {selectedOrderDetails.gift_message && (
                  <div className="bg-rose-50 border border-rose-100 p-5 rounded-xl flex items-start gap-4">
                    <div className="p-2 bg-rose-100 text-rose-600 rounded-lg shrink-0">
                      <Gift size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-rose-900 mb-1">
                        Gift Message Included
                      </h4>
                      <p className="text-sm text-rose-800 italic leading-relaxed">
                        "{selectedOrderDetails.gift_message}"
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                    <Package size={18} className="text-slate-400" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Items ({selectedOrderDetails.items?.length || 0})
                    </h3>
                  </div>
                  <div className="p-5 space-y-4">
                    {selectedOrderDetails.items?.map(
                      (item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center p-1 shrink-0">
                            <img
                              src={item.image || "/placeholder.png"}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-slate-900 truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {item.variant}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-medium text-slate-900">
                              £{(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                    <CreditCard size={18} className="text-slate-400" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Payment Summary
                    </h3>
                  </div>
                  <div className="p-5 text-sm space-y-3">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>
                        £
                        {selectedOrderDetails.financials?.subtotal.toFixed(2) ||
                          "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span>
                        {selectedOrderDetails.financials?.shipping === 0
                          ? "Free"
                          : `£${selectedOrderDetails.financials?.shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {selectedOrderDetails.financials?.discount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount</span>
                        <span>
                          -£
                          {selectedOrderDetails.financials?.discount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100 mt-2">
                      <span className="font-bold text-slate-900">Total</span>
                      <span className="font-bold text-lg text-indigo-600">
                        £
                        {selectedOrderDetails.financials?.total.toFixed(2) ||
                          "0.00"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : isViewingAllOrders ? (
              /* 2. VIEW ALL ORDERS STATE */
              <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 space-y-4">
                <button
                  onClick={() => setIsViewingAllOrders(false)}
                  className="flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors mb-2"
                >
                  <ChevronLeft size={16} /> Back to Profile
                </button>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={18} className="text-slate-400" />
                      <h3 className="text-sm font-bold text-slate-900">
                        Complete Order History
                      </h3>
                    </div>
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                      {selectedCustomer.total_orders} Orders
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {selectedCustomer.recent_orders?.map(
                      (order: any, idx: number) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedOrderDetails(order)}
                          className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <p className="text-sm font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                              {order.id}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {order.date}
                            </p>
                          </div>
                          <div className="text-right flex flex-col items-end gap-2">
                            <p className="text-sm font-bold text-slate-900">
                              {order.total}
                            </p>
                            {getOrderStatusBadge(order.status)}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* 1. STANDARD PROFILE STATE */
              <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 space-y-6">
                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                      <TrendingUp size={16} />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Lifetime Value
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      £{selectedCustomer.lifetime_value.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                      <ShoppingBag size={16} />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Total Orders
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {selectedCustomer.total_orders}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Avg. £{selectedCustomer.avg_order_value.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Contact & Shipping Info */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                    <MapPin size={18} className="text-slate-400" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Contact & Address
                    </h3>
                  </div>
                  <div className="p-5 text-sm space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-slate-400 shrink-0" />
                        <a
                          href={`mailto:${selectedCustomer.email}`}
                          className="text-indigo-600 hover:underline font-medium"
                        >
                          {selectedCustomer.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-slate-400 shrink-0" />
                        <span className="text-slate-700">
                          {selectedCustomer.phone || "No phone provided"}
                        </span>
                      </div>
                    </div>
                    {selectedCustomer.address && (
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <p className="text-slate-700 font-medium mb-1">
                          Default Shipping Address
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          {selectedCustomer.address.line1}
                          <br />
                          {selectedCustomer.address.city},{" "}
                          {selectedCustomer.address.region}{" "}
                          {selectedCustomer.address.zip}
                          <br />
                          {selectedCustomer.address.country}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order History Feed */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-slate-400" />
                      <h3 className="text-sm font-bold text-slate-900">
                        Recent Orders
                      </h3>
                    </div>
                    {selectedCustomer.recent_orders?.length > 0 && (
                      <button
                        onClick={() => setIsViewingAllOrders(true)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        View All
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-slate-100">
                    {!selectedCustomer.recent_orders ||
                    selectedCustomer.recent_orders.length === 0 ? (
                      <p className="p-5 text-sm text-slate-500 text-center">
                        No orders placed yet.
                      </p>
                    ) : (
                      selectedCustomer.recent_orders.map(
                        (order: any, idx: number) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedOrderDetails(order)}
                            className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer"
                          >
                            <div>
                              <p className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                                {order.id}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {order.date}
                              </p>
                            </div>
                            <div className="text-right flex flex-col items-end gap-1.5">
                              <p className="text-sm font-bold text-slate-900">
                                {order.total}
                              </p>
                              {getOrderStatusBadge(order.status)}
                            </div>
                          </div>
                        ),
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Drawer Footer Actions */}
            {!selectedOrderDetails && (
              <div className="p-5 border-t border-slate-200 bg-white shrink-0 flex items-center gap-3">
                <button className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm text-center">
                  Reset Password
                </button>
                <button className="flex-1 px-4 py-2.5 bg-indigo-600 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm text-center">
                  Send Email
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Customers;
