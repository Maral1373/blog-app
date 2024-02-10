import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import PostsList from "../components/PostsList";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../redux/reducers/postsSlice";
import { Select, MenuItem } from "@mui/material";

const Home = () => {
	const posts = useSelector((state) => state.posts);
	const users = useSelector((state) => state.users.users);
	const [selectedUser, setSelectedUser] = useState("");
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

	return (
		<Container
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "flex-start",
			}}
		>
			<Typography variant="h4" marginBottom={2}>
				Latest Posts
			</Typography>
			<Select
				value={selectedUser}
				onChange={handleChange}
				style={{
					flex: "1",
					width: "380px",
				}}
			>
				<MenuItem value="">All Users</MenuItem>
				{users.map((user) => (
					<MenuItem key={user.id} value={user.username}>
						{user.username}
					</MenuItem>
				))}
			</Select>
			<PostsList
				posts={posts}
				deletePost={handleDeletePost}
				likePost={handleLikePost}
				selectedUser={selectedUser}
			/>
		</Container>
	);
};

export default Home;
