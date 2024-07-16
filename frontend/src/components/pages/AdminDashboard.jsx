import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  TogglePublish,
  Navbar,
  UploadVideo,
  EditVideo,
  DeleteConfirmation,
  Spinner,
  HeaderSection,
  StatsSection,
  VideoTable,
} from "../index";
import { useEffect, useState } from "react";
import {
  getChannelStats,
  getChannelVideos,
} from "../../store/slices/dashboard";
import { deleteAVideo } from "../../store/slices/videoSlice";

function AdminDashboard() {
  const username = useSelector((state) => state.auth.userData?.username);
  const dashboard = useSelector((state) => state.dashboard.channelStats);
  const videos = useSelector((state) => state.dashboard.channelVideos);
  const uploaded = useSelector((state) => state.video.uploaded);
  const publishToggled = useSelector((state) => state.video.publishToggled);
  const deleting = useSelector((state) => state.video.loading);

  const dispatch = useDispatch();
  const [videoDetails, setVideoDetails] = useState(null);
  const [popup, setPopup] = useState({
    uploadVideo: false,
    editVideo: false,
    deleteVideo: false,
  });
  const handleDeleteVideo = () => {
    dispatch(deleteAVideo(videoDetails._id));
    setPopup((prev) => ({
      ...prev,
      deleteVideo: !prev.deleteVideo,
    }));
  };
  useEffect(() => {
    dispatch(getChannelStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChannelVideos());
  }, [dispatch, uploaded, publishToggled, deleting]);
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
            <div className="w-full flex justify-center top-24 fixed z-20">
              <EditVideo
                setEditVideoPopup={setPopup}
                title={videoDetails?.title}
                description={videoDetails?.description}
                videoId={videoDetails?._id}
              />
            </div>
          )}
          {/* delete video popup */}
          {popup.deleteVideo && (
            <div className="w-full fixed top-52 flex justify-center z-20">
              <DeleteConfirmation
                video={true}
                onCancel={() =>
                  setPopup((prev) => ({
                    ...prev,
                    deleteVideo: !prev.deleteVideo,
                  }))
                }
                onDelete={handleDeleteVideo}
              />
            </div>
          )}
          {deleting && (
            <div className="w-full fixed top-20 flex justify-center z-20">
              <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
                <Spinner />
                <span className="text-md font-bold">Deleting video...</span>
              </div>
            </div>
          )}
          {/* Dashboard Header */}
          <HeaderSection username={username} setPopUp={setPopup} />
          {/* channel state section */}
          <StatsSection dashboard={dashboard} />

          {/* Table for managing channel videos */}
          <VideoTable
            videos={videos}
            setPopUp={setPopup}
            setVideoDetails={setVideoDetails}
          />
        </div>
      </Container>
    </>
  );
}

export default AdminDashboard;
