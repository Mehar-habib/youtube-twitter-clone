import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../store/slices/authSlice";
import { Input2 } from "./index";

function EditPersonalInfo() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth?.userData);

  useEffect(() => {
    setValue("fullName", auth?.fullName);
    setValue("email", auth?.email);
  }, [auth, setValue]);

  const saveChanges = (data) => {
    dispatch(updateUserDetails(data));
  };
  const reset = (e) => {
    e.preventDefault();
    setValue("fullName", auth?.fullName);
    setValue("email", auth?.email);
  };

  return (
    <>
      <div className="w-full flex justify-center items-center mt-5">
        <div className="bg-transparent p-5 border rounded shadow-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">
            Personal Information
            <p className="font-light text-xs">
              {" "}
              Update your personal details here
            </p>
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(saveChanges)}>
            <div className="flex flex-col">
              <Input2
                label="Full Name"
                type="text"
                className="rounded"
                {...register("fullName", {
                  required: "Full Name is required",
                })}
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <Input2
                label="Email"
                type="email"
                className="rounded"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <Button
                onClick={(e) => reset(e)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPersonalInfo;
