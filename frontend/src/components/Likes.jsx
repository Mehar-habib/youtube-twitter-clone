import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
} from "../store/slices/likeSlice";
import { BiSolidDislike, BiSolidLike } from "./icons";

function Likes({ isLiked, likeCount = 0, commentId, tweetId, size, videoId }) {
  const dispatch = useDispatch();
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localLikesCount, setLocalLikesCount] = useState(likeCount);

  const handleLikeToggle = () => {
    if (localIsLiked) {
      setLocalLikesCount((prev) => prev - 1);
    } else {
      setLocalLikesCount((prev) => prev + 1);
    }
    setLocalIsLiked((prev) => !prev);
    if (tweetId) {
      dispatch(toggleTweetLike(tweetId));
    }
    if (commentId) {
      dispatch(toggleCommentLike(commentId));
    }
    if (videoId) {
      dispatch(toggleVideoLike(videoId));
    }
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <BiSolidLike
          size={size}
          onClick={handleLikeToggle}
          className={`cursor-pointer ${localIsLiked ? "text-purple-500" : ""}`}
        />
        <span className="text-xs mr-3">{localLikesCount}</span>
        <BiSolidDislike size={size} />
      </div>
    </>
  );
}

export default Likes;
