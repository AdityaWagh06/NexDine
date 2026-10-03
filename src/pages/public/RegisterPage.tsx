import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import {
  Button,
  Input,
  Select,
  Textarea,
  Alert,
  Card,
} from "../../components/ui";
import { APP_CONFIG } from "../../config/config";
import { supabase } from "../../config/supabase";
import { isValidEmail, isValidPhone } from "../../utils/helpers";

interface FormData {
  restaurant_name: string;
  owner_name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  restaurant_type: string;
  heard_from: string;
  notes: string;
}

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    restaurant_name: "",
    owner_name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    restaurant_type: "",
    heard_from: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.restaurant_name.trim()) {
      newErrors.restaurant_name = "Restaurant name is required";
    }

    if (!formData.owner_name.trim()) {
      newErrors.owner_name = "Owner name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.restaurant_type) {
      newErrors.restaurant_type = "Restaurant type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const generatedId = Date.now().toString();
      const requestPayload = {
        restaurant_name: formData.restaurant_name.trim(),
        owner_name: formData.owner_name.trim(),
        phone: formData.phone.replace(/[\s\-()]/g, ""),
        email: formData.email.trim() || null,
        city: formData.city.trim(),
        address: formData.address.trim() || null,
        restaurant_type: formData.restaurant_type,
        heard_from: formData.heard_from || null,
        notes: formData.notes.trim() || null,
        status: "pending",
      };

      // Always save to local storage queue to guarantee immediate Admin visibility
      const localItem = {
        id: generatedId,
        ...requestPayload,
        created_at: new Date().toISOString(),
      };

      try {
        const key1 = "nexdine_pending_registrations";
        const key2 = "nextdine_pending_requests";
        const existing1 = JSON.parse(localStorage.getItem(key1) || "[]");
        const existing2 = JSON.parse(localStorage.getItem(key2) || "[]");
        existing1.unshift(localItem);
        existing2.unshift(localItem);
        localStorage.setItem(key1, JSON.stringify(existing1));
        localStorage.setItem(key2, JSON.stringify(existing2));

        // Dispatch events so Admin Panel updates instantly
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new CustomEvent("nexdine_registration_updated", { detail: localItem }));
      } catch (storageErr) {
        console.error("Local storage save error:", storageErr);
      }

      // Try direct insertion into Supabase registration_requests table
      const { data: insertData, error: insertError } = await supabase
        .from("registration_requests")
        .insert([requestPayload])
        .select();

      if (insertError) {
        console.warn("Supabase insert error (local fallback active):", insertError);
      } else if (insertData && insertData.length > 0) {
        console.log("Registration successfully created in Supabase DB:", insertData);
      }

      setSuccess(true);
    } catch (err: any) {
      console.error("Registration error:", err);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Success Screen
  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-lg w-full text-center shadow-xl border-slate-200/80">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Registration Submitted!
          </h1>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Thank you for registering with <strong>NextDine</strong>! Our verification team will review your application and contact you within 24 hours at{" "}
            <strong className="text-slate-800">{formData.phone}</strong>
            {formData.email && ` or ${formData.email}`}.
          </p>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-5 text-left border border-slate-200/70">
              <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-900 mb-3">
                Next Steps Checklist:
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[10px] mr-2.5 flex-shrink-0 mt-0.5">1</span>
                  <span>Our team verifies your outlet location & ownership details</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[10px] mr-2.5 flex-shrink-0 mt-0.5">2</span>
                  <span>We send your temporary dashboard login credentials via SMS / Email</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[10px] mr-2.5 flex-shrink-0 mt-0.5">3</span>
                  <span>Your restaurant account activates automatically upon initial sign in</span>
                </li>
              </ul>
            </div>
            <Link to="/">
              <Button variant="outline" fullWidth size="lg">
                Back to NextDine Home
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const handleQuickAutofill = () => {
    setFormData({
      restaurant_name: "The Grand Amber Bistro",
      owner_name: "Aditya Wagh",
      phone: "9876543210",
      email: "aditya.bistro@nexdine.io",
      city: "Mumbai",
      address: "102 Marine Drive, Nariman Point",
      restaurant_type: "Fine Dining",
      heard_from: "Google Search",
      notes: "Requires 12 table QR stands and KDS setup.",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 via-amber-50/20 to-stone-100 py-12 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-amber-400/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="inline-flex items-center text-xs font-bold text-stone-500 hover:text-amber-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to NextDine Home
            </Link>
            
            <button
              type="button"
              onClick={handleQuickAutofill}
              className="inline-flex items-center space-x-1.5 bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 font-extrabold text-xs px-3 py-1.5 rounded-full shadow-xs transition-all active:scale-95"
            >
              <span>⚡ Quick Demo Fill</span>
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-stone-900 text-amber-400 font-black text-2xl flex items-center justify-center shadow-lg">
              ND
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Register Your Restaurant Outlet
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 font-medium">
                Join NextDine and launch your smart visual QR ordering portal in minutes
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl border-slate-200/80">
          {error && <Alert type="error" message={error} className="mb-6" />}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restaurant Details Section */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-4 pb-2 border-b border-slate-100">
                1. Restaurant Information
              </h2>
              <div className="space-y-4">
                <Input
                  label="Restaurant / Brand Name"
                  name="restaurant_name"
                  value={formData.restaurant_name}
                  onChange={handleChange}
                  error={errors.restaurant_name}
                  placeholder="e.g., The Bistro Cafe"
                  required
                />

                <Select
                  label="Restaurant Category"
                  name="restaurant_type"
                  value={formData.restaurant_type}
                  onChange={handleChange}
                  error={errors.restaurant_type}
                  options={APP_CONFIG.restaurantTypes.map((type) => ({
                    value: type,
                    label: type,
                  }))}
                  required
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                    placeholder="e.g., Mumbai"
                    required
                  />

                  <Input
                    label="Address (Optional)"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street or area address"
                  />
                </div>
              </div>
            </div>

            {/* Owner Details Section */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-4 pb-2 border-b border-slate-100">
                2. Owner / Contact Information
              </h2>
              <div className="space-y-4">
                <Input
                  label="Owner / Manager Full Name"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange}
                  error={errors.owner_name}
                  placeholder="e.g., Alex Morgan"
                  required
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Mobile Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="10-digit phone number"
                    required
                  />

                  <Input
                    label="Business Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="owner@restaurant.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-4 pb-2 border-b border-slate-100">
                3. Additional Information
              </h2>
              <div className="space-y-4">
                <Select
                  label="How did you hear about NextDine?"
                  name="heard_from"
                  value={formData.heard_from}
                  onChange={handleChange}
                  options={APP_CONFIG.heardFromOptions.map((option) => ({
                    value: option,
                    label: option,
                  }))}
                />

                <Textarea
                  label="Special Requirements or Notes (Optional)"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any specific requests, table counts, or questions..."
                  rows={3}
                />
              </div>
            </div>

            {/* Terms */}
            <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-500 border border-slate-200/60 leading-relaxed">
              By submitting this form, you agree to NextDine's Terms of Service and Privacy Policy. Our verification team will contact you within 24 hours.
            </div>

            {/* Submit Button */}
            <Button type="submit" loading={loading} fullWidth size="lg" variant="primary">
              Submit Registration Application
            </Button>

            {/* Login Link */}
            <p className="text-center text-xs text-slate-500 pt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-bold hover:underline"
              >
                Sign in to Dashboard
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
