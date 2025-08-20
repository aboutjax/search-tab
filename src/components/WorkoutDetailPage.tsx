import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { allWorkouts } from "../data/workoutData";

const WorkoutDetailPage = () => {
  const { workoutId } = useParams<{ workoutId: string }>();

  const workout = useMemo(() => {
    return allWorkouts.find((w) => w.id === workoutId);
  }, [workoutId]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500";
      case "Intermediate":
        return "bg-yellow-500";
      case "Advanced":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSportIcon = (sport: string) => {
    const icons: Record<string, string> = {
      Cycling: "🚴",
      Running: "🏃",
      Swimming: "🏊",
      Yoga: "🧘",
      "Strength Training": "💪",
      "Mental Training": "🧠",
    };
    return icons[sport] || "🏃";
  };

  if (!workout) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Workout Not Found
          </h1>
          <Link to="/" className="text-red-500 hover:text-red-400">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src={workout.thumbnail}
          alt={workout.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Link
            to={`/sport/${workout.sportType.toLowerCase().replace(" ", "-")}`}
            className="flex items-center text-white hover:text-red-400 transition-colors"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to {workout.sportType}
          </Link>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-4">
                {getSportIcon(workout.sportType)}
              </span>
              <span
                className={`px-3 py-1 text-sm font-medium text-white rounded ${getDifficultyColor(
                  workout.difficulty
                )}`}
              >
                {workout.difficulty}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {workout.title}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              {workout.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Left Column - Details */}
          <div className="">
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Workout Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Duration
                  </h3>
                  <div className="flex items-center text-gray-300">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {workout.duration} minutes
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Sport Type
                  </h3>
                  <div className="flex items-center text-gray-300">
                    <span className="text-xl mr-2">
                      {getSportIcon(workout.sportType)}
                    </span>
                    {workout.sportType}
                  </div>
                </div>

                {workout.collection && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Collection
                    </h3>
                    <div className="text-gray-300">{workout.collection}</div>
                  </div>
                )}
              </div>

              {/* Tags */}
              {workout.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {workout.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Start Workout Button */}
            <div className="bg-gray-800 rounded-lg p-6">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full transition-colors duration-300 text-lg">
                Start Workout
              </button>
              <p className="text-gray-400 text-center mt-2 text-sm">
                This will begin your {workout.duration}-minute{" "}
                {workout.sportType.toLowerCase()} session
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailPage;
