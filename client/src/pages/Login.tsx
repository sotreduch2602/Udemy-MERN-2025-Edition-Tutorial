import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components/Logo";
import FormRow from "../components/FormRow";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import customError from "../utils/customError";
import SubmitBtn from "../components/SubmitBtn";

//eslint-disable-next-line react-refresh/only-export-components
export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };

  const password = typeof data.password === "string" ? data.password : "";

  if (password.length < 3) {
    errors.msg = "password too short";
    return errors;
  }

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Testing User");
    return redirect("/dashboard");
  } catch (error) {
    errors.msg = customError(error)
      ? error?.response?.data?.msg
      : "Login failed";
    toast.error(errors.msg);

    return errors;
  }
};

const Login = () => {
  type ActionErrors = { msg?: string };
  const errors = useActionData() as ActionErrors | undefined;

  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "test@gmail.com",
      password: "test123",
    };

    try {
      await customFetch.post("/auth/login", data);
      toast.success("Login Successfully");
      return navigate("/dashboard");
    } catch (error) {
      const errors = customError(error)
        ? error?.response?.data?.msg
        : "Login failed";
      toast.error(errors);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>login</h4>
        {errors?.msg && <p style={{ color: "red" }}>{errors?.msg}</p>}
        <FormRow type="email" name="email" defaultValue="john@gmail.com" />
        <FormRow type="password" name="password" defaultValue="password123" />

        <SubmitBtn />

        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to={"/register"} className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
