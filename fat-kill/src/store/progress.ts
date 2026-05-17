import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WeightEntry {
  date: string; // YYYY-MM-DD
  weight: number;
}

export interface WorkoutEntry {
  date: string; // YYYY-MM-DD
  duration: number; // in minutes
}

interface ProgressState {
  weightEntries: WeightEntry[];
  workoutEntries: WorkoutEntry[];
  addWeightEntry: (entry: WeightEntry) => void;
  addWorkoutEntry: (entry: WorkoutEntry) => void;
}

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      weightEntries: [
        { date: yesterday, weight: 152 },
        { date: today, weight: 150 },
      ],
      workoutEntries: [
        { date: yesterday, duration: 30 },
        { date: today, duration: 45 },
      ],
      addWeightEntry: (entry) =>
        set((state) => ({
          weightEntries: [...state.weightEntries, entry],
        })),
      addWorkoutEntry: (entry) =>
        set((state) => ({
          workoutEntries: [...state.workoutEntries, entry],
        })),
    }),
    {
      name: 'progress-storage',
    }
  )
);
