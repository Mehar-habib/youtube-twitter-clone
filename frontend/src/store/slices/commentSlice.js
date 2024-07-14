import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../components/helper/axiosInstance";
import { BASE_URL } from "../../constants";

const initialState = {
  loading: false,
  comments: [],
};

export const createComment = createAsyncThunk(
  "createComment",
  async ({ videoId, content }) => {
    try {
      const response = await axiosInstance.post(`/comment/${videoId}`, content);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      throw error;
    }
  }
);

export const editAComment = createAsyncThunk(
  "editAComment",
  async ({ commentId, content }) => {
    try {
      const response = await axiosInstance.patch(
        `/comment/c/${commentId}`,
        content
      );
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      throw error;
    }
  }
);

export const deleteAComment = createAsyncThunk(
  "deleteAComment",
  async (commentId) => {
    try {
      const response = await axiosInstance.delete(`/comment/c/${commentId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      throw error;
    }
  }
);

export const getVideoComments = createAsyncThunk(
  "getVideoComments",
  async ({ videoId, page, limit }) => {
    const url = new URL(`${BASE_URL}/${videoId}`);
    if (page) url.searchParams.set("page", page);
    if (limit) url.searchParams.set("limit", limit);

    try {
      const response = await axiosInstance.get(url);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      throw error;
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      getVideoComments.pending,
      (state) => (state.loading = true)
    );
    builder.addCase(getVideoComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });
  },
});

export default commentSlice.reducer;
