import React, { useRef, useEffect, useState } from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	Paper,
	Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/reducers/usersSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const dispatch = useDispatch();
	const formRef = useRef(null);
	const navigate = useNavigate();
	const loggedInUser = useSelector((state) => state.users.loggedInUser);
	const users = useSelector((state) => state.users.users);
	const [errorMessage, setErrorMessage] = useState("");
	console.log("users", users);
	const handleLoginUser = (email, password) => {
		const auth = users.find(
			(user) => user.email === email && user.password === password
		);
		if (!auth) {
			setErrorMessage("email or password incorrect");
			return;
		}
		dispatch(loginUser({ email, password }));
	};

	const testLoginUser = async (email, password) => {
	    try {
		    const result = await fetch('http://localhost:3000/auth/login', {
			method: 'POST',
			headers: {
			    'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
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
		// handleLoginUser(data.get("email"), data.get("password"));
		testLoginUser(data.get("email"), data.get("password"))
		formRef.current.reset();
	};

	useEffect(() => {
		if (loggedInUser) navigate("/");
	}, [loggedInUser]);

	return (
		<Container component="main" maxWidth="xs">
			<Typography variant="h4" marginBottom={"10px"}>
				Login
			</Typography>
			<Paper
				style={{
					margin: "auto",
					padding: "1rem",
				}}
			>
				{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
				<form onSubmit={onSubmit} ref={formRef}>
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
						sx={{ marginTop: "8px" }}
					>
						Login
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default Login;
