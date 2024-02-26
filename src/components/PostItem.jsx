import React, { useEffect, useState } from "react";
import {
	Container,
	Typography,
	Paper,
	IconButton,
	ThemeProvider,
	CircularProgress,
	Box,
	Alert,
} from "@mui/material";
import { ThumbUp, ThumbDown, Comment, Delete } from "@mui/icons-material";
import WriteComment from "../components/WriteComment";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteComment,
	likeComment,
	dislikeComment,
	getComments,
} from "../redux/reducers/commentsSlice";
import theme from "../components/Theme";

const PostItem = ({ post, deletePost, likePost }) => {
	const [toggleComment, setToggleComment] = useState(false);
	const comments = useSelector((state) => state.comments.comments);
	const loggedInUser = useSelector((state) => state.users.loggedInUser);
	const status = useSelector((state) => state.comments.status);
	const errorMessage = useSelector((state) => state.comments.error);

	const dispatch = useDispatch();

	const handleDeleteComment = async (commentId) => {
		await dispatch(deleteComment({ commentId, token: loggedInUser.token }));
		dispatch(getComments({ postId: post.id }));
	};

	const handleLikeComment = async (commentId, type) => {
		if (type === "like") {
			await dispatch(likeComment({ commentId }));
		} else {
			console.log("should dislike");
			await dispatch(dislikeComment({ commentId }));
		}
		dispatch(getComments({ postId: post.id }));
	};

	useEffect(() => {
		dispatch(getComments({ postId: post.id }));
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
						<Typography
							variant="subtitle1"
							style={{ marginLeft: 10 }}
						>
							{post.likes}
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
							{post.dislikes}
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
					{errorMessage && (
						<Alert severity="error">{errorMessage}</Alert>
					)}
					<Comments
						comments={comments[post.id] || []}
						deleteComment={handleDeleteComment}
						likeComment={handleLikeComment}
					/>
				</Paper>
			</Container>
		</ThemeProvider>
	);
};

export default PostItem;
