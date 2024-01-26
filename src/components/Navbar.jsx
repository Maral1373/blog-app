import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import { Container } from "@mui/material";

const Navbar = () => {
	return (
		<>
			<AppBar
				position="relative"
				sx={{ height: "7rem", fontSize: "40px" }}
			>
				<Toolbar>
					<div style={{ flex: 1 }}>My Blog</div>
					<Button
						color="inherit"
						component={Link}
						sx={{ margin: 4, fontSize: "18px" }}
						to="/"
					>
						Home
					</Button>
					<Button
						color="inherit"
						component={Link}
						sx={{ margin: 4, fontSize: "18px" }}
						to="/login"
					>
						Login
					</Button>
					<Button
						color="inherit"
						component={Link}
						sx={{ margin: 4, fontSize: "18px" }}
						to="/register"
					>
						Register
					</Button>
					<Button
						color="inherit"
						component={Link}
						sx={{ margin: 4, fontSize: "18px" }}
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
