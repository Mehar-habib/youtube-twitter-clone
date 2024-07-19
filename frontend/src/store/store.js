import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice.js";
import userSliceReducer from "./slices/userSlice.js";
import videoSliceReducer from "./slices/videoSlice.js";
import subscriptionSlice from "./slices/subscriptionSlice.js";
import tweetSlice from "./slices/tweetSlice.js";
import commentSlice from "./slices/commentSlice.js";
import likeSlice from "./slices/likeSlice.js";
import dashboardSlice from "./slices/dashboard.js";
import playlistSlice from "./slices/playListSlice.js";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    user: userSliceReducer,
    video: videoSliceReducer,
    subscription: subscriptionSlice,
    tweet: tweetSlice,
    comment: commentSlice,
    like: likeSlice,
    dashboard: dashboardSlice,
    playlist: playlistSlice,
  },
});

export default store;
