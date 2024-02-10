import React, { useRef, useEffect } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/reducers/usersSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const dispatch = useDispatch();
	const formRef = useRef(null);
	const navigate = useNavigate();
	const loggedInUser = useSelector((state) => state.users.loggedInUser);

	const handleLoginUser = (email, password) => {
		dispatch(loginUser({ email, password }));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		handleLoginUser(data.get("email"), data.get("password"));
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
