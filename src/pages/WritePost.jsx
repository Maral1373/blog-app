import React, { useRef } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/reducers/postsSlice";

const WritePost = () => {
	const formRef = useRef(null);
	const dispatch = useDispatch();
	const loggedInUser = useSelector((state) => state.users.loggedInUser);

	const handleCreatePost = (title, text) => {
		dispatch(createPost({ title, text, author: loggedInUser.username }));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		handleCreatePost(data.get("title"), data.get("text"));
		formRef.current.reset();
	};

	return (
		<Container component="main" maxWidth="xs">
			<Typography variant="h4" marginBottom={"10px"}>
				Write Post
			</Typography>
			<Paper
				style={{
					margin: "auto",
					padding: "1rem",
				}}
			>
				<form onSubmit={onSubmit} ref={formRef}>
					<TextField
						label="Title"
						name="title"
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Text"
						name="text"
						multiline
						rows={8}
						fullWidth
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{ marginTop: "13px" }}
					>
						Publish
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default WritePost;
