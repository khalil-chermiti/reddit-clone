import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/userSlice";
import Post from '../components/Post'
const HomePage = () => {
    const user = useSelector(selectCurrentUser);

    return (
    <div>
        <div>{user ? `hello ${user.name}`  : "hello visiter"}</div>
    </div>
    )
    
};

export default HomePage;
