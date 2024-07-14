import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice.js";
import userSliceReducer from "./slices/userSlice.js";
import videoSliceReducer from "./slices/videoSlice.js";
import subscriptionSlice from "./slices/subscriptionSlice.js";
import likeSlice from "./slices/likeSlice";
import tweetSlice from "./slices/tweetSlice.js";
import commentSlice from "./slices/commentSlice.js";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    user: userSliceReducer,
    video: videoSliceReducer,
    subscription: subscriptionSlice,
    like: likeSlice,
    tweet: tweetSlice,
    comment: commentSlice,
  },
});

export default store;
