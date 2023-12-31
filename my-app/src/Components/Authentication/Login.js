import React, { useState } from "react";
import {
  Stack,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  // const { setUser } = ChatState();
  const navigate = useNavigate();
  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
if(data.token){

  toast({
    title: "Login Successful",
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
  // setUser(data);
  localStorage.setItem("userInfo", JSON.stringify(data));
  setLoading(false);
  navigate("/chats");
}
else{
  toast({
    title: "Error Occured!",
    description:data.message,
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
  setLoading(false);
}
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack marginTop="-2em" spacing="6px" color="#420264">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          placeholder="Enter Your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
               value={password}
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Box
        height="30vh"
        border="solid black 2px"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
      >
        <Button
          colorScheme="purple"
          // width="50%"
          style={{ marginTop: 100 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Login
        </Button>
        <Button
          variant="solid"
          colorScheme="red"
          // width="50%"
          onClick={() => {
            setEmail("guest@gmail.com");
            setPassword("123456");
          }}
        >
          Get Guest User Credentials
        </Button>
      </Box>
    </VStack>
  );
};

export default Login;
