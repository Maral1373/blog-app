import React from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	ThemeProvider,
} from "@mui/material";
import theme from "../components/Theme";
import { Flare } from "@material-ui/icons";

const Register = () => {
	return (
		<ThemeProvider theme={theme}>
			<Container
				component="main"
				maxWidth="xs"
				position="fixed"
				sx={{
					backgroundColor: theme.palette.background.default,
					color: theme.palette.text.default,
					display: "flex",
				}}
			>
				<Typography variant="h4">
					Register
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
				</Typography>
			</Container>
		</ThemeProvider>
	);
};

export default Register;
