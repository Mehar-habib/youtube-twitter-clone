import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWatchHistory } from "../../store/slices/userSlice";
import HomeSkeleton from "../../skeleton/HomeSkeleton";
import { Container, NoVideosFound, VideoList } from "../index";

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
  if (videos?.length === 0) {
    return <NoVideosFound />;
  }
  if (videos && videos.length > 0) {
    return (
      <>
        <Container>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-2 ">
            {videos.map((video) => (
              <VideoList
                key={video._id}
                avatar={video.avatar?.url}
                duration={video.duration}
                title={video.title}
                thumbnail={video.thumbnail?.url}
                createdAt={video.createdAt}
                views={video.views}
                channelName={video.owner.username}
                videoId={video._id}
              />
            ))}
          </div>
        </Container>
      </>
    );
  }
  return <></>;
}

export default History;
