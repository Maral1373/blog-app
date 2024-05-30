import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const writePost = createAsyncThunk(
  "posts/writePost",
  async ({ text, title, author, token }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, title, author }),
      });
      if (!result.ok || result.status !== 200)
        throw new Error("Network response was not ok");
      const data = await result.json();
      console.log("data writePost", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!result.ok || result.status !== 200)
        throw new Error("Network response was not ok");
      const data = await result.json();
      console.log("data getPosts", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
      });
      if (!result.ok || result.status !== 204) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/posts/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      if (!result.ok || result.status !== 200)
        throw new Error("Network response was not ok");
      const data = await result.json();
      console.log("data likePost", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const dislikePost = createAsyncThunk(
  "posts/dislikePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/posts/dislike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      if (!result.ok || result.status !== 200)
        throw new Error("Network response was not ok");
      const data = await result.json();
      console.log("data dislikePost", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(writePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(writePost.fulfilled, (state) => {
        state.status = "success";
        state.error = null;
      })
      .addCase(writePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(getPosts.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "idle";
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
    builder
      .addCase(deletePost.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
    builder
      .addCase(likePost.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(likePost.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(likePost.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
    builder
      .addCase(dislikePost.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(dislikePost.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(dislikePost.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default postsSlice.reducer;
