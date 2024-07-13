import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../components/helper/axiosInstance";

const initialState = {
  loading: false,
  profileData: null,
};

export const userChannelProfile = createAsyncThunk(
  "getUserChannelProfile",
  async (username) => {
    try {
      const response = await axiosInstance.get(`/users/c/${username}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userChannelProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(userChannelProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(userChannelProfile.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
