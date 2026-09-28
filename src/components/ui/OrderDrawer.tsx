import React from 'react';
import { getFoodImage } from '../../utils/foodImages';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  category?: string;
  special_instructions?: string;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  diningOption?: 'Dine In' | 'Take Out' | 'Delivery';
  onChangeDiningOption?: (option: 'Dine In' | 'Take Out' | 'Delivery') => void;
  currencySymbol?: string;
  tableNumber?: string | number;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  diningOption = 'Take Out',
  onChangeDiningOption,
  currencySymbol = '$',
  tableNumber,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end transition-opacity duration-300">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Ref: Screenshot 4) */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-stone-900">My Order</h2>
              {tableNumber && (
                <span className="text-xs bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-md">
                  Table #{tableNumber}
                </span>
              )}
            </div>
            {/* Dining options selector */}
            <div className="flex items-center gap-2 mt-1">
              {(['Take Out', 'Dine In', 'Delivery'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => onChangeDiningOption && onChangeDiningOption(opt)}
                  className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                    diningOption === opt
                      ? 'bg-red-600 text-white font-medium shadow-xs'
                      : 'text-stone-500 hover:text-stone-900 hover:bg-stone-200/50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
              <span className="text-4xl mb-2">🍔</span>
              <p className="font-semibold text-stone-700">Your order is empty</p>
              <p className="text-xs mt-1">Add items from the menu to see them here.</p>
            </div>
          ) : (
            items.map((item) => {
              const imgUrl = getFoodImage(item.name, item.category, item.image_url);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-2xl border border-stone-100 bg-white hover:border-stone-200 transition-all shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={imgUrl}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-xl bg-stone-50"
                    />
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs font-semibold text-red-600">
                        {currencySymbol}{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl">
                    <button
                      onClick={() =>
                        item.quantity > 1 ? onUpdateQuantity(item.id, item.quantity - 1) : onRemoveItem(item.id)
                      }
                      className="w-6 h-6 rounded-lg bg-white text-stone-700 hover:bg-stone-200 flex items-center justify-center font-bold text-xs transition-colors shadow-2xs"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-stone-800 px-1">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center justify-center font-bold text-xs transition-colors shadow-2xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bill Summary Footer (Ref: Screenshot 4) */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-100 bg-stone-50/80 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-800">
                  {currencySymbol}{subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span className="font-semibold text-stone-800">
                  {currencySymbol}{tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-extrabold text-stone-900">
                <span>Total</span>
                <span className="text-red-600">
                  {currencySymbol}{total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Place Order</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
