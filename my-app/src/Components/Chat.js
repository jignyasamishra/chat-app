import React, { useState } from 'react'
import Chatbox from "../Components/Chatbox";
import MyChats from "../Components/MyChats";
// import Chatbox from './Chatbox.js';
import SideDrawer from "./miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/layout";
function Chat() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
    {user && <SideDrawer />}
    <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
      {user && <MyChats fetchAgain={fetchAgain} />}
      {user && (
        <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      )}
    </Box>
  </div>
);
};
export default Chat
