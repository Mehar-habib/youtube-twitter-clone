import { useSelector } from "react-redux";
import { NoVideosFound, VideoList } from "../index";
import HomeSkeleton from "../../skeleton/HomeSkeleton";

function SearchVideos() {
  const loading = useSelector((state) => state.video?.loading);
  const videos = useSelector((state) => state.video?.videos);

  if (videos?.totalDocs === 0) {
    return <NoVideosFound />;
  }
  if (loading) {
    return <HomeSkeleton />;
  }
  return (
    <>
      <div className="grid grid-cols-3">
        {videos &&
          videos?.docs?.map((video) => (
            <VideoList
              key={video?._id}
              thumbnail={video?.thumbnail?.url}
              duration={video?.duration}
              title={video?.title}
              views={video?.views}
              avatar={video?.ownerDetails?.avatar?.url}
              channelName={video?.ownerDetails?.username}
              createdAt={video?.createdAt}
              videoId={video?._id}
            />
          ))}
      </div>
    </>
  );
}

export default SearchVideos;
