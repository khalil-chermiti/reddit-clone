import { useEffect, useState } from "react";
import styled from "styled-components";

import { userSignIn } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { useSelector } from "react-redux";
import { selectAuth } from "../redux/user/userSlice";

import {
  Container,
  FormLabel,
  Button,
  FormControl,
  Input,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ContainerWithBoxShadow = styled(Container)`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();
  const auth = useSelector(selectAuth);

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      userSignIn({
        username: userCredentials.username,
        password: userCredentials.password,
      })
    );
  };

  useEffect(() => {
    const getData = async () => {
      const data = await axiosPrivate
        .get("/user")
        .catch(err => console.log(err));
      console.log(data);
    };

    getData();
  }, [auth, axiosPrivate]);

  return (
    <ContainerWithBoxShadow width="md" mt="3rem" p="10" rounded="md" bg="white">
      <Heading fontSize={40}>sing in</Heading>

      <form onSubmit={handleSubmit}>
        <FormControl isRequired mt="50">
          <FormLabel htmlFor="username">username : </FormLabel>
          <Input
            id="username"
            borderColor="lightblue"
            name="username"
            type="username"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired mt="50">
          <FormLabel htmlFor="password">password : </FormLabel>
          <Input
            id="password"
            borderColor="lightblue"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </FormControl>
        <Container>
          <Text mt="2rem" textAlign="center">
            {" "}
            Not a reddittor ?{" "}
            <span
              style={{ color: "#3d9d9b", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Create account
            </span>
          </Text>
        </Container>
        <Button
          type="submit"
          mt="10"
          color="white"
          bg="redditOrange.300"
          _hover={{ bg: "redditOrange.100" }}
        >
          login
        </Button>
      </form>
    </ContainerWithBoxShadow>
  );
};

export default SignIn;
