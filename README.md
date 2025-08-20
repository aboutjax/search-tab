# WorkoutHub - Netflix-Style Workout Library

A modern, responsive workout library application built with React, TypeScript,
and Tailwind CSS. Browse workouts across 6 different sports with a
Netflix-inspired browsing experience.

## Features

### 🏃‍♂️ **6 Sport Categories**

- **Cycling** - Road, mountain, and indoor cycling workouts
- **Running** - Trail, road, and track running sessions
- **Swimming** - Pool and open water swimming workouts
- **Yoga** - Vinyasa, Hatha, and restorative yoga flows
- **Strength Training** - Weight training and bodyweight exercises
- **Mental Training** - Meditation and mindfulness practices

### 🎯 **Netflix-Style Browsing**

- **Browse by Duration**: 15 min, 30-45 min, 45-60 min, 60+ min
- **Browse by Collections**: Curated workout series from top instructors
- **Browse by Tags**: Find workouts by specific attributes and styles

### 📱 **Modern UI/UX**

- Responsive design that works on all devices
- Smooth animations and hover effects
- Dark theme with Netflix-inspired styling
- Intuitive navigation and browsing experience

### 🏷️ **Rich Content**

- 100+ workouts per sport type (600+ total)
- Unlimited tags per workout
- Instructor information
- Difficulty levels (Beginner, Intermediate, Advanced)
- Duration and collection metadata

## Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd search-tab
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage.tsx      # Home page with sport categories
│   ├── SportTypePage.tsx    # Sport-specific browsing page
│   ├── WorkoutDetailPage.tsx # Individual workout details
│   ├── WorkoutCard.tsx      # Reusable workout card component
│   └── Navigation.tsx       # Main navigation header
├── types/              # TypeScript type definitions
│   └── workout.ts          # Workout-related types
├── data/               # Mock data and utilities
│   └── workoutData.ts      # Workout data generation
├── App.tsx             # Main app component with routing
└── main.tsx            # App entry point
```

## Data Structure

### Workout Content

Each workout includes:

- **ID**: Unique identifier
- **Title**: Workout name
- **Description**: Detailed description
- **Duration**: Length in minutes
- **Sport Type**: One of 6 categories
- **Tags**: Unlimited array of tags
- **Collection**: Optional series/collection
- **Difficulty**: Beginner/Intermediate/Advanced
- **Instructor**: Optional instructor name
- **Thumbnail**: Image URL

### Browsing Categories

- **Duration**: Time-based filtering
- **Collections**: Curated series from instructors
- **Tags**: Attribute-based filtering

## User Journey

1. **Landing Page** - Choose from 6 sport categories
2. **Sport Page** - Browse by duration, collections, or tags
3. **Workout Detail** - View full workout information and start session

## Customization

### Adding New Sports

1. Update `SportType` in `src/types/workout.ts`
2. Add sport data in `src/data/workoutData.ts`
3. Update navigation and routing

### Adding New Workouts

1. Modify the data generation in `src/data/workoutData.ts`
2. Add new tags, collections, or instructors as needed

### Styling

- Uses Tailwind CSS for styling
- Custom CSS in `src/index.css` for additional utilities
- Netflix-inspired dark theme with red accents

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
