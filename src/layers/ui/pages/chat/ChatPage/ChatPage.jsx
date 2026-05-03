import { useState } from "react";
import "./ChatPage.scss";

const chatSessions = [
  {
    id: 1,
    user: "Priya",
    topic: "Password reset",
    status: "active",
  },
  {
    id: 2,
    user: "Rahul",
    topic: "Billing issue",
    status: "pending",
  },
  {
    id: 3,
    user: "Sofia",
    topic: "Zapier help",
    status: "resolved",
  },
];

const chatMessages = {
  1: [
    {
      sender: "customer",
      text: "Password reset not working",
    },
    {
      sender: "ai",
      text: "Checking your account...",
    },
  ],
};

const ChatPage = () => {
  const [activeChat, setActiveChat] =
    useState(chatSessions[0]);

  const [message, setMessage] =
    useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    console.log("Send:", message);

    setMessage("");
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
        <div>
          <h1>Live Chat</h1>
          <p>
            Manage customer conversations
          </p>
        </div>
      </div>

      <div className="chat-layout">
        {/* Sidebar */}
        <div className="chat-sidebar">
          {chatSessions.map((chat) => (
            <div
              key={chat.id}
              className={`chat-session ${
                activeChat.id === chat.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveChat(chat)
              }
            >
              <h4>{chat.user}</h4>
              <p>{chat.topic}</p>

              <span
                className={`status ${chat.status}`}
              >
                {chat.status}
              </span>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          <div className="chat-top">
            <h3>{activeChat.user}</h3>
            <span>{activeChat.topic}</span>
          </div>

          <div className="chat-messages">
            {chatMessages[
              activeChat.id
            ]?.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <textarea
              placeholder="Write message..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />

            <button
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>

        {/* Info Panel */}
        <div className="chat-info">
          <h3>Customer Info</h3>

          <div className="info-card">
            <p>Name: {activeChat.user}</p>
            <p>Status: {activeChat.status}</p>
            <p>Topic: {activeChat.topic}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;