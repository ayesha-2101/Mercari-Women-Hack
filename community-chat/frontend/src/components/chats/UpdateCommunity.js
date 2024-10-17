import React, { useState } from "react";
import {
  Button,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Box,
  FormControl,
  Input,
  Spinner,
} from "@chakra-ui/react";
import UserListItem from "./UserListItem";
import ChatLoading from "./ChatLoading";
import axios from "axios";
import UserBadgeItem from "./UserBadgeItem";
import { ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
function UpdateCommunity(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [communityChatName, setCommunityChatName] = useState();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const toast = useToast();
  const handelRemove = async (user1) => {
    console.log(user1);
    if (selectedChat.gpAdmin.email !== user.email && user1.email !== user.email) {
      toast({
        title: "only admins can remove",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return ;
    }
    // console.log("hello");
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {data}=await axios.put('http://localhost:5080/api/chat/gpRemove',{
        chatId:selectedChat._id,
        userId:user1._id
      },config);
      // console.log(data);
      user1.email===user.email ?setSelectedChat():setSelectedChat(data);
      props.setFetchAgain(!props.fetchAgain);
      props.fetchChats();
      setLoading(false);

    } catch (error) {
      toast({
        title: "oerror occured",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
    }

  };
  const handelRename = async () => {
    if (!communityChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:5080/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: communityChatName,
        },
        config
      );
      setSelectedChat(data);
      props.setFetchAgain(!props.fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "fail to change name",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setRenameLoading(false);
    }
    setCommunityChatName("");
  };
  const handelSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:5080/api/user?search=${search}`, config);
      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "error",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  const handelAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in Community!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    // console.log(user);
    // console.log(selectedChat.gpAdmin);
    if (selectedChat.gpAdmin.email !== user.email) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:5080/api/chat/gpAdd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      props.setFetchAgain(!props.fetchAgain);
      setLoading(false);
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
    setCommunityChatName("");
  };
  return (
    <>
      <IconButton display="flex" icon={<ViewIcon />} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box width="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map(function (x) {
                {/* console.log(x); */}

                return (
                  <UserBadgeItem
                    key={x._id}
                    data={x}
                    handelFunction={() => handelRemove(x)}
                  />
                );
              })}
              {/* {console.log(user)};{console.log(selectedChat)} */}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={communityChatName}
                onChange={(e) => setCommunityChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handelRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add user to the Community"
                mb={3}
                value={search}
                onChange={(e) => handelSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : searchResult ? (
              searchResult.slice(0, 3).map(function (user) {
                return (
                  <UserListItem
                    key={user._id}
                    data={user}
                    handelFunction={() => {
                      handelAddUser(user);
                    }}
                  />
                );
              })
            ) : (
              <ChatLoading />
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={()=>{handelRemove(user)}}>
              Leave Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateCommunity;
