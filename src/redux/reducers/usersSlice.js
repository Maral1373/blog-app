import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
		loggedInUser: null,
	},
	reducers: {
		registerUser: (state, action) => {
			state.users.push({
				id: Math.floor(Math.random() * 10000),
				username: action.payload.username,
				email: action.payload.email,
				password: action.payload.password,
			});
		},
		loginUser: (state, action) => {
			const user = state.users.find(
				(user) =>
					user.email === action.payload.email &&
					user.password === action.payload.password
			);
			if (user) {
				state.loggedInUser = user;
				return state;
			} else {
				state.loggedInUser = null;
				return state;
			}
		},
		logoutUser: (state) => {
			state.loggedInUser = null;
		},
	},
});

export default usersSlice.reducer;
export const { registerUser, loginUser, logoutUser } = usersSlice.actions;
