import { useState, useEffect, useRef } from "react";
import useChat from "../../../../../layers/hooks/useChat";
import "./ChatPage.scss";

const ChatPage = () => {
  const { messages, loading, error, sendMessage, clearError } = useChat();

  const [ownerId, setOwnerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim() || !ownerId.trim() || !customerName.trim() || !customerEmail.trim()) return;

    sendMessage({
      ownerId,
      customerName,
      customerEmail,
      message,
    });

    setMessage("");
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
        <div>
          <h1>Live Chat Widget</h1>
          <p>Public-facing customer support chat</p>
        </div>
      </div>

      <div className="chat-layout">
        {/* Sidebar / Info Setup */}
        <div className="chat-sidebar" style={{ padding: '1.5rem' }}>
          <h3>Chat Setup</h3>
          <p style={{ marginBottom: '1rem', color: '#666' }}>Enter details to start chatting.</p>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Owner ID</label>
            <input 
              type="text" 
              value={ownerId} 
              onChange={(e) => setOwnerId(e.target.value)} 
              placeholder="e.g. 60d5ecb..."
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
              disabled={messages.length > 0}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Your Name</label>
            <input 
              type="text" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)} 
              placeholder="John Doe"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
              disabled={messages.length > 0}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Your Email</label>
            <input 
              type="email" 
              value={customerEmail} 
              onChange={(e) => setCustomerEmail(e.target.value)} 
              placeholder="john@example.com"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
              disabled={messages.length > 0}
            />
          </div>

          {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          <div className="chat-top">
            <h3>Support Team</h3>
            <span>Online</span>
          </div>

          <div className="chat-messages">
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '2rem', color: '#888' }}>
                Start a conversation by sending a message below.
              </div>
            ) : (
              messages.map((msg, index) => {
                // Map roles to CSS classes: 'customer' (sent by user) -> right aligned, 'ai' or 'admin' -> left aligned
                const roleClass = msg.role === 'customer' || msg.role === 'user' ? 'customer' : 'ai';
                return (
                  <div key={index} className={`message ${roleClass}`}>
                    {msg.content}
                  </div>
                );
              })
            )}
            {loading && (
              <div className="message ai" style={{ opacity: 0.7 }}>
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <textarea
              placeholder="Write message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={loading}
            />

            <button onClick={handleSend} disabled={loading || !message.trim()}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;