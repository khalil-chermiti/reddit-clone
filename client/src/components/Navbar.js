import React from 'react'
import {useNavigate} from 'react-router-dom'
import styled from "styled-components";
import { Button, LightButton } from "./Button";
import {ReactComponent as RedditLogo} from '../assets/logo.svg'
const Wrapper = styled.nav`
background-color:white;
height:50px;
display:flex;
align-items:center;
justify-content:space-between;
padding:0 1rem;
box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
input{
  height:70%;
  margin:.4em;
  width:60%;
  border-radius:.3em;
  background-color:#DAE0E6;
  border:none;
  &:hover , &:focus{
    outline-color : lightblue ;
    border : none ;
  }
}

input {
  padding-left: 2rem ;
}

svg{
  width:50px;
  padding:.4em;
  cursor:pointer;
}

`

const Navbar = () => {


  const navigate = useNavigate();
    const handleClick =()=>{
        navigate('/signin');
    }

  return (
    <Wrapper>
       <RedditLogo onClick={()=>{
         navigate('/')
       }}/>
       <input type="text" placeholder="Reddit Search..." />
       <div>

       <LightButton onClick={handleClick}>Log In</LightButton>
       <Button onClick={()=>navigate('/register')}>Sign Up</Button> 
       </div>
      
    </Wrapper>
  );
};

export default Navbar;
