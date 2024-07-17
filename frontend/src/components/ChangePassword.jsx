import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { changePassword } from "../store/slices/authSlice";
import { Button, Input2 } from "./index";

function ChangePassword() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    resetField,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(
      changePassword({
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
      })
    );
    resetField("oldPassword");
    resetField("newPassword");
    resetField("confirmPassword");
  };
  return (
    <>
      <div className="w-full flex justify-center items-center mt-2">
        <div className="bg-transparent p-8 border rounded shadow-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">Change Password</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <Input2
                label="Old Password"
                type="password"
                className="rounded"
                {...register("oldPassword", {
                  required: "Old Password is required",
                })}
              />
              {errors.oldPassword && (
                <p className="text-red-500">{errors.oldPassword.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <Input2
                label="New Password"
                type="password"
                className="rounded"
                {...register("newPassword", {
                  required: "New Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.newPassword && (
                <p className="text-red-500">{errors.newPassword.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <Input2
                label="Confirm Password"
                type="password"
                className="rounded"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === getValues("newPassword") ||
                    "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <Button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded"
              />
              Change Password
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
