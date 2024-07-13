import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice.js";
import userSliceReducer from "./slices/userSlice.js";
import videoSliceReducer from "./slices/videoSlice.js";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    user: userSliceReducer,
    video: videoSliceReducer,
  },
});

export default store;
