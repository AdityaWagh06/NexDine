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
      const passwordHash = await hashPassword(formData.password);
      const cleanEmail = formData.email.toLowerCase().trim();

      console.log("Attempting unified login for:", cleanEmail);

      // 1. Check Platform Admin Login first
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
        console.log("Admin RPC check skipped, checking direct admin table...");
      }

      // Direct Table Fallback for Admin
      try {
        const { data: directAdmin } = await supabase
          .from("admin_users")
          .select("id, email, name, password_hash")
          .eq("email", cleanEmail)
          .maybeSingle();

        if (directAdmin && directAdmin.password_hash === passwordHash) {
          localStorage.setItem(
            "admin",
            JSON.stringify({
              id: directAdmin.id,
              email: directAdmin.email,
              name: directAdmin.name || "Platform Admin",
            })
          );
          navigate("/admin");
          return;
        }
      } catch (directAdminErr) {
        // Continue to restaurant check
      }

      // 2. Check Restaurant Owner Login
      const { data: loginData, error: loginError } = await supabase.rpc(
        "restaurant_login",
        {
          p_email: cleanEmail,
          p_password_hash: passwordHash,
        }
      );

      console.log("Restaurant login response:", { data: loginData, error: loginError });

      if (loginError) {
        console.error("Login RPC error:", loginError);
        setError(
          `Login failed: ${
            loginError.message ||
            "Please check your credentials or contact support."
          }`
        );
        setLoading(false);
        return;
      }

      if (!loginData || loginData.length === 0) {
        // Check if registration request is still pending
        const { data: registrationData } = await supabase
          .from("registration_requests")
          .select("status")
          .eq("email", cleanEmail)
          .single();

        if (registrationData && registrationData.status === "pending") {
          setError("pending");
          setLoading(false);
          return;
        }

        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      const userData = loginData[0];

      // Check if restaurant is active
      if (!userData.restaurant_is_active) {
        setError(
          "Your restaurant account has been deactivated. Please contact support."
        );
        setLoading(false);
        return;
      }

      // Login successful - store user data in localStorage
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

      // Redirect to restaurant dashboard
      navigate("/restaurant");
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMsg =
        err?.message ||
        err?.toString() ||
        "Network error. Please check your connection.";
      setError(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to NextDine Home
        </Link>

        {/* Brand Badge & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white p-2.5 border border-slate-200 shadow-md mb-4">
            <img src="/logo.png" alt="NextDine Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Welcome to NextDine
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to access your restaurant manager dashboard
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

          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-xl">
            <div className="flex items-center space-x-2 text-indigo-900 font-semibold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Demo Restaurant Access</span>
            </div>
            <div className="text-xs text-indigo-950 space-y-1 font-mono">
              <p>
                <span className="text-slate-500 font-sans">Email:</span> demorestaurant@gmail.com
              </p>
              <p>
                <span className="text-slate-500 font-sans">Password:</span> ATVSW679
              </p>
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
                <input type="checkbox" className="mr-2 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                Remember me
              </label>
              <a href="#" className="text-indigo-600 font-semibold hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" loading={loading} fullWidth size="lg" variant="primary" className="mt-2">
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
