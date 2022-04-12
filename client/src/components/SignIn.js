import { useState } from "react";

import {
    Container,
    FormLabel,
    Button,
    FormControl,
    Input,
    Heading,
} from "@chakra-ui/react";

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
        <Container width="md" mt="100">
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

            <Button type="submit" mt="10" color="white" bg="redditOrange.300" _hover={{bg: "redditOrange.100"}}>
                login
            </Button>
        </Container>
    );
};

export default SignIn;
