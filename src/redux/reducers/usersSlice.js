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
			const { email, password } = action.payload;
			const user = state.users.find(
				(user) => user.email === email && user.password === password
			);
			if (user) {
				state.loggedInUser = user;
			} else {
				state.loggedInUser = null;
			}
		},
		logoutUser: (state) => {
			state.loggedInUser = null;
		},
	},
});
export default usersSlice.reducer;
export const { registerUser, loginUser, logoutUser } = usersSlice.actions;
