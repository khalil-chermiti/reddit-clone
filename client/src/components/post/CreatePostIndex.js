import React from 'react'
import { Button } from '../Button'
import styled from 'styled-components'
const Wrapper = styled.div`
    width:50%;
    margin:50px auto;
    width:90vw;
    text-align:left;
    h3{
      border-bottom: 1px solid white;
      padding: 0.6rem;
    }
    select{
      height:40px;
      width:30vw;
      margin:.5rem;
    }

`
const PostContainer = styled.form`
  width:100%;
  display:flex;
  background-color:white;
  box-shadow: -2px 3px 11px -1px rgba(0,0,0,0.75);
  flex-direction:column;
  padding: 0.5rem;;
  border-radius: .3rem;
  input{
    height:40px;
    margin: 0.5rem;
    padding:.5rem;
    outline: 1px solid grey;
    border-radius:.3rem;
  }
  textarea{
    min-height:120px;
    padding: 0.5rem;
    margin: 0.5rem;
    outline: 1px solid grey;
    border-radius:.3rem;
  }


`


const CreatePostIndex = () => {

  return (
    <Wrapper>
        <h3>Create a post</h3>
        <select>
          <option>r/Community</option> 
          <option>r/Spotify</option>
        </select>
        <PostContainer>
          <input type='text' placeholder='Title' max={300}/>
          <textarea/>
          <Button type='submit'>Post</Button>
        </PostContainer>
    </Wrapper>
  )
}

export default CreatePostIndex 