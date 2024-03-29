import React, { useState } from "react";
import axios from "axios";

const ChatAi = () => {
  const [count, setCount] = useState(0);

  async function generateAnswer() {
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBHNM0h5kXn3PrBOnKnFtRK055tPvDIVXQ",
      method: "post",
      data: {
        contents: [
          { parts: [{ text: "Write a story about a magic backpack" }] },
        ],
      },
    });
  }
  return (
    <div>
      <button onClick={generateAnswer}>click</button>
    </div>
  );
};

export default ChatAi;
