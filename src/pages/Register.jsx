import React, { useEffect, useRef } from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	ThemeProvider,
	Paper,
	Alert,
	CircularProgress,
	Box,
} from "@mui/material";
import theme from "../components/Theme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetStatus } from "../redux/reducers/usersSlice";

const Register = () => {
	const dispatch = useDispatch();
	const formRef = useRef(null);
	const navigate = useNavigate();
	const errorMessage = useSelector((state) => state.users.error);
	const status = useSelector((state) => state.users.status);
	const registerStatus = useSelector((state) => state.users.registerStatus);

	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		dispatch(
			registerUser({
				username: data.get("username"),
				email: data.get("email"),
				password: data.get("password"),
			})
		);
		formRef.current.reset();
	};

	useEffect(() => {
		if (registerStatus === "success") navigate("/login");
		dispatch(resetStatus());
	}, [registerStatus]);

	if (status === "loading" || registerStatus === "loading") {
		return (
			<ThemeProvider theme={theme}>
				<Box sx={{ display: "flex" }}>
					<CircularProgress />
				</Box>
			</ThemeProvider>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<Typography variant="h4" marginBottom={"10px"}>
					Register
				</Typography>
				<Paper
					style={{
						margin: "auto",
						padding: "1rem",
					}}
				>
					{errorMessage && (
						<Alert severity="error">{errorMessage}</Alert>
					)}
					<form onSubmit={onSubmit} ref={formRef}>
						<TextField
							label="Username"
							name="username"
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Email"
							name="email"
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Password"
							name="password"
							type="password"
							fullWidth
							margin="normal"
						/>
						<Button
							variant="contained"
							color="primary"
							type="submit"
						>
							Register
						</Button>
					</form>
				</Paper>
			</Container>
		</ThemeProvider>
	);
};

export default Register;
