import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
		isAuthenticated: false,
		isLoggedIn: {},
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
		isLoggedIn: (state, action) => {
			const user = state.users.find(
				(user) =>
					user.email === action.payload.email &&
					user.password === action.payload.password
			);
			if (user) {
				state.isAuthenticated = true;
				state.isLoggedIn = user;
				state.loggedInUser = user.username;
				return state;
			} else {
				state.isAuthenticated = false;
				state.isLoggedIn = {};
				state.loggedInUser = null;
				return state;
			}
		},
		logoutUser: (state) => {
			state.isAuthenticated = false;
			state.loggedInUser = null;
		},
	},
});

export default usersSlice.reducer;
export const { registerUser, isLoggedIn, logoutUser } = usersSlice.actions;
