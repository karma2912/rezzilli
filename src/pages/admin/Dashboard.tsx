import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  MapPin, 
  ShoppingBag, 
  AlertTriangle, 
  Package,
  Download,
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

function Dashboard() {
  const [timeRange, setTimeRange] = useState("7 Days");
  
  // DYNAMIC STATE
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://rezzillidrinks.com/api/get-dashboard-stats.php?range=${timeRange}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data);
        }
      })
      .catch(err => console.error("Failed to load dashboard stats", err))
      .finally(() => setIsLoading(false));
  }, [timeRange]);

  if (isLoading || !stats) {
    return <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

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
            <option>1 Week</option>
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>1 Year</option>
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
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Total Revenue</p>
              <h2 className="text-3xl font-bold text-slate-900">£{Number(stats.metrics.revenue).toFixed(2)}</h2>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                <ShoppingBag size={20} strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Orders Today</p>
              <h2 className="text-3xl font-bold text-slate-900">{stats.metrics.ordersToday}</h2>
            </div>
          </div>

          {/* Top City Card (Replacing Customers) */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <MapPin size={20} strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Top Delivery City</p>
              <h2 className="text-3xl font-bold text-slate-900 truncate">{stats.metrics.topCity}</h2>
            </div>
          </div>
        </div>

        {/* --- CHARTS ROW --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Revenue Chart (Takes up 2/3 width) */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-semibold text-slate-900">Revenue (Last 7 Days)</h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.charts.revenueHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `£${value}`} />
                  <Tooltip 
                    formatter={(value: any) => [`£${Number(value).toFixed(2)}`, 'Revenue']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#4f46e5', fontWeight: '600' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Orders by Status (Takes up 1/3 width) */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-semibold text-slate-900">Orders by Status</h3>
            </div>
            <div className="h-[200px] w-full relative flex-grow flex items-center justify-center">
              {stats.charts.statusBreakdown.length === 0 ? (
                <p className="text-slate-400 text-sm">No orders yet</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.charts.statusBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {stats.charts.statusBreakdown.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontWeight: '500' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            
            {/* Custom Legend */}
            <div className="flex justify-center gap-5 mt-6">
              {stats.charts.statusBreakdown.map((status: any, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                  <span className="text-sm font-medium text-slate-600">{status.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- BOTTOM ROW --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Cities */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-semibold text-slate-900">Top Locations</h3>
            </div>
            <div className="h-[250px] w-full">
              {stats.charts.topLocations.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-slate-400 text-sm">No locations data yet</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.charts.topLocations} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={90} tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }} />
                    <Tooltip 
                      formatter={(value: any) => [value, 'Orders']}
                      cursor={{ fill: '#f8fafc' }} 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Bar dataKey="users" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-slate-900">Inventory Alerts</h3>
              <span className="bg-rose-50 text-rose-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-rose-100">
                {stats.lowStock.length} Action{stats.lowStock.length !== 1 ? 's' : ''} Req.
              </span>
            </div>
            
            <div className="flex-grow space-y-3 overflow-y-auto">
              {stats.lowStock.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">All inventory levels are healthy.</p>
              ) : (
                stats.lowStock.map((item: any) => (
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
                        <a href="/admin/products" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Restock</a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl p-0 border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Recent Orders</h3>
              <a href="/admin/orders" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</a>
            </div>

            <div className="flex-grow flex flex-col">
              {stats.recentOrders.length === 0 ? (
                <p className="p-6 text-center text-sm text-slate-500">No orders placed yet.</p>
              ) : (
                stats.recentOrders.map((order: any, i: number) => (
                  <div key={order.id} className={`flex items-center justify-between p-4 hover:bg-slate-50 transition-colors ${i !== stats.recentOrders.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center text-slate-600">
                        <Package size={16} />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-900 truncate max-w-[120px]">{order.customer}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{order.id} • {order.time}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1.5 shrink-0">
                      <p className="font-semibold text-sm text-slate-900">{order.total}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
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
      </div>
    </div>
  );
}

export default Dashboard;