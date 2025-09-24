import React, { useState, useEffect } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { FoodEntry, WorkoutEntry } from './types';
import { 
  saveFoodEntry, 
  getFoodEntries, 
  updateFoodEntry, 
  deleteFoodEntry,
  saveWorkoutEntry,
  getWorkoutEntries,
  updateWorkoutEntry,
  deleteWorkoutEntry,
  getEntriesByDate
} from './utils/storage';
import FoodEntryForm from './components/FoodEntryForm';
import WorkoutEntryForm from './components/WorkoutEntryForm';
import DailyView from './components/DailyView';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [workoutEntries, setWorkoutEntries] = useState<WorkoutEntry[]>([]);
  const [showFoodForm, setShowFoodForm] = useState(false);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodEntry | null>(null);
  const [editingWorkout, setEditingWorkout] = useState<WorkoutEntry | null>(null);

  useEffect(() => {
    loadEntriesForDate(currentDate);
  }, [currentDate]);

  const loadEntriesForDate = (date: string) => {
    const { foodEntries: food, workoutEntries: workouts } = getEntriesByDate(date);
    setFoodEntries(food);
    setWorkoutEntries(workouts);
  };

  const handleDateChange = (direction: 'prev' | 'next') => {
    const current = new Date(currentDate);
    const newDate = direction === 'next' ? addDays(current, 1) : subDays(current, 1);
    setCurrentDate(format(newDate, 'yyyy-MM-dd'));
  };

  const handleFoodSubmit = (entry: FoodEntry) => {
    if (editingFood) {
      updateFoodEntry(entry.id, entry);
    } else {
      saveFoodEntry(entry);
    }
    setShowFoodForm(false);
    setEditingFood(null);
    loadEntriesForDate(currentDate);
  };

  const handleWorkoutSubmit = (entry: WorkoutEntry) => {
    if (editingWorkout) {
      updateWorkoutEntry(entry.id, entry);
    } else {
      saveWorkoutEntry(entry);
    }
    setShowWorkoutForm(false);
    setEditingWorkout(null);
    loadEntriesForDate(currentDate);
  };

  const handleEditFood = (entry: FoodEntry) => {
    setEditingFood(entry);
    setShowFoodForm(true);
  };

  const handleEditWorkout = (entry: WorkoutEntry) => {
    setEditingWorkout(entry);
    setShowWorkoutForm(true);
  };

  const handleDeleteFood = (id: string) => {
    if (window.confirm('Are you sure you want to delete this food entry?')) {
      deleteFoodEntry(id);
      loadEntriesForDate(currentDate);
    }
  };

  const handleDeleteWorkout = (id: string) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      deleteWorkoutEntry(id);
      loadEntriesForDate(currentDate);
    }
  };

  const handleAddFood = () => {
    setEditingFood(null);
    setShowFoodForm(true);
  };

  const handleAddWorkout = () => {
    setEditingWorkout(null);
    setShowWorkoutForm(true);
  };

  const handleCancelForm = () => {
    setShowFoodForm(false);
    setShowWorkoutForm(false);
    setEditingFood(null);
    setEditingWorkout(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="flex-between">
          <h1 style={{ margin: 0 }}>
            <Calendar size={24} style={{ marginRight: '12px' }} />
            Health Tracker
          </h1>
          <div className="flex">
            <button
              onClick={() => handleDateChange('prev')}
              className="btn btn-secondary"
              style={{ padding: '8px' }}
            >
              <ChevronLeft size={16} />
            </button>
            <div style={{ 
              padding: '8px 16px', 
              display: 'flex', 
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              {format(new Date(currentDate), 'MMM d, yyyy')}
            </div>
            <button
              onClick={() => handleDateChange('next')}
              className="btn btn-secondary"
              style={{ padding: '8px' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {showFoodForm ? (
        <FoodEntryForm
          onSubmit={handleFoodSubmit}
          onCancel={handleCancelForm}
          initialData={editingFood || undefined}
          date={currentDate}
        />
      ) : showWorkoutForm ? (
        <WorkoutEntryForm
          onSubmit={handleWorkoutSubmit}
          onCancel={handleCancelForm}
          initialData={editingWorkout || undefined}
          date={currentDate}
        />
      ) : (
        <DailyView
          date={currentDate}
          foodEntries={foodEntries}
          workoutEntries={workoutEntries}
          onEditFood={handleEditFood}
          onDeleteFood={handleDeleteFood}
          onEditWorkout={handleEditWorkout}
          onDeleteWorkout={handleDeleteWorkout}
          onAddFood={handleAddFood}
          onAddWorkout={handleAddWorkout}
        />
      )}

      {/* Quick Add Buttons */}
      {!showFoodForm && !showWorkoutForm && (
        <div className="container">
          <div className="flex" style={{ gap: '12px', justifyContent: 'center' }}>
            <button onClick={handleAddFood} className="btn">
              <Plus size={16} style={{ marginRight: '8px' }} />
              Quick Add Food
            </button>
            <button onClick={handleAddWorkout} className="btn">
              <Plus size={16} style={{ marginRight: '8px' }} />
              Quick Add Workout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App; 