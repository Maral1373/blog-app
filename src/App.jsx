import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/Theme";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WritePost from "./pages/WritePost";
import Home from "./pages/Home";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import {
	registerUser,
	loginUser,
	logoutUser,
} from "./redux/reducers/usersSlice";
import { createPost, deletePost, likePost } from "./redux/reducers/postsSlice";

const App = () => {
	const users = useSelector((state) => state.users.users);
	const loggedInUser = useSelector((state) => state.users.loggedInUser);
	console.log("loggedUser", loggedInUser);
	const dispatch = useDispatch();

	const handleRegisterUser = (username, email, password) => {
		dispatch(registerUser({ username, email, password }));
	};

	const handleLoginUser = (email, password) => {
		dispatch(loginUser({ email, password }));
	};

	const handleLogoutUser = () => {
		dispatch(logoutUser());
	};

	const handleCreatePost = (title, text) => {
		dispatch(createPost({ title, text, author: loggedInUser }));
	};

	const handleDeletePost = (id) => {
		dispatch(deletePost(id));
	};

	const handleLikePost = (id, type) => {
		dispatch(likePost({ id, type }));
	};

	useEffect(() => {
		console.log("users", users);
	}, [users]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Routes>
					<Route
						path="/"
						element={<Navbar logoutUser={handleLogoutUser} />}
					>
						<Route
							path="/"
							element={
								<Home
									users={users}
									deletePost={handleDeletePost}
									likePost={handleLikePost}
								/>
							}
						/>
						<Route
							path="/login"
							element={<Login loginUser={handleLoginUser} />}
						/>
						<Route
							path="/register"
							element={
								<Register registerUser={handleRegisterUser} />
							}
						/>
						<Route
							path="/write"
							element={
								<WritePost createPost={handleCreatePost} />
							}
						/>
					</Route>
				</Routes>
			</Router>
		</ThemeProvider>
	);
};

export default App;
