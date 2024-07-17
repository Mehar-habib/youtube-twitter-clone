import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../../store/slices/likeSlice";
import HomeSkeleton from "../../skeleton/HomeSkeleton";
import { Container, NoVideosFound, VideoList } from "../index";

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
  if (LikedVideos?.length === 0) {
    return <NoVideosFound />;
  }
  window.scrollTo(0, 0);
  return (
    <>
      <Container>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 mb-20 sm:mb-20">
          {LikedVideos?.map((video) => (
            <VideoList
              key={video.LikedVideos._id}
              avatar={video.LikedVideos.ownerDetails?.avatar?.url}
              duration={video.LikedVideos.duration}
              title={video.LikedVideos.title}
              thumbnail={video.LikedVideos.thumbnail?.url}
              createdAt={video.LikedVideos.createdAt}
              views={video.LikedVideos.views}
              channelName={video.LikedVideos.ownerDetails?.username}
              videoId={video.LikedVideos._id}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

export default LikedVideos;
