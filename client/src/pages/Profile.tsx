import {
  Form,
  useOutletContext,
  type ActionFunctionArgs,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import type { CurrentUserData } from "./DashboardLayout";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import customError from "../utils/customError";
import SubmitBtn from "../components/SubmitBtn";

//eslint-disable-next-line react-refresh/only-export-components
export const profileAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  console.log(formData);

  const maxFileSize = 1000000;
  if (file instanceof File && file.size > maxFileSize) {
    toast.error("Image size is too large");
    return null;
  }

  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Profile updated successfully");
  } catch (error) {
    const errors = customError(error)
      ? error?.response?.data?.msg
      : "Login failed";
    toast.error(errors);
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext() as CurrentUserData;
  const { name, lastName, email, location } = user;
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 1.0 MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormRow type="text" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
