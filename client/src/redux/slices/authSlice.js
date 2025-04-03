import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper to generate guest IDs
const generateGuestId = () => `guest_${new Date().getTime()}`;

// Get initial state from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialGuestId = localStorage.getItem("guestId") || generateGuestId();
localStorage.setItem("guestId", initialGuestId);

const initialState = {
  user: userInfoFromStorage?.user || null,
  token: userInfoFromStorage?.token || null,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        userData
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("userToken", data.token);
      return data; // Assume data = { user, token }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
        userData
      );
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Object.assign(state, initialState); // Reset entire state
      state.guestId = generateGuestId();
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId: (state) => {
      state.guestId = generateGuestId();
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;