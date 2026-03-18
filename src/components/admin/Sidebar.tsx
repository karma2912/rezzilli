import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  CalendarDays, 
  Settings, 
  Store,
  LogOut,
  Gift
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Customers", path: "/admin/customers", icon: Users },
    { name: "Events & Content", path: "/admin/content", icon: CalendarDays },
    { name: "Promotions", path: "/admin/promotions", icon: Gift },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col sticky top-0 flex-shrink-0">
      
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">R</span>
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">Rezzilli Admin</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
        <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Menu</p>
        
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-indigo-50 text-indigo-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={18} className={isActive ? "text-indigo-600" : "text-slate-400"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        <Link 
          to="/" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <Store size={18} className="text-slate-400" />
          View Storefront
        </Link>
        <button 
          onClick={() => {
            localStorage.removeItem("rezzilli_user");
            window.location.href = "/login";
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut size={18} className="text-rose-500" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;