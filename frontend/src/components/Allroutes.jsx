import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Article from "./Article";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
  Text,
  Flex,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import Container from "./Container";

export default function AllRoutes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleInputChange = (e) => setUserInput(e.target.value);

  const fetchAiResponse = async () => {
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBHNM0h5kXn3PrBOnKnFtRK055tPvDIVXQ",
        {
          contents: [
            {
              parts: [{ text: userInput + " Can you correct the docker code" }],
            },
          ],
        }
      );

      const data = await response["data"]["candidates"][0]["content"][
        "parts"
      ][0]["text"];
      setAiResponse(data);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Failed to fetch response from AI.");
    }
  };

  const handleSubmit = () => {
    fetchAiResponse();
    setUserInput("");
  };

  return (
    <>
      <button onClick={onOpen} className="chatBtn">
        Resolve with AI
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay sx={{ backdropFilter: "blur(2px)" }} />
        <ModalContent
          padding={"30px"}
          width="45vmax"
          backgroundColor="purple"
          margin="auto"
          borderRadius="15px"
          position="fixed"
          top="15%"
          left="25%"
          transform="translate(-50%, -50%)"
        >
          <ModalHeader>
            <Text
              textAlign="center"
              padding={"20px"}
              fontSize="25px"
              fontWeight="800"
              color="white"
            >
              Resolve with AI
            </Text>
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <VStack spacing={4}>
              <Flex>
                <Input
                  placeholder="Ask me anything..."
                  value={userInput}
                  onChange={handleInputChange}
                  height={"5vh"}
                  width={"28vw"}
                  textIndent={"10px"}
                  marginTop={"4px"}
                  size="lg"
                  outline="none"
                  variant="filled"
                />
                <Button
                  onClick={handleSubmit}
                  width={"11vmax"}
                  height={"5vh"}
                  border="none"
                  marginLeft="-1px"
                  // borderRadius="10px"
                  backgroundColor="#a841b8"
                  color="white"
                  // marginBottom={"2vmax"}
                  mt={4}
                >
                  Submit
                </Button>
              </Flex>
              {aiResponse && (
                <Text
                  margin={"10px 0 10px 20px"}
                  color="white"
                  overflow-y={"scroll"}
                  mt={4}
                >
                  {aiResponse}
                </Text>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              justifyContent="center"
              width={"8vmax"}
              marginTop={"7vmax"}
              borderRadius="10px"
              height={"4vh"}
              border="none"
              color="white"
              backgroundColor="#a841b8"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/containers" element={<Article />} />
        <Route path="/containers/:id" element={<Container />} />
      </Routes>
    </>
  );
}
