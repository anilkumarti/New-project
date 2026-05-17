import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: string; // YYYY-MM-DD
}

interface FoodState {
  entries: FoodEntry[];
  addEntry: (entry: Omit<FoodEntry, 'id' | 'date'>) => void;
  updateEntry: (id: string, updatedEntry: Partial<FoodEntry>) => void;
  deleteEntry: (id: string) => void;
}

const today = new Date().toISOString().split('T')[0];

export const useFoodStore = create<FoodState>()(
  persist(
    (set) => ({
      entries: [
        { id: '1', name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, quantity: 1, mealType: 'breakfast', date: today },
        { id: '2', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, quantity: 1, mealType: 'lunch', date: today },
      ],
      addEntry: (entry) =>
        set((state) => ({
          entries: [...state.entries, { ...entry, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] }],
        })),
      updateEntry: (id, updatedEntry) =>
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === id ? { ...entry, ...updatedEntry } : entry
          ),
        })),
      deleteEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),
    }),
    {
      name: 'food-storage',
    }
  )
);
