import { useEffect } from "react";
import useAuth from "../../../../../layers/hooks/useAuth";
import useTickets from "../../../../../layers/hooks/useTickets";
import useBusiness from "../../../../../layers/hooks/useBusiness";
import "./DashboardPage.scss";

const DashboardPage = () => {
  const { user, getMe } = useAuth();
  const { tickets, loading: ticketsLoading, getTickets } = useTickets();
  const { faqs, loading: faqsLoading, getFaqs } = useBusiness();

  useEffect(() => {
    getMe();
    getTickets();
    getFaqs();
  }, []);

  const totalFaqs = faqs?.length || 0;
  const openTickets = tickets?.filter((t) => t.status === "open").length || 0;
  const inProgressTickets = tickets?.filter((t) => t.status === "in_progress").length || 0;
  
  const recentTickets = tickets?.slice(0, 5) || [];

  const statsData = [
    { label: "Total FAQs", value: totalFaqs, type: "up" },
    { label: "Open Tickets", value: openTickets, type: "down" },
    { label: "In-Progress Tickets", value: inProgressTickets, type: "up" },
  ];

  if (ticketsLoading || faqsLoading) {
    return (
      <div className="loader loader--fullscreen">
        <div className="loader__content loader__md">
          <div className="loader__spinner"><div className="loader__spinner-circle" /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user?.username || "Admin"}</h1>
          <p>Track customer support performance</p>
        </div>

        <button className="create-ticket-btn">
          New Ticket
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {statsData.map((item, index) => (
          <div className="stat-card" key={index}>
            <h4>{item.label}</h4>
            <h2>{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Tickets */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Tickets</h3>
          </div>

          <div className="card-body">
            {ticketsLoading ? (
              <p>Loading tickets...</p>
            ) : recentTickets.length > 0 ? (
              recentTickets.map((ticket, index) => (
                <div className="ticket-item" key={index}>
                  <div>
                    <h4>{ticket.subject}</h4>
                    <p>
                      #{ticket._id?.substring(0, 4) || index} • {ticket.customerInfo?.name || "Customer"}
                    </p>
                  </div>

                  <div className={`status ${ticket.status}`}>
                    {ticket.status}
                  </div>
                </div>
              ))
            ) : (
              <p>No recent tickets</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;