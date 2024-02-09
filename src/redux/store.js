import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./reducers/usersSlice";
import postsSlice from "./reducers/postsSlice";

export const store = configureStore({
	reducer: {
		users: usersSlice,
		posts: postsSlice,
	},
});
