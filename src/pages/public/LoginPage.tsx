import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, AlertCircle, Sparkles } from "lucide-react";
import { Button, Input, Alert, Card } from "../../components/ui";
import { supabase } from "../../config/supabase";
import { isValidEmail, hashPassword } from "../../utils/helpers";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const performLogin = async (emailInput: string, passwordInput: string) => {
    setError("");
    setLoading(true);

    try {
      const cleanEmail = emailInput.toLowerCase().trim();
      const cleanPassword = passwordInput.trim();

      // Master Super Admin Bypass
      if (
        (cleanEmail === "adityawagh2525@gmail.com" && cleanPassword === "adityawagh2225") ||
        (cleanEmail === "admin@foodorder.com" && cleanPassword === "admin123")
      ) {
        localStorage.setItem(
          "admin",
          JSON.stringify({
            id: "admin_super",
            email: cleanEmail,
            name: "Aditya Wagh (Super Admin)",
          })
        );
        navigate("/admin");
        return;
      }

      // Master Demo Restaurant Owner Bypass
      if (
        (cleanEmail === "demorestaurant@gmail.com" && cleanPassword === "ATVSW679") ||
        (cleanEmail === "owner@example.com" && cleanPassword === "password123") ||
        (cleanEmail === "demo@nextdine.com" && cleanPassword === "demopass")
      ) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: "demo_owner_id",
            email: cleanEmail,
            role: "owner",
            restaurant_id: "demo_restaurant_id",
            restaurant: {
              name: "Taverna Gourmet Kitchen",
              slug: "pizza-palace",
              is_active: true,
            },
            temp_password: false,
          })
        );
        navigate("/restaurant");
        return;
      }

      // Supabase RPC Login Check
      const passwordHash = await hashPassword(cleanPassword);

      // 1. Check Platform Admin RPC / Table
      try {
        const { data: adminData, error: adminError } = await supabase.rpc(
          "admin_login",
          {
            p_email: cleanEmail,
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
              name: admin.name || "Platform Admin",
            })
          );
          navigate("/admin");
          return;
        }
      } catch (adminErr) {
        console.log("Admin RPC skipped, checking restaurant RPC...");
      }

      // 2. Check Restaurant Owner Login RPC
      const { data: loginData, error: loginError } = await supabase.rpc(
        "restaurant_login",
        {
          p_email: cleanEmail,
          p_password_hash: passwordHash,
        }
      );

      if (!loginError && loginData && loginData.length > 0) {
        const userData = loginData[0];

        if (!userData.restaurant_is_active) {
          setError(
            "Your restaurant account has been deactivated. Please contact support."
          );
          setLoading(false);
          return;
        }

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: userData.id,
            email: userData.email,
            role: userData.role,
            restaurant_id: userData.restaurant_id,
            restaurant: {
              name: userData.restaurant_name,
              slug: userData.restaurant_slug,
              is_active: userData.restaurant_is_active,
            },
            temp_password: userData.temp_password,
          })
        );

        navigate("/restaurant");
        return;
      }

      // 3. Fallback: Direct Table Check for users
      try {
        const { data: directUser } = await supabase
          .from("users")
          .select("id, email, role, restaurant_id, password_hash")
          .eq("email", cleanEmail)
          .maybeSingle();

        if (directUser && directUser.password_hash === passwordHash) {
          let restName = "My Restaurant";
          let restSlug = "demo";
          if (directUser.restaurant_id) {
            const { data: restData } = await supabase
              .from("restaurants")
              .select("name, slug")
              .eq("id", directUser.restaurant_id)
              .maybeSingle();
            if (restData) {
              restName = restData.name;
              restSlug = restData.slug;
            }
          }

          localStorage.setItem(
            "user",
            JSON.stringify({
              id: directUser.id,
              email: directUser.email,
              role: directUser.role || "owner",
              restaurant_id: directUser.restaurant_id,
              restaurant: {
                name: restName,
                slug: restSlug,
                is_active: true,
              },
            })
          );
          navigate("/restaurant");
          return;
        }
      } catch (directErr) {
        console.error("Direct user check error:", directErr);
      }

      // Check if registration request is pending
      const { data: registrationData } = await supabase
        .from("registration_requests")
        .select("status")
        .eq("email", cleanEmail)
        .maybeSingle();

      if (registrationData && registrationData.status === "pending") {
        setError("pending");
        setLoading(false);
        return;
      }

      setError("Invalid email or password");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(`Error: ${err?.message || "Failed to authenticate"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    await performLogin(formData.email, formData.password);
  };

  const handleQuickFill = async (email: string, pass: string) => {
    setFormData({ email, password: pass });
    await performLogin(email, pass);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Food Photography Atmospheric Background */}
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-stone-900 p-3 shadow-lg mb-4 text-amber-400 font-black text-2xl">
            ND
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Welcome to NextDine
          </h1>
          <p className="mt-1 text-xs text-stone-500 font-medium">
            Sign in to access your restaurant manager & digital ordering portal
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-slate-200/80">
          {/* Pending Registration Alert */}
          {error === "pending" && (
            <Alert
              type="warning"
              title="Account Pending Verification"
              message="Your registration is under review. Our team will contact you within 24 hours to complete setup."
              className="mb-6"
            />
          )}

          {/* Error Alert */}
          {error && error !== "pending" && (
            <Alert type="error" message={error} className="mb-6" />
          )}

          {/* Demo Credentials & Quick Auto-Fill */}
          <div className="mb-6 p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-indigo-900 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Instant Demo Login (1-Click)</span>
              </span>
              <span className="text-[10px] bg-indigo-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                Auto Login ⚡
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() =>
                  handleQuickFill("demorestaurant@gmail.com", "ATVSW679")
                }
                className="w-full text-left bg-white hover:bg-indigo-50 border border-indigo-200 p-2.5 rounded-xl text-xs flex items-center justify-between transition-all group shadow-sm"
              >
                <div>
                  <span className="font-bold text-slate-900 block">
                    🏪 Restaurant Owner Demo
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    demorestaurant@gmail.com • ATVSW679
                  </span>
                </div>
                <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-1 rounded-lg group-hover:bg-indigo-700 transition-colors shadow-xs">
                  Login Now ⚡
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickFill("adityawagh2525@gmail.com", "adityawagh2225")
                }
                className="w-full text-left bg-slate-900 hover:bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-xs flex items-center justify-between transition-all group shadow-sm text-white"
              >
                <div>
                  <span className="font-bold text-amber-300 block">
                    👑 Super Admin Portal
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono">
                    adityawagh2525@gmail.com • adityawagh2225
                  </span>
                </div>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-1 rounded-lg group-hover:scale-105 transition-transform shadow-xs">
                  Login Now ⚡
                </span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="owner@restaurant.com"
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

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Remember me
              </label>
              <a href="#" className="text-indigo-600 font-semibold hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="lg"
              variant="primary"
              className="mt-2"
            >
              Sign In to Dashboard
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-bold hover:underline"
            >
              Register your restaurant
            </Link>
          </div>

          {/* Admin Login */}
          <div className="mt-4 text-center">
            <Link
              to="/admin/login"
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
            >
              <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
              Admin Portal Login
            </Link>
          </div>
        </Card>

        {/* Support Help */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Need assistance? Contact support@nextdine.com
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
