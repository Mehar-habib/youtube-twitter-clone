import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../components/helper/axiosInstance";
import { BASE_URL } from "../../constants";

const initialState = {
  loading: false,
  videos: null,
  uploading: true,
  uploaded: false,
  video: null,
  publishToggled: false,
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

export const publishAVideo = createAsyncThunk("publishAVideo", async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("videoFile", data.videoFile[0]);
  formData.append("thumbnail", data.thumbnail[0]);

  try {
    const response = await axiosInstance.post("/video", formData);
    toast.success(response?.data?.message);
    return response.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    throw error;
  }
});

export const updateAVideo = createAsyncThunk(
  "updateAVideo",
  async ({ videoId, data }) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", data.thumbnail[0]);

    try {
      const response = await axiosInstance.patch(
        `/video/v/${videoId}`,
        formData
      );
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);

export const deleteAVideo = createAsyncThunk(
  "deleteAVideo",
  async (videoId) => {
    try {
      const response = await axiosInstance.delete(`/video/v/${videoId._id}`);
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);

export const getVideoById = createAsyncThunk(
  "getVideoById",
  async ({ videoId, userId }) => {
    try {
      const response = await axiosInstance.get(`/video/v/${videoId}`, {
        userId,
      });
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);

export const togglePublishStatus = createAsyncThunk(
  "togglePublishStatus",
  async (videoId) => {
    try {
      const response = await axiosInstance.patch(
        `/video/toggle/publish/${videoId}`
      );
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
  reducers: {
    updateUploadState: (state) => {
      state.uploading = false;
      state.uploaded = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllVideos.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    });

    builder.addCase(publishAVideo.pending, (state) => {
      state.loading = true;
      state.uploading = true;
    });
    builder.addCase(publishAVideo.fulfilled, (state) => {
      state.uploading = false;
      state.uploaded = true;
    });
    builder.addCase(updateAVideo.pending, (state) => {
      state.uploaded = true;
    });
    builder.addCase(updateAVideo.fulfilled, (state) => {
      state.uploaded = true;
      state.uploading = false;
    });
    builder.addCase(deleteAVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAVideo.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getVideoById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideoById.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    });
    builder.addCase(togglePublishStatus.fulfilled, (state) => {
      state.publishToggled = !state.publishToggled;
    });
  },
});
export const { updateUploadState } = videSlice.actions;
export default videSlice.reducer;
