import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/userSlice";
import { selectPosts } from "../redux/posts/postsSlice";

import Post from '../components/Post'

const HomePage = () => {
    const user = useSelector(selectCurrentUser);
    const posts = useSelector(selectPosts);
    return <div>
        {/* {user ? `hello ${user.name}`  : "hello visiter"} */}
        {posts.length ? posts.map(post => <Post {...post} />) : "no posts yet"}
    </div>;   
};

export default HomePage;
