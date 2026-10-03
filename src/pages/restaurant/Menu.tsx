import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Package,
  Image as ImageIcon,
} from "lucide-react";
import {
  Card,
  Button,
  Input,
  Modal,
  Loading,
  Alert,
  Textarea,
} from "../../components/ui";
import {
  subscribeToMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemAvailability,
} from "../../services/restaurantService";
import type { MenuItem } from "../../config/supabase";
import { formatCurrency } from "../../utils/helpers";

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.restaurant_id) return;

    const subscription = subscribeToMenuItems(user.restaurant_id, (data) => {
      setMenuItems(data);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const categories = [
    "all",
    ...new Set(menuItems.map((item) => item.category).filter(Boolean)),
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleToggleAvailability = async (item: MenuItem) => {
    await toggleMenuItemAvailability(item.id, !item.is_available);
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleDelete = (item: MenuItem) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  if (loading) {
    return <Loading text="Loading menu catalog..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Menu Catalog Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Organize catalog dishes, set prices, and control real-time ordering availability
          </p>
        </div>
        <Button
          variant="primary"
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setShowAddModal(true)}
        >
          Add Menu Item
        </Button>
      </div>

      {/* Live Sync Banner */}
      <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-4 py-2.5 rounded-xl w-fit">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span>Live Sync Active • Availability changes reflect instantly for scanning customers</span>
      </div>

      {/* Search and Category Filter Tabs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search dish by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category || "all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-all ${
                categoryFilter === category
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {category === "all" ? "All Categories" : category}
            </button>
          ))}
        </div>
      </div>

      {/* Fast-Editing Category Grouped Menu Table */}
      {filteredItems.length === 0 ? (
        <Card className="text-center py-16 border-slate-200/80">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            No Menu Items Found
          </h3>
          <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
            {searchTerm || categoryFilter !== "all"
              ? "No dishes match your active filter. Try resetting search or category."
              : "Start building your menu catalog by adding your first dish."}
          </p>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowAddModal(true)}
          >
            Add First Item
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(
            filteredItems.reduce((acc, item) => {
              const cat = item.category || "Uncategorized";
              if (!acc[cat]) acc[cat] = [];
              acc[cat].push(item);
              return acc;
            }, {} as Record<string, MenuItem[]>)
          ).map(([categoryName, items]) => (
            <Card key={categoryName} className="p-0 overflow-hidden border-slate-200">
              {/* Category Header */}
              <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-black text-sm tracking-wide uppercase">{categoryName}</span>
                  <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full font-bold">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {items.filter(i => i.is_available).length} Available • {items.filter(i => !i.is_available).length} 86'd
                </span>
              </div>

              {/* Table List */}
              <div className="divide-y divide-slate-100">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:px-5 hover:bg-slate-50 transition-colors gap-3 ${
                      !item.is_available ? "bg-slate-50/70" : ""
                    }`}
                  >
                    {/* Item Info */}
                    <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-11 h-11 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                          <ImageIcon className="w-5 h-5 opacity-60" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className={`text-sm font-black truncate ${!item.is_available ? "text-slate-500 line-through" : "text-slate-900"}`}>
                            {item.name}
                          </h4>
                          {!item.is_available && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-800">
                              86'd OUT OF STOCK
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-xs text-slate-500 truncate max-w-xl">
                            {item.description}
                          </p>
                        )}
                        {((item.sizes && item.sizes.length > 0) || (item.addons && item.addons.length > 0)) && (
                          <div className="flex gap-2 text-[10px] text-slate-500 font-medium pt-0.5">
                            {item.sizes && item.sizes.length > 0 && <span>• {item.sizes.length} sizes</span>}
                            {item.addons && item.addons.length > 0 && <span>• {item.addons.length} add-ons</span>}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price, Quick Inline Stock Toggle & Actions */}
                    <div className="flex items-center justify-between sm:justify-end space-x-4 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                      <span className="text-base font-black text-slate-900 tabular-nums">
                        {formatCurrency(item.base_price)}
                      </span>

                      {/* Inline 86'd / In Stock Quick Toggle */}
                      <button
                        onClick={() => handleToggleAvailability(item)}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                          item.is_available
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-rose-100 text-rose-800 border border-rose-200 hover:bg-rose-200"
                        }`}
                        title={item.is_available ? "Mark as 86'd (Out of Stock)" : "Mark as In Stock"}
                      >
                        {item.is_available ? (
                          <>
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            <span>IN STOCK</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-rose-600" />
                            <span>86'd</span>
                          </>
                        )}
                      </button>

                      {/* Edit & Delete Buttons */}
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<Edit className="w-4 h-4 text-slate-600" />}
                          onClick={() => handleEdit(item)}
                          title="Edit Dish"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<Trash2 className="w-4 h-4 text-rose-600" />}
                          onClick={() => handleDelete(item)}
                          title="Delete Dish"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Modals */}
      <MenuItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        mode="add"
      />

      <MenuItemModal
        isOpen={showEditModal}
        item={selectedItem}
        onClose={() => {
          setShowEditModal(false);
          setSelectedItem(null);
        }}
        mode="edit"
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        item={selectedItem}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedItem(null);
        }}
      />
    </div>
  );
};

// Menu Item Modal (Add/Edit)
interface MenuItemModalProps {
  isOpen: boolean;
  item?: MenuItem | null;
  onClose: () => void;
  mode: "add" | "edit";
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({
  isOpen,
  item,
  onClose,
  mode,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    base_price: "",
    image_url: "",
    is_available: true,
    sizes: [] as { name: string; price: number }[],
    addons: [] as { name: string; price: number }[],
  });

  const [newSize, setNewSize] = useState({ name: "", price: "" });
  const [newAddon, setNewAddon] = useState({ name: "", price: "" });

  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData({
        name: item.name,
        description: item.description || "",
        category: item.category || "",
        base_price: item.base_price.toString(),
        image_url: item.image_url || "",
        is_available: item.is_available,
        sizes: item.sizes || [],
        addons: item.addons || [],
      });
    } else {
      setFormData({
        name: "",
        description: "",
        category: "",
        base_price: "",
        image_url: "",
        is_available: true,
        sizes: [],
        addons: [],
      });
    }
  }, [mode, item, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.base_price) {
      setError("Name and base price are required");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.restaurant_id) {
      setError("Restaurant session not found");
      return;
    }

    setLoading(true);

    const menuItemData = {
      restaurant_id: user.restaurant_id,
      name: formData.name,
      description: formData.description || undefined,
      category: formData.category || undefined,
      base_price: parseFloat(formData.base_price),
      image_url: formData.image_url || undefined,
      is_available: formData.is_available,
      sizes: formData.sizes.length > 0 ? formData.sizes : undefined,
      addons: formData.addons.length > 0 ? formData.addons : undefined,
    };

    let success = false;
    if (mode === "add") {
      success = await createMenuItem(menuItemData);
    } else if (item) {
      success = await updateMenuItem(item.id, menuItemData);
    }

    setLoading(false);

    if (success) {
      onClose();
    } else {
      setError(`Failed to ${mode} menu item`);
    }
  };

  const addSize = () => {
    if (newSize.name && newSize.price) {
      setFormData({
        ...formData,
        sizes: [
          ...formData.sizes,
          { name: newSize.name, price: parseFloat(newSize.price) },
        ],
      });
      setNewSize({ name: "", price: "" });
    }
  };

  const removeSize = (index: number) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter((_, i) => i !== index),
    });
  };

  const addAddon = () => {
    if (newAddon.name && newAddon.price) {
      setFormData({
        ...formData,
        addons: [
          ...formData.addons,
          { name: newAddon.name, price: parseFloat(newAddon.price) },
        ],
      });
      setNewAddon({ name: "", price: "" });
    }
  };

  const removeAddon = (index: number) => {
    setFormData({
      ...formData,
      addons: formData.addons.filter((_, i) => i !== index),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "add" ? "Add New Dish" : "Edit Dish Details"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <Alert type="error" message={error} />}

        <Input
          label="Dish Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Butter Chicken Special"
          required
        />

        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Ingredients, spice level, dish details..."
          rows={2}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            placeholder="e.g. Main Course"
          />

          <Input
            label="Price (₹)"
            type="number"
            step="0.01"
            value={formData.base_price}
            onChange={(e) =>
              setFormData({ ...formData, base_price: e.target.value })
            }
            placeholder="299.00"
            required
          />
        </div>

        {/* Modern Image URL Upload Input */}
        <div>
          <Input
            label="Image URL"
            value={formData.image_url}
            onChange={(e) =>
              setFormData({ ...formData, image_url: e.target.value })
            }
            placeholder="https://images.unsplash.com/photo-..."
          />
          {formData.image_url && (
            <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center space-x-3">
              <img
                src={formData.image_url}
                alt="Preview"
                className="w-12 h-12 object-cover rounded-lg border border-slate-200"
              />
              <span className="text-xs text-slate-500 font-medium">Image preview valid</span>
            </div>
          )}
        </div>

        {/* Sizes */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <label className="label mb-2">Sizes / Portions</label>
          <div className="space-y-1.5 mb-2">
            {formData.sizes.map((size, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 text-xs font-semibold"
              >
                <span>{size.name} — ₹{size.price}</span>
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="text-rose-600 hover:bg-rose-50 p-1 rounded-md"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Portion name"
              value={newSize.name}
              onChange={(e) => setNewSize({ ...newSize, name: e.target.value })}
            />
            <Input
              placeholder="Price"
              type="number"
              step="0.01"
              value={newSize.price}
              onChange={(e) => setNewSize({ ...newSize, price: e.target.value })}
            />
            <Button type="button" onClick={addSize} variant="outline" size="sm">
              Add
            </Button>
          </div>
        </div>

        {/* Add-ons */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <label className="label mb-2">Add-ons / Extras</label>
          <div className="space-y-1.5 mb-2">
            {formData.addons.map((addon, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 text-xs font-semibold"
              >
                <span>{addon.name} — +₹{addon.price}</span>
                <button
                  type="button"
                  onClick={() => removeAddon(index)}
                  className="text-rose-600 hover:bg-rose-50 p-1 rounded-md"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add-on name"
              value={newAddon.name}
              onChange={(e) => setNewAddon({ ...newAddon, name: e.target.value })}
            />
            <Input
              placeholder="Price"
              type="number"
              step="0.01"
              value={newAddon.price}
              onChange={(e) => setNewAddon({ ...newAddon, price: e.target.value })}
            />
            <Button type="button" onClick={addAddon} variant="outline" size="sm">
              Add
            </Button>
          </div>
        </div>

        {/* Availability Switch */}
        <label className="flex items-center space-x-2.5 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={formData.is_available}
            onChange={(e) =>
              setFormData({ ...formData, is_available: e.target.checked })
            }
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
          />
          <span className="text-xs font-bold text-slate-800">Available for Ordering</span>
        </label>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading} fullWidth>
            {mode === "add" ? "Save Dish" : "Update Dish"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

// Delete Confirmation Modal
interface DeleteModalProps {
  isOpen: boolean;
  item: MenuItem | null;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, item, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!item) return;
    setLoading(true);
    const success = await deleteMenuItem(item.id);
    setLoading(false);
    if (success) onClose();
  };

  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Menu Item" size="md">
      <div className="space-y-4">
        <Alert
          type="warning"
          message={`Delete "${item.name}" from catalog? This cannot be undone.`}
        />
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} loading={loading} fullWidth>
            Delete Item
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Menu;
