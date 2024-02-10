import React from "react";
import { Typography, Paper, IconButton, useTheme } from "@mui/material";
import { ThumbUp, ThumbDown, Delete } from "@mui/icons-material";

const Comments = ({ comments, deleteComment, likeComment }) => {
	const theme = useTheme();

	return (
		<>
			{comments.map((comment) => (
				<Paper
					key={comment.id}
					style={{
						margin: theme.spacing(1),
						padding: theme.spacing(1),
						backgroundColor: theme.palette.background.main,
						borderRadius: theme.spacing(1),
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					<Typography variant="body1">{comment.text}</Typography>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							marginTop: theme.spacing(1),
							bottom: theme.spacing(1),
							right: theme.spacing(1),
						}}
					>
						<IconButton
							color="success"
							onClick={() => likeComment(comment.id, "like")}
							size="large"
						>
							<ThumbUp />
						</IconButton>
						<Typography
							variant="subtitle1"
							style={{ marginLeft: 10 }}
						>
							{comment.like}
						</Typography>
						<IconButton
							style={{ marginLeft: 10 }}
							color="warning"
							onClick={() => likeComment(comment.id, "dislike")}
							size="large"
						>
							<ThumbDown />
						</IconButton>
						<Typography
							variant="subtitle1"
							style={{ marginLeft: 7 }}
						>
							{comment.dislike}
						</Typography>
						<IconButton
							color="default"
							onClick={() => deleteComment(comment.id)}
							size="small"
							style={{ marginLeft: 15 }}
						>
							<Delete />
						</IconButton>
					</div>
				</Paper>
			))}
		</>
	);
};

export default Comments;
