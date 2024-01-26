import React from "react";
import { Container, Typography, Grid, Paper, IconButton } from "@mui/material";
import { ThumbUp, ThumbDown, Comment } from "@mui/icons-material";

const Home = () => {
  return (
    <Container>
      <Typography variant="h4">Latest Posts</Typography>
      <Grid container spacing={3}>
        {/* Map through posts and display them */}
        {/* Each post should have like/dislike, author, comments, etc. */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper style={{ padding: "1rem" }}>
            <Typography variant="h6">Post Title</Typography>
            <Typography variant="body1">Post Content</Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton color="secondary">
                <ThumbUp />
              </IconButton>
              <IconButton color="secondary">
                <ThumbDown />
              </IconButton>
              <IconButton color="primary">
                <Comment />
              </IconButton>
            </div>
            <Typography variant="subtitle2">Author: John Doe</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
