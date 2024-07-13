import { useDispatch, useSelector } from "react-redux";
import Channel from "../channel/Channel";
import { useEffect } from "react";
import { userChannelProfile } from "../../store/slices/userSlice";

function MyChannel() {
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
      <Channel
        username={channel?.username}
        coverImage={profile?.coverImage.url}
        avatar={profile?.avatar.url}
        subscribedCount={profile?.subscribedCount || 0}
        subscribersCount={profile?.subscribersCount || 0}
        fullName={profile?.fullName}
      />
    </>
  );
}

export default MyChannel;
