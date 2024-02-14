import React, { useRef, useState } from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	ThemeProvider,
	Paper,
	Alert,
} from "@mui/material";
import theme from "../components/Theme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/reducers/usersSlice";

const Register = () => {
	const dispatch = useDispatch();
	const formRef = useRef(null);
	const navigate = useNavigate();
	const users = useSelector((state) => state.users.users);
	const [errorMessage, setErrorMessage] = useState("");

	const handleRegisterUser = (username, email, password) => {
		const userExist = users.find(
			(user) => user.username === username || user.email === email
		);
		if (userExist) {
			setErrorMessage("User is already registered");
			return;
		}
		if (`${password}`.length < 8) {
			setErrorMessage("Password must be 8 or more characters");
			return;
		}
		dispatch(registerUser({ username, email, password }));
		navigate("/login");
	};

	const testRegisterUser = async (username, email, password) => {
	    try {
		    const result = await fetch('http://localhost:3000/auth/register', {
			method: 'POST',
			headers: {
			    'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, email, password })
		    })
		    const data = await result.json()
		    console.log(`response from backend: ${data}`)
	    } catch(e) {
		    console.log('oopsi happened', e)
	    }
	}

	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		// handleRegisterUser(
		// 	data.get("username"),
		// 	data.get("email"),
		// 	data.get("password")
		// );
		testRegisterUser(data.get("username"),data.get("email"),data.get("password"))
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
