import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
	name: "comments",
	initialState: [],
	reducers: {
		addComment: (state, action) => {
			state.push({
				id: Math.floor(Math.random() * 10000),
				text: action.payload.text,
				postId: action.payload.postId,
				like: 0,
				dislike: 0,
			});
		},
		deleteComment: (state, action) => {
			return state.filter((comment) => comment.id !== action.payload);
		},
		likeComment: (state, action) => {
			return state.map((comment) => {
				if (comment.id === action.payload.id) {
					return {
						...comment,
						[action.payload.type]: comment[action.payload.type] + 1,
					};
				} else {
					return comment;
				}
			});
		},
		// editComment: (state, action) => {},
	},
});

export default commentsSlice.reducer;
export const { addComment, deleteComment, likeComment } = commentsSlice.actions;
