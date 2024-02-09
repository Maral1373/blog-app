import React from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { useRef } from "react";

const Login = ({ loginUser }) => {
	const formRef = useRef(null);
	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		loginUser(data.get("email"), data.get("password"));
		formRef.current.reset();
	};
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
