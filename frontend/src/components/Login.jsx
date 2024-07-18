import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, userLogin } from "../store/slices/authSlice";
import { Button, Input, Logo } from "./index.js";
import LoginSkeleton from "../skeleton/LoginSkeleton.jsx";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {
    const isEmail = data.username.includes("@");
    const loginData = isEmail
      ? { email: data.username, password: data.password }
      : data;
    const response = await dispatch(userLogin(loginData));
    const user = await dispatch(getCurrentUser());
    if (user && response?.payload) {
      navigate("/");
    }
  };
  if (loading) {
    return <LoginSkeleton />;
  }
  return (
    <>
      <div className="w-full h-screen p-3 flex justify-center items-start">
        <div className="flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3 mt-20">
          <div className="flex items-center gap-2 mt-5">
            <Logo />
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-5 p-2">
            <Input
              label="username / email"
              type="text"
              placeholder="example@gmail.com"
              {...register("username", { required: "username is required" })}
            />
            {<span className="text-red-500">{errors.username.message}</span>}

            <Input
              label="Password"
              type="password"
              placeholder="1@2@3#4$5"
              {...register("password", { required: "password is required" })}
            />
            {<span>{errors.password.message}</span>}

            <Button
              type="submit"
              bgColor="bg-purple-500"
              className="w-full sm:py-3 py-2 hover:bg-purple-700 text-lg"
            >
              Login
            </Button>

            <p className="text-center text-sm">
              {" "}
              Don&apos;t have an account?{" "}
              <Link
                to={"/signUp"}
                className="text-purple-500 cursor-pointer hover:opacity-70"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
