import { FoodEntry, WorkoutEntry } from '../types';

const STORAGE_KEYS = {
  FOOD_ENTRIES: 'health_tracker_food_entries',
  WORKOUT_ENTRIES: 'health_tracker_workout_entries',
};

export const saveFoodEntry = (entry: FoodEntry): void => {
  const existing = getFoodEntries();
  const updated = [...existing, entry];
  localStorage.setItem(STORAGE_KEYS.FOOD_ENTRIES, JSON.stringify(updated));
};

export const getFoodEntries = (): FoodEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.FOOD_ENTRIES);
  return stored ? JSON.parse(stored) : [];
};

export const updateFoodEntry = (id: string, entry: FoodEntry): void => {
  const existing = getFoodEntries();
  const updated = existing.map(item => item.id === id ? entry : item);
  localStorage.setItem(STORAGE_KEYS.FOOD_ENTRIES, JSON.stringify(updated));
};

export const deleteFoodEntry = (id: string): void => {
  const existing = getFoodEntries();
  const updated = existing.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.FOOD_ENTRIES, JSON.stringify(updated));
};

export const saveWorkoutEntry = (entry: WorkoutEntry): void => {
  const existing = getWorkoutEntries();
  const updated = [...existing, entry];
  localStorage.setItem(STORAGE_KEYS.WORKOUT_ENTRIES, JSON.stringify(updated));
};

export const getWorkoutEntries = (): WorkoutEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.WORKOUT_ENTRIES);
  return stored ? JSON.parse(stored) : [];
};

export const updateWorkoutEntry = (id: string, entry: WorkoutEntry): void => {
  const existing = getWorkoutEntries();
  const updated = existing.map(item => item.id === id ? entry : item);
  localStorage.setItem(STORAGE_KEYS.WORKOUT_ENTRIES, JSON.stringify(updated));
};

export const deleteWorkoutEntry = (id: string): void => {
  const existing = getWorkoutEntries();
  const updated = existing.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.WORKOUT_ENTRIES, JSON.stringify(updated));
};

export const getEntriesByDate = (date: string) => {
  const foodEntries = getFoodEntries().filter(entry => entry.date === date);
  const workoutEntries = getWorkoutEntries().filter(entry => entry.date === date);
  
  return { foodEntries, workoutEntries };
};

export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.FOOD_ENTRIES);
  localStorage.removeItem(STORAGE_KEYS.WORKOUT_ENTRIES);
}; 