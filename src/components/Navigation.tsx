import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-red-500">WorkoutHub</h1>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/"
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                Home
              </Link>
              <Link
                to="/sport/cycling"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname.startsWith("/sport/cycling")
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                Cycling
              </Link>
              <Link
                to="/sport/running"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname.startsWith("/sport/running")
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                Running
              </Link>
              <Link
                to="/sport/swimming"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname.startsWith("/sport/swimming")
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                Swimming
              </Link>
              <Link
                to="/sport/yoga"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname.startsWith("/sport/yoga")
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                Yoga
              </Link>
              <Link
                to="/sport/strength-training"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname.startsWith("/sport/strength-training")
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                Strength
              </Link>
              <Link
                to="/sport/mental-training"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname.startsWith("/sport/mental-training")
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                Mental
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
