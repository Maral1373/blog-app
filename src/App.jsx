import React from "react";
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
import { logoutUser } from "./redux/reducers/usersSlice";

const App = () => {
	const loggedInUser = useSelector((state) => state.users.loggedInUser);
	console.log("loggedUser", loggedInUser);
	const dispatch = useDispatch();

	const handleLogoutUser = () => {
		dispatch(logoutUser());
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<Navbar
								logoutUser={handleLogoutUser}
								loggedInUser={loggedInUser}
							/>
						}
					>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/write" element={<WritePost />} />
					</Route>
				</Routes>
			</Router>
		</ThemeProvider>
	);
};

export default App;
