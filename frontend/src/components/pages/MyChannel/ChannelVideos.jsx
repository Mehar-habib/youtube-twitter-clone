import { useDispatch, useSelector } from "react-redux";
import { VideoList } from "../../index.js";
import { useEffect } from "react";
import { getAllVideos } from "../../../store/slices/videoSlice.js";
import { Link } from "react-router-dom";

function ChannelVideos() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.profileData?._id);
  const videos = useSelector((state) => state.video?.videos?.docs);

  useEffect(() => {
    dispatch(getAllVideos(userId));
  });
  return (
    <>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2">
        {videos?.map((video) => (
          <Link to={`/watch/${video._id}`} key={video._id}>
            <VideoList
              avatar={video.avatar?.url}
              duration={video.duration}
              title={video.title}
              thumbnail={video.thumbnail?.url}
              createdAt={video.createdAt}
              views={video.views}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default ChannelVideos;