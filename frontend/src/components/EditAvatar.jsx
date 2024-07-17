import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateAvatar, updateCoverImg } from "../store/slices/authSlice";
import { MdClose, MdOutlineCloudUpload } from "./icons";

function EditAvatar({ cover }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const upload = (data) => {
    setIsOpen(false);
    const formData = new FormData();
    formData.append(`${cover ? "coverImage" : "avatar"}`, data.avatar[0]);

    if (data) {
      if (cover) {
        dispatch(updateCoverImg());
      } else {
        dispatch(updateAvatar());
      }
    }
  };
  return (
    <>
      <form className="relative" onSubmit={handleSubmit(upload)}>
        {/* popup */}
        <MdOutlineCloudUpload
          className="hover:text-gray-200 text-black rounded-md bg-white opacity-80 hover:opacity-100 p-1 cursor-pointer"
          size={35}
          onClick={() => setIsOpen((prev) => !prev)}
        />

        {isOpen && (
          <div className="fixed z-50 top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70">
            <div className="bg-black p-8 relative border shadow-lg w-full max-w-md">
              {/* close button */}
              <button
                className="absolute top-5 right-5 hover:text-gray-200"
                onClick={() => setIsOpen(false)}
              >
                <MdClose size={20} />
              </button>
              {/* content */}
              <h2 className="text-lg font-bold mb-4">
                Change {cover ? "Cover" : "Profile"} Profile
              </h2>
              <div className="flex flex-col sm:flex-row items-center">
                <input
                  type="file"
                  accept="image/*"
                  className="bg-black border p-2 mt-2 mr-2 w-full sm:w-auto"
                  {...register("avatar", { required: "avatar is required" })}
                />
                <button
                  className="bg-purple-500 px-4 py-2 mt-4 sm:mt-2 max-w-full"
                  type="submit"
                >
                  Upload
                </button>
              </div>
              {errors.avatar && (
                <p className="text-red-500">{errors.avatar.message}</p>
              )}
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default EditAvatar;
