'use client';

import { useState, useEffect, useRef } from "react";
import Link from 'next/link'
import io from "socket.io-client";
import { FaHome } from "react-icons/fa";

const socket = io("http://localhost:5000"); // Socket instance initialized once

export default function ChatRoom({ params }) {
  const { roomId } = params;

  const [roomName, setRoomName] = useState(""); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState("");
  
  // Create a ref for the messages container
  const messagesEndRef = useRef(null);

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    console.log("Joining room:", roomId);
    const storedUserId = localStorage.getItem("userId");
    console.log("Stored user ID:", storedUserId);
    setUserId(storedUserId);

    if (storedUserId) {
      socket.emit("joinRoom", { roomId, userId: storedUserId });

      const fetchRoomDetails = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("User is not authenticated");
          }

          // Fetch room details
          const roomResponse = await fetch(
            `http://localhost:5000/api/chatter/chat-rooms/${roomId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!roomResponse.ok) {
            throw new Error("Failed to load room details");
          }

          const roomDetails = await roomResponse.json();
          console.log("Room details fetched:", roomDetails);
          setRoomName(roomDetails.name); // Set room name

          // Fetch messages
          const messagesResponse = await fetch(
            `http://localhost:5000/api/chatter/chat-rooms/${roomId}/messages`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!messagesResponse.ok) {
            throw new Error("Failed to load messages");
          }

          const fetchedMessages = await messagesResponse.json();
          console.log("Fetched messages from server:", fetchedMessages);
          setMessages(fetchedMessages);
        } catch (error) {
          console.error("Error fetching room details or messages:", error);
        }
      };

      fetchRoomDetails();

      socket.on("newMessage", (message) => {
        console.log("New message received via socket:", message);
        setMessages((prev) => [...prev, message]);
      });

      return () => {
        console.log("Leaving room:", roomId);
        socket.emit("leaveRoom", { roomId, userId: storedUserId });
        socket.off("newMessage"); // Remove listeners
      };
    }
  }, [roomId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
  
    try {
      const response = await fetch("http://localhost:5000/api/chatter/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          chatRoomId: roomId,
          content: newMessage,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
  
      const savedMessage = await response.json();
      
      const messageForSocket = {
        ...savedMessage,
        chatRoom: roomId,
        sender: {
          _id: userId,
          name: localStorage.getItem("userName")
        }
      };
  
      socket.emit("sendMessage", messageForSocket);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 p-4 flex items-center text-lg font-bold text-white">
            <Link
                href="/dashboard"
                className="flex items-center text-cyan-400 hover:text-yellow-400 transition-colors mr-4"
            >
                <FaHome className="mr-2" /> {/* Home icon */}
                Home
            </Link>
            <span className="flex-grow text-center">{roomName || "Loading..."}</span> {/* Room name */}
        </header>

        {/* Messages Section */}
        <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{ paddingBottom: "5rem" }} 
        >
            {messages.map((msg) => (
                <div
                    key={msg._id}
                    className={`flex ${
                        msg.sender._id === userId ? "justify-end" : "justify-start"
                    }`}
                >
                    <div
                        className={`p-4 rounded-lg max-w-[95%] ${
                            msg.sender._id === userId
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 text-gray-300"
                        }`}
                    >
                        <p className="text-sm font-semibold">
                            {msg.sender._id === userId ? "You" : msg.sender.name}
                        </p>
                        <p className="text-md">{msg.content}</p>
                        <p className="text-xs text-gray-400 mt-2">
                            {new Date(msg.timestamp).toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
            {/* Invisible div to scroll to */}
            <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        <footer className="p-4 bg-gray-800 fixed bottom-0 left-0 w-full">
            <div className="flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 p-2 rounded-l bg-gray-700 text-white"
                    placeholder="Type a message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 bg-cyan-600 hover:bg-cyan-500 rounded-r"
                >
                    Send
                </button>
            </div>
        </footer>
    </div>
);
}