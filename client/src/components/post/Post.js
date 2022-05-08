import React from 'react'
import styled from 'styled-components'
import {ReactComponent as Downvote} from '../../assets/downvote.svg'
import {ReactComponent as Upvote} from '../../assets/upvote.svg'
import {ReactComponent as Comments} from '../../assets/comments.svg'

//post container
const Wrapper = styled.div`
    width:100%;
    background-color:#FFFFFF;
    display:flex;
    margin: 10px auto ;
    height:fit-content;

`
const Content = styled.nav`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    padding:2px;
    text-align:start;
`

const Votes = styled.div`
    display:flex;
    align-items:center;
    margin-right:1rem;
    flex-direction:column;
    & button:first-of-type svg:hover{
        stroke:#7F93D2;

    };
    & button:last-of-type svg:hover{
        stroke:#CE4614;
    };
    background-color:#F7F9FA;
`

const Button = styled.button`
    border-radius:.3em;
    width: 1.7em;
    height: 1.7em;
    & svg{
        stroke: #777;
        fill: transparent;
    };
    &:hover{
        background-color:#E0E2E3;
    }

`

const Comment = styled(Button)`
    display:flex;
    width: fit-content;
    align-items:center;
    font-weight:lighter;
    margin-top:.6rem;
    font-size:12px;
    padding: 0.3em;
    & svg{
        width: 1.7rem;
        height: 1.6rem;
    }
`


//post component
const Post = (props) => {
    const {upvotes,downvotes,title,community,comments,createdBy} = props;
  return (
    <Wrapper>
        <Votes>
            <Button><Upvote /></Button>
                <span>{upvotes - downvotes}</span>
            <Button><Downvote/></Button>
        </Votes>
        <Content>
            {/* // TODO: fetch community and the user from the API
            //dummy values */}
            <h3 style={{fontSize:"12px",fontWeight:"bold"}}>
                {community}<span style={{fontWeight:"normal",color:"grey"}}> posted by u/{createdBy}</span></h3>
            <h3>{title}</h3>
            <p>this is the post content which could be a long or a short text as well as
                pictures and videos 
            </p>
        <Comment>
            <Comments/>
            <p>{comments.length} Comments</p>
            
        </Comment>
        </Content>
    </Wrapper>
  )
}

export default Post ;
