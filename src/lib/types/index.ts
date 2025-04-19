// Base types
export interface BaseEntity {
  id: string | number;
}

export interface SeoMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

// Location types
export interface Location extends BaseEntity {
  name: string;
}

// User types
export interface User extends BaseEntity {
  name: string;
  email: string;
  image?: string;
  role: "user" | "admin";
}

// Auth types
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// UI Types
export interface UIState {
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
  toggleMenu: () => void;
}

// Sanatorium types
export interface Sanatorium extends BaseEntity {
  name: string;
  location: string;
  description: string;
  rating: number;
  price: number;
  image: string;
  images?: string[];
  facilities?: string[];
  treatments?: string[];
  reviews?: Review[];
}

// Treatment types
export interface Treatment extends BaseEntity {
  title: string;
  description: string;
  image: string;
  icon: string;
  details?: string;
  benefits?: string[];
  duration?: string;
  price?: number;
}

// Package types
export interface Package extends BaseEntity {
  title: string;
  hotel: string;
  price: number;
  pricePerDay?: number;
  duration?: string;
  features: string[];
  image?: string;
  description?: string;
  popular?: boolean;
}

// Hero slide types
export interface HeroSlide extends BaseEntity {
  image: string;
  title: string;
  description: string;
}

// Testimonial types
export interface Testimonial extends BaseEntity {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

// FAQ types
export interface FAQ extends BaseEntity {
  question: string;
  answer: string;
  category?: string;
}

// Blog types
export interface BlogCategory extends BaseEntity {
  name: string;
  slug: string;
}

export interface BlogAuthor extends BaseEntity {
  name: string;
  image?: string;
  bio?: string;
}

export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  featuredImage?: string;
  date: string;
  author: BlogAuthor | string;
  category: BlogCategory | string;
  tags: string[];
  readTime?: string;
  views?: number;
}

// Review types
export interface Review extends BaseEntity {
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  content: string;
  date: string;
  entityId: string;
  entityType: "sanatorium" | "treatment" | "package";
}

// Booking types
export interface Booking extends BaseEntity {
  userId: string;
  entityId: string;
  entityType: "sanatorium" | "treatment" | "package";
  startDate: string;
  endDate: string;
  guests: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  totalPrice: number;
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: string;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate?: string;
  guests: number;
  specialRequests?: string;
}

export interface SearchFormData {
  location?: string;
  startDate?: string;
  endDate?: string;
  guests?: number;
  treatment?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface AskDoctorFormValues extends ContactFormValues {
  question: string;
  agreeToTerms: boolean;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// UI component types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "link" | "primary" | "secondary";
  size?: "sm" | "default" | "lg" | "icon";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
}

// Theme types
export type Theme = "light" | "dark" | "system";

// Route params
export interface SanatoriumPageParams {
  id: string;
}

export interface TreatmentPageParams {
  id: string;
}

export interface BlogPostPageParams {
  slug: string;
}

// Domain Types
export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: BlogAuthor | string;
  category: BlogCategory | string;
  tags: string[];
} 