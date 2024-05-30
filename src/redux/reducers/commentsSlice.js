import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ text, postId, token }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, postId }),
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

export const getComments = createAsyncThunk(
  "comments/getComments",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/comments/${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!result.ok || result.status !== 200)
        throw new Error("Network response was not ok");
      const data = await result.json();
      console.log("data getComments", data);
      return { postId, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ commentId, token }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!result.ok || result.status !== 204) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async ({ commentId }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/comments/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });
      if (!result.ok || result.status !== 200)
        throw new Error("Network response was not ok");
      const data = await result.json();
      console.log("data likeComment", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const dislikeComment = createAsyncThunk(
  "comments/dislikeComment",
  async ({ commentId }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/comments/dislike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });
      if (!result.ok || result.status !== 200)
        throw new Error("Network response was not ok");
      const data = await result.json();
      console.log("data dislikeComment", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.status = "success";
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(getComments.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.status = "idle";
        state.comments[action.payload.postId] = action.payload.data;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });

    builder
      .addCase(deleteComment.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
    builder
      .addCase(likeComment.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(likeComment.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
    builder
      .addCase(dislikeComment.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(dislikeComment.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(dislikeComment.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default commentsSlice.reducer;
