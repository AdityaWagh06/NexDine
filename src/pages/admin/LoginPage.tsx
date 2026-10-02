import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Mail, Lock, Sparkles } from "lucide-react";
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
      const isAditya =
        emailClean === "adityawagh2525@gmail.com" &&
        passwordClean === "adityawagh2225";
      const isDemo =
        (emailClean === "demo@nextdine.com" || emailClean === "demo") &&
        (passwordClean === "demopass" || passwordClean === "demo");
      const isAdmin =
        emailClean === "admin@foodorder.com" && passwordClean === "admin123";

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
    localStorage.setItem(
      "admin",
      JSON.stringify({
        id: "admin_super",
        email: email || "adityawagh2525@gmail.com",
        name: "Aditya Wagh (Super Admin)",
      })
    );
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Image Overlay matching main site */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80"
          alt="Gourmet Food Setup"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center text-xs font-bold text-stone-500 hover:text-red-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to NextDine Home
        </Link>

        {/* Brand Badge & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-amber-400 p-3 shadow-lg mb-4 border border-slate-800">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            NextDine Super Admin
          </h1>
          <p className="mt-1 text-xs text-stone-500 font-medium">
            Platform control panel & tenant management portal
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-slate-200/80 bg-white">
          {/* Quick Auto-Fill Demo Credentials Card */}
          <div className="mb-6 p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-indigo-950 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Super Admin Demo Credentials</span>
              </span>
              <span className="text-[10px] bg-indigo-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                1-Click Auto-Fill
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() =>
                  handleQuickFill("adityawagh2525@gmail.com", "adityawagh2225")
                }
                className="w-full text-left bg-slate-900 hover:bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-xs flex items-center justify-between transition-all group shadow-sm text-white"
              >
                <div>
                  <span className="font-bold text-amber-300 block">
                    👑 Aditya Wagh (Master Super Admin)
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono">
                    adityawagh2525@gmail.com • adityawagh2225
                  </span>
                </div>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-1 rounded-lg group-hover:scale-105 transition-transform">
                  Auto-Fill ⚡
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill("admin@foodorder.com", "admin123")}
                className="w-full text-left bg-white hover:bg-indigo-50 border border-indigo-200 p-2.5 rounded-xl text-xs flex items-center justify-between transition-all group shadow-sm text-slate-900"
              >
                <div>
                  <span className="font-bold text-slate-900 block">
                    🛡️ System Admin (Secondary)
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    admin@foodorder.com • admin123
                  </span>
                </div>
                <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2 py-1 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  Auto-Fill
                </span>
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {error && <Alert type="error" message={error} className="mb-6" />}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Admin Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="adityawagh2525@gmail.com"
              icon={<Mail className="w-5 h-5 text-slate-400" />}
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              icon={<Lock className="w-5 h-5 text-slate-400" />}
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="lg"
              variant="primary"
              className="mt-2"
            >
              Sign In to Super Admin Portal →
            </Button>
          </form>

          {/* Switch to Restaurant Login */}
          <div className="mt-6 text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
            Looking for Restaurant Owner Login?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-bold hover:underline"
            >
              Sign in to Restaurant Dashboard
            </Link>
          </div>
        </Card>

        {/* Support Help */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Super Admin Access • Confidential System Interface
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
