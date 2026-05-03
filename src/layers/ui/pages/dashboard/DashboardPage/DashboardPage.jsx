import "./DashboardPage.scss";

const statsData = [
  {
    label: "Total Tickets",
    value: "1,284",
    change: "+12%",
    type: "up",
  },
  {
    label: "Open Tickets",
    value: "87",
    change: "+3",
    type: "down",
  },
  {
    label: "Resolved Today",
    value: "43",
    change: "+18%",
    type: "up",
  },
  {
    label: "AI Resolution Rate",
    value: "76%",
    change: "+4%",
    type: "up",
  },
];

const ticketsData = [
  {
    id: "#1042",
    subject: "Cannot access my account",
    user: "Priya",
    status: "open",
    time: "2m ago",
  },
  {
    id: "#1041",
    subject: "Billing issue",
    user: "Rahul",
    status: "pending",
    time: "14m ago",
  },
  {
    id: "#1040",
    subject: "Zapier integration failed",
    user: "Sofia",
    status: "resolved",
    time: "1h ago",
  },
];

const activityData = [
  {
    text: "AI resolved billing issue",
    time: "5m ago",
  },
  {
    text: "New customer joined",
    time: "15m ago",
  },
  {
    text: "FAQ updated",
    time: "30m ago",
  },
];

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
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
            <span className={item.type}>
              {item.change}
            </span>
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
            {ticketsData.map((ticket, index) => (
              <div className="ticket-item" key={index}>
                <div>
                  <h4>{ticket.subject}</h4>
                  <p>
                    {ticket.id} • {ticket.user}
                  </p>
                </div>

                <div className={`status ${ticket.status}`}>
                  {ticket.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Activity Feed</h3>
          </div>

          <div className="card-body">
            {activityData.map((activity, index) => (
              <div className="activity-item" key={index}>
                <div className="dot" />
                <div>
                  <h4>{activity.text}</h4>
                  <p>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;