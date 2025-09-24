import React, { useState, useEffect } from 'react';
import { FoodEntry, MealType } from '../types';
import { Plus, X } from 'lucide-react';

interface FoodEntryFormProps {
  onSubmit: (entry: FoodEntry) => void;
  onCancel: () => void;
  initialData?: FoodEntry;
  date: string;
}

const FoodEntryForm: React.FC<FoodEntryFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  date
}) => {
  const [formData, setFormData] = useState<Omit<FoodEntry, 'id' | 'date'>>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    meal: 'breakfast',
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
    
    const entry: FoodEntry = {
      id: initialData?.id || Date.now().toString(),
      date,
      ...formData
    };
    
    onSubmit(entry);
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="card">
      <div className="flex-between mb-4">
        <h3>{initialData ? 'Edit Food Entry' : 'Add Food Entry'}</h3>
        <button onClick={onCancel} className="btn btn-secondary">
          <X size={16} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Food Name *</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            placeholder="e.g., Grilled Chicken Breast"
          />
        </div>

        <div className="form-group">
          <label htmlFor="meal">Meal</label>
          <select
            id="meal"
            value={formData.meal}
            onChange={(e) => handleInputChange('meal', e.target.value as MealType)}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>

        <div className="grid">
          <div className="form-group">
            <label htmlFor="calories">Calories</label>
            <input
              id="calories"
              type="number"
              value={formData.calories}
              onChange={(e) => handleInputChange('calories', parseInt(e.target.value) || 0)}
              min="0"
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="protein">Protein (g)</label>
            <input
              id="protein"
              type="number"
              value={formData.protein}
              onChange={(e) => handleInputChange('protein', parseFloat(e.target.value) || 0)}
              min="0"
              step="0.1"
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="carbs">Carbs (g)</label>
            <input
              id="carbs"
              type="number"
              value={formData.carbs}
              onChange={(e) => handleInputChange('carbs', parseFloat(e.target.value) || 0)}
              min="0"
              step="0.1"
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fat">Fat (g)</label>
            <input
              id="fat"
              type="number"
              value={formData.fat}
              onChange={(e) => handleInputChange('fat', parseFloat(e.target.value) || 0)}
              min="0"
              step="0.1"
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Any additional notes..."
            rows={3}
          />
        </div>

        <div className="flex">
          <button type="submit" className="btn">
            <Plus size={16} />
            {initialData ? 'Update Entry' : 'Add Entry'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodEntryForm; 