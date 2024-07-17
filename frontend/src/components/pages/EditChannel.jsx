import { useSelector } from "react-redux";
import { ChannelHeader, ChannelNavigate, Spinner } from "../index";
import { Outlet } from "react-router-dom";

function EditChannel() {
  const channel = useSelector((state) => state.auth?.userData);
  const loading = useSelector((state) => state.auth?.loading);

  return (
    <>
      {loading && (
        <div className="w-full fixed top-20 flex justify-center z-20">
          <div className="w-52 border border-slate-600 bg-black flex gap-2 p3">
            <Spinner />
            <span className="text-base font-bold">wait dude</span>
          </div>
        </div>
      )}
      {channel && (
        <ChannelHeader
          username={channel?.username}
          coverImage={channel?.coverImage.url}
          avatar={channel?.avatar.url}
          subscribedCount={channel?.channelsToSubscribedToCount}
          fullName={channel?.fullName}
          subscribersCount={channel?.subscribersCount}
          isSubscribed={channel?.isSubscribed}
          channelId={channel?._id}
          edit={true}
        />
      )}
      <ChannelNavigate edit={true} />
      <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
        <Outlet />
      </div>
    </>
  );
}

export default EditChannel;
