import { Form, Link, type ActionFunctionArgs } from "react-router-dom";

import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components/Logo";
import FormRow from "../components/FormRow";

export const registerAction = async (data: ActionFunctionArgs) => {
  console.log(data);
  return null;
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

        <button type="submit" className="btn btn-block">
          submit
        </button>
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
