import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Package,
  Calendar,
  Download,
  BarChart3,
  Flame,
} from "lucide-react";
import { Card, Button, Loading } from "../../components/ui";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "../../config/supabase";
import { formatCurrency } from "../../utils/helpers";

interface ReportData {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  topItems: { name: string; count: number; revenue: number }[];
  dailyRevenue: { date: string; revenue: number; orders: number }[];
  orderTypeDistribution: { type: string; count: number }[];
}

const Reports: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [dateRange, setDateRange] = useState<"7" | "30" | "90">("30");

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.restaurant_id) return;

      const daysAgo = parseInt(dateRange);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysAgo);

      const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .eq("restaurant_id", user.restaurant_id)
        .gte("created_at", startDate.toISOString())
        .in("status", ["completed", "ready", "preparing", "accepted"]);

      if (error) throw error;

      const totalRevenue =
        orders?.reduce((sum, order) => sum + (order.total_amount || order.total || 0), 0) || 0;
      const totalOrders = orders?.length || 0;
      const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      const itemCounts: Record<string, { count: number; revenue: number }> = {};
      orders?.forEach((order) => {
        order.items?.forEach((item: any) => {
          if (!itemCounts[item.name]) {
            itemCounts[item.name] = { count: 0, revenue: 0 };
          }
          itemCounts[item.name].count += item.quantity || 1;
          itemCounts[item.name].revenue += item.item_total || (item.base_price * item.quantity) || 0;
        });
      });

      const topItems = Object.entries(itemCounts)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      const dailyData: Record<string, { revenue: number; orders: number }> = {};
      orders?.forEach((order) => {
        const date = new Date(order.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        if (!dailyData[date]) {
          dailyData[date] = { revenue: 0, orders: 0 };
        }
        dailyData[date].revenue += (order.total_amount || order.total || 0);
        dailyData[date].orders += 1;
      });

      const dailyRevenue = Object.entries(dailyData)
        .map(([date, data]) => ({ date, ...data }))
        .slice(-14);

      const typeCounts: Record<string, number> = {};
      orders?.forEach((order) => {
        const type = order.order_type || "Dine-in";
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      });

      const orderTypeDistribution = Object.entries(typeCounts).map(
        ([type, count]) => ({ type: type.toUpperCase(), count })
      );

      setReportData({
        totalRevenue,
        totalOrders,
        avgOrderValue,
        topItems,
        dailyRevenue,
        orderTypeDistribution,
      });
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    if (!reportData) return;

    const csvContent = [
      ["Metric", "Value"],
      ["Total Revenue", formatCurrency(reportData.totalRevenue)],
      ["Total Orders", reportData.totalOrders.toString()],
      ["Average Order Value", formatCurrency(reportData.avgOrderValue)],
      [""],
      ["Top Items", "Quantity", "Revenue"],
      ...reportData.topItems.map((item) => [
        item.name,
        item.count.toString(),
        formatCurrency(item.revenue),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nextdine-report-${dateRange}-days.csv`;
    a.click();
  };

  if (loading) {
    return <Loading text="Generating business reports..." />;
  }

  if (!reportData) {
    return (
      <div className="text-center py-16 text-slate-500">No report data available</div>
    );
  }

  const CHART_COLORS = ["#4F46E5", "#10B981", "#3B82F6", "#F59E0B", "#8B5CF6"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-amber-600" />
            Executive Reports & Revenue Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Real sales data, basket metrics, and top dish performance breakdown
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as "7" | "30" | "90")}
            className="input !py-2 !w-auto text-xs font-semibold cursor-pointer"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
          <Button
            icon={<Download className="w-4 h-4" />}
            onClick={exportReport}
            variant="outline"
            size="sm"
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Revenue</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200/60">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
            {formatCurrency(reportData.totalRevenue)}
          </div>
          <p className="text-xs text-emerald-600 font-medium flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            Verified Sales
          </p>
        </Card>

        <Card className="border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Orders</span>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-200/60">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
            {reportData.totalOrders}
          </div>
          <p className="text-xs text-slate-500">Processed Tickets</p>
        </Card>

        <Card className="border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Avg Order Value</span>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-200/60">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
            {formatCurrency(reportData.avgOrderValue)}
          </div>
          <p className="text-xs text-slate-500">Per Table / Basket</p>
        </Card>

        <Card className="border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Time Window</span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-200/60">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
            {dateRange} Days
          </div>
          <p className="text-xs text-slate-500">Historical Window</p>
        </Card>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="border-slate-200/80">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4 tracking-tight">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={reportData.dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [formatCurrency(value), "Revenue"]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4F46E5"
                strokeWidth={3}
                dot={{ fill: "#4F46E5", r: 4 }}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Order Type Distribution */}
        <Card className="border-slate-200/80">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4 tracking-tight">
            Order Type Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={reportData.orderTypeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) =>
                  `${entry.type}: ${((entry.percent || 0) * 100).toFixed(0)}%`
                }
                outerRadius={90}
                dataKey="count"
              >
                {reportData.orderTypeDistribution.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Popular Dishes Leaderboard */}
      <Card className="border-slate-200/80">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            Top Performing Dishes
          </h3>
          <Package className="w-5 h-5 text-indigo-600" />
        </div>

        {reportData.topItems.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">
            No item sales recorded in this period
          </p>
        ) : (
          <div className="space-y-2.5">
            {reportData.topItems.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/60"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="flex items-center justify-center w-7 h-7 bg-slate-900 rounded-lg text-white font-extrabold text-xs">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="font-extrabold text-xs sm:text-sm text-slate-900">{item.name}</div>
                    <div className="text-[11px] text-slate-500">
                      {item.count} order{item.count > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-emerald-600">
                    {formatCurrency(item.revenue)}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Gross Sales</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Daily Orders Volume Chart */}
      <Card className="border-slate-200/80">
        <h3 className="text-sm font-extrabold text-slate-900 mb-4 tracking-tight">Daily Order Volume</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={reportData.dailyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" fontSize={11} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                fontSize: "12px",
              }}
            />
            <Legend />
            <Bar dataKey="orders" fill="#10B981" radius={[6, 6, 0, 0]} name="Orders Count" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Reports;
