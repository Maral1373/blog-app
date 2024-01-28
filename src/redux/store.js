import { configureStore } from "@reduxjs/toolkit";
import createUserSlice from "./reducers/createUserSlice";

export const store = configureStore({
	reducer: {
		users: createUserSlice,
	},
});
