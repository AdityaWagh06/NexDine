import React, { useEffect, useState } from "react";
import {
  useNavigate,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Shield,
  LogOut,
  LayoutDashboard,
  FileText,
  Store as StoreIcon,
  BarChart3,
} from "lucide-react";
import DashboardHome from "./DashboardHome";
import PendingRequests from "./PendingRequests";
import AllRestaurants from "./AllRestaurants";
import Analytics from "./Analytics";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      navigate("/admin/login");
    } else {
      setAdmin(JSON.parse(adminData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  if (!admin) return null;

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Platform Overview" },
    { path: "/admin/requests", icon: FileText, label: "Pending Verification" },
    { path: "/admin/restaurants", icon: StoreIcon, label: "All Restaurants" },
    { path: "/admin/analytics", icon: BarChart3, label: "Global Analytics" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900">
      {/* Top Navigation Bar */}
      <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: NextDine Admin Brand */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link to="/admin" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-extrabold text-white tracking-tight">
                    Next<span className="text-indigo-400">Dine</span> Admin
                  </span>
                  <span className="text-[10px] font-semibold text-indigo-300 tracking-wider uppercase -mt-1">
                    Super Control Panel
                  </span>
                </div>
              </Link>
            </div>

            {/* Right: System Status Pulse, Admin email & Logout */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="hidden sm:inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 px-3 py-1 rounded-full text-[11px] font-bold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>DB Live Sync</span>
              </div>
              <span className="hidden md:inline text-xs text-slate-400 font-mono">
                {admin.email}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-rose-400 hover:bg-slate-800 transition-colors border border-slate-700"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Secondary Navigation Bar (Tabs) */}
      <div className="bg-white border-b border-slate-200/80 shadow-2xs">
        <div className="container-custom">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2">
            {navItems.map((item) => {
              const isActive =
                item.path === "/admin"
                  ? location.pathname === "/admin"
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container-custom py-8">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="requests" element={<PendingRequests />} />
          <Route path="restaurants" element={<AllRestaurants />} />
          <Route path="analytics" element={<Analytics />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
