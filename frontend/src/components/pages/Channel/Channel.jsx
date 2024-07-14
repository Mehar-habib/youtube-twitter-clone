import { useDispatch, useSelector } from "react-redux";
import { ChannelHeader } from "../../index.js";
import { useEffect } from "react";
import { userChannelProfile } from "../../../store/slices/userSlice.js";
import ChannelNavigate from "../../channel/ChannelNavigate.jsx";
import { Outlet } from "react-router-dom";

function Channel() {
  const dispatch = useDispatch();
  const channel = useSelector((state) => state.auth?.userData);
  const profile = useSelector((state) => state.user?.profileData);

  useEffect(() => {
    if (channel) {
      dispatch(userChannelProfile(channel?.username));
    }
  }, [dispatch, channel]);
  return (
    <>
      <ChannelHeader
        username={channel?.username}
        coverImage={profile?.coverImage.url}
        avatar={profile?.avatar.url}
        subscribedCount={profile?.subscribedCount || 0}
        subscribersCount={profile?.subscribersCount || 0}
        fullName={profile?.fullName}
      />
      <ChannelNavigate />
      <Outlet />
    </>
  );
}

export default Channel;
