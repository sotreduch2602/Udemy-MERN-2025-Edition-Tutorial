import { toast } from "react-toastify";
import customError from "../utils/customError";
import customFetch from "../utils/customFetch";
import { redirect, type ActionFunctionArgs } from "react-router-dom";

export const deleteJobAction = async ({ params }: ActionFunctionArgs) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success("Deleted Job Successfully");
  } catch (error) {
    const errors = customError(error)
      ? error?.response?.data?.msg
      : "Something went wrong";

    toast.error(errors);
  }
  return redirect("/dashboard/all-jobs");
};
