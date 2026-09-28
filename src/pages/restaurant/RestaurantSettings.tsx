import React, { useState, useEffect } from "react";
import {
  Download,
  QrCode as QrCodeIcon,
  ExternalLink,
  Sparkles,
  Store,
  MapPin,
  Clock,
  Palette,
  Save,
} from "lucide-react";
import { Card, Button, Input, Loading, Alert, Textarea } from "../../components/ui";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "../../config/supabase";
import type { Restaurant } from "../../config/supabase";

const RestaurantSettings: React.FC = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"info" | "branding" | "contact" | "hours" | "qr">("info");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    cuisine_type: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    gst_number: "",
    tax_rate: "5",
    opening_time: "09:00",
    closing_time: "23:00",
    dine_in_enabled: true,
    takeaway_enabled: true,
    logo_url: "",
    cover_url: "",
  });

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.restaurant_id) {
        setError("Restaurant session not found");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("restaurants")
        .select("*")
        .eq("id", user.restaurant_id)
        .single();

      if (fetchError) throw fetchError;

      setRestaurant(data);
      setFormData({
        name: data.name || "",
        slug: data.slug || "",
        cuisine_type: (data as any).cuisine_type || "Multi-Cuisine",
        description: (data as any).description || "",
        phone: (data as any).phone || "",
        email: user.email || "",
        address: (data as any).address || "",
        gst_number: (data as any).gst_number || "",
        tax_rate: (data as any).tax_rate ? (data as any).tax_rate.toString() : "5",
        opening_time: (data as any).opening_time || "09:00",
        closing_time: (data as any).closing_time || "23:00",
        dine_in_enabled: (data as any).dine_in_enabled ?? true,
        takeaway_enabled: (data as any).takeaway_enabled ?? true,
        logo_url: (data as any).logo_url || "",
        cover_url: (data as any).cover_url || "",
      });
    } catch (err) {
      setError("Failed to load restaurant settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurant) return;

    setSaving(true);
    setError("");
    setSuccessMsg("");

    try {
      const { error: updateError } = await supabase
        .from("restaurants")
        .update({
          name: formData.name,
          slug: formData.slug,
          cuisine_type: formData.cuisine_type,
          description: formData.description,
          phone: formData.phone,
          address: formData.address,
          gst_number: formData.gst_number,
          tax_rate: parseFloat(formData.tax_rate) || 5,
          opening_time: formData.opening_time,
          closing_time: formData.closing_time,
          dine_in_enabled: formData.dine_in_enabled,
          takeaway_enabled: formData.takeaway_enabled,
          logo_url: formData.logo_url,
          cover_url: formData.cover_url,
        } as any)
        .eq("id", restaurant.id);

      if (updateError) throw updateError;

      setSuccessMsg("Outlet settings saved successfully");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  const downloadQRCode = () => {
    if (!restaurant) return;
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width + 60;
      canvas.height = img.height + 100;
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0F172A";
        ctx.font = "bold 18px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(restaurant.name, canvas.width / 2, 35);
        ctx.drawImage(img, 30, 50);
        ctx.fillStyle = "#64748B";
        ctx.font = "12px Inter, sans-serif";
        ctx.fillText("Scan to View Menu & Order • NextDine", canvas.width / 2, canvas.height - 15);
      }

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${restaurant.slug}-nextdine-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  if (loading) {
    return <Loading text="Loading settings configuration..." />;
  }

  if (error && !restaurant) {
    return <Alert type="error" message={error || "Restaurant details not found"} />;
  }

  const menuUrl = `${window.location.origin}/menu/${restaurant?.slug}`;

  const tabs = [
    { key: "info", label: "Restaurant Info", icon: Store },
    { key: "branding", label: "Branding", icon: Palette },
    { key: "contact", label: "Contact & Location", icon: MapPin },
    { key: "hours", label: "Operating Hours", icon: Clock },
    { key: "qr", label: "Smart QR Code", icon: QrCodeIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Outlet Settings & Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage your restaurant profile, operating rules, branding, and smart QR deployment
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Save className="w-4 h-4" />}
          onClick={handleSave}
          loading={saving}
        >
          Save Changes
        </Button>
      </div>

      {successMsg && <Alert type="success" message={successMsg} />}
      {error && <Alert type="error" message={error} />}

      {/* Settings Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? "border-indigo-600 text-indigo-600 bg-white shadow-2xs"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Restaurant Information */}
      {activeTab === "info" && (
        <Card className="border-slate-200/80 space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900">Restaurant Information</h3>
            <p className="text-xs text-slate-500">Basic details displayed to customers on digital menu header</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Restaurant / Brand Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Menu URL Handle (Slug)"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              helperText={`Live URL: ${window.location.origin}/menu/${formData.slug}`}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Cuisine Type"
              value={formData.cuisine_type}
              onChange={(e) => setFormData({ ...formData, cuisine_type: e.target.value })}
              placeholder="e.g. Indian, Chinese, Continental"
            />
            <Input
              label="Default Tax / GST Rate (%)"
              type="number"
              value={formData.tax_rate}
              onChange={(e) => setFormData({ ...formData, tax_rate: e.target.value })}
              placeholder="5"
            />
          </div>

          <Textarea
            label="Outlet Description & Tagline"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Authentic South Indian & North Indian Delicacies served fresh..."
            rows={3}
          />
        </Card>
      )}

      {/* Tab 2: Branding */}
      {activeTab === "branding" && (
        <Card className="border-slate-200/80 space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900">Branding Assets</h3>
            <p className="text-xs text-slate-500">Logos and cover banners for your customer ordering page</p>
          </div>

          <Input
            label="Logo Image URL"
            value={formData.logo_url}
            onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
            placeholder="https://images.unsplash.com/photo-..."
          />

          <Input
            label="Cover Banner URL"
            value={formData.cover_url}
            onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
            placeholder="https://images.unsplash.com/photo-..."
          />

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-900 mb-2">Live Customer Header Preview</h4>
            <div className="bg-slate-900 text-white p-5 rounded-xl flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-lg text-white">
                {formData.name.charAt(0) || "N"}
              </div>
              <div>
                <p className="font-extrabold text-base">{formData.name || "Restaurant Name"}</p>
                <p className="text-xs text-slate-400">{formData.cuisine_type || "Cuisine"}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 3: Contact Details */}
      {activeTab === "contact" && (
        <Card className="border-slate-200/80 space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900">Contact & Billing Info</h3>
            <p className="text-xs text-slate-500">Contact info and tax registration numbers</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Manager Phone / WhatsApp"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
            />
            <Input
              label="GSTIN Registration Number"
              value={formData.gst_number}
              onChange={(e) => setFormData({ ...formData, gst_number: e.target.value })}
              placeholder="27AAAAA0000A1Z5"
            />
          </div>

          <Textarea
            label="Full Physical Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Shop 12, Ground Floor, Food Street, City Name..."
            rows={3}
          />
        </Card>
      )}

      {/* Tab 4: Operating Hours & Rules */}
      {activeTab === "hours" && (
        <Card className="border-slate-200/80 space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900">Operating Hours & Fulfillment</h3>
            <p className="text-xs text-slate-500">Configure daily opening times and ordering rules</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Opening Time"
              type="time"
              value={formData.opening_time}
              onChange={(e) => setFormData({ ...formData, opening_time: e.target.value })}
            />
            <Input
              label="Closing Time"
              type="time"
              value={formData.closing_time}
              onChange={(e) => setFormData({ ...formData, closing_time: e.target.value })}
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center space-x-3 cursor-pointer p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <input
                type="checkbox"
                checked={formData.dine_in_enabled}
                onChange={(e) => setFormData({ ...formData, dine_in_enabled: e.target.checked })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Allow Dine-in QR Table Orders</span>
                <span className="text-[11px] text-slate-500">Customers scan QR code at table to order</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <input
                type="checkbox"
                checked={formData.takeaway_enabled}
                onChange={(e) => setFormData({ ...formData, takeaway_enabled: e.target.checked })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Allow Takeaway Pick-up Orders</span>
                <span className="text-[11px] text-slate-500">Customers select takeaway option at checkout</span>
              </div>
            </label>
          </div>
        </Card>
      )}

      {/* Tab 5: Smart QR Code */}
      {activeTab === "qr" && (
        <Card className="border-slate-200/80 space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
              <QrCodeIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">NextDine Master QR Code</h3>
              <p className="text-xs text-slate-500">General outlet QR code for menu browsing</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 mb-4">
                <QRCodeSVG id="qr-code-svg" value={menuUrl} size={200} level="H" includeMargin={true} />
              </div>
              <Button variant="primary" icon={<Download className="w-4 h-4" />} onClick={downloadQRCode} fullWidth>
                Download Master PNG
              </Button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="label">Live Customer Menu Link</label>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 break-all mb-2">
                  {menuUrl}
                </div>
                <a
                  href={menuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open live menu in new tab</span>
                </a>
              </div>

              <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center">
                  <Sparkles className="w-4 h-4 text-indigo-600 mr-1.5" />
                  Quick Deployment Guide:
                </h4>
                <ul className="space-y-1 text-slate-600 list-disc list-inside">
                  <li>For table-specific QR codes, navigate to the <strong>QR Tables</strong> tab in the sidebar.</li>
                  <li>Download and print PNG codes for counter display or promotional banners.</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RestaurantSettings;
