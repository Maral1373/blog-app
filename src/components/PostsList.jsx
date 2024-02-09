import React from "react";
import { Container, Typography, Paper, IconButton, Box } from "@mui/material";
import { ThumbUp, ThumbDown, Comment, Delete } from "@mui/icons-material";

const PostsList = ({ posts, deletePost, likePost }) => {
	return (
		<Container>
			{posts.map((post) => (
				<Paper
					key={post.id}
					style={{
						margin: "1rem",
						padding: "2rem",
						position: "relative",
					}}
				>
					<Typography variant="h6">Title: {post.title}</Typography>
					<Typography variant="body1">Text: {post.text}</Typography>

					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginTop: 20,
						}}
					>
						<IconButton
							color="success"
							onClick={() => likePost(post.id, "like")}
							size="large"
						>
							<ThumbUp />
						</IconButton>
						<Typography
							variant="subtitle1"
							style={{ marginLeft: 10 }}
						>
							{post.like}
						</Typography>
						<IconButton
							style={{ marginLeft: 10 }}
							color="warning"
							onClick={() => likePost(post.id, "dislike")}
							size="large"
						>
							<ThumbDown />
						</IconButton>
						<Typography
							variant="subtitle1"
							style={{ marginLeft: 7 }}
						>
							{post.dislike}
						</Typography>
						<IconButton color="info" size="large">
							<Comment />
						</IconButton>
						<IconButton
							color="error"
							onClick={() => deletePost(post.id)}
							size="large"
						>
							<Delete />
						</IconButton>
					</div>
					<Typography
						variant="subtitle2"
						style={{
							position: "absolute",
							bottom: "5px",
							right: "5px",
							margin: 30,
							fontSize: 16,
						}}
					>
						Author: {post.author}
					</Typography>
				</Paper>
			))}
		</Container>
	);
};

export default PostsList;
