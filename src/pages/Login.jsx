import React, { useRef, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Box,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import theme from "../components/Theme";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/reducers/usersSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const errorMessage = useSelector((state) => state.users.error);
  const status = useSelector((state) => state.users.status);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(
      loginUser({ email: data.get("email"), password: data.get("password") })
    );
    formRef.current.reset();
  };

  useEffect(() => {
    if (loggedInUser) navigate("/");
  }, [loggedInUser]);

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
          Login
        </Typography>
        <Paper
          style={{
            margin: "auto",
            padding: "1rem",
          }}
        >
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <form onSubmit={onSubmit} ref={formRef}>
            <TextField label="Email" name="email" fullWidth margin="normal" />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: "8px" }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
