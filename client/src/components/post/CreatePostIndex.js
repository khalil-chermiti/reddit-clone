import React,{useState} from 'react'
import { Button } from '../Button'
import styled from 'styled-components'
import { addPost, selectShowAlert } from '../../redux/posts/postsSlice'
import {useDispatch, useSelector} from 'react-redux'
import Alert from '../Alert'
const Wrapper = styled.div`
    width:50%;
    
    margin:50px auto;
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
  const showAlert = useSelector(selectShowAlert);
  
  
  return (
    <><Wrapper>
        <h3>Create a post</h3>
        <select onChange={(e) => {
          setCommunity(e.target.value)
        } }>
          <option disabled default selected>select the community</option>
          <option>r/Community</option>
          <option>r/Spotify</option>
        </select>
        <PostContainer>
          {showAlert && <Alert />}
          <input type='text' placeholder='Title'
            onChange={(e) => {
              setTitle(e.target.value)
            } } />
          <textarea onChange={(e) => {
            setContent(e.target.value)
          } } />
          <Button type='submit'
            onClick={() => {
              dispatch(addPost({ title, content, community }))
            } }>Post</Button>
        </PostContainer>
      </Wrapper>
      </>)
  }


export default CreatePostIndex 