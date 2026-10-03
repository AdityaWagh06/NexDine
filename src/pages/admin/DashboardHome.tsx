import React, { useEffect, useState } from "react";
import {
  Store as StoreIcon,
  FileText,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Card, Loading } from "../../components/ui";
import { getPlatformStats } from "../../services/adminService";
import { formatCurrency } from "../../utils/helpers";
import { Link } from "react-router-dom";

const DashboardHome: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeRestaurants: 0,
    pendingRequests: 0,
    totalOrders: 0,
    todayRevenue: 0,
  });

  const loadStats = async () => {
    setLoading(true);
    const data = await getPlatformStats();
    setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return <Loading text="Loading platform statistics..." />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-stone-900 p-6 rounded-2xl text-white shadow-xl border border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Platform Status: Operational 100%</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            NextDine Super Admin Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
            Monitor live restaurant registrations, system order volumes, and DB health.
          </p>
        </div>
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-sm">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>Super Admin Access</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-all border-slate-200/80">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Outlets
            </span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200/60">
              <StoreIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mb-1">
            {stats.activeRestaurants}
          </div>
          <p className="text-xs text-slate-500">Active Tenants</p>
        </Card>

        <Card className="hover:shadow-md transition-all border-slate-200/80">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pending Verification
            </span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-200/60">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mb-1">
            {stats.pendingRequests}
          </div>
          {stats.pendingRequests > 0 ? (
            <Link
              to="/admin/requests"
              className="text-xs font-bold text-amber-600 hover:underline inline-flex items-center"
            >
              <span>Review pending</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          ) : (
            <p className="text-xs text-slate-500">All caught up</p>
          )}
        </Card>

        <Card className="hover:shadow-md transition-all border-slate-200/80">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Platform Orders
            </span>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-200/60">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mb-1">
            {stats.totalOrders}
          </div>
          <p className="text-xs text-emerald-600 font-medium flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            All-time network orders
          </p>
        </Card>

        <Card className="hover:shadow-md transition-all border-slate-200/80">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Today's Network GMV
            </span>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-200/60">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mb-1">
            {formatCurrency(stats.todayRevenue)}
          </div>
          <p className="text-xs text-slate-500">Cross-restaurant total</p>
        </Card>
      </div>

      {/* Quick Actions Shortcuts */}
      <Card className="border-slate-200/80">
        <h3 className="text-base font-bold text-slate-900 mb-4 tracking-tight">Admin Shortcuts</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/requests"
            className="group p-5 border border-slate-200/80 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50/40 transition-all duration-200"
          >
            <FileText className="w-7 h-7 text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
              Review Applications
            </h4>
            <p className="text-xs text-slate-500">
              {stats.pendingRequests} pending verification request{stats.pendingRequests !== 1 ? "s" : ""}
            </p>
          </Link>

          <Link
            to="/admin/restaurants"
            className="group p-5 border border-slate-200/80 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50/40 transition-all duration-200"
          >
            <StoreIcon className="w-7 h-7 text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
              Manage Restaurants
            </h4>
            <p className="text-xs text-slate-500">
              {stats.activeRestaurants} active registered outlets
            </p>
          </Link>

          <Link
            to="/admin/analytics"
            className="group p-5 border border-slate-200/80 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50/40 transition-all duration-200"
          >
            <TrendingUp className="w-7 h-7 text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
              Platform Analytics
            </h4>
            <p className="text-xs text-slate-500">
              System health and growth performance
            </p>
          </Link>
        </div>
      </Card>

      {/* Action Banner for Pending Requests */}
      {stats.pendingRequests > 0 && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 flex items-start justify-between shadow-sm">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mr-1 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-amber-900 mb-0.5">Action Required</h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                You have {stats.pendingRequests} pending registration request
                {stats.pendingRequests > 1 ? "s" : ""} awaiting review. Approve outlets to issue login credentials.
              </p>
            </div>
          </div>
          <Link
            to="/admin/requests"
            className="px-4 py-2 bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-amber-700 transition-colors flex-shrink-0"
          >
            Review Applications
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
