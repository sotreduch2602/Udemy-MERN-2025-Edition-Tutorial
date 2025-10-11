import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import StatsContainer from "../components/StatsContainer";
import ChartsContainer from "../components/ChartsContainer";
export const statsLoader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (error) {}
};

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData() as {
    defaultStats: any;
    monthlyApplications: any;
  };
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
