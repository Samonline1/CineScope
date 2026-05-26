import React, { useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Actor from "./components/Actor";
import Anime from "./components/Anime";
import AppLayout from "./components/AppLayout";
import AuthPopup from "./components/AuthPopup";
import Favorite from "./components/Favorite";
import MovieDetails from "./components/MovieDetails";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import CineScopeSearch from "./components/CineScopeSearch";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.note.currentUser);
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const buildAuthedPath = (nextUsername) => {
    const parts = location.pathname.split("/");
    if (parts.length > 2) {
      parts[2] = nextUsername;
      return parts.join("/");
    }

    return `/search/${nextUsername}`;
  };

  if (currentUser) {
    return children;
  }

  return (
    <>
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-white">
        <div className="max-w-lg rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-10">
          <h2 className="text-2xl font-bold">Sign in required</h2>
          <p className="mt-3 text-gray-400">
            This section unlocks after login. Sign in from the popup to continue.
          </p>
        </div>
      </div>

      <AuthPopup
        isOpen={showPopup}
        dismissible={false}
        title="Login required"
        subtitle="Please sign in to open this page."
        onClose={() => setShowPopup(false)}
        onSuccess={(user) => {
          setShowPopup(false);
          navigate(buildAuthedPath(user.username), { replace: true });
        }}
      />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <CineScopeSearch />,
      },
      {
        path: "/search/:username",
        element: <CineScopeSearch />,
      },
      {
        path: "/search/:username/:keyword",
        element: <CineScopeSearch />,
      },
      {
        path: "/profile/:username",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/details/:username/:id",
        element: (
          <ProtectedRoute>
            <MovieDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/actor/:username/:id",
        element: (
          <ProtectedRoute>
            <Actor />
          </ProtectedRoute>
        ),
      },
      {
        path: "/anime/:username/:id",
        element: (
          <ProtectedRoute>
            <Anime />
          </ProtectedRoute>
        ),
      },
      {
        path: "/favorites/:username",
        element: (
          <ProtectedRoute>
            <Favorite />
          </ProtectedRoute>
        ),
      },
      {
        path: "/CineScope",
        element: <Navigate to="/" replace />,
      },
      {
        path: "/CineScope/auth",
        element: <Navigate to="/" replace />,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
