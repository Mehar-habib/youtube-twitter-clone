import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getAllVideos, makeVideosNull } from "../../store/slices/videoSlice";
import { VideoList, InfiniteScroll, Container } from "../index";
import HomeSkeleton from "../../skeleton/HomeSkeleton";

function HomePage() {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video?.videos?.docs);
  const loading = useSelector((state) => state.video?.loading);
  const hasNextPage = useSelector((state) => state.video?.videos?.hasNextPage);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllVideos({}));

    return () => dispatch(makeVideosNull());
  }, [dispatch]);

  const fetchMoreVideos = useCallback(() => {
    if (hasNextPage) {
      dispatch(getAllVideos({ page: page + 1 }));
      setPage((page) => page + 1);
    }
  }, [dispatch, hasNextPage, page]);

  return (
    <>
      <Container>
        <InfiniteScroll fetchMore={fetchMoreVideos} hasNextPage={hasNextPage}>
          <div className="mb-20 sm:mb-0 w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll">
            {videos?.map((video) => (
              <VideoList
                key={video._id}
                avatar={video.ownerDetails?.avatar?.url}
                duration={video.duration}
                title={video.title}
                thumbnail={video.thumbnail?.url}
                createdAt={video.createdAt}
                views={video.views}
                channelName={video.ownerDetails?.username}
                videoId={video._id}
              />
            ))}
          </div>
          {loading && <HomeSkeleton />}
        </InfiniteScroll>
      </Container>
    </>
  );
}

export default HomePage;
