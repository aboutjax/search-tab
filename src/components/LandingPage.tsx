import { Link } from "react-router-dom";
import type { SportType } from "../types/workout";

const sportTypes: {
  type: SportType;
  name: string;
  description: string;
  color: string;
  icon: string;
}[] = [
  {
    type: "Cycling",
    name: "Cycling",
    description: "Road, mountain, and indoor cycling workouts",
    color: "from-blue-500 to-cyan-500",
    icon: "🚴",
  },
  {
    type: "Running",
    name: "Running",
    description: "Trail, road, and track running sessions",
    color: "from-green-500 to-emerald-500",
    icon: "🏃",
  },
  {
    type: "Swimming",
    name: "Swimming",
    description: "Pool and open water swimming workouts",
    color: "from-cyan-500 to-blue-600",
    icon: "🏊",
  },
  {
    type: "Yoga",
    name: "Yoga",
    description: "Vinyasa, Hatha, and restorative yoga flows",
    color: "from-purple-500 to-pink-500",
    icon: "🧘",
  },
  {
    type: "Strength Training",
    name: "Strength Training",
    description: "Weight training and bodyweight exercises",
    color: "from-orange-500 to-red-500",
    icon: "💪",
  },
  {
    type: "Mental Training",
    name: "Mental Training",
    description: "Meditation and mindfulness practices",
    color: "from-indigo-500 to-purple-600",
    icon: "🧠",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <h1 className="p-4 text-4xl font-bold text-white mb-4">Workouts</h1>

      {/* Sport Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sportTypes.map((sport) => (
            <Link
              key={sport.type}
              to={`/sport/${sport.type.toLowerCase().replace(" ", "-")}`}
              className="group block"
            >
              <div
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${sport.color} p-8 h-64 transition-transform duration-300 group-hover:scale-105`}
              >
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="text-6xl mb-4">{sport.icon}</div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {sport.name}
                    </h3>
                    <p className="text-gray-100 text-sm">{sport.description}</p>

                    <div className="mt-4 flex items-center text-white">
                      <span className="text-sm font-medium">100+ Workouts</span>
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
