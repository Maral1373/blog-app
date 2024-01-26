import React from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";

const WritePost = () => {
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
				<TextField label="Title" fullWidth margin="normal" />
				<TextField label="Text" multiline rows={8} fullWidth />
				<Button
					variant="contained"
					color="primary"
					sx={{ marginTop: "13px" }}
				>
					Publish
				</Button>
			</Paper>
		</Container>
	);
};

export default WritePost;
