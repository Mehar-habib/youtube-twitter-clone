import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../../store/slices/likeSlice";
import HomeSkeleton from "../../skeleton/HomeSkeleton";
import { Link } from "react-router-dom";
import VideoList from "../VideoList";

function LikedVideos() {
  const dispatch = useDispatch();
  const LikedVideos = useSelector((state) => state.like?.LikedVideos);
  const loading = useSelector((state) => state.like?.loading);

  useEffect(() => {
    dispatch(getLikedVideos());
  }, [dispatch]);
  if (loading) {
    return <HomeSkeleton />;
  }
  return (
    <>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 mb-20 sm:mb-20">
        {LikedVideos?.map((video) => (
          <Link
            to={`/watch/${video.LikedVideos._id}`}
            key={video.LikedVideos._id}
          >
            <VideoList
              avatar={video.LikedVideos.ownerDetails?.avatar?.url}
              duration={video.LikedVideos.duration}
              title={video.LikedVideos.title}
              thumbnail={video.LikedVideos.thumbnail?.url}
              createdAt={video.LikedVideos.createdAt}
              views={video.LikedVideos.views}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default LikedVideos;
