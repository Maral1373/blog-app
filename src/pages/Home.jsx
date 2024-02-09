import React from "react";
import { Container, Typography } from "@mui/material";
import PostsList from "../components/PostsList";
import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "./redux/reducers/postsSlice";

const Home = () => {
  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  const handleLikePost = (id, type) => {
    dispatch(likePost({ id, type }));
  };

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  console.log("post", posts);

  return (
    <Container>
      <Typography variant="h4" marginLeft={"2.7rem"}>
        Latest Posts
      </Typography>
      <PostsList
        posts={posts}
        deletePost={handleDeletePost}
        likePost={handleLikePost}
      />
    </Container>
  );
};

export default Home;
