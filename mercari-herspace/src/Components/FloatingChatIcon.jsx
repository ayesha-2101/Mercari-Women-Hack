// src/components/FloatingChatIcon.js
import React from 'react';
import { IoChatbubbles } from 'react-icons/io5'; // Importing chat icon
import { Link } from 'react-router-dom'; // Link component from react-router-dom

const FloatingChatIcon = () => {
  return (
    <Link
      to="/chat" // Adjust this path based on your route setup
      className="fixed bottom-20 right-10 bg-red-500 text-white rounded-full p-3 shadow-lg hover:bg-red-900 transition duration-300 animate-bounce"
    >
      <IoChatbubbles className="text-4xl" />
    </Link>
  );
};

export default FloatingChatIcon;
