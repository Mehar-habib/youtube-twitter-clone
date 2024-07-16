import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { publishAVideo } from "../store/slices/videoSlice";
import { IoCloseCircleOutline } from "./icons";
import { Button, Input2, UploadingVideo } from "./index";

function UploadVideo({ setUploadVideoPopup }) {
  const [videoName, setVideoName] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.video.uploading);

  const publishVideo = (data) => {
    dispatch(publishAVideo(data));
  };

  return (
    <>
      {uploading ? (
        <UploadingVideo setUploadVideoPopup={setUploadVideoPopup} />
      ) : (
        <form className="relative w-[95vw] sm:w-3/4 space-y-5 mx-auto border h-screen overflow-y-scroll bg-black">
          <section className="h-12 border-b w-full flex justify-between items-center px-3">
            <div className="flex gap-1 items-center cursor-pointer">
              <IoCloseCircleOutline
                size={23}
                onClick={() => setUploadVideoPopup((prev) => !prev)}
              />
              <h3 className="font-semibold">Upload Videos</h3>
            </div>
            <div>
              <Button
                className="bg-purple-500 py-1 px-2 font-bold"
                textColor="text-black"
                type="submit"
              >
                Save
              </Button>
            </div>
          </section>

          <section className="px-3">
            <div className="w-full border border-dotted h-44 p-1 flex flex-col gap-3 justify-center items-center text-center">
              <div>
                <h1 className="font-semibold text-sm">
                  Drag and drop Files to upload
                </h1>
                <p className="font-light text-sm">
                  Your videos will be private until you publish
                </p>
              </div>
              <label
                htmlFor="video-upload"
                className="cursor-pointer bg-purple-500 text-black font-bold text-sm py-2 px-4"
              >
                Select Files
              </label>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                className="hidden"
                {...register("videoFile", {
                  required: "VideoFile is required",
                  onChange: (e) => setVideoName(e.target.files[0]?.name),
                })}
              />

              <input
                className="sm:w-3/4 w-full text-center h-10 bg-transparent outline-none"
                value={videoName}
                readOnly
              />
              <span className="text-red-500 text-xs">
                {errors?.videoFile?.message}
              </span>
            </div>

            <div className="space-y-5 mt-2">
              <Input2
                type="file"
                label="Thumbnail"
                accept="image/png image/jpeg"
                {...register("thumbnail", {
                  required: "Thumbnail is required",
                })}
              />
              <span className="text-red-500 text-xs">
                {errors?.thumbnail?.message}
              </span>

              <Input2
                type="text"
                label="Title"
                className="mb-2"
                {...register("title", {
                  required: "Title is required",
                })}
              />
              <span className="text-red-500 text-xs">
                {errors?.thumbnail?.message}
              </span>

              <div>
                <label>Description *</label>
                <textarea
                  rows="5"
                  className="focus:bg-[#222222] bg-transparent outline-none border w-full mt-1 p-1"
                  {...register("description", {
                    required: "Description is required",
                  })}
                ></textarea>
                <span className="text-red-500 text-xs">
                  {errors?.description?.message}
                </span>
              </div>
            </div>
          </section>
        </form>
      )}
    </>
  );
}

export default UploadVideo;
