import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { getUserDataError, getUserDataSuccess } from "./redux/user/userSlice";

import HomePage from "./pages/Homepage";
import Register from "./pages/Register";
import SignIn from "./components/SignIn";

import "./App.css";
import Navbar from "./components/Navbar";
import CreatePostIndex from "./components/post/CreatePostIndex";
import useAuth from "./hooks/useAuth";
function App() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get("/user");
        if (response?.data?.user)
          dispatch(getUserDataSuccess(response?.data?.user));
      } catch (err) {
        dispatch(getUserDataError(err));
      }
    };

    getData();
  }, [auth, axiosPrivate, dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/posts/create" element={<CreatePostIndex />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
