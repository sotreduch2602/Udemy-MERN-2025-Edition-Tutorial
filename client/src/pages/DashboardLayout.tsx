import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import SmallSideBar from "../components/SmallSideBar";
import BigSideBar from "../components/BigSideBar";
import NavBar from "../components/NavBar";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../utils/theme";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

interface CurrentUserData {
  msg: string;
  user: {
    _id: string;
    name: string;
    email: string;
    lastName: string;
    location: string;
    role: string;
    __v: number;
  };
}

//eslint-disable-next-line react-refresh/only-export-components
export const dashboardLoader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch {
    return redirect("/");
  }
};

const DashboardContext = createContext({});

const DashboardLayout = () => {
  const data = useLoaderData() as CurrentUserData;
  //temp
  const user = data.user;
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);
  const navigate = useNavigate();
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", String(newDarkTheme)); // or JSON.stringify(newDarkTheme)
    console.log("toggle dark theme");
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging out...");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

interface DashboardContextType {
  toggleSidebar: () => void;
  showSidebar: boolean;
  logoutUser: () => void;
  user: CurrentUserData["user"];
  toggleDarkTheme: () => void;
  isDarkTheme: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = (): DashboardContextType => {
  return useContext(DashboardContext) as DashboardContextType;
};

export default DashboardLayout;
