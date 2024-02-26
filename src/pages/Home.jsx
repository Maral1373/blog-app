import React, { useEffect, useState } from "react";
import {
	Container,
	Typography,
	MenuItem,
	Select,
	TextField,
	ThemeProvider,
	Box,
	CircularProgress,
	Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	deletePost,
	likePost,
	dislikePost,
} from "../redux/reducers/postsSlice";
import PostsList from "../components/PostsList";
import { getUsers } from "../redux/reducers/usersSlice";
import { getPosts } from "../redux/reducers/postsSlice";
import theme from "../components/Theme";

const Home = () => {
	const posts = useSelector((state) => state.posts.posts);
	const users = useSelector((state) => state.users.users);
	const [selectedUser, setSelectedUser] = useState("");
	const [search, setSearch] = useState("");
	const status = useSelector((state) => state.posts.status);
	const errorMessage = useSelector((state) => state.posts.error);
	const loggedInUser = useSelector((state) => state.users.loggedInUser);

	const dispatch = useDispatch();

	const handleDeletePost = async (postId) => {
		await dispatch(deletePost({ postId, token: loggedInUser.token }));
		dispatch(getPosts());
	};

	const handleLikePost = async (postId, type) => {
		if (type === "like") {
			await dispatch(likePost({ postId }));
		} else {
			await dispatch(dislikePost({ postId }));
		}
		dispatch(getPosts());
	};

	const handleChange = (event) => {
		setSelectedUser(event.target.value);
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		dispatch(getUsers());
		dispatch(getPosts());
	}, []);

	if (status === "loading") {
		return (
			<ThemeProvider theme={theme}>
				<Box sx={{ display: "flex" }}>
					<CircularProgress />
				</Box>
			</ThemeProvider>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<Container>
				<Typography variant="h4" marginBottom={2}>
					Latest Posts
				</Typography>
				<div
					style={{
						display: "flex",
						marginBottom: "10px",
						width: "66rem",
					}}
				>
					<Select
						value={selectedUser}
						onChange={handleChange}
						displayEmpty
						sx={{ flex: "1", marginLeft: "3rem" }}
					>
						<MenuItem value="">All Users</MenuItem>
						{users.map((user) => (
							<MenuItem key={user.id} value={user.username}>
								{user.username}
							</MenuItem>
						))}
					</Select>
					<TextField
						label="Search"
						variant="outlined"
						size="medium"
						value={search}
						onChange={handleSearch}
						sx={{ flex: "3" }}
					/>
				</div>
				<div
					style={{
						marginLeft: "3rem",
						marginBottom: "10px",
						width: "63rem",
					}}
				>
					{errorMessage && (
						<Alert severity="error">{errorMessage}</Alert>
					)}
				</div>
				<PostsList
					posts={posts}
					deletePost={handleDeletePost}
					likePost={handleLikePost}
					selectedUser={selectedUser}
					onSearch={search}
				/>
			</Container>
		</ThemeProvider>
	);
};

export default Home;
