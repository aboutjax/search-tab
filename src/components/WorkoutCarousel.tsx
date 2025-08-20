import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { WorkoutContent } from "../types/workout";
import WorkoutCard from "./WorkoutCard";

interface WorkoutCarouselProps {
  title: string;
  description?: string;
  linkTo?: string;
  linkText?: string;
  workouts: WorkoutContent[];
  maxItems?: number;
  showLink?: boolean;
}

const WorkoutCarousel = ({
  title,
  description,
  linkTo,
  workouts,
  maxItems = 10,
}: WorkoutCarouselProps) => {
  const displayWorkouts = workouts.slice(0, maxItems);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position to enable/disable buttons
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll left/right functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Check scroll position on mount and after scroll
  useEffect(() => {
    checkScrollPosition();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      return () =>
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
    }
  }, [workouts]);

  return (
    <div className="mb-24">
      <div className="flex items-center justify-between mb-0">
        <div className="flex flex-col">
          {linkTo && (
            <Link
              to={linkTo}
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm  pr-6"
            >
              <div className="px-6 flex items-center gap-1 mb-1">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
                </svg>
              </div>
            </Link>
          )}
          {description && (
            <p className="px-6 text-base text-white opacity-50">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="w-full relative">
        {/* Left Chevron Button */}
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center transition-all duration-200 ${
            canScrollLeft
              ? "opacity-100 visible hover:scale-110"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <svg
            className="w-5 h-5"
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
        </button>

        {/* Right Chevron Button */}
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center transition-all duration-200 ${
            canScrollRight
              ? "opacity-100 visible hover:scale-110"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <svg
            className="w-5 h-5"
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
        </button>

        {/* Left Gradient Fade */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-5 transition-opacity duration-300 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Right Gradient Fade */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-5 transition-opacity duration-300 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className="flex w-full snap-x scroll-pl-6 gap-6 overflow-x-auto py-3 scrollbar-hide"
          ref={scrollContainerRef}
        >
          {displayWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="flex-shrink-0 w-64 snap-start first:pl-6 last:pr-6"
            >
              <WorkoutCard workout={workout} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutCarousel;
