import React from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	ThemeProvider,
	Paper,
} from "@mui/material";
import theme from "../components/Theme";

const Register = () => {
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
					<form>
						<TextField label="Username" fullWidth margin="normal" />
						<TextField label="Email" fullWidth margin="normal" />
						<TextField
							label="Password"
							type="password"
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Confirm Password"
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
