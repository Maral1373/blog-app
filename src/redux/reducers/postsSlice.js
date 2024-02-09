import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
	name: "posts",
	initialState: [],
	reducers: {
		createPost: (state, action) => {
			state.push({
				id: Math.floor(Math.random() * 10000),
				title: action.payload.title,
				text: action.payload.text,
				author: action.payload.author,
				like: 0,
				dislike: 0,
			});
		},
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
	},
});

export default postsSlice.reducer;
export const { createPost, deletePost, likePost } = postsSlice.actions;
