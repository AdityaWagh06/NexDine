import React from 'react';

export interface CategoryItem {
  id: string;
  name: string;
  count?: number;
  icon?: string;
}

interface CategoryPillBarProps {
  categories: (string | CategoryItem)[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  variant?: 'pill' | 'tab' | 'minimal';
  activeColor?: 'red' | 'rose' | 'amber' | 'emerald' | 'dark';
}

export const CategoryPillBar: React.FC<CategoryPillBarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  variant = 'pill',
  activeColor = 'red',
}) => {
  const getActiveClasses = () => {
    switch (activeColor) {
      case 'rose':
        return 'bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-[1.02]';
      case 'amber':
        return 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/25 font-semibold scale-[1.02]';
      case 'emerald':
        return 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-[1.02]';
      case 'dark':
        return 'bg-stone-900 text-white shadow-md shadow-stone-900/20 scale-[1.02]';
      case 'red':
      default:
        return 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md shadow-red-500/30 scale-[1.02]';
    }
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 px-1">
      <div className="flex items-center gap-2 sm:gap-3 min-w-max">
        {categories.map((cat) => {
          const name = typeof cat === 'string' ? cat : cat.name;
          const id = typeof cat === 'string' ? cat : cat.id;
          const count = typeof cat === 'string' ? undefined : cat.count;
          const icon = typeof cat === 'string' ? undefined : cat.icon;
          const isActive = activeCategory.toLowerCase() === name.toLowerCase() || activeCategory.toLowerCase() === id.toLowerCase();

          if (variant === 'tab') {
            return (
              <button
                key={id || name}
                onClick={() => onSelectCategory(name)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? `${getActiveClasses()}`
                    : 'bg-white/80 backdrop-blur-md text-stone-600 hover:text-stone-900 hover:bg-white border border-stone-200/80 shadow-xs'
                }`}
              >
                {icon && <span className="text-base">{icon}</span>}
                <span>{name}</span>
                {count !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          }

          return (
            <button
              key={id || name}
              onClick={() => onSelectCategory(name)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? getActiveClasses()
                  : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200/90 shadow-xs hover:border-stone-300'
              }`}
            >
              {icon && <span className="text-base">{icon}</span>}
              <span>{name}</span>
              {count !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/25 text-white font-semibold' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
