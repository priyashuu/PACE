import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import { World } from "./components/World";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SquishyCard from "./components/Couses";
import Phytoplankton from "./components/Phytoplankton";
import OwnPace from "./components/OwnPace";
import { VideoLearning } from "./components/VideoLearning";
import { AuthProvider, useAuth } from "./components/AuthContext";
import LightFundamentals from "./components/LightFundamentals";
import Footer from "./components/Footer";
import VideoCources from "./components/VideoCources";
import GoogleMap from "./components/GoogleMap";
import Teacher from "./components/Teacher";
import FetchNASAData from "./components/FetchNASAData";
import Game from "./components/Game";
import Fiels from "./components/Files";
import TeacherUploads from "./components/teacherUploads";
import Game1 from "./components/Game1";
const ParticleRing = lazy(() => import("./components/ParticeRing.jsx"));

function App() {
  const globeConfig = {
    globeColor: "#282888",
    ambientLight: "#ffffff",
    directionalLeftLight: "#fff",
    directionalTopLight: "#aaa",
    pointLight: "#fff",
    arcData: [],
  };

  const [globeData, setGlobeData] = useState([]);

  useEffect(() => {
    const data = [
      {
        startLat: 37.7749,
        startLng: -122.4194,
        endLat: 40.7128,
        endLng: -74.006,
        color: "#ff0000",
        arcAlt: 0.3,
        order: 1,
      },
      {
        startLat: 51.5074,
        startLng: -0.1278,
        endLat: 48.8566,
        endLng: 2.3522,
        color: "#00ff00",
        arcAlt: 0.3,
        order: 2,
      },
    ];
    setGlobeData(data);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="relative w-screen h-screen">
          <Suspense fallback={<div>Loading...</div>}>
            <ParticleRing className="absolute inset-0 z-0" />
          </Suspense>
          <Navbar className="z-10 text-black" />
          <AuthRoutes globeConfig={globeConfig} globeData={globeData} />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Helper function to check if user is a teacher
const isTeacher = (user) => {
  console.log("User:", user); // Log user to check if it has a teacher role
  return user && user.category === "teacher";
};

// Protected route wrapper - redirects to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// New component to handle routes and authentication
const AuthRoutes = ({ globeConfig, globeData }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="absolute top-0 left-0 w-full h-full z-10">
      <Routes>
        {/* Public routes - accessible to everyone */}
        <Route
          path="/"
          element={
            <>
              <World globeConfig={globeConfig} data={globeData} />
              <About />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />

        {/* Protected routes - require authentication */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <SquishyCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maps"
          element={
            <ProtectedRoute>
              <GoogleMap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              {isTeacher(user) ? (
                <Navigate to="/" />
              ) : (
                <>
                  <Teacher />
                  <Fiels />
                </>
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning/lightfundamentals"
          element={
            <ProtectedRoute>
              <>
                <LightFundamentals />
                <VideoCources />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning/phytoplankton"
          element={
            <ProtectedRoute>
              <Phytoplankton />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning/ownpace"
          element={
            <ProtectedRoute>
              <OwnPace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning/fetchNASAData"
          element={
            <ProtectedRoute>
              <FetchNASAData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning/teacherUploads"
          element={
            <ProtectedRoute>
              <TeacherUploads />
            </ProtectedRoute>
          }
        />
        <Route
          path="/video-learning"
          element={
            <ProtectedRoute>
              <VideoLearning className="z-50" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game1"
          element={
            <ProtectedRoute>
              <Game1 />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
