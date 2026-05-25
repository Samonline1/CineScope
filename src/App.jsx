import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Actor from "./components/Actor";
import Anime from "./components/Anime";
import AppLayout from "./components/AppLayout";
import Favorite from "./components/Favorite";
import Login from "./components/Login";
import MovieDetails from "./components/MovieDetails";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import SmtvLanding from "./components/SmtvLanding";
import SmtvSearch from "./components/SmtvSearch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SmtvLanding />,
  },
  {
    path: "/Smtv/auth",
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/search/:username",
        element: <SmtvSearch />,
      },
      {
        path: "/search/:username/:keyword",
        element: <SmtvSearch />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
      {
        path: "/details/:username/:id",
        element: <MovieDetails />,
      },
      {
        path: "/actor/:username/:id",
        element: <Actor />,
      },
      {
        path: "/anime/:username/:id",
        element: <Anime />,
      },
      {
        path: "/favorites/:username",
        element: <Favorite />,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
