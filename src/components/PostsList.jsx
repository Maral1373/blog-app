import React from "react";
import { Container } from "@mui/material";
import PostItem from "./PostItem";

const PostsList = ({ posts, deletePost, likePost, selectedUser }) => {
	const filteredPosts = selectedUser
		? posts.filter((post) => post.author === selectedUser)
		: posts;

	return (
		<Container>
			{filteredPosts.map((post) => (
				<PostItem
					key={post.id}
					post={post}
					deletePost={deletePost}
					likePost={likePost}
					selectedUser={selectedUser}
				/>
			))}
		</Container>
	);
};

export default PostsList;
