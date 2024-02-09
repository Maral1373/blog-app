import React, { useRef } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";

const WritePost = ({ createPost }) => {
	const formRef = useRef(null);
	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		createPost(data.get("title"), data.get("text"), data.get("author"));
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
