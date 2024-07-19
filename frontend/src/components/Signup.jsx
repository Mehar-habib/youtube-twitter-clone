import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAccount, userLogin } from "../store/slices/authSlice.js";
import { Button, Container, Input, Logo } from "./index.js";
import HomeSkeleton from "../skeleton/HomeSkeleton.jsx";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";

function Signup() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const handleAvatarChange = (e) => {
    const files = e.target.files;
    if (files) {
      setAvatarPreview(URL.createObjectURL(files[0]));
    }
    return files;
  };

  const handleCoverChange = (e) => {
    const files = e.target.files;
    if (files) {
      setCoverPreview(URL.createObjectURL(files[0]));
    }
    return files;
  };

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
        <div className="flex flex-col space-y-2 justify-center items-center border border-slate-600 p-3">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <form
            onSubmit={handleSubmit(submit)}
            className="space-y-4 sm:w-96 text-sm w-full"
          >
            <div className="w-full relative h-28 bg-[#222222] rounded-xl">
              <label htmlFor="CoverImage" className="cursor-pointer">
                <img
                  src={coverPreview}
                  className="object-cover w-full h-full"
                />
                <div className="text-sm absolute right-2 bottom-2 bg-[#0f0f0f] p-2 rounded hover:bg-opacity-80">
                  Cover Image
                </div>
                <Container
                  name="coverImage"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <input
                      id="coverImage"
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        onChange(handleAvatarChange(e));
                      }}
                    />
                  )}
                />
              </label>
              <label className="cursor-pointer" htmlFor="avatar">
                <div className="absolute h-24 w-24 left-2 bottom-2 flex justify-center items-center">
                  <img
                    src={avatarPreview}
                    className="object-cover w-full h-full border-2 border-double rounded-full"
                  />
                  <FaCamera
                    className="absolute hover:text-purple-500"
                    size={20}
                  />
                </div>
                <Container
                  name="avatar"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <input
                      id="avatar"
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        onChange(handleCoverChange(e));
                      }}
                    />
                  )}
                  rules={{ required: "avatar is required" }}
                />
              </label>
              <div>
                {errors.avatar && (
                  <span className="text-red-500">{errors.avatar.message}</span>
                )}
              </div>
            </div>

            <Input
              label="username"
              type="text"
              placeholder="Enter username"
              className="h-8"
              {...register("username", { required: "username is required" })}
            />
            {errors.avatar && (
              <span className="text-red-500">{errors.username.message}</span>
            )}

            <Input
              label="email"
              type="email"
              placeholder="Enter Email"
              className="h-8"
              {...register("email", { required: "email is required" })}
            />
            {errors.avatar && (
              <span className="text-red-500">{errors.email.message}</span>
            )}

            <Input
              label="FullName"
              type="text"
              placeholder="Enter FullName"
              className="h-8"
              {...register("fullName", { required: "fullName is required" })}
            />
            {errors.avatar && (
              <span className="text-red-500">{errors.fullName.message}</span>
            )}

            <Input
              label="Password"
              type="password"
              placeholder="Enter Password"
              className="h-8"
              {...register("password", { required: "password is required" })}
            />
            {errors.avatar && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

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
