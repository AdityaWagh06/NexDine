import React, { useState, useEffect } from "react";
import {
  Download,
  Printer,
  Plus,
  ExternalLink,
  Sparkles,
  Layers,
  Search,
} from "lucide-react";
import { Card, Button, Input, Loading, Alert, Modal } from "../../components/ui";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "../../config/supabase";
import type { Restaurant } from "../../config/supabase";

interface TableItem {
  id: number;
  number: number;
  name: string;
  section: string;
  capacity: number;
}

const DEFAULT_TABLES: TableItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  number: i + 1,
  name: `Table ${String(i + 1).padStart(2, "0")}`,
  section: i < 4 ? "Main Dining" : i < 6 ? "Patio Outdoor" : "VIP Section",
  capacity: i % 2 === 0 ? 4 : 2,
}));

const QRTables: React.FC = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tables, setTables] = useState<TableItem[]>(DEFAULT_TABLES);
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState("");
  const [newTableSection, setNewTableSection] = useState("Main Dining");
  const [newTableCapacity, setNewTableCapacity] = useState("4");
  const [printingTable, setPrintingTable] = useState<TableItem | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.restaurant_id) {
          setError("Restaurant session expired");
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

        // Load custom tables from localStorage if saved
        const savedTables = localStorage.getItem(`nextdine_tables_${data.id}`);
        if (savedTables) {
          try {
            setTables(JSON.parse(savedTables));
          } catch (e) {
            // fallback to default
          }
        }
      } catch (err) {
        setError("Failed to load outlet details");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []);

  const saveTablesToStorage = (updatedTables: TableItem[]) => {
    setTables(updatedTables);
    if (restaurant) {
      localStorage.setItem(`nextdine_tables_${restaurant.id}`, JSON.stringify(updatedTables));
    }
  };

  const handleAddTable = (e: React.FormEvent) => {
    e.preventDefault();
    const nextNum = newTableNumber ? parseInt(newTableNumber) : tables.length + 1;
    const newTable: TableItem = {
      id: Date.now(),
      number: nextNum,
      name: `Table ${String(nextNum).padStart(2, "0")}`,
      section: newTableSection,
      capacity: parseInt(newTableCapacity) || 4,
    };
    const updated = [...tables, newTable].sort((a, b) => a.number - b.number);
    saveTablesToStorage(updated);
    setShowAddModal(false);
    setNewTableNumber("");
  };

  const downloadTableQR = (tableNum: number) => {
    if (!restaurant) return;
    const svg = document.getElementById(`qr-svg-table-${tableNum}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width + 80;
      canvas.height = img.height + 120;
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Header text
        ctx.fillStyle = "#0F172A";
        ctx.font = "bold 20px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(restaurant.name, canvas.width / 2, 40);

        ctx.fillStyle = "#4F46E5";
        ctx.font = "bold 16px Inter, sans-serif";
        ctx.fillText(`TABLE ${String(tableNum).padStart(2, "0")}`, canvas.width / 2, 65);

        // Draw QR
        ctx.drawImage(img, 40, 80);

        // Footer text
        ctx.fillStyle = "#64748B";
        ctx.font = "12px Inter, sans-serif";
        ctx.fillText("Scan to Order & Pay • Powered by NextDine", canvas.width / 2, canvas.height - 20);
      }

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${restaurant.slug}-table-${tableNum}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handlePrintTable = (table: TableItem) => {
    setPrintingTable(table);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  if (loading) {
    return <Loading text="Loading QR tables generator..." />;
  }

  if (error || !restaurant) {
    return <Alert type="error" message={error || "Restaurant details not found"} />;
  }

  const sections = ["all", ...new Set(tables.map((t) => t.section))];

  const filteredTables = tables.filter((table) => {
    const matchesSection = selectedSection === "all" || table.section === selectedSection;
    const matchesSearch =
      table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      table.number.toString().includes(searchQuery);
    return matchesSection && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            QR Table Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Generate, preview, and download individual QR codes for each dining table
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            icon={<Printer className="w-4 h-4" />}
            onClick={() => window.print()}
          >
            Print All Tables
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowAddModal(true)}
          >
            Add New Table
          </Button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-indigo-50/70 border border-indigo-200/80 px-4 py-3 rounded-xl text-xs">
        <div className="flex items-center space-x-2 text-indigo-900 font-semibold">
          <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span>
            Each QR code embeds table-specific session tracking so orders route directly to the right table in your kitchen view.
          </span>
        </div>
        <span className="bg-indigo-600 text-white font-extrabold px-2.5 py-0.5 rounded-full text-[10px]">
          {tables.length} Active Tables
        </span>
      </div>

      {/* Controls: Search & Section Tabs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="sm:w-72">
          <Input
            placeholder="Search table number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar flex-1">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSection === sec
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {sec === "all" ? "All Sections" : sec}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Action Bar if tables are selected */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-900 text-white p-3.5 rounded-xl gap-3">
        <div className="flex items-center space-x-3 text-xs font-bold">
          <span className="bg-indigo-600 text-white px-2.5 py-1 rounded-md text-[11px] font-black">
            {filteredTables.length} TABLES LISTED
          </span>
          <span className="text-slate-300">Inventory-Style Table Registry</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="!bg-slate-800 !text-white !border-slate-700 hover:!bg-slate-700 text-xs"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={() => filteredTables.forEach(t => downloadTableQR(t.number))}
          >
            Download All {filteredTables.length} QRs
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="!bg-slate-800 !text-white !border-slate-700 hover:!bg-slate-700 text-xs"
            icon={<Printer className="w-3.5 h-3.5" />}
            onClick={() => window.print()}
          >
            Batch Print Sheet
          </Button>
        </div>
      </div>

      {/* Inventory Table View */}
      <Card className="p-0 overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-slate-300 font-extrabold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4">Table</th>
                <th className="py-3 px-4">Section / Floor</th>
                <th className="py-3 px-4">Capacity</th>
                <th className="py-3 px-4">QR Link Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredTables.map((table) => {
                const tableUrl = `${window.location.origin}/menu/${restaurant.slug}?table=${table.number}`;

                return (
                  <tr key={table.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-900 font-black text-xs flex items-center justify-center border border-slate-200">
                          {String(table.number).padStart(2, "0")}
                        </div>
                        <span>{table.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <span className="inline-flex items-center bg-slate-100 px-2 py-0.5 rounded text-[11px] font-semibold">
                        <Layers className="w-3 h-3 mr-1 text-slate-400" />
                        {table.section}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {table.capacity} Seats
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                        <span>ACTIVE & BOUND</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      {/* Hidden QR SVG element for download generation */}
                      <div className="hidden">
                        <QRCodeSVG
                          id={`qr-svg-table-${table.number}`}
                          value={tableUrl}
                          size={140}
                          level="H"
                          includeMargin={true}
                        />
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="!text-xs !py-1"
                        icon={<ExternalLink className="w-3.5 h-3.5 text-indigo-600" />}
                        onClick={() => window.open(tableUrl, "_blank")}
                        title="Test QR Link"
                      >
                        Test Link
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="!text-xs !py-1"
                        icon={<Download className="w-3.5 h-3.5" />}
                        onClick={() => downloadTableQR(table.number)}
                      >
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="!text-xs !py-1"
                        icon={<Printer className="w-3.5 h-3.5" />}
                        onClick={() => handlePrintTable(table)}
                      >
                        Print
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Table Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Dining Table"
        size="md"
      >
        <form onSubmit={handleAddTable} className="space-y-4">
          <Input
            label="Table Number"
            type="number"
            value={newTableNumber}
            onChange={(e) => setNewTableNumber(e.target.value)}
            placeholder={`e.g. ${tables.length + 1}`}
            required
          />

          <div>
            <label className="label">Section / Dining Area</label>
            <select
              value={newTableSection}
              onChange={(e) => setNewTableSection(e.target.value)}
              className="input text-xs font-semibold"
            >
              <option value="Main Dining">Main Dining</option>
              <option value="Patio Outdoor">Patio Outdoor</option>
              <option value="VIP Section">VIP Section</option>
              <option value="Bar Counter">Bar Counter</option>
              <option value="Rooftop">Rooftop</option>
            </select>
          </div>

          <Input
            label="Seating Capacity"
            type="number"
            value={newTableCapacity}
            onChange={(e) => setNewTableCapacity(e.target.value)}
            placeholder="4"
          />

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddModal(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" fullWidth>
              Create Table
            </Button>
          </div>
        </form>
      </Modal>

      {/* Hidden Print Printable View */}
      <div className="hidden print:block fixed inset-0 bg-white p-8 z-50">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <p className="text-sm text-slate-600">NextDine Smart QR Table Ordering</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {(printingTable ? [printingTable] : tables).map((table) => {
            const tableUrl = `${window.location.origin}/menu/${restaurant.slug}?table=${table.number}`;
            return (
              <div
                key={table.id}
                className="border-2 border-slate-900 p-6 rounded-2xl text-center flex flex-col items-center justify-center bg-white"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                  {restaurant.name}
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mb-4">
                  TABLE {String(table.number).padStart(2, "0")}
                </div>
                <div className="p-3 bg-white border border-slate-300 rounded-xl mb-4">
                  <QRCodeSVG value={tableUrl} size={180} level="H" />
                </div>
                <p className="text-sm font-bold text-slate-900">Scan QR Code to Order & Pay</p>
                <p className="text-xs text-slate-500 mt-0.5">No App Required • Live Menu</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QRTables;
