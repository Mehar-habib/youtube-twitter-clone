import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import HomePage from "./components/pages/HomePage";
import { Toaster } from "react-hot-toast";
import { ChangePassword, EditPersonalInfo, Login, SignUp } from "./components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./store/slices/authSlice";
import {
  History,
  Channel,
  ChannelVideos,
  ChannelTweets,
  LikedVideos,
  VideoDetails,
  ChannelSubscribers,
  MySubscriptions,
  AdminDashboard,
  EditChannel,
  SearchVideos,
} from "./components/pages/index";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="/search/:query" element={<SearchVideos />} />
          <Route path="/channel/:username" element={<Channel />}>
            <Route path="videos" element={<ChannelVideos />} />
            <Route path="playlists" element="" />
            <Route path="tweets" element={<ChannelTweets />} />
            <Route path="subscribed" element={<ChannelSubscribers />} />
          </Route>
          <Route path="/history" element={<History />} />
          <Route path="/liked-videos" element={<LikedVideos />} />
          <Route path="/subscriptions" element={<MySubscriptions />} />
          <Route path="/edit" element={<EditChannel />}>
            <Route path="personalInfo" element={<ChangePassword />} />
            <Route path="personalInfo" element={<EditPersonalInfo />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/watch/:videoId" element={<VideoDetails />} />
        <Route path="/collections" element={<AdminDashboard />} />
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          error: {
            style: { borderRadius: "0", color: "red" },
          },
          success: {
            style: { borderRadius: "0", color: "green" },
          },
          duration: 2000,
        }}
      />
    </>
  );
}

export default App;
