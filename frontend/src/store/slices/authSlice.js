import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../components/helper/axiosInstance";

const initialState = {
  loading: false,
  status: false,
  userData: null,
};

export const createAccount = createAsyncThunk("user/register", async (data) => {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("fullName", data.fullName);
  formData.append("password", data.password);
  formData.append("avatar", data.avatar[0]);
  try {
    const res = await axiosInstance.post("users/register", formData);
    console.log(res.data);
    toast.success("registered successfully");
    return res.data;
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
    return res.data.user;
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
      // toast.success(res.data);
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

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  const response = await axiosInstance.get("users/current-user");
  return response.data.data;
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
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });
  },
});

// export const { updateUser } = authSlice.actions;

export default authSlice.reducer;
