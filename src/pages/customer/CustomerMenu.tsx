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
  LayoutGrid,
  List,
  SlidersHorizontal,
  Heart,
} from "lucide-react";
import {
  Card,
  Button,
  Input,
  Modal,
  Loading,
  Alert,
  CategoryPillBar,
  DishCard,
  OrderDrawer,
} from "../../components/ui";
import {
  subscribeToMenuItems,
  createOrder,
} from "../../services/restaurantService";
import type { MenuItem } from "../../config/supabase";
import { formatCurrency, isValidPhone } from "../../utils/helpers";
import { supabase } from "../../config/supabase";
import { SAMPLE_MENU_ITEMS, SampleDish } from "../../utils/mockData";
import { getFoodImage } from "../../utils/foodImages";

interface CartItem extends MenuItem {
  quantity: number;
  selectedSize?: { name: string; price: number };
  selectedAddons: { name: string; price: number }[];
  itemTotal: number;
}

const CustomerMenu: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [restaurant, setRestaurant] = useState<any>({
    id: "demo-restaurant",
    name: "THE SPICYCAB",
    restaurant_type: "Gourmet & Digital Dining",
    logo_url: "",
  });
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [viewVariant, setViewVariant] = useState<'modern' | 'compact' | 'pos'>('modern');
  const [diningOption, setDiningOption] = useState<'Dine In' | 'Take Out' | 'Delivery'>('Take Out');

  // Load restaurant and menu
  useEffect(() => {
    if (slug) {
      loadRestaurant();
    } else {
      // Use rich mock data if no slug
      setMenuItems(SAMPLE_MENU_ITEMS as any);
    }
  }, [slug]);

  useEffect(() => {
    if (slug && restaurant?.id && restaurant.id !== "demo-restaurant") {
      const subscription = subscribeToMenuItems(restaurant.id, (data) => {
        if (data && data.length > 0) {
          setMenuItems(data);
        } else {
          setMenuItems(SAMPLE_MENU_ITEMS as any);
        }
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [restaurant, slug]);

  const loadRestaurant = async () => {
    if (!slug) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("restaurants")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      console.warn("Restaurant not found on DB, falling back to demo state.");
      setRestaurant({
        id: "demo-restaurant",
        name: "THE SPICYCAB",
        restaurant_type: "Modern Gourmet Kitchen",
      });
      setMenuItems(SAMPLE_MENU_ITEMS as any);
      setLoading(false);
      return;
    }

    setRestaurant(data);
    setLoading(false);
  };

  const activeItems = menuItems.length > 0 ? menuItems : (SAMPLE_MENU_ITEMS as any);

  const categories = [
    "All",
    "Indian",
    "Chinese",
    "Snacks",
    "Breakfast",
    "Beverages",
    "Desserts",
    ...new Set(activeItems.map((item: any) => item.category).filter(Boolean)),
  ].filter((v, i, a) => a.indexOf(v) === i);

  const filteredItems = activeItems.filter((item: any) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter.toLowerCase() === "all" ||
      (item.category && item.category.toLowerCase() === categoryFilter.toLowerCase());
    const isAvail = item.is_available !== false;
    return matchesSearch && matchesCategory && isAvail;
  });

  const addToCart = (
    item: MenuItem | SampleDish,
    selectedSize?: any,
    selectedAddons: any[] = []
  ) => {
    const basePrice = selectedSize ? selectedSize.price : ((item as any).price || (item as any).base_price || 0);
    const addonsTotal = selectedAddons.reduce(
      (sum, addon) => sum + addon.price,
      0
    );
    const itemTotal = basePrice + addonsTotal;

    const cartItem: CartItem = {
      ...(item as MenuItem),
      base_price: basePrice,
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

  const updateQuantity = (id: string, newQty: number) => {
    const newCart = cart
      .map((ci) => (ci.id === id ? { ...ci, quantity: newQty } : ci))
      .filter((ci) => ci.quantity > 0);
    setCart(newCart);
  };

  const updateQuantityByIndex = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((ci) => ci.id !== id));
  };

  const removeFromCartByIndex = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.itemTotal || item.base_price || (item as any).price || 0) * item.quantity, 0);

  const handleItemClick = (item: any) => {
    if (item.sizes && item.sizes.length > 0) {
      setSelectedItem(item);
      setShowItemModal(true);
    } else {
      addToCart(item);
    }
  };

  if (loading) {
    return <Loading text="Loading delicious menu..." />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 pb-28 font-sans">
      {/* Header (Ref: Screenshot 1 "THE SPICYCAB") */}
      <header className="bg-white/90 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
          <div className="flex items-center justify-between">
            {/* Left Brand info */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-stone-900 text-amber-400 font-extrabold text-lg flex items-center justify-center shadow-md">
                <span>ND</span>
              </div>
              <div>
                <h1 className="font-extrabold text-base sm:text-xl text-stone-900 tracking-wider uppercase">
                  {restaurant.name || "THE SPICYCAB"}
                </h1>
                <p className="text-[11px] font-semibold text-stone-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Digital Ordering
                </p>
              </div>
            </div>

            {/* View Mode & Cart Drawer Button */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200/60">
                <button
                  onClick={() => setViewVariant('modern')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    viewVariant === 'modern' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title="Modern Cards (Screenshot 1)"
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewVariant('compact')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    viewVariant === 'compact' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title="Circle Photos (Screenshot 2)"
                >
                  Circle
                </button>
                <button
                  onClick={() => setViewVariant('pos')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    viewVariant === 'pos' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title="POS Grid (Screenshot 4)"
                >
                  Grid
                </button>
              </div>

              {/* Order Cart Drawer Button (Screenshot 4) */}
              <button
                onClick={() => setShowCartDrawer(true)}
                className="relative px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-red-600/20 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">My Order</span>
                {cartCount > 0 && (
                  <span className="bg-white text-red-600 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-3 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search Indian, Chinese, Burgers, Pancakes, Fries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-100/80 border border-stone-200 rounded-2xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Category Pills Bar (Ref: Screenshots 1 & 2) */}
      <div className="bg-white/60 backdrop-blur-xs border-b border-stone-200/70 sticky top-[118px] z-30 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <CategoryPillBar
            categories={categories}
            activeCategory={categoryFilter}
            onSelectCategory={(cat) => setCategoryFilter(cat)}
            variant="pill"
            activeColor="red"
          />
        </div>
      </div>

      {/* Popular Menu / Content Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
            {categoryFilter === 'All' ? 'Popular Menu' : `${categoryFilter} Dishes`}
          </h2>
          <span className="text-xs font-semibold text-stone-400">
            {filteredItems.length} items available
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 shadow-xs">
            <Package className="w-12 h-12 text-stone-300 mx-auto mb-2" />
            <p className="text-base font-bold text-stone-800">No matching dishes found</p>
            <p className="text-xs text-stone-400 mt-1">Try switching categories or clearing search.</p>
          </div>
        ) : (
          <div
            className={`grid gap-4 sm:gap-6 ${
              viewVariant === 'pos'
                ? 'grid-cols-2 sm:grid-cols-4 md:grid-cols-6'
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {filteredItems.map((item: any) => (
              <DishCard
                key={item.id}
                dish={{
                  ...item,
                  price: item.price || item.base_price || 0,
                  image_url: item.image_url || getFoodImage(item.name, item.category),
                }}
                variant={viewVariant}
                onAddToCart={(d) => handleItemClick(d)}
                currencySymbol="$"
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Bottom Cart Bar for Mobile */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40 sm:hidden">
          <button
            onClick={() => setShowCartDrawer(true)}
            className="w-full bg-stone-900 text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between border border-stone-700 transition-all active:scale-[0.99]"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 text-white font-extrabold text-xs w-7 h-7 rounded-xl flex items-center justify-center shadow-xs">
                {cartCount}
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block -mb-0.5">Order Total</span>
                <span className="font-extrabold text-base text-amber-400">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-xs font-bold text-stone-200 bg-white/10 px-3 py-1.5 rounded-xl">
              <span>View Order</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Slide-Over POS Order Drawer (Ref: Screenshot 4) */}
      <OrderDrawer
        isOpen={showCartDrawer}
        onClose={() => setShowCartDrawer(false)}
        items={cart.map((c) => ({
          id: c.id,
          name: c.name,
          price: c.itemTotal || c.base_price || (c as any).price || 0,
          quantity: c.quantity,
          category: c.category,
          image_url: c.image_url,
        }))}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        diningOption={diningOption}
        onChangeDiningOption={setDiningOption}
        onCheckout={() => {
          setShowCartDrawer(false);
          setShowCheckout(true);
        }}
        currencySymbol="$"
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
    </div>
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

  const basePrice = selectedSize ? selectedSize.price : ((item as any).price || item.base_price || 0);
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = basePrice + addonsTotal;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Customize ${item.name}`} size="md">
      <div className="space-y-6">
        {item.sizes && item.sizes.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Select Portion Size</h4>
            <div className="grid grid-cols-2 gap-2">
              {item.sizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedSize?.name === size.name
                      ? "border-red-600 bg-red-50/50 text-red-900 font-semibold shadow-xs"
                      : "border-stone-200 text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <p className="text-xs">{size.name}</p>
                  <p className="text-sm font-bold text-stone-900 mt-0.5">${size.price.toFixed(2)}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {item.addons && item.addons.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Select Extra Add-ons</h4>
            <div className="space-y-2">
              {item.addons.map((addon) => {
                const isSelected = selectedAddons.some((a) => a.name === addon.name);
                return (
                  <button
                    key={addon.name}
                    onClick={() => toggleAddon(addon)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? "border-red-600 bg-red-50/50 text-red-900 font-semibold"
                        : "border-stone-200 text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    <span className="text-xs">{addon.name}</span>
                    <span className="text-xs font-bold">+${addon.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-bold">Total Price</span>
            <p className="text-lg font-black text-stone-900">${totalPrice.toFixed(2)}</p>
          </div>
          <Button
            onClick={() => onAdd(item, selectedSize, selectedAddons)}
            variant="emerald"
            className="bg-red-600 hover:bg-red-700 text-white font-bold"
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
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.itemTotal || item.base_price || (item as any).price || 0) * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      setError("Please fill in your name and phone number");
      return;
    }

    if (!isValidPhone(customerPhone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setSubmitting(true);
    setError("");

    const orderData = {
      restaurant_id: restaurantId,
      customer_name: customerName,
      customer_phone: customerPhone,
      table_number: tableNumber ? parseInt(tableNumber) : null,
      items: cart.map((ci) => ({
        id: ci.id,
        name: ci.name,
        quantity: ci.quantity,
        price: ci.itemTotal || ci.base_price || (ci as any).price || 0,
        selectedSize: ci.selectedSize,
        selectedAddons: ci.selectedAddons,
      })),
      total: total * 1.1, // with tax
      status: "pending",
      payment_status: "pending",
      notes,
    };

    const { error: orderErr } = await createOrder(orderData as any);

    if (orderErr) {
      setError("Failed to place order. Please try again.");
      setSubmitting(false);
    } else {
      setOrderComplete(true);
      setSubmitting(false);
      setTimeout(() => {
        onSuccess();
        setOrderComplete(false);
      }, 2500);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Complete Order" size="md">
      {orderComplete ? (
        <div className="text-center py-8 space-y-3">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
          <h3 className="text-xl font-extrabold text-stone-900">Order Placed Successfully!</h3>
          <p className="text-xs text-stone-500">Your order has been sent to the kitchen. Bon Appétit!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <Alert type="error" message={error} />}

          <div>
            <label className="label">Your Name *</label>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. John Doe"
              required
            />
          </div>

          <div>
            <label className="label">Phone Number *</label>
            <Input
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="10-digit mobile number"
              required
            />
          </div>

          <div>
            <label className="label">Table Number (Optional)</label>
            <Input
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="e.g. 5"
            />
          </div>

          <div>
            <label className="label">Special Instructions</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Less spicy, extra sauce"
              className="input min-h-[80px]"
            />
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-bold">Total with Tax</span>
              <p className="text-xl font-black text-red-600">${(total * 1.1).toFixed(2)}</p>
            </div>
            <Button type="submit" disabled={submitting} className="bg-red-600 hover:bg-red-700 text-white font-bold">
              {submitting ? "Placing..." : "Confirm & Send to Kitchen"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default CustomerMenu;
