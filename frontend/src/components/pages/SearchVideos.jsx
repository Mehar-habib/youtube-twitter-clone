import { useDispatch, useSelector } from "react-redux";
import { NoVideosFound, VideoList } from "../index";
import HomeSkeleton from "../../skeleton/HomeSkeleton";
import { useEffect, useState } from "react";
import { getAllVideos, makeVideosNull } from "../../store/slices/videoSlice";
import { useParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

function SearchVideos() {
  const loading = useSelector((state) => state.video?.loading);
  const videos = useSelector((state) => state.video?.videos);
  const dispatch = useDispatch();

  const { query } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useState();

  useEffect(() => {
    const sortType = searchParams.get("sortType");
    const sortBy = searchParams.get("sortBy");
    dispatch(getAllVideos({ query, sortBy, sortType }));
    setFilterOpen(false);
    return () => dispatch(makeVideosNull());
  }, [dispatch, query, searchParams]);

  const handleSortParams = (sortBy, sortType = "asc") => {
    setSearchParams({ sortBy: newSortBy, sortType: newSortType });
  };
  if (videos?.totalDocs === 0) {
    return <NoVideosFound text={"try searching something else"} />;
  }
  if (loading) {
    return <HomeSkeleton />;
  }
  return (
    <>
      <div
        className="w-full h-10 flex items-center font-bold justify-end cursor-pointer px-6"
        onClick={() => setFilterOpen((open) => !open)}
      >
        <span className="hover:text-purple-800">Filter</span>
        <FaFilter size={20} className="text-purple-500 hover:to-purple-800" />
      </div>
      <div className="w-full text-white">
        {filterOpen && (
          <div className="w-full absolute bg-transparent">
            <div className="max-w-sm border border-slate-800 rounded-lg bg-[#222222] fixed mx-auto z-50 inset-x-0 h-96 p-5">
              <h1>Search Filter</h1>
              <IoCloseCircleOutline
                size={25}
                className="absolute right-5 top-5 cursor-pointer"
                onClick={() => setFilterOpen((open) => !open)}
              />
              <table className="mt-4">
                <tr className="w-full text-start border-b">
                  <th>SortBy</th>
                </tr>
                <tr className="flex flex-col gap-2 text-slate-400 cursor-pointer">
                  <td onClick={() => handleSortParams("createdAt", "desc")}>
                    Upload date
                    <span className="text-xs">latest</span>
                  </td>
                  <td onClick={() => handleSortParams("createdAt", "asc")}>
                    Upload date
                    <span className="text-xs">Oldest</span>
                  </td>
                  <td onClick={() => handleSortParams("views", "asc")}>
                    View count <span className="text-xs">(Low to High)</span>
                  </td>
                  <td onClick={() => handleSortParams("views", "desc")}>
                    View count <span className="text-xs">(High to Low)</span>
                  </td>
                  <td onClick={() => handleSortParams("duration", "asc")}>
                    Duration <span className="text-xs">(Low to High)</span>
                  </td>
                  <td onClick={() => handleSortParams("duration", "desc")}>
                    Duration <span className="text-xs">(High to Low)</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        )}

        <div className="grid h-screen xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll">
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
      </div>
    </>
  );
}

export default SearchVideos;
