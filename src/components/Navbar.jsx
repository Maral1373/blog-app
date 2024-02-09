import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";

const Navbar = ({ logoutUser }) => {
	const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
	const loggedInUser = useSelector((state) => state.users.loggedInUser);

	return (
		<>
			<AppBar
				position="relative"
				sx={{ height: "7rem", fontSize: "40px" }}
			>
				<Toolbar>
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
						to="/write"
					>
						Write Post
					</Button>
					<div style={{ flex: 1 }} />
					{isAuthenticated ? (
						<>
							<Typography
								variant="h6"
								sx={{
									backgroundColor: "#747bff",
									padding: 1,
									borderTopLeftRadius: 4,
									borderBottomLeftRadius: 4,
								}}
							>
								Welcome
							</Typography>
							<Typography
								variant="h6"
								color="background"
								sx={{
									backgroundColor: "#747bff",
									padding: 1,
									borderTopRightRadius: 4,
									borderBottomRightRadius: 4,
								}}
							>
								{loggedInUser}
							</Typography>
							<Button
								color="inherit"
								sx={{ margin: 4, fontSize: "18px" }}
								onClick={logoutUser}
							>
								Logout
							</Button>
						</>
					) : (
						<>
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
								to="/login"
							>
								Login
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
			<Container component="main" sx={{ mt: 8 }}>
				<Outlet />
			</Container>
		</>
	);
};

export default Navbar;
