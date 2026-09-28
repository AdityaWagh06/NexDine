import { FOOD_STOCK_IMAGES } from './foodImages';

export interface SampleDish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  prep_time: string;
  is_vegetarian: boolean;
  is_available: boolean;
  rating: number;
  tags: string[];
}

export const SAMPLE_MENU_ITEMS: SampleDish[] = [
  // Indian (Ref: Screenshot 1)
  {
    id: 'm-1',
    name: 'Butter Chicken Special',
    description: 'Tender chicken simmered in rich creamy tomato butter gravy with aromatic spices.',
    price: 16.99,
    category: 'Indian',
    image_url: FOOD_STOCK_IMAGES.butterChicken,
    prep_time: '20',
    is_vegetarian: false,
    is_available: true,
    rating: 4.9,
    tags: ['Curry', 'Butter Chicken', 'Spicy'],
  },
  {
    id: 'm-2',
    name: 'Paneer Tikka Platter',
    description: 'Char-grilled cottage cheese cubes marinated in spiced yogurt with bell peppers.',
    price: 14.99,
    category: 'Indian',
    image_url: FOOD_STOCK_IMAGES.paneerTikka,
    prep_time: '15',
    is_vegetarian: true,
    is_available: true,
    rating: 4.8,
    tags: ['Paneer', 'Tandoori', 'Vegetarian'],
  },
  {
    id: 'm-3',
    name: 'Hyderabadi Dum Biryani',
    description: 'Long-grain basmati rice layered with fragrant saffron, mint, and slow-cooked meat.',
    price: 17.59,
    category: 'Indian',
    image_url: FOOD_STOCK_IMAGES.biryani,
    prep_time: '25',
    is_vegetarian: false,
    is_available: true,
    rating: 4.9,
    tags: ['Biryani', 'Rice', 'Spicy'],
  },

  // Chinese & Asian
  {
    id: 'm-4',
    name: 'Huron Honey-Apple Chicken',
    description: 'Crispy fried chicken glazed in Huron honey-apple reduction sauce.',
    price: 18.99,
    category: 'Chinese',
    image_url: FOOD_STOCK_IMAGES.chickenWings,
    prep_time: '18',
    is_vegetarian: false,
    is_available: true,
    rating: 4.7,
    tags: ['Crispy', 'Honey Glazed', 'Chicken'],
  },
  {
    id: 'm-5',
    name: 'Wok-Tossed Hakka Noodles',
    description: 'Hand-pulled noodles tossed with fresh veggies, garlic, and savory soy blend.',
    price: 12.99,
    category: 'Chinese',
    image_url: FOOD_STOCK_IMAGES.noodles,
    prep_time: '12',
    is_vegetarian: true,
    is_available: true,
    rating: 4.6,
    tags: ['Noodles', 'Asian', 'Veggie'],
  },

  // Snacks & Fast Food (Ref: Screenshot 1 & 4)
  {
    id: 'm-6',
    name: 'Junk Food Cheeseburger Combo',
    description: 'Double beef patty with melted cheddar, lettuce, tomatoes, and golden fries.',
    price: 12.99,
    category: 'Snacks',
    image_url: FOOD_STOCK_IMAGES.burger,
    prep_time: '10',
    is_vegetarian: false,
    is_available: true,
    rating: 4.9,
    tags: ['Burger', 'French Fries', 'Cheeseburger'],
  },
  {
    id: 'm-7',
    name: 'Central Gyros Deluxe',
    description: 'Authentic warm pita stuffed with seasoned roasted meat, tzatziki, and crisp salad.',
    price: 14.99,
    category: 'Snacks',
    image_url: FOOD_STOCK_IMAGES.gyros,
    prep_time: '10',
    is_vegetarian: false,
    is_available: true,
    rating: 4.8,
    tags: ['Gyros', 'Pita Wrap', 'Best Gyros'],
  },
  {
    id: 'm-8',
    name: 'Crispy Golden French Fries',
    description: 'Freshly cut potato fries seasoned with sea salt and special house spice dip.',
    price: 9.99,
    category: 'Snacks',
    image_url: FOOD_STOCK_IMAGES.fries,
    prep_time: '8',
    is_vegetarian: true,
    is_available: true,
    rating: 4.7,
    tags: ['French Fries', 'Sides', 'Crunchy'],
  },

  // Breakfast (Ref: Screenshot 2)
  {
    id: 'm-9',
    name: 'Fluffy Golden Pancakes',
    description: 'Start your day right with our fluffy pancakes, served fresh with maple syrup.',
    price: 2.00,
    category: 'Breakfast',
    image_url: FOOD_STOCK_IMAGES.pancakes,
    prep_time: '10',
    is_vegetarian: true,
    is_available: true,
    rating: 4.9,
    tags: ['Pancakes', 'Breakfast', 'Sweet'],
  },
  {
    id: 'm-10',
    name: 'Freshly Baked Bagel',
    description: 'Delight in our freshly baked bagels with cream cheese, perfect for any time.',
    price: 2.00,
    category: 'Breakfast',
    image_url: FOOD_STOCK_IMAGES.bagel,
    prep_time: '5',
    is_vegetarian: true,
    is_available: true,
    rating: 4.6,
    tags: ['Bagel', 'Bakery'],
  },
  {
    id: 'm-11',
    name: 'Cinnamon Sweet Roll',
    description: 'Celebrate the sweet indulgence of our cinnamon rolls, baked fresh daily.',
    price: 2.00,
    category: 'Breakfast',
    image_url: FOOD_STOCK_IMAGES.cinnamonRoll,
    prep_time: '30',
    is_vegetarian: true,
    is_available: true,
    rating: 4.8,
    tags: ['Cinnamon', 'Pastry'],
  },
  {
    id: 'm-12',
    name: 'Classic French Toast',
    description: 'Savor our French toast, a breakfast classic made to perfection with berries.',
    price: 2.00,
    category: 'Breakfast',
    image_url: FOOD_STOCK_IMAGES.frenchToast,
    prep_time: '20',
    is_vegetarian: true,
    is_available: true,
    rating: 4.9,
    tags: ['French Toast', 'Berries'],
  },

  // Desserts & Beverages
  {
    id: 'm-13',
    name: 'Artisanal Iced Cold Brew',
    description: 'Slow-steeped Arabica coffee over ice with vanilla milk cream.',
    price: 4.50,
    category: 'Beverages',
    image_url: FOOD_STOCK_IMAGES.icedCoffee,
    prep_time: '5',
    is_vegetarian: true,
    is_available: true,
    rating: 4.9,
    tags: ['Coffee', 'Cold Brew'],
  },
  {
    id: 'm-14',
    name: 'New York Strawberry Cheesecake',
    description: 'Rich velvety cream cheese slice topped with sweet strawberry coulis.',
    price: 6.99,
    category: 'Desserts',
    image_url: FOOD_STOCK_IMAGES.cheesecake,
    prep_time: '5',
    is_vegetarian: true,
    is_available: true,
    rating: 5.0,
    tags: ['Cheesecake', 'Dessert'],
  },
];
