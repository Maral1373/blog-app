import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Outlet, Link } from "react-router-dom";
import { Container } from "@material-ui/core";

const Navbar = () => {
	return (
		<>
			<AppBar position="fixed">
				<Toolbar>
					<div style={{ flex: 1 }}>My Blog</div>
					<Button
						color="inherit"
						component={Link}
						sx={{ marginRight: 2 }}
						to="/"
					>
						Home
					</Button>
					<Button
						color="inherit"
						component={Link}
						sx={{ marginRight: 2 }}
						to="/login"
					>
						Login
					</Button>
					<Button
						color="inherit"
						component={Link}
						sx={{ marginRight: 2 }}
						to="/register"
					>
						Register
					</Button>
					<Button
						color="inherit"
						component={Link}
						sx={{ marginRight: 2 }}
						to="/write"
					>
						Write Post
					</Button>
				</Toolbar>
			</AppBar>
			<Container component="main" sx={{ mt: 8 }}>
				<Outlet />
			</Container>
		</>
	);
};

export default Navbar;
