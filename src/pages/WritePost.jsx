import React from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

const WritePost = () => {
	return (
		<Container>
			<Typography variant="h4">Write Post</Typography>
			<TextField label="Title" fullWidth />
			<TextField label="Text" multiline rows={4} fullWidth />
			<Button variant="contained" color="primary">
				Publish
			</Button>
		</Container>
	);
};

export default WritePost;
