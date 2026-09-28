import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Search,
  CheckCircle2,
  Package,
  Utensils,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  Button,
  Input,
  Modal,
  Loading,
  Alert,
} from "../../components/ui";
import {
  subscribeToMenuItems,
  createOrder,
} from "../../services/restaurantService";
import type { MenuItem } from "../../config/supabase";
import { formatCurrency, isValidPhone } from "../../utils/helpers";
import { supabase } from "../../config/supabase";

interface CartItem extends MenuItem {
  quantity: number;
  selectedSize?: { name: string; price: number };
  selectedAddons: { name: string; price: number }[];
  itemTotal: number;
}

const CustomerMenu: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showItemModal, setShowItemModal] = useState(false);

  // Load restaurant and menu
  useEffect(() => {
    loadRestaurant();
  }, [slug]);

  useEffect(() => {
    if (restaurant?.id) {
      const subscription = subscribeToMenuItems(restaurant.id, (data) => {
        setMenuItems(data);
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [restaurant]);

  const loadRestaurant = async () => {
    if (!slug) return;

    const { data, error } = await supabase
      .from("restaurants")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      console.error("Restaurant not found");
      setLoading(false);
      return;
    }

    setRestaurant(data);
  };

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
    return matchesSearch && matchesCategory && item.is_available;
  });

  const addToCart = (
    item: MenuItem,
    selectedSize?: any,
    selectedAddons: any[] = []
  ) => {
    const basePrice = selectedSize ? selectedSize.price : item.base_price;
    const addonsTotal = selectedAddons.reduce(
      (sum, addon) => sum + addon.price,
      0
    );
    const itemTotal = basePrice + addonsTotal;

    const cartItem: CartItem = {
      ...item,
      quantity: 1,
      selectedSize,
      selectedAddons,
      itemTotal,
    };

    const existingIndex = cart.findIndex(
      (ci) =>
        ci.id === item.id &&
        ci.selectedSize?.name === selectedSize?.name &&
        JSON.stringify(ci.selectedAddons) === JSON.stringify(selectedAddons)
    );

    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, cartItem]);
    }

    setShowItemModal(false);
  };

  const updateQuantity = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleItemClick = (item: MenuItem) => {
    if (item.sizes && item.sizes.length > 0) {
      setSelectedItem(item);
      setShowItemModal(true);
    } else {
      addToCart(item);
    }
  };

  if (loading) {
    return <Loading text="Loading restaurant menu..." />;
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="text-center p-8 max-w-md w-full border-slate-200/80 shadow-xl">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-xl font-extrabold text-slate-900 mb-2">
            Restaurant Unavailable
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            The restaurant menu you are looking for does not exist or has been temporarily deactivated by the manager.
          </p>
        </Card>
      </div>
    );
  }

  const getItemQuantity = (itemId: string) => {
    return cart.reduce((sum, cartItem) => {
      if (cartItem.id === itemId) {
        return sum + cartItem.quantity;
      }
      return sum;
    }, 0);
  };

  const handleAddSimple = (item: MenuItem) => {
    addToCart(item);
  };

  const handleRemoveItem = (itemId: string) => {
    const index = cart.findIndex((ci) => ci.id === itemId);
    if (index >= 0) {
      updateQuantity(index, -1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28">
      {/* Header */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
        <div className="max-w-screen-md mx-auto px-4 py-3.5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              {restaurant.logo_url ? (
                <img
                  src={restaurant.logo_url}
                  alt={restaurant.name}
                  className="w-11 h-11 rounded-2xl object-cover border border-slate-200"
                />
              ) : (
                <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                  <Utensils className="w-5 h-5" />
                </div>
              )}
              <div>
                <h1 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                  {restaurant.name}
                </h1>
                <p className="text-[11px] font-medium text-slate-500">
                  {restaurant.restaurant_type || "Digital QR Ordering"}
                </p>
              </div>
            </div>

            {/* NextDine Brand Pill */}
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-700">
              <span>NextDine</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search dishes by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white border-b border-slate-200/80 sticky top-[109px] z-30 shadow-2xs">
        <div className="max-w-screen-md mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-2.5 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category || "all")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  categoryFilter === category
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                }`}
              >
                {category === "all" ? "All Categories" : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <main className="max-w-screen-md mx-auto px-4 py-5">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
            <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-800">No dishes found</p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const quantity = getItemQuantity(item.id);
              const hasVariations =
                (item.sizes && item.sizes.length > 0) ||
                (item.addons && item.addons.length > 0);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-40 bg-slate-100 overflow-hidden">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Package className="w-10 h-10" />
                        </div>
                      )}

                      {!item.is_available && (
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
                          <span className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-slate-700">
                            Out of Stock
                          </span>
                        </div>
                      )}

                      {hasVariations && (
                        <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                          Customizable
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-extrabold text-sm text-slate-900 line-clamp-2 leading-tight">
                          {item.name}
                        </h3>
                      </div>
                      {item.description && (
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Price & Add Action Footer */}
                  <div className="px-4 pb-4 flex items-end justify-between pt-1">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
                        Price
                      </span>
                      <p className="font-black text-slate-900 text-base">
                        {item.sizes && item.sizes.length > 0
                          ? formatCurrency(
                              Math.min(...item.sizes.map((s) => s.price))
                            )
                          : formatCurrency(item.base_price)}
                      </p>
                    </div>

                    {item.is_available && (
                      <div>
                        {quantity === 0 ? (
                          <button
                            onClick={() =>
                              hasVariations
                                ? handleItemClick(item)
                                : handleAddSimple(item)
                            }
                            className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold text-xs rounded-xl transition-all shadow-xs active:scale-95 flex items-center space-x-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>ADD</span>
                          </button>
                        ) : (
                          <div className="flex items-center bg-indigo-600 text-white rounded-xl shadow-xs">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="px-2.5 py-1.5 hover:bg-indigo-700 rounded-l-xl transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 font-bold text-xs">
                              {quantity}
                            </span>
                            <button
                              onClick={() =>
                                hasVariations
                                  ? handleItemClick(item)
                                  : handleAddSimple(item)
                              }
                              className="px-2.5 py-1.5 hover:bg-indigo-700 rounded-r-xl transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Cart Modal */}
      <CartModal
        isOpen={showCart}
        cart={cart}
        onClose={() => setShowCart(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setShowCart(false);
          setShowCheckout(true);
        }}
      />

      {/* Item Customization Modal */}
      <ItemCustomizationModal
        isOpen={showItemModal}
        item={selectedItem}
        onClose={() => setShowItemModal(false)}
        onAdd={addToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        cart={cart}
        restaurantId={restaurant.id}
        onClose={() => setShowCheckout(false)}
        onSuccess={() => {
          setCart([]);
          setShowCheckout(false);
        }}
      />

      {/* Bottom Floating Order Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-screen-md mx-auto z-40">
          <button
            onClick={() => setShowCart(true)}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between border border-indigo-500/30 transition-all active:scale-[0.99]"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-white text-indigo-700 font-extrabold text-xs w-7 h-7 rounded-xl flex items-center justify-center shadow-xs">
                {cartCount}
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-200 block -mb-0.5">Total</span>
                <span className="font-black text-base sm:text-lg">
                  {formatCurrency(
                    cart.reduce(
                      (sum, item) => sum + item.itemTotal * item.quantity,
                      0
                    )
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-bold bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10">
              <span>View Cart</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

// Cart Modal Component
interface CartModalProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}) => {
  const total = cart.reduce(
    (sum, item) => sum + item.itemTotal * item.quantity,
    0
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Your Order Cart" size="lg">
      <div className="space-y-6">
        {cart.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700">Your cart is empty</p>
            <p className="text-xs text-slate-400 mt-1">Browse the menu and add items to begin.</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 max-h-[380px] overflow-y-auto no-scrollbar pr-1">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200/70"
                >
                  <div className="flex-1 text-xs">
                    <h4 className="font-extrabold text-slate-900 text-sm">{item.name}</h4>
                    {item.selectedSize && (
                      <p className="text-slate-500 mt-0.5">
                        Size: <span className="font-semibold text-slate-700">{item.selectedSize.name}</span>
                      </p>
                    )}
                    {item.selectedAddons.length > 0 && (
                      <p className="text-slate-500 mt-0.5">
                        Add-ons: <span className="font-semibold text-slate-700">{item.selectedAddons.map((a) => a.name).join(", ")}</span>
                      </p>
                    )}
                    <p className="text-indigo-600 font-extrabold text-xs mt-1">
                      {formatCurrency(item.itemTotal)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 bg-white rounded-lg border border-slate-200 p-1">
                    <button
                      onClick={() => onUpdateQuantity(index, -1)}
                      className="p-1 rounded text-slate-500 hover:bg-slate-100"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-xs text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(index, 1)}
                      className="p-1 rounded text-slate-500 hover:bg-slate-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemove(index)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-3">
              <div className="flex justify-between text-base font-black text-slate-900">
                <span>Subtotal</span>
                <span className="text-indigo-600">{formatCurrency(total)}</span>
              </div>
              <Button onClick={onCheckout} fullWidth size="lg" variant="primary">
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

// Item Customization Modal Component
interface ItemCustomizationModalProps {
  isOpen: boolean;
  item: MenuItem | null;
  onClose: () => void;
  onAdd: (item: MenuItem, selectedSize?: any, selectedAddons?: any[]) => void;
}

const ItemCustomizationModal: React.FC<ItemCustomizationModalProps> = ({
  isOpen,
  item,
  onClose,
  onAdd,
}) => {
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);

  useEffect(() => {
    if (item?.sizes && item.sizes.length > 0) {
      setSelectedSize(item.sizes[0]);
    }
  }, [item]);

  if (!item) return null;

  const toggleAddon = (addon: any) => {
    if (selectedAddons.find((a) => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter((a) => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const calculateTotal = () => {
    const basePrice = selectedSize ? selectedSize.price : item.base_price;
    const addonsTotal = selectedAddons.reduce(
      (sum, addon) => sum + addon.price,
      0
    );
    return basePrice + addonsTotal;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Customize ${item.name}`} size="md">
      <div className="space-y-5">
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-44 object-cover rounded-xl border border-slate-100"
          />
        )}

        {item.description && (
          <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
        )}

        {/* Sizes Selection */}
        {item.sizes && item.sizes.length > 0 && (
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-2.5">Select Size / Portion</h4>
            <div className="space-y-2">
              {item.sizes.map((size) => {
                const isSelected = selectedSize?.name === size.name;
                return (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold ring-1 ring-indigo-600/30"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <span>{size.name}</span>
                    <span className="font-extrabold text-indigo-600">
                      {formatCurrency(size.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Addons Selection */}
        {item.addons && item.addons.length > 0 && (
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-2.5">Extra Add-ons</h4>
            <div className="space-y-2">
              {item.addons.map((addon) => {
                const isSelected = !!selectedAddons.find((a) => a.name === addon.name);
                return (
                  <button
                    key={addon.name}
                    onClick={() => toggleAddon(addon)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold ring-1 ring-indigo-600/30"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <span>{addon.name}</span>
                    <span className="font-extrabold text-indigo-600">
                      +{formatCurrency(addon.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="border-t border-slate-200 pt-4">
          <div className="flex justify-between text-base font-black text-slate-900 mb-4">
            <span>Item Price</span>
            <span className="text-indigo-600">{formatCurrency(calculateTotal())}</span>
          </div>
          <Button
            onClick={() => onAdd(item, selectedSize, selectedAddons)}
            fullWidth
            size="lg"
            variant="primary"
          >
            Add to Order
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Checkout Modal Component
interface CheckoutModalProps {
  isOpen: boolean;
  cart: CartItem[];
  restaurantId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  cart,
  restaurantId,
  onClose,
  onSuccess,
}) => {
  const tableParam = new URLSearchParams(window.location.search).get("table");
  const [tableNumber, setTableNumber] = useState(tableParam || "");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderType, setOrderType] = useState<"table" | "takeaway">("table");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.itemTotal * item.quantity,
    0
  );
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!customerName.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!isValidPhone(customerPhone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    if (orderType === "table" && !tableNumber.trim()) {
      setError("Please enter table number");
      return;
    }

    setLoading(true);

    const orderData = {
      restaurant_id: restaurantId,
      order_type: (orderType === "table" ? "qr" : "counter") as
        | "qr"
        | "counter",
      table_number: orderType === "table" ? tableNumber : undefined,
      customer_name: customerName,
      customer_phone: customerPhone,
      items: cart.map((item) => ({
        menu_item_id: item.id,
        name: item.name,
        quantity: item.quantity,
        base_price: item.base_price,
        selected_size: item.selectedSize,
        selected_addons: item.selectedAddons,
        item_total: item.itemTotal,
        special_instructions: undefined,
      })),
      subtotal,
      tax,
      total,
      customer_notes: notes,
    };

    const { error: orderError } = await createOrder(orderData);
    setLoading(false);

    if (!orderError) {
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        resetForm();
      }, 2500);
    } else {
      setError(orderError?.message || "Failed to place order");
    }
  };

  const resetForm = () => {
    setCustomerName("");
    setCustomerPhone("");
    setTableNumber("");
    setNotes("");
    setOrderType("table");
    setSuccess(false);
  };

  if (success) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Order Confirmed!" size="md">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
            Order Sent to Kitchen!
          </h3>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed max-w-sm mx-auto">
            Your order has been submitted directly to the kitchen display. Sit back and enjoy your meal!
          </p>
          <Button onClick={onClose} fullWidth variant="primary">
            Done
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Checkout & Confirm" size="lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <Alert type="error" message={error} />}

        {/* Order Type Selection */}
        <div>
          <label className="label mb-2">Dining Preference</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setOrderType("table")}
              className={`p-3.5 rounded-xl border text-xs font-bold transition-all ${
                orderType === "table"
                  ? "border-indigo-600 bg-indigo-50/70 text-indigo-700 ring-1 ring-indigo-600/30"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Dine In (Table Service)
            </button>
            <button
              type="button"
              onClick={() => setOrderType("takeaway")}
              className={`p-3.5 rounded-xl border text-xs font-bold transition-all ${
                orderType === "takeaway"
                  ? "border-indigo-600 bg-indigo-50/70 text-indigo-700 ring-1 ring-indigo-600/30"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Takeaway / Counter Pickup
            </button>
          </div>
        </div>

        {/* Table Number */}
        {orderType === "table" && (
          <Input
            label="Table Number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="e.g., Table 5"
            required
          />
        )}

        {/* Customer Info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your name"
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="10-digit mobile number"
            required
            helperText="For order updates & confirmation"
          />
        </div>

        {/* Special Instructions */}
        <div>
          <label className="label mb-1.5">Chef Instructions (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Less spicy, extra napkins, allergies..."
            rows={2}
            className="input min-h-[80px]"
          />
        </div>

        {/* Order Summary Breakdown */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">Order Items</h4>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between text-slate-600">
              <span>
                {item.quantity}x {item.name}
                {item.selectedSize && ` (${item.selectedSize.name})`}
              </span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(item.itemTotal * item.quantity)}
              </span>
            </div>
          ))}
          <div className="border-t border-slate-200 pt-2 mt-2 space-y-1">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Tax (GST 5%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-1.5 border-t border-slate-200">
              <span>Total Payable</span>
              <span className="text-indigo-600">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <Button type="button" variant="outline" onClick={onClose} fullWidth>
            Back
          </Button>
          <Button type="submit" variant="primary" loading={loading} fullWidth size="lg">
            Confirm & Send Order
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CustomerMenu;
