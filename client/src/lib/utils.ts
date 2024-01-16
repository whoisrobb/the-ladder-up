import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const serverUrl = 'http://localhost:3000';

export const categories = ['Music', 'Fashion', 'Films', 'Sports', 'Decor', 'Culinary'];