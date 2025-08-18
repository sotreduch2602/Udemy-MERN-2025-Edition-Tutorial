import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import SmallSideBar from "../components/SmallSideBar";
import BigSideBar from "../components/BigSideBar";
import NavBar from "../components/NavBar";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../utils/theme";
const DashboardContext = createContext({});

const DashboardLayout = () => {
  const user = { name: "John" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);

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
    console.log("logout user");
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
              <Outlet />
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
  user: string;
  toggleDarkTheme: () => void;
  isDarkTheme: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = (): DashboardContextType => {
  return useContext(DashboardContext) as DashboardContextType;
};

export default DashboardLayout;
