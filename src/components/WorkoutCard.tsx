import { Link } from "react-router-dom";
import type { WorkoutContent } from "../types/workout";
import { getSportColorForWorkout } from "../utils/sportUtils";

interface WorkoutCardProps {
  workout: WorkoutContent;
  showTags?: boolean;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const getSportIcon = (sportType: string) => {
    const icons: Record<string, string> = {
      Cycling: "🚴",
      Running: "🏃",
      Swimming: "🏊",
      Yoga: "🧘",
      "Strength Training": "💪",
      "Mental Training": "🧠",
    };
    return icons[sportType] || "🏃‍♂️";
  };

  return (
    <Link to={`/workout/${workout.id}`} className="group block">
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 duration-200 transition-all">
        <div
          className={`h-32 bg-gradient-to-br ${getSportColorForWorkout(
            workout.sportType
          )} flex items-center justify-center`}
        >
          <span className="text-4xl">{getSportIcon(workout.sportType)}</span>
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold mb-2 line-clamp-1">
            {workout.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span className="p-1 px-2 rounded-full bg-blue-600 text-white flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
              </svg>
              {workout.duration}m
            </span>
            <span className="capitalize">{workout.difficulty}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
