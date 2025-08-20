import type { WorkoutContent, SportType } from '../types/workout';

// Helper function to generate random workouts
const generateWorkouts = (
    sportType: SportType,
    count: number,
    tags: string[],
    collections: string[]
): WorkoutContent[] => {
    const workouts: WorkoutContent[] = [];

    const workoutTitles = [
        'Morning Power Session', 'Endurance Builder', 'Speed Intervals', 'Recovery Ride',
        'Hill Climbing', 'Sprint Training', 'Long Distance', 'Tempo Workout',
        'Strength Building', 'Flexibility Flow', 'Cardio Blast', 'Mindful Movement',
        'High Intensity', 'Low Impact', 'Core Focus', 'Full Body Burn',
        'Upper Body', 'Lower Body', 'Balance Training', 'Agility Work'
    ];

    const descriptions = [
        'Perfect for building endurance and stamina',
        'High-intensity intervals to boost your performance',
        'Recovery-focused session to help you bounce back',
        'Strength-building workout for power and stability',
        'Mindful movement to improve flexibility and balance',
        'Cardio-focused session to boost your heart health',
        'Core-strengthening exercises for better stability',
        'Full-body workout to target all major muscle groups'
    ];

    for (let i = 0; i < count; i++) {
        const duration = Math.floor(Math.random() * 90) + 15; // 15-105 minutes
        const randomTags = tags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 1);
        const randomCollection = collections[Math.floor(Math.random() * collections.length)];
        const randomTitle = workoutTitles[Math.floor(Math.random() * workoutTitles.length)];
        const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
        const difficulty = ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)] as 'Beginner' | 'Intermediate' | 'Advanced';

        // New releases are the first 15% of workouts for each sport type
        const isNewRelease = i < Math.floor(count * 0.15);

        // Popular workouts have a 20% chance, with some overlap with new releases
        const isPopular = Math.random() < 0.2 || (isNewRelease && Math.random() < 0.3);

        workouts.push({
            id: `${sportType.toLowerCase()}-${i + 1}`,
            title: `${randomTitle} ${i + 1}`,
            description: randomDescription,
            duration,
            sportType,
            tags: randomTags,
            collection: randomCollection,
            difficulty,
            thumbnail: `https://picsum.photos/200/300?grayscale`,
            isPopular,
            isNewRelease
        });
    }

    return workouts;
};

// Sport-specific data
const cyclingData = {
    tags: ['Endurance', 'Sprint', 'Hill Climbing', 'Recovery', 'Tempo', 'Intervals', 'Long Distance', 'Power', 'Speed', 'Strength'],
    collections: ['From Sufferfest', 'A Week With', 'Pro Rides', 'Inspirational', 'NoVid', 'Fitness Tests']
};

const runningData = {
    tags: ['5K', '10K', 'Half Marathon', 'Marathon', 'Sprint', 'Endurance', 'Recovery', 'Speed Work', 'Hill Training', 'Trail Running'],
    collections: ['Couch to 5K', 'Marathon Prep', 'Speed Training', 'Trail Adventures', 'Recovery Runs']
};

const swimmingData = {
    tags: ['Freestyle', 'Breaststroke', 'Butterfly', 'Backstroke', 'Endurance', 'Sprint', 'Recovery', 'Technique', 'Open Water', 'Pool Training'],
    collections: ['Swim Technique', 'Open Water Prep', 'Triathlon Training', 'Speed Development', 'Recovery Swims']
};

const yogaData = {
    tags: ['Vinyasa', 'Hatha', 'Ashtanga', 'Yin', 'Power', 'Restorative', 'Meditation', 'Flexibility', 'Strength', 'Balance'],
    collections: ['Morning Flow', 'Evening Relaxation', 'Power Yoga', 'Gentle Stretching', 'Meditation Series']
};

const strengthData = {
    tags: ['Upper Body', 'Lower Body', 'Core', 'Full Body', 'Powerlifting', 'Bodyweight', 'Resistance', 'Functional', 'Isolation', 'Compound'],
    collections: ['Beginner Strength', 'Powerlifting Program', 'Bodyweight Only', 'Functional Fitness', 'Core Focus']
};

const mentalData = {
    tags: ['Meditation', 'Mindfulness', 'Breathing', 'Visualization', 'Stress Relief', 'Focus', 'Relaxation', 'Anxiety Relief', 'Sleep', 'Confidence'],
    collections: ['Daily Meditation', 'Stress Management', 'Sleep Better', 'Confidence Building', 'Mindful Living']
};

// Generate all workouts
export const allWorkouts: WorkoutContent[] = [
    ...generateWorkouts('Cycling', 100, cyclingData.tags, cyclingData.collections),
    ...generateWorkouts('Running', 100, runningData.tags, runningData.collections),
    ...generateWorkouts('Swimming', 100, swimmingData.tags, swimmingData.collections),
    ...generateWorkouts('Yoga', 100, yogaData.tags, yogaData.collections),
    ...generateWorkouts('Strength Training', 100, strengthData.tags, strengthData.collections),
    ...generateWorkouts('Mental Training', 100, mentalData.tags, mentalData.collections)
];

// Helper functions to get workouts by sport type
export const getWorkoutsBySportType = (sportType: SportType): WorkoutContent[] => {
    return allWorkouts.filter(workout => workout.sportType === sportType);
};

// Get all unique tags for a sport type
export const getTagsBySportType = (sportType: SportType): string[] => {
    const workouts = getWorkoutsBySportType(sportType);
    const allTags = workouts.flatMap(workout => workout.tags);
    return [...new Set(allTags)];
};

// Get all unique collections for a sport type
export const getCollectionsBySportType = (sportType: SportType): string[] => {
    const workouts = getWorkoutsBySportType(sportType);
    const allCollections = workouts.map(workout => workout.collection).filter(Boolean) as string[];
    return [...new Set(allCollections)];
};
