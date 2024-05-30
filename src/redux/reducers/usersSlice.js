import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });
      if (!result.ok || result.status !== 200)
        throw new Error("Network response was not ok");
      const data = await result.json();
      console.log("data registerUser", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!result.ok || result.status !== 200)
        throw new Error("Network response was not ok");
      const data = await result.json();
      console.log("data loginUser", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!result.ok || result.status !== 200)
        throw new Error("Network response was not ok");
      const data = await result.json();
      console.log("data getUsers", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loggedInUser: null,
    status: "idle",
    loginStatus: "idle",
    registerStatus: "idle",
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.registerStatus = "idle";
      state.loginStatus = "idle";
      state.status = "idle";
    },
    logoutUser: (state) => {
      state.loggedInUser = null;
      state.error = null;
      state.status = "idle";
      state.registerStatus = "idle";
      state.loginStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerStatus = "success";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.registerStatus = "failed";
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload; // action.payload
        state.loginStatus = "success";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loginStatus = "failed";
      });

    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload; // action.payload
        state.status = "success";
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});
export default usersSlice.reducer;
export const { logoutUser, resetStatus } = usersSlice.actions;
