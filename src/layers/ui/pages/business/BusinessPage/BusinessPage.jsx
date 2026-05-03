import "./BusinessPage.scss";

const businessStats = [
  {
    title: "Customers",
    value: "12.5K",
    growth: "+18%",
  },
  {
    title: "Revenue",
    value: "$48K",
    growth: "+22%",
  },
  {
    title: "Tickets",
    value: "248",
    growth: "+9%",
  },
  {
    title: "Satisfaction",
    value: "94%",
    growth: "+12%",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$29",
    users: "10 Users",
  },
  {
    name: "Pro",
    price: "$79",
    users: "50 Users",
  },
  {
    name: "Enterprise",
    price: "$199",
    users: "Unlimited",
  },
];

const teamMembers = [
  {
    name: "Arjun",
    role: "Admin",
  },
  {
    name: "Priya",
    role: "Support Lead",
  },
  {
    name: "Rahul",
    role: "Manager",
  },
];

const BusinessPage = () => {
  return (
    <div className="business-page">
      {/* Header */}
      <div className="business-header">
        <div>
          <h1>Business Dashboard</h1>
          <p>
            Track growth and team performance
          </p>
        </div>

        <button className="upgrade-btn">
          Upgrade Plan
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {businessStats.map(
          (item, index) => (
            <div
              className="stat-card"
              key={index}
            >
              <p>{item.title}</p>
              <h2>{item.value}</h2>
              <span>{item.growth}</span>
            </div>
          )
        )}
      </div>

      {/* Main Grid */}
      <div className="business-grid">
        {/* Revenue */}
        <div className="card revenue-card">
          <h3>Revenue Analytics</h3>

          <div className="chart-box">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>

        {/* Plans */}
        <div className="card plans-card">
          <h3>Subscription Plans</h3>

          {plans.map((plan, index) => (
            <div
              className="plan-item"
              key={index}
            >
              <div>
                <h4>{plan.name}</h4>
                <p>{plan.users}</p>
              </div>

              <h2>{plan.price}</h2>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="card team-card">
          <h3>Team Members</h3>

          {teamMembers.map(
            (member, index) => (
              <div
                className="team-item"
                key={index}
              >
                <div className="avatar">
                  {member.name[0]}
                </div>

                <div>
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;