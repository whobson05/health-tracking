# Health Tracker

A modern web application for tracking your daily eating and lifting habits. Built with React, TypeScript, and local storage for data persistence.

## Features

### Food Tracking
- **Daily Nutrition Logging**: Track calories, protein, carbs, and fat for each meal
- **Meal Organization**: Categorize entries by breakfast, lunch, dinner, or snack
- **Detailed Notes**: Add notes to each food entry for better tracking
- **Edit & Delete**: Modify or remove entries as needed

### Workout Tracking
- **Exercise Management**: Add multiple exercises per workout
- **Set Tracking**: Log reps, weight, and completion status for each set
- **Workout Duration**: Track total workout time
- **Progress Notes**: Add notes about your workout session

### Daily Overview
- **Nutrition Summary**: View daily totals for calories and macronutrients
- **Workout Summary**: See all exercises and sets for the day
- **Date Navigation**: Easily switch between different days
- **Visual Statistics**: Color-coded nutrition breakdown

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd health-tracking
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Usage

### Adding Food Entries
1. Click "Quick Add Food" or navigate to the Food tab
2. Fill in the food name, select the meal type
3. Enter nutritional information (calories, protein, carbs, fat)
4. Add optional notes
5. Click "Add Entry"

### Adding Workout Entries
1. Click "Quick Add Workout" or navigate to the Workout tab
2. Enter workout duration
3. Add exercises with their respective sets
4. For each set, specify reps, weight, and mark completion
5. Add optional workout notes
6. Click "Add Workout"

### Navigating Between Days
- Use the arrow buttons in the header to move between days
- The app automatically loads entries for the selected date

### Managing Entries
- Click the edit icon (pencil) to modify an entry
- Click the delete icon (trash) to remove an entry
- Confirm deletion when prompted

## Data Storage

All data is stored locally in your browser's localStorage. This means:
- Your data stays private and local to your device
- No account creation or internet connection required
- Data persists between browser sessions
- Clearing browser data will remove your entries

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety and better development experience
- **date-fns** - Date manipulation utilities
- **lucide-react** - Modern icon library
- **CSS3** - Custom styling with modern design patterns

## Project Structure

```
src/
├── components/          # React components
│   ├── FoodEntryForm.tsx
│   ├── WorkoutEntryForm.tsx
│   └── DailyView.tsx
├── types.ts            # TypeScript type definitions
├── utils/
│   └── storage.ts      # Local storage utilities
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── index.css           # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on the repository.
