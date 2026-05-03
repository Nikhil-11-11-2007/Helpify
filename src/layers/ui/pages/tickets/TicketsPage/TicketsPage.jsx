import { useState, useEffect } from "react";
import useTickets from "../../../../../layers/hooks/useTickets";
import "./TicketsPage.scss";

const TicketsPage = () => {
  const { tickets, activeTicket, loading, error, success, getTickets, getTicketById, updateStatus, replyToTicket, clearError, clearSuccess } = useTickets();

  const [search, setSearch] = useState("");
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    getTickets();
  }, []);

  useEffect(() => {
    return () => {
      clearError();
      clearSuccess();
    };
  }, [clearError, clearSuccess]);

  // Clear reply input on success
  useEffect(() => {
    if (success) {
      setReplyContent("");
      setTimeout(() => clearSuccess(), 3000);
    }
  }, [success, clearSuccess]);

  const filteredTickets = (tickets || []).filter((ticket) =>
    ticket.subject?.toLowerCase().includes(search.toLowerCase())
  );

  const handleTicketClick = (ticket) => {
    getTicketById(ticket._id);
  };

  const handleStatusChange = (e) => {
    if (activeTicket && activeTicket._id) {
      updateStatus(activeTicket._id, e.target.value);
    }
  };

  const handleReplySubmit = () => {
    if (!replyContent.trim() || !activeTicket) return;
    replyToTicket(activeTicket._id, replyContent);
  };

  if (loading && !tickets?.length && !activeTicket) {
    return (
      <div className="loader loader--fullscreen">
        <div className="loader__content loader__md">
          <div className="loader__spinner"><div className="loader__spinner-circle" /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="tickets-page">
      {/* Header */}
      <div className="tickets-header">
        <div>
          <h1>Tickets</h1>
          <p>Manage customer support tickets</p>
        </div>

        <button className="new-ticket-btn">
          New Ticket
        </button>
      </div>

      {error && <div className="error-message" style={{ color: 'red', margin: '0 2rem 1rem' }}>{error}</div>}
      {success && <div className="success-message" style={{ color: 'green', margin: '0 2rem 1rem' }}>Action successful!</div>}

      {/* Search */}
      <div className="tickets-search">
        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Main Layout */}
      <div className="tickets-layout">
        {/* Left */}
        <div className="tickets-list">
          {loading && !activeTicket ? (
            <p style={{ padding: '1rem' }}>Loading tickets...</p>
          ) : filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <div
                key={ticket._id}
                className={`ticket-card ${
                  activeTicket?._id === ticket._id ? "active" : ""
                }`}
                onClick={() => handleTicketClick(ticket)}
              >
                <div className="ticket-top">
                  <span>#{ticket._id?.substring(0, 4)}</span>

                  <div className={`status ${ticket.status}`}>
                    {ticket.status}
                  </div>
                </div>

                <h3>{ticket.subject}</h3>

                <div className="ticket-bottom">
                  <p>{ticket.customerInfo?.name || "Customer"}</p>
                  <span>{ticket.priority || "normal"}</span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ padding: '1rem' }}>No tickets found.</p>
          )}
        </div>

        {/* Right */}
        <div className="ticket-details">
          {!activeTicket ? (
            <div className="empty-ticket">
              {loading ? "Loading ticket..." : "Select a ticket"}
            </div>
          ) : (
            <>
              <div className="detail-header">
                <h2>{activeTicket.subject}</h2>

                <select 
                  value={activeTicket.status} 
                  onChange={handleStatusChange}
                  className={`status ${activeTicket.status}`}
                  disabled={loading}
                  style={{ background: 'transparent', border: '1px solid #ccc', borderRadius: '4px', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                >
                  <option value="open">open</option>
                  <option value="in_progress">in_progress</option>
                  <option value="resolved">resolved</option>
                  <option value="closed">closed</option>
                </select>
              </div>

              <div className="detail-meta">
                <p>Customer: {activeTicket.customerInfo?.name || "N/A"}</p>
                <p>Created: {new Date(activeTicket.createdAt || Date.now()).toLocaleDateString()}</p>
                <p>Priority: {activeTicket.priority || "normal"}</p>
              </div>

              <div className="conversation-box">
                {(activeTicket.messages || []).map((msg, idx) => (
                  <div key={idx} className={`message ${msg.role === 'customer' ? 'customer' : 'ai'}`}>
                    {msg.content}
                  </div>
                ))}
                {(!activeTicket.messages || activeTicket.messages.length === 0) && (
                  <p>No messages yet.</p>
                )}
              </div>

              <div className="reply-box">
                <textarea 
                  placeholder="Reply..." 
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  disabled={loading}
                />

                <button onClick={handleReplySubmit} disabled={loading || !replyContent.trim()}>
                  {loading ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;