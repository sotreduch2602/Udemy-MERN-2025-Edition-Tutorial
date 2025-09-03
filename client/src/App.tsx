import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeLayout from "./pages/HomeLayout";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import Stats from "./pages/Stats";
import AllJobs, { allJobsLoader } from "./pages/AllJobs";
import Profile from "./pages/Profile";
import Admin, { adminLoader } from "./pages/Admin";
import { checkDefaultTheme } from "./utils/theme";

import { registerAction } from "./pages/Register";
import DashboardLayout, { dashboardLoader } from "./pages/DashboardLayout";
import Login, { loginAction } from "./pages/Login";
import AddJob, { addJobAction } from "./pages/AddJob";

import EditJob, { editJobAction, editJobLoader } from "./pages/EditJob";
import { deleteJobAction } from "./pages/DeleteJob";

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
        action: registerAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "Admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "Profile",
            element: <Profile />,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          { path: "delete-job/:id", action: deleteJobAction },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
