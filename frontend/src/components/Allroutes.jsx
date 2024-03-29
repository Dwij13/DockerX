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
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

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
    setUserInput(""); // Clear input after submission
  };

  return (
    <>
      <button onClick={onOpen} className="chatBtn">
        Resolve with AI
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Resolve with AI</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Ask me anything..."
                value={userInput}
                onChange={handleInputChange}
                size="lg"
                variant="filled"
              />
              <Button onClick={handleSubmit} mt={4}>
                Submit
              </Button>
              {aiResponse && <Text mt={4}>{aiResponse}</Text>}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/containers" element={<Article />} />
        {/* Removed ChatAi route as its functionality is now integrated within the modal */}
      </Routes>
    </>
  );
}
