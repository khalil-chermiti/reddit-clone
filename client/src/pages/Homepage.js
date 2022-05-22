import React, { useEffect } from "react";
import styled from "styled-components";
import Post from "../components/post/Post";
import CreatePost from "../components/post/CreatePost";

import { selectPosts } from "../redux/posts/postsSlice";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux/posts/postsSlice";

const Wrapper = styled.div`
  width: 45%;
  margin: auto;

  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HomePage = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Wrapper>
      <CreatePost />
      {/* {user ? `hello ${user.name}`  : "hello visiter"} */}
      {posts.length
        ? posts.map(post => <Post key={post._id} {...post} />)
        : "no posts yet"}
    </Wrapper>
  );
};

export default HomePage;
