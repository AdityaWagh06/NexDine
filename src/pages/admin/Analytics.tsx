import React from "react";
import { TrendingUp, DollarSign, ShoppingCart, Users, Sparkles } from "lucide-react";
import { Card } from "../../components/ui";

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Global Platform Analytics
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Cross-restaurant network metrics and SaaS performance intelligence
        </p>
      </div>

      {/* Feature Preview Card */}
      <Card className="text-center py-16 border-slate-200/80">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-center space-x-3 mb-6">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200/60">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-200/60">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-200/60">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-200/60">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">
            NextDine Global Intelligence Engine
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-8 leading-relaxed">
            Advanced multi-tenant analytics, revenue forecasting, and cross-outlet benchmarks are being configured.
          </p>
          <div className="bg-slate-50 rounded-2xl p-6 text-left border border-slate-200/70">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-3 flex items-center">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 mr-1.5" />
              Planned Analytics Modules:
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>• Real-time network GMV trends and multi-outlet forecasting</li>
              <li>• Regional restaurant performance benchmarks & order density maps</li>
              <li>• Peak order window analytics and average kitchen prep turnarounds</li>
              <li>• Customer re-ordering frequency and feedback sentiment</li>
              <li>• Subscription revenue metrics, MRR, and churn analysis</li>
              <li>• Automated scheduled CSV and PDF report exports</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
