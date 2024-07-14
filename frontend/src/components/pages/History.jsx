import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWatchHistory } from "../../store/slices/userSlice";
import HomeSkeleton from "../../skeleton/HomeSkeleton";
import { Link } from "react-router-dom";
import { VideoList } from "../index";

function History() {
  const loading = useSelector((state) => state.user?.loading);
  const videos = useSelector((state) => state.user?.history);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWatchHistory());
  }, [dispatch]);

  if (loading) {
    return <HomeSkeleton />;
  }
  if (videos && videos.length > 0) {
    return (
      <>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-2 ">
          {videos.map((video) => (
            <Link to={`/watch/${video._id}`} key={video._id}>
              <VideoList
                avatar={video.avatar?.url}
                duration={video.duration}
                title={video.title}
                thumbnail={video.thumbnail?.url}
                createdAt={video.createdAt}
              />
            </Link>
          ))}
        </div>
      </>
    );
  }
  return <></>;
}

export default History;
