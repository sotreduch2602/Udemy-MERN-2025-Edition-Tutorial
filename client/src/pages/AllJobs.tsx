import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import customError from "../utils/customError";
import { useLoaderData } from "react-router-dom";
import SearchContainer from "../components/SearchContainer";
import JobsContainer from "../components/JobsContainer";
import { createContext, useContext } from "react";

//eslint-disable-next-line react-refresh/only-export-components
export const allJobsLoader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");
    return { data };
  } catch (error) {
    const errors = customError(error)
      ? error?.response?.data?.msg
      : "Something went wrong";
    toast.error(errors);
    return errors;
  }
};

const AllJobsContext = createContext({ data: undefined });

const AllJobs = () => {
  const { data } = useLoaderData() as { data: undefined };

  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

//eslint-disable-next-line react-refresh/only-export-components
export const useAllJobsContext = () =>
  useContext(AllJobsContext) as { data: undefined };

export default AllJobs;
