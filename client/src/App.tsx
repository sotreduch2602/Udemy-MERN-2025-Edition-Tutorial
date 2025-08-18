import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeLayout from "./pages/HomeLayout";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import AddJob from "./pages/AddJob";
import Stats from "./pages/Stats";
import AllJobs from "./pages/AllJobs";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import { checkDefaultTheme } from "./utils/theme";

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
          },
          {
            path: "Admin",
            element: <Admin />,
          },
          {
            path: "Profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
