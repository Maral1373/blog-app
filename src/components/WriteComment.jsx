import React, { useRef } from "react";
import { Container, TextField, Button, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/reducers/commentsSlice";

const WriteComment = ({ hide, postId }) => {
	const formRef = useRef(null);
	const dispatch = useDispatch();

	const handleCreateComment = (text) => {
		dispatch(addComment({ text, postId }));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		handleCreateComment(data.get("text"));
		formRef.current.reset();
		hide();
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper
				style={{
					margin: "auto",
					padding: "1rem",
				}}
			>
				<form onSubmit={onSubmit} ref={formRef}>
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

export default WriteComment;
