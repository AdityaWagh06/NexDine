import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Mail, Lock } from "lucide-react";
import { Button, Input, Alert, Card } from "../../components/ui";
import { supabase } from "../../config/supabase";
import { isValidEmail, hashPassword } from "../../utils/helpers";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const emailClean = formData.email.toLowerCase().trim();
      const passwordClean = formData.password.trim();

      // Master Demo Credential Checks
      const isAditya = emailClean === "adityawagh2525@gmail.com" && passwordClean === "adityawagh2225";
      const isDemo = (emailClean === "demo@nextdine.com" || emailClean === "demo") && (passwordClean === "demopass" || passwordClean === "demo");
      const isAdmin = emailClean === "admin@foodorder.com" && passwordClean === "admin123";

      if (isAditya || isDemo || isAdmin) {
        localStorage.setItem(
          "admin",
          JSON.stringify({
            id: "admin_super",
            email: emailClean || "adityawagh2525@gmail.com",
            name: "Aditya Wagh (Super Admin)",
          })
        );
        navigate("/admin");
        return;
      }

      // Supabase RPC Fallback
      const passwordHash = await hashPassword(passwordClean);
      const { data: adminData, error: adminError } = await supabase.rpc(
        "admin_login",
        {
          p_email: emailClean,
          p_password_hash: passwordHash,
        }
      );

      if (!adminError && adminData && adminData.length > 0) {
        const admin = adminData[0];
        localStorage.setItem(
          "admin",
          JSON.stringify({
            id: admin.id,
            email: admin.email,
            name: admin.name || "System Admin",
          })
        );
        navigate("/admin");
        return;
      }

      setError("Invalid email or password");
    } catch (err: any) {
      console.error("Admin login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleQuickFill = (email: string, pass: string) => {
    setFormData({ email, password: pass });
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to NextDine Home
        </Link>

        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 mb-4">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            NextDine Super Admin
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Platform control panel & restaurant verification portal
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-slate-800 bg-slate-800/80 text-white">
          {/* Quick Auto-Fill Demo Credentials Card */}
          <div className="mb-6 p-3.5 bg-indigo-950/70 rounded-2xl border border-indigo-500/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-indigo-300 flex items-center gap-1">
                <span>🔑</span> Demo Admin Credentials
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                1-Click Ready
              </span>
            </div>

            <div className="flex flex-col gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => handleQuickFill("adityawagh2525@gmail.com", "adityawagh2225")}
                className="w-full text-left bg-indigo-900/60 hover:bg-indigo-900 border border-indigo-500/50 hover:border-indigo-400 p-2 rounded-xl text-xs flex items-center justify-between transition-all group"
              >
                <div>
                  <span className="font-bold text-white block text-[11px]">Aditya Wagh (Primary Admin)</span>
                  <span className="text-[10px] text-indigo-200 font-mono">adityawagh2525@gmail.com • adityawagh2225</span>
                </div>
                <span className="text-[10px] bg-amber-400 text-stone-950 font-black px-2 py-1 rounded-lg group-hover:scale-105 transition-transform">
                  Auto-Fill ⚡
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill("admin@foodorder.com", "admin123")}
                className="w-full text-left bg-slate-900/60 hover:bg-slate-900 border border-slate-700 hover:border-slate-500 p-2 rounded-xl text-xs flex items-center justify-between transition-all group"
              >
                <div>
                  <span className="font-bold text-slate-200 block text-[11px]">System Admin</span>
                  <span className="text-[10px] text-slate-400 font-mono">admin@foodorder.com • admin123</span>
                </div>
                <span className="text-[10px] bg-slate-700 text-white font-bold px-2 py-1 rounded-lg group-hover:scale-105 transition-transform">
                  Auto-Fill
                </span>
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {error && <Alert type="error" message={error} className="mb-6" />}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Email
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="adityawagh2525@gmail.com"
                icon={<Mail className="w-5 h-5 text-slate-400" />}
                required
                autoComplete="email"
                className="bg-slate-900/90 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                icon={<Lock className="w-5 h-5 text-slate-400" />}
                required
                autoComplete="current-password"
                className="bg-slate-900/90 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <Button type="submit" loading={loading} fullWidth size="lg" variant="primary" className="mt-2">
              Sign In to Admin Portal →
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
