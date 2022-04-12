import React from 'react';
import {Routes , Route} from 'react-router-dom' ;

import HomePage from './pages/Homepage';
import SignIn from './components/SignIn';

import './App.css';
import Navbar from './components/Navbar'
function App() {
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