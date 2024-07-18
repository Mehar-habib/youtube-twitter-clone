import { useDispatch, useSelector } from "react-redux";
import { NoVideosFound, VideoList } from "../../index.js";
import { useEffect } from "react";
import { getAllVideos } from "../../../store/slices/videoSlice.js";
import { Link } from "react-router-dom";

function ChannelVideos() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.profileData?._id);
  const videos = useSelector((state) => state.video?.videos?.docs);

  useEffect(() => {
    dispatch(getAllVideos({ userId }));
  });
  if (videos?.length === 0) {
    return <NoVideosFound />;
  }
  return (
    <>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2">
        {videos?.map((video) => (
          <VideoList
            key={video?._id}
            avatar={video.avatar?.url}
            duration={video.duration}
            title={video.title}
            thumbnail={video.thumbnail?.url}
            createdAt={video.createdAt}
            views={video.views}
          />
        ))}
      </div>
    </>
  );
}

export default ChannelVideos;
