import React from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

const Login = () => {
	return (
		<Container>
			<Typography variant="h4">Login</Typography>
			<form>
				<TextField label="Email" fullWidth margin="normal" />
				<TextField
					label="Password"
					type="password"
					fullWidth
					margin="normal"
				/>
				<Button variant="contained" color="primary" type="submit">
					Login
				</Button>
			</form>
		</Container>
	);
};

export default Login;
