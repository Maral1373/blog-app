import React, { useState } from "react";
import {
	Container,
	Typography,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../redux/reducers/postsSlice";
import PostsList from "../components/PostsList";

const Home = () => {
	const posts = useSelector((state) => state.posts);
	const users = useSelector((state) => state.users.users);
	const [selectedUser, setSelectedUser] = useState("");
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();

	const handleDeletePost = (id) => {
		dispatch(deletePost(id));
	};

	const handleLikePost = (id, type) => {
		dispatch(likePost({ id, type }));
	};

	const handleChange = (event) => {
		setSelectedUser(event.target.value);
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	return (
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
			<PostsList
				posts={posts}
				deletePost={handleDeletePost}
				likePost={handleLikePost}
				selectedUser={selectedUser}
				onSearch={search}
			/>
		</Container>
	);
};

export default Home;
