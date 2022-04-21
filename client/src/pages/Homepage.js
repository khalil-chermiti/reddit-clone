import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/userSlice";

const HomePage = () => {
    const user = useSelector(selectCurrentUser);

    return <div>{user ? `hello ${user.name}`  : "hello visiter"}</div>;
    
};

export default HomePage;
