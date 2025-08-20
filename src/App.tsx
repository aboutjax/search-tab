import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SportTypePage from "./components/SportTypePage";
import WorkoutDetailPage from "./components/WorkoutDetailPage";
import CategoryPage from "./components/CategoryPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* <Navigation /> */}
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sport/:sportType" element={<SportTypePage />} />
            <Route
              path="/sport/:sportType/all"
              element={<CategoryPage category="all" />}
            />
            <Route
              path="/sport/:sportType/new"
              element={<CategoryPage category="new" />}
            />
            <Route
              path="/sport/:sportType/personalized"
              element={<CategoryPage category="personalized" />}
            />
            <Route
              path="/sport/:sportType/popular"
              element={<CategoryPage category="popular" />}
            />
            <Route
              path="/sport/:sportType/duration/:durationType"
              element={<CategoryPage category="duration" />}
            />
            <Route
              path="/sport/:sportType/collection/:collectionType"
              element={<CategoryPage category="collection" />}
            />
            <Route path="/workout/:workoutId" element={<WorkoutDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
