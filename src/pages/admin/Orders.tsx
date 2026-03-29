import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  X,
  MapPin,
  Gift,
  CreditCard,
  Package,
} from "lucide-react";

function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // --- DYNAMIC DATA STATES ---
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // --- FETCH ORDERS ON MOUNT ---
  const fetchOrders = () => {
    setIsLoading(true);
    fetch("https://rezzillidrinks.com/api/get-orders.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.orders) {
          setOrders(data.orders);
        }
      })
      .catch((err) => console.error("Failed to fetch orders", err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // --- UPDATE ORDER STATUS IN DATABASE ---
  const handleStatusChange = async (newStatus: string) => {
    // Optimistically update UI immediately
    setSelectedOrder({ ...selectedOrder, status: newStatus });
    setOrders(
      orders.map((o) =>
        o.id === selectedOrder.id ? { ...o, status: newStatus } : o,
      ),
    );

    try {
      await fetch("https://rezzillidrinks.com/api/update-order-status.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedOrder.raw_id, // We send the raw database ID (e.g., 1 or 2)
          status: newStatus,
        }),
      });
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status. Please check your connection.");
    }
  };

  // Filter Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Helper for Status Badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200/50 px-2.5 py-1 rounded-md text-xs font-semibold">
            Processing
          </span>
        );
      case "Shipped":
        return (
          <span className="bg-sky-50 text-sky-700 border border-sky-200/50 px-2.5 py-1 rounded-md text-xs font-semibold">
            Shipped
          </span>
        );
      case "Delivered":
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2.5 py-1 rounded-md text-xs font-semibold">
            Delivered
          </span>
        );
      default:
        return (
          <span className="bg-slate-50 text-slate-700 border border-slate-200/50 px-2.5 py-1 rounded-md text-xs font-semibold">
            {status}
          </span>
        );
    }
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
            Orders
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage fulfillment, view details, and track shipping.
          </p>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          Export CSV
        </button>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by Order ID or Customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>

          {/* Filter */}
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
              <option value="All">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No orders found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="p-4 font-semibold text-sm text-indigo-600">
                        {order.id}
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        {order.date}
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-slate-900">
                          {order.customer}
                        </p>
                        <p className="text-xs text-slate-500">
                          {order.shipping.city}, {order.shipping.country}
                        </p>
                      </td>
                      <td className="p-4 text-sm font-semibold text-slate-900">
                        {order.total}
                      </td>
                      <td className="p-4">{getStatusBadge(order.status)}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm"
                        >
                          <Eye size={16} /> View
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

      {/* --- SLIDE-OUT ORDER DETAILS DRAWER --- */}
      {selectedOrder && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setSelectedOrder(null)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300">
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedOrder.id}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedOrder.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 space-y-6">
              {/* Status Update Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Current Status
                  </p>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Update Status
                  </p>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Gift Message Alert (Only shows if there is one) */}
              {selectedOrder.gift_message && (
                <div className="bg-rose-50 border border-rose-100 p-5 rounded-xl flex items-start gap-4">
                  <div className="p-2 bg-rose-100 text-rose-600 rounded-lg shrink-0">
                    <Gift size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-rose-900 mb-1">
                      Gift Message Included
                    </h4>
                    <p className="text-sm text-rose-800 italic leading-relaxed">
                      "{selectedOrder.gift_message}"
                    </p>
                  </div>
                </div>
              )}

              {/* Customer & Shipping Info */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                  <MapPin size={18} className="text-slate-400" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Customer & Shipping
                  </h3>
                </div>
                <div className="p-5 text-sm">
                  <p className="font-semibold text-slate-900 mb-1">
                    {selectedOrder.customer}
                  </p>
                  <p className="text-slate-600 mb-4 hover:text-indigo-600 cursor-pointer">
                    {selectedOrder.email}
                  </p>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-slate-700 font-medium mb-1">
                      {selectedOrder.shipping.name}
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      {selectedOrder.shipping.line1}
                      {selectedOrder.shipping.line2 && (
                        <>
                          <br />
                          {selectedOrder.shipping.line2}
                        </>
                      )}
                      <br />
                      {selectedOrder.shipping.city},{" "}
                      {selectedOrder.shipping.region}{" "}
                      {selectedOrder.shipping.zip}
                      <br />
                      {selectedOrder.shipping.country}
                    </p>
                    <p className="text-slate-500 mt-2 text-xs font-medium">
                      Phone: {selectedOrder.shipping.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                  <Package size={18} className="text-slate-400" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Items ({selectedOrder.items.length})
                  </h3>
                </div>
                <div className="p-5 space-y-4">
                  {selectedOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center p-1 shrink-0">
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
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
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
                    <span>£{selectedOrder.financials.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span>
                      {selectedOrder.financials.shipping === 0
                        ? "Free"
                        : `£${selectedOrder.financials.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {selectedOrder.financials.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span>
                        -£{selectedOrder.financials.discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-3 border-t border-slate-100 mt-2">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="font-bold text-lg text-indigo-600">
                      £{selectedOrder.financials.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 mt-1">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                      Method
                    </span>
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                      {selectedOrder.payment_method}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Orders;
