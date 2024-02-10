import React, { useRef } from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	ThemeProvider,
	Paper,
} from "@mui/material";
import theme from "../components/Theme";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/reducers/usersSlice";

const Register = () => {
	const dispatch = useDispatch();
	const formRef = useRef(null);
	const navigate = useNavigate();

	const handleRegisterUser = (username, email, password) => {
		dispatch(registerUser({ username, email, password }));
		navigate("/login");
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		handleRegisterUser(
			data.get("username"),
			data.get("email"),
			data.get("password")
		);
		formRef.current.reset();
	};

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
