export type Role = "learner" | "earner" | "seller" | "all";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  language?: string;
  role?: Role;
  bio?: string;
  skills?: string[];
  location?: string;
  streak?: number;
  xp?: number;
  onboarded?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration_hours: number;
  lessons_count: number;
  rating: number;
  reviews_count: number;
  cover_url?: string;
  mentor: { name: string; avatar_url?: string; title?: string };
  progress?: number;
  price?: number;
  language?: string;
}

export interface Job {
  id: string;
  title: string;
  category?: string;
  company: { name: string; logo_url?: string; verified?: boolean };
  location: string;
  remote: boolean;
  type: "full-time" | "part-time" | "contract" | "gig" | "internship";
  salary_min?: number;
  salary_max?: number;
  currency?: string;
  posted_at: string;
  skills: string[];
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  saved?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  seller: { id: string; name: string; avatar_url?: string; location?: string; rating?: number };
  rating?: number;
  reviews_count?: number;
  stock?: number;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: "course" | "job" | "order" | "system" | "message";
  created_at: string;
  read: boolean;
  link?: string;
}

export interface Order {
  id: string;
  items: Array<{ product_id: string; name: string; qty: number; price: number; image?: string }>;
  total: number;
  currency: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  created_at: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
}

// Backend authenticates by phone + password (see auth.controller.js).
export interface LoginPayload { phone: string; password: string; }
export interface SignupPayload { name: string; phone: string; password: string; email?: string; }
export interface AuthResponse { token: string; refresh_token?: string; user: User; }
