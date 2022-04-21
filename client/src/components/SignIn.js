import { useState } from "react";

import styled from "styled-components";

import {
    Container,
    FormLabel,
    Button,
    FormControl,
    Input,
    Heading,
    Text ,
    Link
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ContainerWithBoxShadow = styled(Container)`
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`

const SignIn = () => {
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: "",
    });

    

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <ContainerWithBoxShadow width="md" mt="3rem" p='10' rounded='md' bg='white' >
            <Heading fontSize={40}>sing in</Heading>

            <FormControl isRequired mt="50">
                <FormLabel htmlFor="email">Email address : </FormLabel>
                <Input
                    id="email"
                    borderColor="lightblue"
                    name="email"
                    type="email"
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
                <Text mt="2rem" textAlign='center'> Not a reddittor ? {' '}
                    <Link color='teal.500' href='#'>
                        Create account
                    </Link>
                </Text>
            </Container>
            <Button type="submit" mt="10" color="white" bg="redditOrange.300" _hover={{bg: "redditOrange.100"}}>
                login
            </Button>
        </ContainerWithBoxShadow>
    );
};

export default SignIn;
