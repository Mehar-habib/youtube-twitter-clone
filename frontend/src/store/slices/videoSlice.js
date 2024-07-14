import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../components/helper/axiosInstance";
import { BASE_URL } from "../../constants";

const initialState = {
  loading: false,
  videos: [],
};

export const getAllVideos = createAsyncThunk(
  "getAllVideos",
  async (userId, sortBy, sortType, query, page, limit) => {
    try {
      const url = new URL(`${BASE_URL}/video`);

      if (userId) url.searchParams.set("userId", userId);
      if (query) url.searchParams.set("query", query);
      if (page) url.searchParams.set("page", page);
      if (limit) url.searchParams.set("limit", limit);
      if (sortBy && sortType) {
        url.searchParams.set("sortBy", sortBy);
        url.searchParams.set("sortType", sortType);
      }
      const response = await axiosInstance.get(url);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);

const videSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllVideos.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    });
  },
});

export default videSlice.reducer;
