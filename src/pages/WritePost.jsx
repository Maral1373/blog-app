import React, { useRef, useEffect } from "react";
import {
  Alert,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  ThemeProvider,
  Box,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { writePost } from "../redux/reducers/postsSlice";
import theme from "../components/Theme";
import { useNavigate } from "react-router-dom";

const WritePost = () => {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const errorMessage = useSelector((state) => state.posts.error);
  const status = useSelector((state) => state.posts.status);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(
      writePost({
        title: data.get("title"),
        text: data.get("text"),
        author: loggedInUser.username,
        token: loggedInUser.token,
      })
    );
    formRef.current.reset();
  };

  useEffect(() => {
    if (status === "success") navigate("/");
  }, [status]);

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
        <Typography variant="h4" marginBottom={"10px"}>
          Write Post
        </Typography>
        <Paper
          style={{
            margin: "auto",
            padding: "1rem",
          }}
        >
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <form onSubmit={onSubmit} ref={formRef}>
            <TextField label="Title" name="title" fullWidth margin="normal" />
            <TextField label="Text" name="text" multiline rows={8} fullWidth />
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

export default WritePost;
