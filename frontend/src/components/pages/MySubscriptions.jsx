import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSubscribedChannels } from "../../store/slices/subscriptionSlice";
import { Avatar } from "../index";

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
  }, []);
  return (
    <>
      <div className="flex gap-2 p-2 text-white items-center bg-[#222222]">
        {subscriptions?.map((subscription) => (
          <Link
            to={`/channel/${subscription?.subscribedChannel?.username}`}
            key={subscription?.subscribedChannel?._id}
            className="flex flex-col justify-center items-center"
          >
            <Avatar src={subscription?.subscribedChannel?.avatar?.url} />
            <h5 className="text-xs">
              {subscription?.subscribedChannel?.username}
            </h5>
          </Link>
        ))}
      </div>
    </>
  );
}

export default MySubscriptions;
