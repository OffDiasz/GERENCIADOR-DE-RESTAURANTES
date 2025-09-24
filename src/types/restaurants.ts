// src/types/restaurant.ts

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  city: string;
  rating: number;
  open: boolean;
  createdAt: string; // ISO string
}