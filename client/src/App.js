import React, { useEffect } from 'react';
import {Routes , Route} from 'react-router-dom' ;

import {useDispatch} from 'react-redux';
import { userSignIn } from './redux/user/userSlice';

import { getPosts } from './redux/posts/postsSlice';

import HomePage from './pages/Homepage';
import Register from './pages/Register';
import SignIn from './components/SignIn';

import './App.css';
import Navbar from './components/Navbar';
import CreatePostIndex from './components/post/CreatePostIndex';
function App() {
  const dispatch = useDispatch();
  
  // TODO : CHECK USER SESSION 
  useEffect(()=>{
    dispatch(userSignIn());
    dispatch(getPosts());
  } , [dispatch]);

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/posts/create' element={<CreatePostIndex/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;