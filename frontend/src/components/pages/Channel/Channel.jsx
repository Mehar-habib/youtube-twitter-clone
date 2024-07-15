import { useDispatch, useSelector } from "react-redux";
import { ChannelHeader } from "../../index.js";
import { useEffect } from "react";
import { userChannelProfile } from "../../../store/slices/userSlice.js";
import ChannelNavigate from "../../channel/ChannelNavigate.jsx";
import { Outlet, useParams } from "react-router-dom";

function Channel() {
  const dispatch = useDispatch();
  const { username } = useParams();

  const channel = useSelector((state) => state.auth?.userData);

  useEffect(() => {
    if (channel) {
      dispatch(userChannelProfile(channel?.username));
    }
  }, [dispatch, channel]);
  return (
    <>
      {channel && (
        <ChannelHeader
          username={username}
          coverImage={channel?.coverImage.url}
          avatar={channel?.avatar.url}
          subscribedCount={channel?.subscribedCount}
          subscribersCount={channel?.subscribersCount}
          fullName={channel?.fullName}
          channelId={channel?._id}
          isSubscribed={channel?.isSubscribed}
        />
      )}
      <ChannelNavigate username={username} />
      <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
        <Outlet />
      </div>
    </>
  );
}

export default Channel;
