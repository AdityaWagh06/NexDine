import React, { useState } from 'react';
import { getFoodImage } from '../../utils/foodImages';

export interface DishItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image_url?: string;
  prep_time?: string | number;
  is_available?: boolean;
  is_vegetarian?: boolean;
  spicy_level?: number;
  rating?: number;
  tags?: string[];
}

interface DishCardProps {
  dish: DishItem;
  onAddToCart?: (dish: DishItem) => void;
  onToggleFavorite?: (dish: DishItem) => void;
  isFavorite?: boolean;
  variant?: 'modern' | 'compact' | 'pos';
  currencySymbol?: string;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  onAddToCart,
  onToggleFavorite,
  isFavorite: initialIsFavorite = false,
  variant = 'modern',
  currencySymbol = '$',
}) => {
  const [isFav, setIsFav] = useState(initialIsFavorite);
  const imageUrl = getFoodImage(dish.name, dish.category, dish.image_url);

  const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFav(!isFav);
    if (onToggleFavorite) onToggleFavorite(dish);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(dish);
  };

  // Compact Variant (Ref: Screenshot 2 YumGo style)
  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md border border-stone-100 transition-all duration-300 flex flex-col justify-between group relative">
        <div>
          {/* Circular Image Container with Heart */}
          <div className="relative w-full aspect-square mb-3 flex items-center justify-center bg-stone-50 rounded-2xl p-2 group-hover:bg-amber-50/40 transition-colors">
            <img
              src={imageUrl}
              alt={dish.name}
              className="w-4/5 h-4/5 object-cover rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <button
              onClick={handleFavClick}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-400 hover:text-red-500 shadow-xs transition-colors"
              aria-label="Favorite"
            >
              <svg
                className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'fill-none stroke-current'}`}
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>

          {/* Title & Prep Time */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <h3 className="font-semibold text-stone-900 text-sm line-clamp-1 group-hover:text-red-600 transition-colors">
              {dish.name}
            </h3>
            {dish.prep_time && (
              <span className="text-[11px] text-stone-400 font-medium whitespace-nowrap flex items-center gap-0.5">
                <span>⏱</span> {dish.prep_time}m
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-stone-500 text-xs line-clamp-2 leading-snug mb-3">
            {dish.description || `${dish.category || 'Food'} freshly prepared with organic ingredients.`}
          </p>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <span className="font-bold text-stone-900 text-sm">
            {currencySymbol}{typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
          </span>
          <button
            onClick={handleAddClick}
            className="px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-medium flex items-center gap-1 shadow-xs transition-all"
          >
            <span>add to cart</span>
            <span className="text-sm font-semibold">+</span>
          </button>
        </div>
      </div>
    );
  }

  // POS Variant (Ref: Screenshot 4 Foodyoow style)
  if (variant === 'pos') {
    return (
      <div
        onClick={handleAddClick}
        className="bg-white rounded-2xl p-3 shadow-xs hover:shadow-md border border-stone-100 hover:border-red-200 transition-all duration-200 cursor-pointer flex flex-col items-center text-center group"
      >
        <div className="w-20 h-20 mb-2 rounded-full overflow-hidden bg-stone-50 flex items-center justify-center p-1">
          <img
            src={imageUrl}
            alt={dish.name}
            className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <h4 className="font-medium text-stone-800 text-xs line-clamp-1 mb-1 group-hover:text-red-600 transition-colors">
          {dish.name}
        </h4>
        <span className="font-bold text-red-600 text-xs">
          {currencySymbol}{typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
        </span>
      </div>
    );
  }

  // Modern Card Variant (Ref: Screenshot 1 The SpicyCab style)
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-lg border border-stone-100/90 transition-all duration-300 flex flex-col justify-between group relative">
      {/* Top Floating Add Button */}
      <button
        onClick={handleAddClick}
        className="absolute top-4 right-4 w-9 h-9 rounded-full border border-amber-300/80 bg-white hover:bg-amber-500 hover:text-white hover:border-amber-500 text-amber-600 flex items-center justify-center transition-all duration-200 shadow-xs z-10 active:scale-95"
        title="Add item"
      >
        <span className="text-lg leading-none font-light">+</span>
      </button>

      <div>
        {/* Food Image */}
        <div className="w-full h-36 mb-4 flex items-center justify-center overflow-hidden rounded-2xl bg-stone-50/80 group-hover:bg-amber-50/30 transition-colors p-2">
          <img
            src={imageUrl}
            alt={dish.name}
            className="h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Price Tag */}
        <div className="mb-1">
          <span className="text-lg font-extrabold text-stone-900 tracking-tight">
            {currencySymbol}{typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-stone-800 text-sm line-clamp-1 mb-1 group-hover:text-red-600 transition-colors">
          {dish.name}
        </h3>

        {/* Description / Subtext */}
        <p className="text-stone-400 text-xs line-clamp-2 leading-relaxed">
          {dish.description || dish.tags?.join(', ') || `${dish.category || 'Food'}, fresh ingredients`}
        </p>
      </div>

      {/* Footer Meta: Veg badge or time */}
      <div className="mt-3 pt-2 border-t border-stone-100/80 flex items-center justify-between text-xs text-stone-400">
        {dish.is_vegetarian !== undefined && (
          <span className="flex items-center gap-1 text-[11px]">
            <span
              className={`w-2 h-2 rounded-full inline-block ${
                dish.is_vegetarian ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            />
            {dish.is_vegetarian ? 'Veg' : 'Non-Veg'}
          </span>
        )}
        {dish.prep_time && (
          <span className="text-[11px] text-stone-400 ml-auto">
            ⏱ {dish.prep_time} min
          </span>
        )}
      </div>
    </div>
  );
};
