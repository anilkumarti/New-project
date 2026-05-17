import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FoodEntry } from './food';

interface FavoriteMealsState {
  favoriteMeals: FoodEntry[];
  addFavoriteMeal: (meal: FoodEntry) => void;
  removeFavoriteMeal: (id: string) => void;
}

export const useFavoriteMealsStore = create<FavoriteMealsState>()(
  persist(
    (set) => ({
      favoriteMeals: [],
      addFavoriteMeal: (meal) =>
        set((state) => ({
          favoriteMeals: [...state.favoriteMeals, meal],
        })),
      removeFavoriteMeal: (id) =>
        set((state) => ({
          favoriteMeals: state.favoriteMeals.filter((meal) => meal.id !== id),
        })),
    }),
    {
      name: 'favorite-meals-storage',
    }
  )
);
