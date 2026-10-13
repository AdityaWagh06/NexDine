import { Smartphone, Utensils, ChefHat, QrCode, TrendingUp } from "lucide-react";
import type { ShowcaseDishItem, ConnectedWorkflowItem } from "../types/landing";

export const SHOWCASE_DISHES: ShowcaseDishItem[] = [
  {
    id: "hero-1",
    name: "Truffle Honey Glazed Chicken",
    price: 360,
    category: "Starters",
    description: "Crispy double-cooked chicken wings glazed with organic Huron apple honey and truffle oil reduction.",
    image_url: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    prep_time: "14 min",
    rating: 4.9,
  },
  {
    id: "hero-2",
    name: "Smokey Angus Cheeseburger",
    price: 420,
    category: "Mains",
    description: "Aged Angus beef patty with double melted cheddar, caramelized onions, crisp lettuce, and signature house aioli.",
    image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    prep_time: "12 min",
    rating: 4.8,
  },
  {
    id: "hero-3",
    name: "Golden Fluffy Stack Pancakes",
    price: 240,
    category: "Desserts",
    description: "Artisanal fluffy buttermilk pancakes served fresh with organic Canadian maple syrup and wild berries.",
    image_url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
    prep_time: "10 min",
    rating: 4.9,
  },
  {
    id: "hero-4",
    name: "Mediterranean Gyro Deluxe",
    price: 380,
    category: "Mains",
    description: "Authentic warm pita wrap loaded with seasoned slow-roasted gyro meat, tzatziki sauce, and crisp salad.",
    image_url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
    prep_time: "15 min",
    rating: 4.8,
  },
];

export const CONNECTED_WORKFLOWS: ConnectedWorkflowItem[] = [
  {
    id: "qr-scan",
    title: "Table QR Scanning",
    subtitle: "Customers scan table QR with native phone camera — zero app download required.",
    icon: Smartphone,
    color: "bg-[#7650E8]",
    angle: -6,
  },
  {
    id: "visual-menu",
    title: "Gourmet Visual Menu",
    subtitle: "High-resolution digital catalog with instant modifiers and category filters.",
    icon: Utensils,
    color: "bg-[#5CD8E8]",
    angle: -3,
  },
  {
    id: "live-kds",
    title: "Kitchen Ticket Stream (KDS)",
    subtitle: "0.2s instant kitchen dispatch with Web Audio chime and status color codes.",
    icon: ChefHat,
    color: "bg-[#FF625E]",
    angle: 0,
  },
  {
    id: "table-mgmt",
    title: "Table & QR Management",
    subtitle: "Configure tables, print custom QR standees, and manage seat layouts.",
    icon: QrCode,
    color: "bg-[#FFD45C]",
    angle: 3,
  },
  {
    id: "analytics",
    title: "Owner Revenue Analytics",
    subtitle: "Track daily gross sales, commission savings, and live kitchen prep speeds.",
    icon: TrendingUp,
    color: "bg-[#7650E8]",
    angle: 6,
  },
];
