import React, { useRef } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { useSelector } from "react-redux";
const WritePost = ({ createPost }) => {
	const loggedInUser = useSelector((state) => state.users.loggedInUser);

	const formRef = useRef(null);
	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		createPost(data.get("title"), data.get("text"), loggedInUser.username);
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
