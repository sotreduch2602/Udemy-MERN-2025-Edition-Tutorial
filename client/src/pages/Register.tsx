import {
  Form,
  Link,
  redirect,
  type ActionFunctionArgs,
} from "react-router-dom";

import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components/Logo";
import FormRow from "../components/FormRow";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import customError from "../utils/customError";
import SubmitBtn from "../components/SubmitBtn";

// eslint-disable-next-line react-refresh/only-export-components
export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successfully");
    return redirect("/login");
  } catch (error: unknown) {
    const msg = customError(error)
      ? error?.response?.data?.msg
      : "Registration failed";
    toast.error(msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>

        <FormRow type="text" name="name" defaultValue="john" />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          defaultValue="smith"
        />
        <FormRow
          type="text"
          name="location"
          labelText="Location"
          defaultValue="earth"
        />
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          defaultValue="john@gmail.com"
        />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          defaultValue="password123"
        />

        <SubmitBtn />
        
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
