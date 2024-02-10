import React, { useState } from "react";
import { Container, Typography, Paper, IconButton } from "@mui/material";
import { ThumbUp, ThumbDown, Comment, Delete } from "@mui/icons-material";
import WriteComment from "../components/WriteComment";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, likeComment } from "../redux/reducers/commentsSlice";

const PostItem = ({ post, deletePost, likePost }) => {
	const [toggleComment, setToggleComment] = useState(false);
	const comments = useSelector((state) => state.comments);
	const dispatch = useDispatch();

	const handleDeleteComment = (id) => {
		dispatch(deleteComment(id));
	};

	const handleLikeComment = (id, type) => {
		dispatch(likeComment({ id, type }));
	};

	return (
		<Container style={{ marginBottom: "30px", float: "left" }}>
			<Paper
				key={post.id}
				style={{
					padding: "5rem",
					position: "relative",
					height: "380px",
					overflowY: "auto",
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
					<Typography variant="subtitle1" style={{ marginLeft: 10 }}>
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
					<Typography variant="subtitle1" style={{ marginLeft: 7 }}>
						{post.dislike}
					</Typography>
					<IconButton
						onClick={() => setToggleComment(!toggleComment)}
						color="info"
						size="large"
						style={{ marginLeft: 15 }}
					>
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
						top: "5px",
						right: "5px",
						margin: 30,
						fontSize: 16,
					}}
				>
					Author: {post.author}
				</Typography>
				{toggleComment && (
					<>
						<WriteComment
							hide={() => setToggleComment(false)}
							postId={post.id}
						/>
					</>
				)}
				<Comments
					comments={comments.filter(
						(comment) => comment.postId === post.id
					)}
					deleteComment={handleDeleteComment}
					likeComment={handleLikeComment}
				/>
			</Paper>
		</Container>
	);
};

export default PostItem;
