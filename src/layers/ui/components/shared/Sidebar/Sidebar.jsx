import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/app/dashboard">Dashboard</NavLink>
      <NavLink to="/app/faqs">FAQs</NavLink>
      <NavLink to="/app/tickets">Tickets</NavLink>
      <NavLink to="/app/chat">Chat</NavLink>
      <NavLink to="/app/business">Business</NavLink>
    </div>
  );
};

export default Sidebar;