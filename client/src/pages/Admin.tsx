import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import StatItem from "../components/StatItem";

//eslint-disable-next-line react-refresh/only-export-components
export const adminLoader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch {
    toast.error("You are not authorized to access this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData() as { users: string; jobs: string };
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        icon={<FaSuitcaseRolling />}
        color="#e9b949"
        bcg="#fcefc7"
      />
      <StatItem
        title="total jobs"
        count={jobs}
        icon={<FaCalendarCheck />}
        color="#647acb"
        bcg="#e0e8f9"
      />
    </Wrapper>
  );
};

export default Admin;
