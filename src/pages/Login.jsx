import React from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";

const Login = () => {
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
				<form>
					<TextField label="Email" fullWidth margin="normal" />
					<TextField
						label="Password"
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
