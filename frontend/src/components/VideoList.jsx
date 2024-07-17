import { useNavigate } from "react-router-dom";
import { formatDuration, timeAgo } from "./helper/timeAgo";

function VideoList({
  thumbnail,
  duration,
  title,
  views = 0,
  avatar,
  channelId,
  channelName,
  createdAt,
  videoId,
}) {
  const navigate = useNavigate();
  const handleAvatarClick = (e) => {
    e.stopPropagation();
    navigate(`/channel/${channelName}`);
  };
  return (
    <>
      <div
        className="w-full sm:p-2 cursor-pointer"
        onClick={() => navigate(`/video/${videoId}`)}
      >
        <div className="relative">
          <img src={thumbnail} className="w-full h-full" alt="thumbnail" />
          <span className="absolute bottom-2 right-2 rounded-lg text-sm bg-black py-1 px-2">
            {formatDuration(duration)}
          </span>
        </div>

        <div className="flex items-center py-1 px-2 gap-2">
          {avatar && (
            <div onClick={handleAvatarClick}>
              <img
                src={avatar}
                className="w-10 h-10 rounded-full object-cover"
                alt="avatar"
              />
            </div>
          )}

          <div>
            <h2 className="font-medium">{title}</h2>
            <div className="text-xs space-x-1 text-slate-400">
              <span>{views} Views</span>
              <span>{timeAgo(createdAt)} years ago</span>
            </div>
            {channelName && (
              <h2 className="text-sm space-x-1 text-sky-200">{channelName}</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoList;
