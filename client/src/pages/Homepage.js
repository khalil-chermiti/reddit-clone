import React from "react";
import styled from 'styled-components'
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/userSlice";
import { selectPosts } from "../redux/posts/postsSlice";
import CreatePost from '../components/CreatePost'
import Post from '../components/Post'

const Wrapper = styled.div`
    width:45%;
    margin:auto;
    
    height:100%;
    display:flex;
    flex-direction:column;


`

const HomePage = () => {
    const user = useSelector(selectCurrentUser);
    const posts = useSelector(selectPosts);
    return <Wrapper>
        <CreatePost/>
        {/* {user ? `hello ${user.name}`  : "hello visiter"} */}
        {posts.length ? posts.map(post => <Post {...post} />) : "no posts yet"}
    </Wrapper>;   
};

export default HomePage;
