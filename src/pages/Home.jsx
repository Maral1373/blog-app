import React from "react";
import { Container, Typography } from "@mui/material";
import PostsList from "../components/PostsList";
import { useSelector } from "react-redux";

const Home = ({ deletePost, likePost }) => {
	const posts = useSelector((state) => state.posts);
	console.log("post", posts);

	return (
		<Container>
			<Typography variant="h4" marginLeft={"2.7rem"}>
				Latest Posts
			</Typography>
			<PostsList
				posts={posts}
				deletePost={deletePost}
				likePost={likePost}
			/>
		</Container>
	);
};

export default Home;
