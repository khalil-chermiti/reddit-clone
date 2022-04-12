import React from 'react';
import {Routes , Route} from 'react-router-dom' ;

import HomePage from './pages/Homepage';
import SignIn from './components/SignIn';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signin' element={<SignIn/>}/>
    </Routes>
  );
}

export default App;