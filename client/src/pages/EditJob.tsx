import {
  Form,
  redirect,
  useLoaderData,
  useNavigation,
  useParams,
  type ActionFunctionArgs,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import customError from "../utils/customError";
import FormRow from "../components/FormRow";
import FormRowSelect from "../components/FormRowSelect";
import { JOB_STATUS, JOB_TYPES } from "../../../utils/constants";

//eslint-disable-next-line react-refresh/only-export-components
export const editJobLoader = async ({ params }: { params: { id: string } }) => {
  try {
    const { data } = await customFetch(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    const errors = customError(error)
      ? error?.response?.data?.msg
      : "Something went wrong";

    toast.error(errors);
    return redirect("/dashboard/all-jobs");
  }
};

//eslint-disable-next-line react-refresh/only-export-components
export const editJobAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    await customFetch.patch(`jobs/${params.id}`, data);
    toast.success("Job edited successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    const errors = customError(error)
      ? error?.response?.data?.msg
      : "Something went wrong";

    toast.error(errors);
    return errors;
  }
};

const EditJob = () => {
  const { job } = useLoaderData() as { job: unknown };
  const oldJob = job;
  console.log(job);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={oldJob.position} />
          <FormRow type="text" name="company" defaultValue={oldJob.company} />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={oldJob.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={oldJob.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={oldJob.jobType}
            list={Object.values(JOB_TYPES)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-block form-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
