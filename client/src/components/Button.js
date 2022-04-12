import styled from 'styled-components'

const Button = styled.button`
    padding:.4em 2em;
    font-size:16px;
    margin:.4em;
    border:1px solid #037AD3;
    width:fit-content;
    background-color:#037AD3;
    color:#FFFFFF;
    border-radius:1000px;

    &:hover , &:focus{
        background-color:#1483D6;
        color:#FFFFFF;
    }
`
 const LightButton = styled(Button)`
     background-color:#FFFFFF;
     color:#037AD3;
     &:hover , &:focus{
         background-color:#F4F9FD;
         color:#037AD3;
     }
 `




export  {Button,LightButton}