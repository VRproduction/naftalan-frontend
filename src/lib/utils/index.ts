import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price with currency symbol
 */
export function formatPrice(price: number, currency: string = "₼") {
  return `${currency}${price.toFixed(2)}`;
}

/**
 * Format a date string to localized format
 */
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("az-AZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Truncate a string to a specific length with ellipsis
 */
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Generate a random ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Check if a string is a valid email
 */
export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if a string is a valid phone number (Azerbaijani format)
 */
export function isValidPhone(phone: string) {
  // Basic Azerbaijani phone number validation
  // Accepts formats like +994xxxxxxxxx or 0xx-xxx-xx-xx
  const phoneRegex = /^(\+994|0)[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ""));
}

/**
 * Parse search params 
 */
export function parseSearchParams(params: URLSearchParams) {
  const parsedParams: Record<string, string> = {};
  
  params.forEach((value, key) => {
    parsedParams[key] = value;
  });
  
  return parsedParams;
}

/**
 * Filter an array by search term
 */
export function filterBySearchTerm<T>(
  items: T[],
  searchTerm: string,
  keys: (keyof T)[]
): T[] {
  if (!searchTerm) return items;
  
  const lowercasedSearchTerm = searchTerm.toLowerCase();
  
  return items.filter((item) => {
    return keys.some((key) => {
      const value = item[key];
      return typeof value === "string" && 
        value.toLowerCase().includes(lowercasedSearchTerm);
    });
  });
}

/**
 * Delay execution by specified milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Scroll to element by ID with smooth behavior
 */
export function scrollToElement(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Get a random item from an array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Calculate average rating from an array of ratings
 */
export function calculateAverageRating(ratings: number[]): number {
  if (!ratings.length) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return parseFloat((sum / ratings.length).toFixed(1));
} 