import React, { useEffect, useState } from "react";
import {
  useNavigate,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  FileText,
  Settings,
  ExternalLink,
  QrCode,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import RestaurantHome from "./RestaurantHome";
import Orders from "./Orders";
import Menu from "./Menu";
import QRTables from "./QRTables";
import Reports from "./Reports";
import RestaurantSettings from "./RestaurantSettings";
import { subscribeToOrders } from "../../services/restaurantService";

const RestaurantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState<number>(0);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setRestaurant({
        name: parsedUser.restaurant?.name || "NextDine Restaurant",
        slug: parsedUser.restaurant?.slug || "nextdine",
      });

      if (parsedUser.restaurant_id) {
        const sub = subscribeToOrders(parsedUser.restaurant_id, (orders) => {
          const pending = orders.filter((o) => o.status === "pending").length;
          setPendingCount(pending);
        });
        return () => {
          sub.unsubscribe();
        };
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  const navItems = [
    { path: "/restaurant", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { path: "/restaurant/orders", icon: ShoppingBag, label: "Orders", badge: pendingCount > 0 ? pendingCount : null },
    { path: "/restaurant/menu", icon: UtensilsCrossed, label: "Menu" },
    { path: "/restaurant/qr-tables", icon: QrCode, label: "QR Tables" },
    { path: "/restaurant/reports", icon: FileText, label: "Reports" },
    { path: "/restaurant/settings", icon: Settings, label: "Settings" },
  ];

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row text-slate-900 font-sans antialiased">
      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-slate-900">
            NextDine
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-500 truncate max-w-[140px]">
            {restaurant?.name}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {pendingCount > 0 && (
            <Link
              to="/restaurant/orders"
              className="flex items-center space-x-1 px-2 py-1 bg-amber-50 border border-amber-200 rounded-md text-xs font-medium text-amber-700"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>{pendingCount}</span>
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 z-50 h-screen w-56 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-150 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Top */}
        <div>
          <div className="px-4 py-4 border-b border-slate-100">
            <Link to="/restaurant" className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-md bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                N
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-900 block leading-none">
                  NextDine
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5 truncate max-w-[130px]">
                  {restaurant?.name}
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="px-2 py-3 space-y-0.5">
            {navItems.map((item) => {
              const isActive = item.exact
                ? currentPath === "/restaurant"
                : currentPath.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-slate-100 text-slate-900 font-medium"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <item.icon className={`w-4 h-4 ${isActive ? "text-slate-700" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== null && item.badge !== undefined && (
                    <span className="min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-bold rounded-full bg-amber-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom */}
        <div className="px-2 py-3 border-t border-slate-100 space-y-1">
          {restaurant?.slug && (
            <a
              href={`/menu/${restaurant.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Menu</span>
            </a>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto">
          <Routes>
            <Route index element={<RestaurantHome />} />
            <Route path="orders" element={<Orders />} />
            <Route path="menu" element={<Menu />} />
            <Route path="qr-tables" element={<QRTables />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<RestaurantSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
