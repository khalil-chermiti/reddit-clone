import React,{useState} from 'react'
import { Button } from '../Button'
import styled from 'styled-components'
import { addPost } from '../../redux/posts/postsSlice'
import {useDispatch} from 'react-redux'

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
const PostContainer = styled.div`
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
  const dispatch = useDispatch();
  const [content,setContent] = useState('');
  const [title,setTitle] = useState('');
  const [community,setCommunity] = useState('');

  return (
    <Wrapper>
        <h3>Create a post</h3>
        <select onChange={(e)=>{
          setCommunity(e.target.value)
        }}>
          <option>r/Community</option> 
          <option>r/Spotify</option>
        </select>
        <PostContainer>
          <input type='text' placeholder='Title' max={300}
          onChange={(e)=>{
          setTitle(e.target.value)
        }}/>
          <textarea onChange={(e)=>{
          setContent(e.target.value)
        }}/>
          <Button type='submit'
          onClick={()=>{
            dispatch(addPost({title,content,community}))
          }}>Post</Button>
        </PostContainer>
    </Wrapper>
  )
}

export default CreatePostIndex 