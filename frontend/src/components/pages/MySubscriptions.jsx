import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSubscribedChannels } from "../../store/slices/subscriptionSlice";
import { Avatar, VideoList } from "../index";

function MySubscriptions() {
  const dispatch = useDispatch();
  const subscriptions = useSelector(
    (state) => state.subscription?.mySubscriptions
  );
  const subscriberId = useSelector((state) => state.auth?.uerData?._id);

  useEffect(() => {
    if (subscriptions) {
      dispatch(getSubscribedChannels(subscriberId));
    }
  }, [dispatch, subscriberId]);
  return (
    <>
      <div className="flex gap-2 p-2 text-white items-center bg-[#222222]">
        {subscriptions?.map((subscription) => (
          <div
            to={`/channel/${subscription?.subscribedChannel?.username}`}
            key={subscription?.subscribedChannel?._id}
            className="flex flex-col justify-center items-center"
          >
            <Avatar
              src={subscription?.subscribedChannel?.avatar?.url}
              channelName={subscription?.subscribedChannel?.username}
            />
            <h5 className="text-xs">
              {subscription?.subscribedChannel?.username}
            </h5>
          </div>
        ))}
      </div>

      <div className="mb-20 sm:mb-0 w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll">
        {subscriptions?.map((subscription) => (
          <Link
            to={`/watch/${subscription?.subscribedChannel?.latestVideo?._id}`}
            key={subscription?.subscribedChannel?._id}
          >
            {subscription?.subscribedChannel?.latestVideo && (
              <Link
                to={`/watch/${subscription?.subscribedChannel?.latestVideo?._id}`}
                key={subscription?.subscribedChannel?._id}
              >
                <VideoList
                  avatar={subscription?.subscribedChannel?.avatar.url}
                  duration={
                    subscription?.subscribedChannel?.latestVideo?.duration
                  }
                  title={subscription?.subscribedChannel?.latestVideo?.title}
                  thumbnail={
                    subscription?.subscribedChannel?.latestVideo?.thumbnail?.url
                  }
                  createdAt={
                    subscription?.subscribedChannel?.latestVideo?.createdAt
                  }
                  views={subscription?.subscribedChannel?.latestVideo?.views}
                  channelName={subscription?.subscribedChannel?.username}
                />
              </Link>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}

export default MySubscriptions;
