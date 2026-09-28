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
      // Hash password and use RPC function for admin login
      const passwordHash = await hashPassword(formData.password);
      const { data: adminData, error: adminError } = await supabase.rpc(
        "admin_login",
        {
          p_email: formData.email.toLowerCase(),
          p_password_hash: passwordHash,
        }
      );

      if (adminError) {
        console.error("Admin login RPC error:", adminError);
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      if (!adminData || adminData.length === 0) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      const admin = adminData[0];

      // Login successful - store admin data
      localStorage.setItem(
        "admin",
        JSON.stringify({
          id: admin.id,
          email: admin.email,
          name: admin.name,
        })
      );

      // Redirect to admin dashboard
      navigate("/admin");
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
                placeholder="admin@nextdine.com"
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
              Sign In to Admin Portal
            </Button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-slate-900/60 rounded-xl border border-slate-700/60 text-xs">
            <p className="text-slate-400 font-semibold mb-1 uppercase tracking-wider">
              Default Credentials:
            </p>
            <div className="font-mono text-slate-300 space-y-0.5">
              <p>Email: admin@foodorder.com (or admin@nextdine.com)</p>
              <p>Password: admin123</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
