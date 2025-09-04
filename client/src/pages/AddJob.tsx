import { Form, redirect, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import FormRow from "../components/FormRow";
import { JOB_STATUS, JOB_TYPES } from "../../../utils/constants";
import FormRowSelect from "../components/FormRowSelect";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import customError from "../utils/customError";
import SubmitBtn from "../components/SubmitBtn";

//eslint-disable-next-line react-refresh/only-export-components
export const addJobAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/jobs", data);
    toast.success("Add jobs successfully");
    return redirect("all-jobs");
  } catch (error) {
    const errors = customError(error)
      ? error?.response?.data?.msg
      : "Add Failed";
    toast.error(errors);
    return errors;
  }
};

const AddJob = () => {
  const { user } = useOutletContext<{ user: { location: string } }>();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="Job Location"
            name="jobLocation"
            defaultValue={user.location}
          />

          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormRowSelect
            name="jobType"
            labelText="job types"
            list={Object.values(JOB_TYPES)}
            defaultValue={JOB_TYPES.FULL_TIME}
          />
          <SubmitBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
