import React, { useEffect } from 'react';
import {Routes , Route} from 'react-router-dom' ;

import {useDispatch, useSelector} from 'react-redux';
import { selectCurrentUser, userSignIn } from './redux/user/userSlice';

import HomePage from './pages/Homepage';
import SignIn from './components/SignIn';

import './App.css';
import Navbar from './components/Navbar';

function App() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  
  // TODO : CHECK USER SESSION 
  useEffect(()=>{
    dispatch(userSignIn());
  } , []);

  console.log(user);
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signin' element={<SignIn/>}/>
      </Routes>
    </div>
  );
}

export default App;