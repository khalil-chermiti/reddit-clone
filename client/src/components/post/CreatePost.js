import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {ReactComponent as UserIcon} from '../../assets/user-account.svg'

const Wrapper = styled.div`
    width:100%;
    padding: 0.3em ;
    background-color: #FFFFFF;
    height:60px;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    margin:30px auto;
    border-radius:.3em;
    input{
        
  height:90%;
  margin:0;
  width:90%;
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
    width:40px;
    height:40px;
}

`


const CreatePost = () => {
    const navigate = useNavigate();
    const handleClick = ()=>{
       navigate('/posts/create');
    }
  return (
    <Wrapper>
        <UserIcon/>
        <input type="text" placeholder='Create Post' onClick={()=>{handleClick()}}/>
    </Wrapper>
  )
}

export default CreatePost