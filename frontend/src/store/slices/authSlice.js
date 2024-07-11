import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../components/helper/axiosInstance";

const initialState = {
  status: false,
  userData: null,
  accessToken: null,
  refreshToken: null,
};

export const createAccount = createAsyncThunk("user/register", async (data) => {
  try {
    const res = await axiosInstance.post("users/register", data);
    console.log(res.data);
    toast.success(res.data);
    return res.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    throw error;
  }
});

export const userLogin = createAsyncThunk("user/login", async (data) => {
  try {
    const res = await axiosInstance.post("users/login", data);
    console.log(res.data);
    toast.success(res.data);
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    throw error;
  }
});

export const userLogout = createAsyncThunk("user/logout", async () => {
  try {
    const res = await axiosInstance.post("users/logout");
    toast.success(res.data?.message);
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    throw error;
  }
});

export const refreshAccessToken = createAsyncThunk(
  "refreshAccessToken",
  async (data) => {
    try {
      const res = await axiosInstance.post("users/refresh-token", data);
      toast.success(res.data);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);

export const changePassword = createAsyncThunk(async (data) => {
  try {
    const res = await axiosInstance.post("users/change-password", data);
    toast.success(res.data?.message);
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducer: (builder) => {
    builder.addCase(createAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAccount.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(userLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });
  },
});

// export const { updateUser } = authSlice.actions;

export default authSlice.reducer;
