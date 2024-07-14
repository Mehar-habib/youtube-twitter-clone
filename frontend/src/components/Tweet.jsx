import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTweet } from "../store/slices/tweetSlice";
import { Button } from "./index";

function Tweet() {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  const sentTweet = async (data) => {
    if (data) {
      await dispatch(createTweet(data));
      setValue("content", "");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(sentTweet)}
        className="sm:p-5 p-3 w-full relative"
      >
        <textarea
          placeholder="write a tweet"
          className="h-28 p-2 focus:border-white border border-slate-500 bg-[#222222] outline-none w-full"
          {...register("content", { required: true })}
        />
        <Button
          type="submit"
          className="bg-purple-500 px-2 py-1 text-black hover:scale-110 transition-all ease-in absolute sm:bottom-10 sm:right-10 bottom-7 right-5"
        >
          Send
        </Button>
      </form>
    </>
  );
}

export default Tweet;
