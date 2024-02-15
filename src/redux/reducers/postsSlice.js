import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const writePost = createAsyncThunk(
  "posts/writePost",
  async ({ text, title, author, token }, { rejectWithValue }) => {
    try {
      const result = await fetch("http://localhost:3000/posts", {
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
      const result = await fetch("http://localhost:3000/posts", {
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

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    deletePost: (state, action) => {
      return state.filter((post) => post.id !== action.payload);
    },
    likePost: (state, action) => {
      return state.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            [action.payload.type]: post[action.payload.type] + 1,
          };
        } else {
          return post;
        }
      });
    },
    // editPost: (state, action) => {},
  },
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
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload; // action.payload
        state.status = "idle";
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default postsSlice.reducer;
export const { deletePost, likePost } = postsSlice.actions;
