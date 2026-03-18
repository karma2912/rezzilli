import { useState } from "react";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  AlertTriangle, 
  ArrowUpRight,
  Package,
  Download,
  MoreVertical
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

// --- DUMMY DATA FOR DASHBOARD ---
const trafficData = [
  { name: 'Mon', visits: 4000 },
  { name: 'Tue', visits: 3000 },
  { name: 'Wed', visits: 5000 },
  { name: 'Thu', visits: 2780 },
  { name: 'Fri', visits: 6890 },
  { name: 'Sat', visits: 8390 },
  { name: 'Sun', visits: 7490 },
];

const deviceData = [
  { name: 'Mobile', value: 65, color: '#4f46e5' }, // Indigo-600
  { name: 'Desktop', value: 25, color: '#0ea5e9' }, // Sky-500
  { name: 'Tablet', value: 10, color: '#e2e8f0' }, // Slate-200
];

const countryData = [
  { name: 'UK', users: 4500 },
  { name: 'USA', users: 3200 },
  { name: 'Germany', users: 1500 },
  { name: 'France', users: 1200 },
  { name: 'Italy', users: 900 },
];

const lowStockItems = [
  { id: 1, name: "Lemon Italian Spritz", variant: "24 Bottles", stock: 5, status: "Critical" },
  { id: 2, name: "Non-Alcohol Orange", variant: "4 Bottles", stock: 12, status: "Low" },
];

const recentOrders = [
  { id: "ORD-0891", customer: "Sarah Jenkins", total: "£48.00", status: "Processing", time: "10 mins ago" },
  { id: "ORD-0890", customer: "David Chen", total: "£110.37", status: "Shipped", time: "2 hours ago" },
  { id: "ORD-0889", customer: "Emma Watson", total: "£24.00", status: "Processing", time: "3 hours ago" },
  { id: "ORD-0888", customer: "Michael Brown", total: "£72.00", status: "Delivered", time: "Yesterday" },
];

function Dashboard() {
  const [timeRange, setTimeRange] = useState("7 Days");

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track your store's performance and recent activity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer transition-all"
          >
            <option>Today</option>
            <option>7 Days</option>
            <option>30 Days</option>
            <option>12 Months</option>
          </select>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto space-y-6">
        
        {/* --- TOP METRICS ROW --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Revenue Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <TrendingUp size={20} strokeWidth={2.5} />
              </div>
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md text-xs font-semibold">
                <ArrowUpRight size={14} strokeWidth={3} /> 14.5%
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Total Revenue</p>
              <h2 className="text-3xl font-bold text-slate-900">£12,450.00</h2>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                <ShoppingBag size={20} strokeWidth={2.5} />
              </div>
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md text-xs font-semibold">
                <ArrowUpRight size={14} strokeWidth={3} /> 8.2%
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Orders Today</p>
              <h2 className="text-3xl font-bold text-slate-900">42</h2>
            </div>
          </div>

          {/* Customers Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600">
                <Users size={20} strokeWidth={2.5} />
              </div>
              <span className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-1 rounded-md text-xs font-semibold">
                Stable
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Active Customers</p>
              <h2 className="text-3xl font-bold text-slate-900">1,204</h2>
            </div>
          </div>
        </div>

        {/* --- CHARTS ROW --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Traffic Chart (Takes up 2/3 width) */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-semibold text-slate-900">Store Traffic</h3>
              <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={18} /></button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#4f46e5', fontWeight: '600' }}
                  />
                  <Area type="monotone" dataKey="visits" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Device Breakdown (Takes up 1/3 width) */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-semibold text-slate-900">Sessions by Device</h3>
              <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={18} /></button>
            </div>
            <div className="h-[200px] w-full relative flex-grow flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontWeight: '500' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-slate-900">65%</span>
                <span className="text-xs font-medium text-slate-500 mt-1">Mobile</span>
              </div>
            </div>
            
            {/* Custom Legend */}
            <div className="flex justify-center gap-5 mt-6">
              {deviceData.map((device, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }}></div>
                  <span className="text-sm font-medium text-slate-600">{device.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- BOTTOM ROW --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Countries */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-semibold text-slate-900">Top Locations</h3>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} tick={{ fontSize: 13, fill: '#475569', fontWeight: 500 }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }} 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                  />
                  <Bar dataKey="users" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-slate-900">Inventory Alerts</h3>
              <span className="bg-rose-50 text-rose-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-rose-100">
                2 Actions Req.
              </span>
            </div>
            
            <div className="flex-grow space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className={`p-2 rounded-md ${item.status === 'Critical' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                    <AlertTriangle size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 mb-2">{item.variant}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${item.status === 'Critical' ? 'text-rose-600' : 'text-amber-600'}`}>
                        {item.stock} in stock
                      </span>
                      <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Restock</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl p-0 border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Recent Orders</h3>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
            </div>

            <div className="flex-grow flex flex-col">
              {recentOrders.map((order, i) => (
                <div key={order.id} className={`flex items-center justify-between p-4 hover:bg-slate-50 transition-colors ${i !== recentOrders.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center text-slate-600">
                      <Package size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-slate-900">{order.customer}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{order.id} • {order.time}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <p className="font-semibold text-sm text-slate-900">{order.total}</p>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                      order.status === 'Processing' ? 'bg-amber-50 text-amber-700 border border-amber-200/50' :
                      order.status === 'Shipped' ? 'bg-sky-50 text-sky-700 border border-sky-200/50' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;