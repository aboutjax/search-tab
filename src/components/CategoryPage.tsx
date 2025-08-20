import { Link, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import type { SportType } from "../types/workout";
import { getWorkoutsBySportType } from "../data/workoutData";
import WorkoutCard from "./WorkoutCard";
import { motion, AnimatePresence } from "motion/react";

interface CategoryPageProps {
  category: string;
}

const CategoryPage = ({ category }: CategoryPageProps) => {
  const { sportType, durationType, collectionType } = useParams<{
    sportType: string;
    durationType?: string;
    collectionType?: string;
  }>();

  // Filter states
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [isDurationOpen, setIsDurationOpen] = useState(false);

  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);

  // Convert URL param to SportType
  const sportTypeEnum = useMemo(() => {
    const mapping: Record<string, SportType> = {
      cycling: "Cycling",
      running: "Running",
      swimming: "Swimming",
      yoga: "Yoga",
      "strength-training": "Strength Training",
      "mental-training": "Mental Training",
    };
    return mapping[sportType || ""] || "Cycling";
  }, [sportType]);

  const allWorkouts = useMemo(
    () => getWorkoutsBySportType(sportTypeEnum),
    [sportTypeEnum]
  );

  // Get unique tags and difficulties for this sport
  const availableTags = useMemo(() => {
    const allTags = allWorkouts.flatMap((w) => w.tags);
    return [...new Set(allTags)];
  }, [allWorkouts]);

  const availableDifficulties = useMemo(() => {
    const allDifficulties = allWorkouts.map((w) => w.difficulty);
    return [...new Set(allDifficulties)];
  }, [allWorkouts]);

  // Filter workouts based on category, subcategory, and user filters
  const filteredWorkouts = useMemo(() => {
    let workouts = allWorkouts;

    // First apply the main category filter
    switch (category) {
      case "all":
        workouts = allWorkouts;
        break;
      case "new":
        workouts = allWorkouts.slice(0, 20);
        break;
      case "personalized": {
        workouts = allWorkouts.sort(() => 0.5 - Math.random()).slice(0, 25);
        break;
      }
      case "popular": {
        const popularWorkouts = allWorkouts.filter(
          (w) => w.tags.includes("Popular") || w.collection?.includes("Popular")
        );
        workouts =
          popularWorkouts.length > 0
            ? popularWorkouts
            : allWorkouts.slice(0, 30);
        break;
      }
      case "duration": {
        if (durationType) {
          switch (durationType) {
            case "short":
              workouts = allWorkouts.filter((w) => w.duration === 15);
              break;
            case "short-medium":
              workouts = allWorkouts.filter(
                (w) => w.duration >= 15 && w.duration <= 30
              );
              break;
            case "medium":
              workouts = allWorkouts.filter(
                (w) => w.duration >= 30 && w.duration <= 45
              );
              break;
            case "long":
              workouts = allWorkouts.filter(
                (w) => w.duration >= 45 && w.duration <= 60
              );
              break;
            case "extended":
              workouts = allWorkouts.filter((w) => w.duration > 60);
              break;
            default:
              workouts = allWorkouts;
          }
        }
        break;
      }
      case "collection": {
        if (collectionType) {
          workouts = allWorkouts.filter(
            (w) =>
              w.collection?.toLowerCase().replace(/\s+/g, "-") ===
              collectionType
          );
        }
        break;
      }
      default:
        workouts = allWorkouts;
    }

    // Then apply user filters
    if (selectedDuration) {
      switch (selectedDuration) {
        case "15m":
          workouts = workouts.filter((w) => w.duration === 15);
          break;
        case "15-30m":
          workouts = workouts.filter(
            (w) => w.duration >= 15 && w.duration <= 30
          );
          break;
        case "30-45m":
          workouts = workouts.filter(
            (w) => w.duration >= 30 && w.duration <= 45
          );
          break;
        case "45-60m":
          workouts = workouts.filter(
            (w) => w.duration >= 45 && w.duration <= 60
          );
          break;
        case "More than 60m":
          workouts = workouts.filter((w) => w.duration > 60);
          break;
      }
    }

    if (selectedCategory && selectedCategory !== "All") {
      switch (selectedCategory) {
        case "New Releases":
          workouts = workouts.slice(0, 20);
          break;
        case "Popular": {
          const popularWorkouts = workouts.filter(
            (w) =>
              w.tags.includes("Popular") || w.collection?.includes("Popular")
          );
          workouts =
            popularWorkouts.length > 0
              ? popularWorkouts
              : workouts.slice(0, 30);
          break;
        }
      }
    }

    if (selectedTags.length > 0) {
      workouts = workouts.filter((w) =>
        selectedTags.some((tag) => w.tags.includes(tag))
      );
    }

    if (selectedDifficulty) {
      workouts = workouts.filter((w) => w.difficulty === selectedDifficulty);
    }

    return workouts;
  }, [
    allWorkouts,
    category,
    durationType,
    collectionType,
    selectedDuration,
    selectedCategory,
    selectedTags,
    selectedDifficulty,
  ]);

  const getCategoryTitle = () => {
    switch (category) {
      case "all":
        return `All ${sportTypeEnum} Workouts`;
      case "new":
        return "New Releases";
      case "personalized":
        return "Tailored to You";
      case "popular":
        return "Popular Workouts";
      case "duration":
        if (durationType) {
          const durationNames: Record<string, string> = {
            short: "15m Workouts",
            "short-medium": "15-30m Workouts",
            medium: "30-45m Workouts",
            long: "45-60m Workouts",
            extended: "60m+ Workouts",
          };
          return durationNames[durationType] || "Duration Workouts";
        }
        return "Duration Workouts";
      case "collection":
        if (collectionType) {
          const decodedCollection = collectionType.replace(/-/g, " ");
          return `${decodedCollection} Collection`;
        }
        return "Collection Workouts";
      default:
        return "Workouts";
    }
  };

  const getCategoryDescription = () => {
    switch (category) {
      case "all":
        return `${
          filteredWorkouts.length
        } ${sportTypeEnum.toLowerCase()} workouts available`;
      case "new":
        return "Latest workouts and fresh content";
      case "personalized":
        return "Workouts selected just for you";
      case "popular":
        return "Most viewed and trending workouts";
      case "duration":
        if (durationType) {
          return `${filteredWorkouts.length} workouts in this duration range`;
        }
        return "Browse workouts by duration";
      case "collection":
        if (collectionType) {
          return `${filteredWorkouts.length} workouts in this collection`;
        }
        return "Browse workouts by collection";
      default:
        return "Browse and discover workouts";
    }
  };

  const getSportIcon = (sport: SportType) => {
    const icons: Record<SportType, string> = {
      Cycling: "🚴",
      Running: "🏃",
      Swimming: "🏊",
      Yoga: "🧘",
      "Strength Training": "💪",
      "Mental Training": "🧠",
    };
    return icons[sport];
  };

  const getSportColor = (sport: SportType) => {
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

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedDuration("");
    setSelectedCategory("");
    setSelectedTags([]);
    setSelectedDifficulty("");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation for back to sport page */}
      <div className="flex justify-start p-4">
        <Link
          to={`/sport/${sportType}`}
          className="text-white flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to {sportTypeEnum}
        </Link>
      </div>

      {/* Category Header */}
      <div
        className={`relative h-64 bg-gradient-to-r ${getSportColor(
          sportTypeEnum
        )}`}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-6xl mb-4">{getSportIcon(sportTypeEnum)}</div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              {getCategoryTitle()}
            </h1>
            <p className="text-lg text-gray-100">{getCategoryDescription()}</p>
          </div>
        </div>
      </div>

      {/* filters for content cards below */}
      <div className="container mx-auto overflow-x-clip overflow-y-visible scrollbar-hide">
        <div className="flex flex-row shrink-0 p-6">
          {/* Clear All button - only show when filters have changed */}
          <AnimatePresence mode="sync">
            {(selectedDuration ||
              selectedCategory ||
              selectedTags.length > 0 ||
              selectedDifficulty) && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, scale: 1, x: 0, width: 56 }}
                exit={{ opacity: 0, scale: 0, x: -20, width: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="shrink-0"
              >
                <button
                  onClick={clearAllFilters}
                  className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-full transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters container */}
          <div className="flex flex-row gap-4 overflow-visible">
            <div className="relative shrink-0">
              <div className="relative">
                <button
                  onClick={() => setIsDurationOpen(!isDurationOpen)}
                  className={`w-full shrink-0 min-w-24 px-4 py-2 rounded-full transition-colors duration-300 flex justify-between items-center ${
                    selectedDuration
                      ? "bg-gray-700  text-white"
                      : "border-gray-600 border hover:bg-gray-600 text-white"
                  }`}
                >
                  {selectedDuration || "All Duration"}
                  <svg
                    className="w-6 h-6 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDurationOpen && (
                  <div className="absolute min-w-[320px] z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                    {[
                      "All duration",
                      "15m",
                      "15-30m",
                      "30-45m",
                      "45-60m",
                      "More than 60m",
                    ].map((duration) => (
                      <button
                        key={duration}
                        onClick={() => {
                          if (duration === "All duration") {
                            setSelectedDuration("");
                          } else {
                            setSelectedDuration(
                              duration === selectedDuration ? "" : duration
                            );
                          }
                          setIsDurationOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors duration-200 ${
                          selectedDuration === duration
                            ? "bg-gray-700  text-white"
                            : "text-gray-300"
                        }`}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tags Filter */}
            <div className="relative shrink-0">
              <div className="relative">
                <button
                  onClick={() => setIsTagsOpen(!isTagsOpen)}
                  className={`w-full px-4 py-2 rounded-full transition-colors duration-300 flex justify-between items-center ${
                    selectedTags.length > 0
                      ? "bg-gray-700  text-white"
                      : "border-gray-600 border hover:bg-gray-600 text-white"
                  }`}
                >
                  {selectedTags.length > 0
                    ? `${selectedTags.length} selected`
                    : "All Tags"}
                  <svg
                    className="w-6 h-6 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isTagsOpen && (
                  <div className="absolute min-w-[320px] z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-48 overflow-y-auto">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          handleTagToggle(tag);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors duration-200 text-gray-300 flex items-center gap-3 ${
                          selectedTags.includes(tag)
                            ? "bg-gray-700  text-white"
                            : "text-gray-300"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                            selectedTags.includes(tag)
                              ? "bg-white"
                              : "border-gray-400"
                          }`}
                        >
                          {selectedTags.includes(tag) && (
                            <svg
                              className="w-3 h-3 text-black"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="relative shrink-0">
              <div className="relative">
                <button
                  onClick={() => setIsDifficultyOpen(!isDifficultyOpen)}
                  className={`w-full px-4 py-2 rounded-full transition-colors duration-300 flex justify-between items-center ${
                    selectedDifficulty
                      ? "bg-gray-700  text-white"
                      : "border-gray-600 border hover:bg-gray-600 text-white"
                  }`}
                >
                  {selectedDifficulty || "Select Difficulty"}
                  <svg
                    className="w-6 h-6 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDifficultyOpen && (
                  <div className="absolute min-w-[320px] z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                    {availableDifficulties.map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => {
                          setSelectedDifficulty(
                            difficulty === selectedDifficulty ? "" : difficulty
                          );
                          setIsDifficultyOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors duration-200 ${
                          selectedDifficulty === difficulty
                            ? "bg-gray-700  text-white"
                            : "text-gray-300"
                        }`}
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workouts Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              No Workouts Found
            </h2>
            <p className="text-gray-400 mb-6">
              We couldn't find any workouts matching your filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 mr-4"
            >
              Clear Filters
            </button>
            <Link
              to={`/sport/${sportType}`}
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Back to {sportTypeEnum}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
