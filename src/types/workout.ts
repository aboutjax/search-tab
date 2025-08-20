export type SportType = 'Cycling' | 'Running' | 'Swimming' | 'Mental Training' | 'Strength Training' | 'Yoga';

export interface WorkoutContent {
    id: string;
    title: string;
    description: string;
    duration: number; // in minutes
    sportType: SportType;
    tags: string[];
    collection?: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    thumbnail?: string;
    isPopular: boolean;
    isNewRelease: boolean;
}

export interface TagCategory {
    name: string;
    displayName: string;
    workouts: WorkoutContent[];
}

export interface DurationCategory {
    name: string;
    displayName: string;
    minDuration: number;
    maxDuration?: number;
    workouts: WorkoutContent[];
}

export interface CollectionCategory {
    name: string;
    displayName: string;
    workouts: WorkoutContent[];
}
