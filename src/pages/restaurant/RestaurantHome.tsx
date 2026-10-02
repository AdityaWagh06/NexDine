import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  DollarSign,
  Clock,
  ArrowRight,
  Package,
} from "lucide-react";
import { Card, Loading } from "../../components/ui";
import { getRestaurantStats } from "../../services/restaurantService";
import { formatCurrency } from "../../utils/helpers";
import { Link } from "react-router-dom";

const RestaurantHome: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.restaurant_id) return;

    const data = await getRestaurantStats(user.restaurant_id);
    setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return <Loading text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">Today's operations at a glance</p>
      </div>

      {/* Pending orders alert */}
      {stats?.pendingOrders > 0 && (
        <Link
          to="/restaurant/orders"
          className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg group hover:bg-amber-100/60 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-md bg-amber-500 text-white flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-900">
                {stats.pendingOrders} order{stats.pendingOrders > 1 ? "s" : ""} waiting for confirmation
              </p>
              <p className="text-xs text-amber-700">Kitchen needs your attention</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500">Completed Today</span>
            <ShoppingBag className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-semibold text-slate-900 tabular-nums">
            {stats?.completedToday || 0}
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500">Revenue Today</span>
            <DollarSign className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-semibold text-slate-900 tabular-nums">
            {formatCurrency(stats?.revenueToday || 0)}
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500">Pending</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className={`text-2xl font-semibold tabular-nums ${stats?.pendingOrders > 0 ? "text-amber-600" : "text-slate-900"}`}>
            {stats?.pendingOrders || 0}
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500">All-time Orders</span>
            <Package className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-semibold text-slate-900 tabular-nums">
            {stats?.totalOrders || 0}
          </p>
        </Card>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-medium text-slate-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/restaurant/orders"
            className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-900">Live Orders</p>
                <p className="text-xs text-slate-400">Manage kitchen queue</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            to="/restaurant/menu"
            className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Package className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-900">Menu Items</p>
                <p className="text-xs text-slate-400">Prices & availability</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            to="/restaurant/reports"
            className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <DollarSign className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-900">Reports</p>
                <p className="text-xs text-slate-400">Revenue & trends</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHome;
