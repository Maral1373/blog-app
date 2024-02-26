import React, { useRef } from "react";
import {
	Container,
	TextField,
	Button,
	Paper,
	ThemeProvider,
	Box,
	CircularProgress,
	Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import theme from "../components/Theme";
import { addComment, getComments } from "../redux/reducers/commentsSlice";

const WriteComment = ({ hide, postId }) => {
	const formRef = useRef(null);
	const dispatch = useDispatch();
	const errorMessage = useSelector((state) => state.comments.error);
	const status = useSelector((state) => state.comments.status);
	const loggedInUser = useSelector((state) => state.users.loggedInUser);

	const onSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		await dispatch(
			addComment({
				text: data.get("text"),
				postId,
				token: loggedInUser.token,
			})
		);
		dispatch(getComments({ postId }));
		hide();
		formRef.current.reset();
	};

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
			<Container component="main" maxWidth="xs">
				<Paper
					style={{
						margin: "auto",
						padding: "1rem",
					}}
				>
					{errorMessage && (
						<Alert severity="error">{errorMessage}</Alert>
					)}
					<form onSubmit={onSubmit} ref={formRef}>
						<TextField
							label="Text"
							name="text"
							multiline
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
		</ThemeProvider>
	);
};

export default WriteComment;
