import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const result = await fetch("http://localhost:3000/auth/register", {
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
      const result = await fetch("http://localhost:3000/auth/login", {
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
      const result = await fetch("http://localhost:3000/users", {
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
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.loggedInUser = null;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload; // action.payload
        state.status = "success";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
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
export const { logoutUser } = usersSlice.actions;
