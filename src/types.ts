export interface FoodEntry {
  id: string;
  date: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  notes?: string;
}

export interface WorkoutEntry {
  id: string;
  date: string;
  exercises: Exercise[];
  duration: number; // in minutes
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

export interface Set {
  reps: number;
  weight: number; // in lbs
  completed: boolean;
}

export interface DailyStats {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  workouts: WorkoutEntry[];
  foodEntries: FoodEntry[];
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'; 