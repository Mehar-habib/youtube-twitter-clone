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

export const updateAvatar = createAsyncThunk("updateAvatar", async (avatar) => {
  try {
    const response = await axiosInstance.patch("users/update-avatar", avatar);
    toast.success("Avatar updated successfully");
    return response.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    throw error;
  }
});

export const updateCoverImg = createAsyncThunk(
  "updateCoverImg",
  async (coverImage) => {
    try {
      const response = await axiosInstance.patch(
        "users/update-cover-img",
        coverImage
      );
      toast.success("Cover image updated successfully");
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);
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
    builder.addCase(updateAvatar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateAvatar.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateCoverImg.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCoverImg.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateCoverImg.rejected, (state) => {
      state.loading = false;
    });
  },
});

// export const { updateUser } = authSlice.actions;

export default authSlice.reducer;
