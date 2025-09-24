import React, { useState, useEffect } from 'react';
import { WorkoutEntry, Exercise, Set } from '../types';
import { Plus, X, Trash2 } from 'lucide-react';

interface WorkoutEntryFormProps {
  onSubmit: (entry: WorkoutEntry) => void;
  onCancel: () => void;
  initialData?: WorkoutEntry;
  date: string;
}

const WorkoutEntryForm: React.FC<WorkoutEntryFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  date
}) => {
  const [formData, setFormData] = useState<Omit<WorkoutEntry, 'id' | 'date'>>({
    exercises: [],
    duration: 0,
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      const { id, date, ...rest } = initialData;
      setFormData(rest);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entry: WorkoutEntry = {
      id: initialData?.id || Date.now().toString(),
      date,
      ...formData
    };
    
    onSubmit(entry);
  };

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: [{ reps: 0, weight: 0, completed: false }]
    };
    
    setFormData(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise]
    }));
  };

  const updateExercise = (exerciseId: string, field: keyof Exercise, value: string | Set[]) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, [field]: value } : ex
      )
    }));
  };

  const removeExercise = (exerciseId: string) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== exerciseId)
    }));
  };

  const addSet = (exerciseId: string) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => 
        ex.id === exerciseId 
          ? { ...ex, sets: [...ex.sets, { reps: 0, weight: 0, completed: false }] }
          : ex
      )
    }));
  };

  const updateSet = (exerciseId: string, setIndex: number, field: keyof Set, value: number | boolean) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => 
        ex.id === exerciseId 
          ? {
              ...ex,
              sets: ex.sets.map((set, idx) => 
                idx === setIndex ? { ...set, [field]: value } : set
              )
            }
          : ex
      )
    }));
  };

  const removeSet = (exerciseId: string, setIndex: number) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => 
        ex.id === exerciseId 
          ? { ...ex, sets: ex.sets.filter((_, idx) => idx !== setIndex) }
          : ex
      )
    }));
  };

  return (
    <div className="card">
      <div className="flex-between mb-4">
        <h3>{initialData ? 'Edit Workout' : 'Add Workout'}</h3>
        <button onClick={onCancel} className="btn btn-secondary">
          <X size={16} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="duration">Duration (minutes)</label>
          <input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
            min="0"
            placeholder="0"
          />
        </div>

        <div className="form-group">
          <label>Exercises</label>
          {formData.exercises.map((exercise, exerciseIndex) => (
            <div key={exercise.id} className="card" style={{ marginBottom: '16px' }}>
              <div className="flex-between mb-4">
                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                  placeholder="Exercise name"
                  style={{ flex: 1, marginRight: '12px' }}
                />
                <button
                  type="button"
                  onClick={() => removeExercise(exercise.id)}
                  className="btn btn-danger"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex-between mb-2">
                  <strong>Sets</strong>
                  <button
                    type="button"
                    onClick={() => addSet(exercise.id)}
                    className="btn btn-secondary"
                    style={{ padding: '8px 12px', fontSize: '14px' }}
                  >
                    <Plus size={14} />
                    Add Set
                  </button>
                </div>

                {exercise.sets.map((set, setIndex) => (
                  <div key={setIndex} className="flex mb-2" style={{ gap: '8px' }}>
                    <span style={{ minWidth: '60px', lineHeight: '40px' }}>Set {setIndex + 1}:</span>
                    <input
                      type="number"
                      value={set.reps}
                      onChange={(e) => updateSet(exercise.id, setIndex, 'reps', parseInt(e.target.value) || 0)}
                      placeholder="Reps"
                      style={{ width: '80px' }}
                    />
                    <span style={{ lineHeight: '40px' }}>×</span>
                    <input
                      type="number"
                      value={set.weight}
                      onChange={(e) => updateSet(exercise.id, setIndex, 'weight', parseFloat(e.target.value) || 0)}
                      placeholder="Weight"
                      style={{ width: '80px' }}
                    />
                    <span style={{ lineHeight: '40px' }}>lbs</span>
                    <input
                      type="checkbox"
                      checked={set.completed}
                      onChange={(e) => updateSet(exercise.id, setIndex, 'completed', e.target.checked)}
                      style={{ marginLeft: '8px' }}
                    />
                    <span style={{ lineHeight: '40px', fontSize: '12px' }}>Done</span>
                    {exercise.sets.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSet(exercise.id, setIndex)}
                        className="btn btn-danger"
                        style={{ padding: '4px 8px', fontSize: '12px' }}
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addExercise}
            className="btn btn-secondary"
            style={{ width: '100%', marginBottom: '16px' }}
          >
            <Plus size={16} />
            Add Exercise
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Any additional notes about your workout..."
            rows={3}
          />
        </div>

        <div className="flex">
          <button type="submit" className="btn">
            <Plus size={16} />
            {initialData ? 'Update Workout' : 'Add Workout'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutEntryForm; 