import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../store/slices/authSlice.js";
import { Button, Input, Logo } from "./index.js";

function Signup() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (data) => {
    dispatch(createAccount(data));
    navigate("/login");
  };
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
              {...register("username", { required: true })}
            />
            {errors.username && <span>{errors.username.message}</span>}

            <Input
              label="email"
              type="email"
              placeholder=""
              {...register("email", { required: true })}
            />
            {errors.email && <span>{errors.email.message}</span>}

            <Input
              label="FullName"
              type="text"
              placeholder=""
              {...register("fullName", { required: true })}
            />
            {errors.fullName && <span>{errors.fullName.message}</span>}

            <Input
              label="Password"
              type="password"
              placeholder=""
              {...register("password", { required: true })}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <Input
              label="Profile Picture"
              type="file"
              placeholder=""
              {...register("avatar", { required: true })}
              accept="image/png, image/jpeg"
            />
            {errors.avatar && <span>{errors.avatar.message}</span>}

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
