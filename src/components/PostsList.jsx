import React from "react";
import { Container } from "@mui/material";
import PostItem from "./PostItem";

const PostsList = ({ posts, deletePost, likePost, selectedUser, onSearch }) => {
  const filteredPosts = selectedUser
    ? posts.filter((post) => post.author === selectedUser)
    : posts;
  const searchPost = onSearch
    ? filteredPosts.filter(
        (post) =>
          post.text.toLowerCase().includes(onSearch.toLowerCase()) ||
          post.title.toLowerCase().includes(onSearch.toLowerCase())
      )
    : filteredPosts;
  return (
    <Container>
      {searchPost.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          deletePost={deletePost}
          likePost={likePost}
          selectedUser={selectedUser}
        />
      ))}
    </Container>
  );
};

export default PostsList;
