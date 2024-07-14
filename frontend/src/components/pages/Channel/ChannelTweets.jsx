import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTweets } from "../../../store/slices/tweetSlice";
import TweetList from "../../tweetList";

function ChannelTweets() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.profileData?._id);
  const tweets = useSelector((state) => state.tweet?.tweets);

  useEffect(() => {
    if (userId) dispatch(getUserTweets(userId));
  }, [dispatch, userId]);
  return (
    <>
      {tweets?.map((tweet) => (
        <TweetList
          key={tweet?._id}
          avatar={tweet?.ownerDetails?.avatar?.url}
          content={tweet?.content}
          createdAt={tweet?.createdAt}
          likesCount={tweet?.likesCount}
          isLiked={tweet?.isLiked}
          tweetId={tweet?._id}
          username={tweet?.ownerDetails?.username}
        />
      ))}
    </>
  );
}

export default ChannelTweets;
