import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAccount, userLogin } from "../store/slices/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import HomeSkeleton from "../skeleton/HomeSkeleton.jsx";

function Signup() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {
    const response = await dispatch(createAccount(data));
    if (response?.payload?.success) {
      const username = data?.username;
      const password = data?.password;
      const loginResult = await dispatch(userLogin({ username, password }));
      if (loginResult?.type === "login/fulfilled") {
        navigate("/terms&condition");
      } else {
        navigate("/login");
      }
    }
  };

  if (loading) {
    return <HomeSkeleton />;
  }
  return (
    <>
      <div className="w-full h-screen p-3 flex justify-center items-start sm:mt-6">
        <div className="flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3">
          <div className="flex items-center gap-2 mt-5">
            <Logo />
          </div>
          <form onSubmit={handleSubmit(submit)} className="space-y-5 p-2">
            <Input
              label="username"
              type="text"
              placeholder=""
              {...register("username", { required: "username is required" })}
            />
            {<span className="text-red-500">{errors.username.message}</span>}

            <Input
              label="email"
              type="email"
              placeholder=""
              {...register("email", { required: "email is required" })}
            />
            {<span className="text-red-500">{errors.email.message}</span>}

            <Input
              label="FullName"
              type="text"
              placeholder=""
              {...register("fullName", { required: "fullName is required" })}
            />
            {<span className="text-red-500">{errors.fullName.message}</span>}

            <Input
              label="Password"
              type="password"
              placeholder=""
              {...register("password", { required: "password is required" })}
            />
            {<span className="text-red-500">{errors.password.message}</span>}

            <Input
              label="Profile Picture"
              type="file"
              placeholder=""
              {...register("avatar", { required: "avatar is required" })}
              accept="image/png, image/jpeg"
            />
            {<span className="text-red-500">{errors.avatar.message}</span>}

            <Button
              type="submit"
              bgColor="bg-purple-500"
              className="w-full sm:py-3 py-2 hover:bg-purple-700 text-lg"
            >
              Sign up
            </Button>

            <p className="text-center text-sm">Already have an account? </p>
            <Link
              to={"/login"}
              className="text-purple-600 cursor-pointer hover:opacity-70"
            >
              Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
