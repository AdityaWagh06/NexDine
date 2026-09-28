// Curated high-resolution Unsplash stock photos for food & dining dishes

export interface FoodStockImage {
  id: string;
  name: string;
  category: string;
  url: string;
  transparentUrl?: string;
  aspectRatio?: string;
}

export const FOOD_STOCK_IMAGES = {
  // Burgers & Junk Food
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  cheeseburger: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80",
  doubleBurger: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
  fries: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
  chickenWings: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
  
  // Gyros & Sandwiches
  gyros: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
  sandwich: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
  panini: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",

  // Breakfast items (Ref: Screenshot 2)
  pancakes: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
  bagel: "https://images.unsplash.com/photo-1585478259715-876a6a81ae08?auto=format&fit=crop&w=800&q=80",
  cinnamonRoll: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80",
  frenchToast: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80",
  crepes: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=80",
  omelet: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80",
  croissant: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
  muffins: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=800&q=80",

  // Indian Cuisine
  butterChicken: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
  biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
  paneerTikka: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
  samosa: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  naanBread: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",

  // Chinese & Asian
  noodles: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80",
  dumplings: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80",
  friedRice: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
  ramen: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
  sushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",

  // Italian & Pizza
  margheritaPizza: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
  pepperoniPizza: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
  pastaCarbonara: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80",

  // Desserts & Beverages
  cheesecake: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
  icedCoffee: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
  freshJuice: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
  heroCatering: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
};

/**
 * Returns a high-res food stock image URL based on item title or category
 */
export function getFoodImage(title: string, category?: string, fallbackUrl?: string): string {
  if (fallbackUrl && fallbackUrl.startsWith('http') && !fallbackUrl.includes('via.placeholder.com')) {
    return fallbackUrl;
  }

  const lowerTitle = title.toLowerCase();
  const lowerCat = (category || '').toLowerCase();

  if (lowerTitle.includes('pancake')) return FOOD_STOCK_IMAGES.pancakes;
  if (lowerTitle.includes('bagel')) return FOOD_STOCK_IMAGES.bagel;
  if (lowerTitle.includes('cinnamon')) return FOOD_STOCK_IMAGES.cinnamonRoll;
  if (lowerTitle.includes('french toast')) return FOOD_STOCK_IMAGES.frenchToast;
  if (lowerTitle.includes('crepe')) return FOOD_STOCK_IMAGES.crepes;
  if (lowerTitle.includes('omelet') || lowerTitle.includes('egg')) return FOOD_STOCK_IMAGES.omelet;
  if (lowerTitle.includes('croissant')) return FOOD_STOCK_IMAGES.croissant;
  if (lowerTitle.includes('muffin')) return FOOD_STOCK_IMAGES.muffins;

  if (lowerTitle.includes('wings') || lowerTitle.includes('chicken wing')) return FOOD_STOCK_IMAGES.chickenWings;
  if (lowerTitle.includes('gyro') || lowerTitle.includes('wrap')) return FOOD_STOCK_IMAGES.gyros;
  if (lowerTitle.includes('fries') || lowerTitle.includes('french fry')) return FOOD_STOCK_IMAGES.fries;
  if (lowerTitle.includes('double') && lowerTitle.includes('burg')) return FOOD_STOCK_IMAGES.doubleBurger;
  if (lowerTitle.includes('cheese') && lowerTitle.includes('burg')) return FOOD_STOCK_IMAGES.cheeseburger;
  if (lowerTitle.includes('burg')) return FOOD_STOCK_IMAGES.burger;
  if (lowerTitle.includes('sandwich')) return FOOD_STOCK_IMAGES.sandwich;

  if (lowerTitle.includes('butter chicken') || lowerTitle.includes('tikka masala')) return FOOD_STOCK_IMAGES.butterChicken;
  if (lowerTitle.includes('biryani')) return FOOD_STOCK_IMAGES.biryani;
  if (lowerTitle.includes('paneer')) return FOOD_STOCK_IMAGES.paneerTikka;
  if (lowerTitle.includes('samosa')) return FOOD_STOCK_IMAGES.samosa;
  if (lowerTitle.includes('naan') || lowerTitle.includes('roti')) return FOOD_STOCK_IMAGES.naanBread;

  if (lowerTitle.includes('noodle') || lowerTitle.includes('chow mein')) return FOOD_STOCK_IMAGES.noodles;
  if (lowerTitle.includes('dumpling') || lowerTitle.includes('momo')) return FOOD_STOCK_IMAGES.dumplings;
  if (lowerTitle.includes('rice') || lowerTitle.includes('fried rice')) return FOOD_STOCK_IMAGES.friedRice;
  if (lowerTitle.includes('ramen')) return FOOD_STOCK_IMAGES.ramen;
  if (lowerTitle.includes('sushi')) return FOOD_STOCK_IMAGES.sushi;

  if (lowerTitle.includes('pizza')) return FOOD_STOCK_IMAGES.pepperoniPizza;
  if (lowerTitle.includes('pasta') || lowerTitle.includes('spaghetti')) return FOOD_STOCK_IMAGES.pastaCarbonara;
  if (lowerTitle.includes('cake') || lowerTitle.includes('dessert')) return FOOD_STOCK_IMAGES.cheesecake;
  if (lowerTitle.includes('coffee') || lowerTitle.includes('latte')) return FOOD_STOCK_IMAGES.icedCoffee;
  if (lowerTitle.includes('juice') || lowerTitle.includes('drink') || lowerTitle.includes('beverage')) return FOOD_STOCK_IMAGES.freshJuice;

  // Category fallbacks
  if (lowerCat.includes('indian')) return FOOD_STOCK_IMAGES.butterChicken;
  if (lowerCat.includes('chinese') || lowerCat.includes('asian')) return FOOD_STOCK_IMAGES.noodles;
  if (lowerCat.includes('breakfast')) return FOOD_STOCK_IMAGES.pancakes;
  if (lowerCat.includes('snack') || lowerCat.includes('starter')) return FOOD_STOCK_IMAGES.fries;
  if (lowerCat.includes('dessert')) return FOOD_STOCK_IMAGES.cheesecake;
  if (lowerCat.includes('beverage') || lowerCat.includes('drink')) return FOOD_STOCK_IMAGES.freshJuice;
  if (lowerCat.includes('pizza') || lowerCat.includes('italian')) return FOOD_STOCK_IMAGES.margheritaPizza;

  return FOOD_STOCK_IMAGES.burger;
}
