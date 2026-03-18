import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AdminLayout() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Left Sidebar (Fixed width) */}
      <Sidebar />

      {/* Right Content Area (Takes up remaining space and scrolls) */}
      <div className="flex-1 overflow-y-auto">
        {/* <Outlet /> is where React Router injects the Dashboard, Orders, etc. */}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;