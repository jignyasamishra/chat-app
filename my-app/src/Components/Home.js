import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate=useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);
  return (
    <Container maxW="xl" centerContent>
      <Box d="flex" justifyContent="center" color={"white"}>
        <Text fontSize={"6xl"} fontFamily={"logo"}>
          WAVEY
        </Text>
      </Box>
      <Box
        bg={"#C9D9F0"}
        // w="100%"
        width="150%"
        height="60%"
        marginTop="5em"
        p={4}
        borderRadius={"lg"}
        borderWidth="2px"
        color="white"
      >
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList mb="2em">
            <Tab width="50%" marginTop="1em">
              Login
            </Tab>
            <Tab width="50%" marginTop="1em">
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel><Login/></TabPanel>
            <TabPanel><SignUp/> </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
