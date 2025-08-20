import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import type {
  SportType,
  DurationCategory,
  CollectionCategory,
} from "../types/workout";
import {
  getWorkoutsBySportType,
  getCollectionsBySportType,
} from "../data/workoutData";
import WorkoutCarousel from "./WorkoutCarousel";

const SportTypePage = () => {
  const { sportType } = useParams<{ sportType: string }>();

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

  const workouts = useMemo(
    () => getWorkoutsBySportType(sportTypeEnum),
    [sportTypeEnum]
  );
  const collections = useMemo(
    () => getCollectionsBySportType(sportTypeEnum),
    [sportTypeEnum]
  );

  // Create duration categories
  const durationCategories: DurationCategory[] = useMemo(() => {
    const categories = [
      {
        name: "short",
        displayName: "15m",
        minDuration: 15,
        maxDuration: 15,
      },
      {
        name: "short-medium",
        displayName: "15-30m",
        minDuration: 15,
        maxDuration: 30,
      },
      {
        name: "medium",
        displayName: "30-45m",
        minDuration: 30,
        maxDuration: 45,
      },
      {
        name: "long",
        displayName: "45-60m",
        minDuration: 45,
        maxDuration: 60,
      },
      {
        name: "extended",
        displayName: "More than 60m",
        minDuration: 60,
      },
    ];

    return categories.map((cat) => ({
      ...cat,
      workouts: workouts.filter(
        (w) =>
          w.duration >= cat.minDuration &&
          (!cat.maxDuration || w.duration <= cat.maxDuration)
      ),
    }));
  }, [workouts]);

  // Create collection categories
  const collectionCategories: CollectionCategory[] = useMemo(() => {
    return collections.map((collection) => ({
      name: collection.toLowerCase().replace(/\s+/g, "-"),
      displayName: collection,
      workouts: workouts.filter((w) => w.collection === collection),
    }));
  }, [collections, workouts]);

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

  // Duration navigation cards
  const durationCards = durationCategories.map((category) => ({
    title: category.displayName,
    description: `${category.workouts.length} workouts`,
    link: `/sport/${sportType}/duration/${category.name}`,
    icon: "⏱️",
    color: "from-blue-600 to-indigo-600",
    workoutCount: category.workouts.length,
  }));

  // Collection navigation cards
  const collectionCards = collectionCategories.map((category) => ({
    title: category.displayName,
    description: `${category.workouts.length} workouts`,
    link: `/sport/${sportType}/collection/${category.name}`,
    icon: "📚",
    color: "from-purple-600 to-pink-600",
    workoutCount: category.workouts.length,
  }));

  return (
    <div className="min-h-screen bg-gray-900">
      {/* navigation for back to home */}
      <div className="flex justify-start p-4">
        <Link to="/" className="text-white flex items-center gap-2">
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
          Back
        </Link>
      </div>

      {/* Hero Section */}
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
              {sportTypeEnum}
            </h1>
            <p className="text-xl text-gray-100">
              {workouts.length} workouts available
            </p>
          </div>
        </div>
      </div>

      {/* Workout Carousels Section */}
      <div className="py-8 container mx-auto">
        {/* New Releases Carousel */}
        <WorkoutCarousel
          title="New Releases"
          linkTo={`/sport/${sportType}/new`}
          workouts={workouts.filter((workout) => workout.isNewRelease)}
        />

        {/* Popular Carousel */}
        <WorkoutCarousel
          title="Popular"
          linkTo={`/sport/${sportType}/popular`}
          workouts={workouts.filter((workout) => workout.isPopular)}
        />

        {/* For You Carousel */}
        <WorkoutCarousel
          title="For you"
          description="Work on your strengths and weaknesses"
          linkTo={`/sport/${sportType}/personalized`}
          workouts={workouts.sort(() => 0.5 - Math.random())}
        />

        {/* Recently Played Carousel */}
        <WorkoutCarousel
          title="Recently Played"
          linkTo={`/sport/${sportType}/history`}
          workouts={workouts.slice(-10).reverse()}
        />
      </div>

      {/* Browse by Duration Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Browse by Duration
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
          {durationCards.map((card, index) => (
            <Link key={index} to={card.link} className="group block">
              <div
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${card.color} p-4 transition-transform duration-300 group-hover:scale-105`}
              >
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="text-2xl mb-1">{card.icon}</div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">
                      {card.title}
                    </h3>
                    <p className="text-gray-100 text-xs">{card.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Browse by Collection Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Browse by Collection
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {collectionCards.map((card, index) => (
            <Link key={index} to={card.link} className="group block">
              <div
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${card.color} p-4 transition-transform duration-300 group-hover:scale-105`}
              >
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="text-2xl mb-1">{card.icon}</div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">
                      {card.title}
                    </h3>
                    <p className="text-gray-100 text-xs">{card.description}</p>
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

export default SportTypePage;
