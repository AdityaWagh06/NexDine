import type { LucideIcon } from "lucide-react";

export interface ConnectedWorkflowItem {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  angle: number;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  rating: number;
  avatar: string;
}

export interface ShowcaseDishItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image_url: string;
  prep_time: string;
  rating: number;
}
