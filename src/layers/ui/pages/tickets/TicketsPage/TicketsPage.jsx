import { useState } from "react";
import "./TicketsPage.scss";

const ticketsData = [
  {
    id: "#1042",
    subject: "Cannot access account",
    user: "Priya",
    status: "open",
    priority: "high",
    created: "2m ago",
  },
  {
    id: "#1041",
    subject: "Billing issue",
    user: "Rahul",
    status: "pending",
    priority: "medium",
    created: "14m ago",
  },
  {
    id: "#1040",
    subject: "Zapier integration issue",
    user: "Sofia",
    status: "resolved",
    priority: "low",
    created: "1h ago",
  },
];

const TicketsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] =
    useState(null);

  const filteredTickets =
    ticketsData.filter((ticket) =>
      ticket.subject
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="tickets-page">
      {/* Header */}
      <div className="tickets-header">
        <div>
          <h1>Tickets</h1>
          <p>
            Manage customer support tickets
          </p>
        </div>

        <button className="new-ticket-btn">
          New Ticket
        </button>
      </div>

      {/* Search */}
      <div className="tickets-search">
        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* Main Layout */}
      <div className="tickets-layout">
        {/* Left */}
        <div className="tickets-list">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`ticket-card ${
                selectedTicket?.id === ticket.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedTicket(ticket)
              }
            >
              <div className="ticket-top">
                <span>{ticket.id}</span>

                <div
                  className={`status ${ticket.status}`}
                >
                  {ticket.status}
                </div>
              </div>

              <h3>{ticket.subject}</h3>

              <div className="ticket-bottom">
                <p>{ticket.user}</p>
                <span>{ticket.created}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="ticket-details">
          {!selectedTicket ? (
            <div className="empty-ticket">
              Select a ticket
            </div>
          ) : (
            <>
              <div className="detail-header">
                <h2>
                  {selectedTicket.subject}
                </h2>

                <div
                  className={`status ${selectedTicket.status}`}
                >
                  {selectedTicket.status}
                </div>
              </div>

              <div className="detail-meta">
                <p>
                  Customer:
                  {selectedTicket.user}
                </p>

                <p>
                  Created:
                  {selectedTicket.created}
                </p>

                <p>
                  Priority:
                  {selectedTicket.priority}
                </p>
              </div>

              <div className="conversation-box">
                <div className="message customer">
                  Customer message here...
                </div>

                <div className="message ai">
                  AI response here...
                </div>
              </div>

              <div className="reply-box">
                <textarea placeholder="Reply..." />

                <button>
                  Send Reply
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