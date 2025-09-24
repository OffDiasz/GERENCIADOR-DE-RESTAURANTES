// src/lib/restaurants.ts
import { Restaurant } from '@/types/restaurants';

export const getRestaurants = (): Restaurant[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('restaurants');
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const saveRestaurants = (restaurants: Restaurant[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }
};
