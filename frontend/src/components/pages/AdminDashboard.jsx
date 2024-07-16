import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  TogglePublish,
  Navbar,
  UploadVideo,
  EditVideo,
} from "../index";
import {
  FaRegEye,
  FaRegHeart,
  RxAvatar,
  MdOutlineSlowMotionVideo,
  ImBin,
  GrEdit,
} from "../icons";
import { useEffect, useState } from "react";
import {
  getChannelStats,
  getChannelVideos,
} from "../../store/slices/dashboard";

function AdminDashboard() {
  const username = useSelector((state) => state.auth.userData?.username);
  const dashboard = useSelector((state) => state.dashboard.channelStats);
  const videos = useSelector((state) => state.dashboard.channelVideos);
  const uploaded = useSelector((state) => state.video.uploaded);
  const publishToggled = useSelector((state) => state.video.publishToggled);

  const dispatch = useDispatch();
  const [videoDetails, setVideoDetails] = useState(null);
  const [popup, setPopup] = useState({
    uploadVideo: false,
    editVideo: false,
    deleteVideo: false,
  });

  useEffect(() => {
    dispatch(getChannelStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChannelVideos());
  }, [dispatch, uploaded, publishToggled]);
  return (
    <>
      <Navbar />
      <Container>
        <div className="w-full relative h-screen space-y-5 z-10">
          {popup.uploadVideo && (
            <div className="absolute w-full z-20">
              <UploadVideo setUploadVideoPopup={setPopup} />
            </div>
          )}
          {popup.editVideo && (
            <div className="w-full flex justify-center absolute z-20">
              <EditVideo
                setEditVideoPopup={setPopup}
                title={videoDetails?.title}
                description={videoDetails?.description}
                videoId={videoDetails?._id}
              />
            </div>
          )}
          {/* Dashboard Header */}
          <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <h1>Welcome Back, {username}</h1>
              <p>Seamless Video Management, Elevated Result.</p>
            </div>
            <div>
              <Button
                className="bg-purple-500 p-2 font-semibold"
                textColor="text-black"
                onclick={() =>
                  setPopup((prev) => ({
                    ...prev,
                    uploadVideo: !prev.uploadVideo,
                  }))
                }
              >
                Upload Video
              </Button>
            </div>
          </section>

          <section className="grid sm:grid-cols-4 grid-cols-2 justify-evenly items-center gap-2">
            <div className="border border-slate-500 sm:p-3 p-3">
              <MdOutlineSlowMotionVideo className="text-purple-500" size={30} />
              <p>Total Videos</p>
              <span className="font-bold">{dashboard?.totalLikes}</span>
            </div>

            <div className="border border-slate-500 p-3">
              <FaRegEye className="text-purple-500 mb-2" size={30} />
              <p>Total Views</p>
              <span className="font-bold">{dashboard?.totalViews}</span>
            </div>

            <div className="border border-slate-500 sm:p-3 p-2">
              <RxAvatar className="text-purple-500 mb-2" size={30} />
              <p>Total Subscribers</p>
              <span className="font-bold text-2xl">
                {dashboard?.totalSubscribers}
              </span>
            </div>

            <div className="border border-slate-500 sm:p-3 p-2">
              <FaRegHeart className="text-purple-500 mb-2" size={30} />
              <p>Total Likes</p>
              <span className="font-bold text-2xl">
                {dashboard?.totalLikes}
              </span>
            </div>
          </section>

          {/* Table for managing channel videos */}
          <section className="mx-auto w-full overflow-x-scroll">
            <table className="min-h-full border border-slate-500">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-slate-500">
                    Toggle Publish
                  </th>
                  <th className="py-2 px-4 border-b border-slate-500">
                    {" "}
                    Status
                  </th>
                  <th className="py-2 px-4 border-b border-slate-500">
                    {" "}
                    Uploaded
                  </th>
                  <th className="py-2 px-4 border-b border-slate-500">
                    {" "}
                    Rating
                  </th>
                  <th className="py-2 px-4 border-b border-slate-500">
                    {" "}
                    Date Uploaded
                  </th>
                  <th className="py-2 px-4 border-b border-slate-500"> </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {videos?.map((video) => (
                  <tr key={video._id}>
                    <td className="py-2 px-4 border-b border-slate-500">
                      <TogglePublish
                        isPublished={video?.isPublished}
                        videoId={video?._id}
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-slate-500">
                      {video?.isPublished ? (
                        <span className="text-green-500 py-1 px-2 border border-green-500 rounded-full">
                          Published
                        </span>
                      ) : (
                        <span className="text-orange-500 py-1 px-2 border border-orange-500 rounded-full">
                          UnPublished
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border-slate-500">
                      {video?.title}
                    </td>
                    <td className="py-2 px-4 border-b border-slate-500">
                      <span className="border rounded-lg outline-none px-2 bg-green-200 text-green-600">
                        {video?.likesCount} likes
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-slate-500">
                      {video?.createdAt?.day}/{video?.createdAt?.month}/
                      {video?.createdAt?.year}
                    </td>
                    <td className="py-2 border-b border-slate-500">
                      <span className="flex gap-3 justify-start">
                        <ImBin
                          size={20}
                          className="cursor-pointer"
                          onclick={() =>
                            setPopup((prev) => ({
                              ...prev,
                              deleteVideo: !prev.deleteVideo,
                            }))
                          }
                        />

                        <GrEdit
                          size={20}
                          className="cursor-pointer"
                          onclick={() =>
                            setPopup((prev) => ({
                              ...prev,
                              editVideo: !prev.editVideo,
                            }))
                          }
                        />
                      </span>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-2 px-4 border-b border-slate-500">
                    <TogglePublish isPublished={false} />{" "}
                  </td>
                  <td className="py-2 px-4 border-b border-slate-500">
                    Published
                  </td>
                  <td className="py-2 px-4 border-b border-slate-500">
                    Javascript Fundamentals: Variables and Date Types
                  </td>
                  <td className="py-2 px-4 border-b border-slate-500">
                    941 Likes
                  </td>
                  <td className="py-2 px-4 border-b border-slate-500">
                    9/22/2024
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </Container>
    </>
  );
}

export default AdminDashboard;
