import React, { useState } from 'react';
import { FoodEntry, WorkoutEntry, DailyStats } from '../types';
import { format } from 'date-fns';
import { Utensils, Dumbbell, Edit, Trash2, Plus } from 'lucide-react';

interface DailyViewProps {
  date: string;
  foodEntries: FoodEntry[];
  workoutEntries: WorkoutEntry[];
  onEditFood: (entry: FoodEntry) => void;
  onDeleteFood: (id: string) => void;
  onEditWorkout: (entry: WorkoutEntry) => void;
  onDeleteWorkout: (id: string) => void;
  onAddFood: () => void;
  onAddWorkout: () => void;
}

const DailyView: React.FC<DailyViewProps> = ({
  date,
  foodEntries,
  workoutEntries,
  onEditFood,
  onDeleteFood,
  onEditWorkout,
  onDeleteWorkout,
  onAddFood,
  onAddWorkout
}) => {
  const [activeTab, setActiveTab] = useState<'food' | 'workout'>('food');

  const calculateDailyStats = (): DailyStats => {
    const totalCalories = foodEntries.reduce((sum, entry) => sum + entry.calories, 0);
    const totalProtein = foodEntries.reduce((sum, entry) => sum + entry.protein, 0);
    const totalCarbs = foodEntries.reduce((sum, entry) => sum + entry.carbs, 0);
    const totalFat = foodEntries.reduce((sum, entry) => sum + entry.fat, 0);

    return {
      date,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      workouts: workoutEntries,
      foodEntries
    };
  };

  const stats = calculateDailyStats();

  const groupFoodByMeal = () => {
    const grouped: Record<string, FoodEntry[]> = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: []
    };

    foodEntries.forEach(entry => {
      grouped[entry.meal].push(entry);
    });

    return grouped;
  };

  const mealGroups = groupFoodByMeal();

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-center mb-4">
          {format(new Date(date), 'EEEE, MMMM d, yyyy')}
        </h2>

        {/* Daily Summary */}
        <div className="card mb-4">
          <h3>Daily Summary</h3>
          <div className="grid">
            <div className="text-center">
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
                {stats.totalCalories}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Calories</div>
            </div>
            <div className="text-center">
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                {stats.totalProtein.toFixed(1)}g
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Protein</div>
            </div>
            <div className="text-center">
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
                {stats.totalCarbs.toFixed(1)}g
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Carbs</div>
            </div>
            <div className="text-center">
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>
                {stats.totalFat.toFixed(1)}g
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Fat</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-4">
          <button
            className={`btn ${activeTab === 'food' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('food')}
            style={{ flex: 1, marginRight: '8px' }}
          >
            <Utensils size={16} style={{ marginRight: '8px' }} />
            Food ({foodEntries.length})
          </button>
          <button
            className={`btn ${activeTab === 'workout' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('workout')}
            style={{ flex: 1, marginLeft: '8px' }}
          >
            <Dumbbell size={16} style={{ marginRight: '8px' }} />
            Workouts ({workoutEntries.length})
          </button>
        </div>

        {/* Food Tab */}
        {activeTab === 'food' && (
          <div>
            <div className="flex-between mb-4">
              <h3>Food Entries</h3>
              <button onClick={onAddFood} className="btn">
                <Plus size={16} />
                Add Food
              </button>
            </div>

            {foodEntries.length === 0 ? (
              <div className="card text-center">
                <p>No food entries for today. Add your first meal!</p>
              </div>
            ) : (
              Object.entries(mealGroups).map(([meal, entries]) => (
                entries.length > 0 && (
                  <div key={meal} className="card mb-4">
                    <h4 style={{ textTransform: 'capitalize', marginBottom: '16px' }}>
                      {meal}
                    </h4>
                    {entries.map(entry => (
                      <div key={entry.id} className="card" style={{ marginBottom: '12px' }}>
                        <div className="flex-between">
                          <div>
                            <h5>{entry.name}</h5>
                            <div className="flex" style={{ gap: '16px', fontSize: '14px', color: '#666' }}>
                              <span>{entry.calories} cal</span>
                              <span>{entry.protein}g protein</span>
                              <span>{entry.carbs}g carbs</span>
                              <span>{entry.fat}g fat</span>
                            </div>
                            {entry.notes && (
                              <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                                {entry.notes}
                              </p>
                            )}
                          </div>
                          <div className="flex">
                            <button
                              onClick={() => onEditFood(entry)}
                              className="btn btn-secondary"
                              style={{ padding: '8px', marginRight: '8px' }}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => onDeleteFood(entry.id)}
                              className="btn btn-danger"
                              style={{ padding: '8px' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ))
            )}
          </div>
        )}

        {/* Workout Tab */}
        {activeTab === 'workout' && (
          <div>
            <div className="flex-between mb-4">
              <h3>Workout Entries</h3>
              <button onClick={onAddWorkout} className="btn">
                <Plus size={16} />
                Add Workout
              </button>
            </div>

            {workoutEntries.length === 0 ? (
              <div className="card text-center">
                <p>No workouts for today. Time to hit the gym!</p>
              </div>
            ) : (
              workoutEntries.map(entry => (
                <div key={entry.id} className="card mb-4">
                  <div className="flex-between mb-4">
                    <div>
                      <h4>Workout</h4>
                      <p style={{ color: '#666' }}>
                        Duration: {entry.duration} minutes
                      </p>
                    </div>
                    <div className="flex">
                      <button
                        onClick={() => onEditWorkout(entry)}
                        className="btn btn-secondary"
                        style={{ padding: '8px', marginRight: '8px' }}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => onDeleteWorkout(entry.id)}
                        className="btn btn-danger"
                        style={{ padding: '8px' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {entry.exercises.map(exercise => (
                    <div key={exercise.id} style={{ marginBottom: '16px' }}>
                      <h5>{exercise.name}</h5>
                      <div>
                        {exercise.sets.map((set, index) => (
                          <div key={index} className="flex" style={{ marginBottom: '4px' }}>
                            <span style={{ minWidth: '60px' }}>Set {index + 1}:</span>
                            <span>{set.reps} × {set.weight} lbs</span>
                            {set.completed && (
                              <span className="badge badge-success" style={{ marginLeft: '8px' }}>
                                ✓
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {entry.notes && (
                    <p style={{ fontSize: '14px', color: '#666', marginTop: '16px' }}>
                      <strong>Notes:</strong> {entry.notes}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyView; 