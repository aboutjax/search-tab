import type { SportType } from "../types/workout";

export const getSportColorForWorkout = (sport: SportType) => {
    const colors: Record<SportType, string> = {
        Cycling: "from-blue-500 to-cyan-500",
        Running: "from-green-500 to-emerald-500",
        Swimming: "from-cyan-500 to-blue-600",
        Yoga: "from-purple-500 to-pink-500",
        "Strength Training": "from-orange-500 to-red-500",
        "Mental Training": "from-indigo-500 to-purple-600",
    };
    return colors[sport];
};
