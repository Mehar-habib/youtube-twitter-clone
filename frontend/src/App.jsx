import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import HomePage from "./components/pages/HomePage";
import { Toaster } from "react-hot-toast";
import { Login } from "./components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./store/slices/authSlice";
import MyChannel from "./components/pages/MyChannel";

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
          <Route path="/my-content" element={<MyChannel />}>
            <Route path="videos" element="" />
            <Route path="playlists" element="" />
            <Route path="tweets" element="" />
            <Route path="subscribed" element="" />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
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
