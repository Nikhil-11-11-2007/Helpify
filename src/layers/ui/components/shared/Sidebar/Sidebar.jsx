import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../../../layers/hooks/useAuth";
import "./Sidebar.scss";

const Sidebar = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="sidebar-links" style={{ flex: 1 }}>
        <NavLink to="/app/dashboard">Dashboard</NavLink>
        <NavLink to="/app/faqs">FAQs</NavLink>
        <NavLink to="/app/tickets">Tickets</NavLink>
        <NavLink to="/app/chat">Chat</NavLink>
        <NavLink to="/app/business">Business</NavLink>
      </div>

      {user && (
        <div className="sidebar-user" style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{user.username}</p>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8 }}>{user.email}</p>
          <button 
            onClick={handleLogout} 
            style={{ 
              marginTop: '0.5rem', 
              padding: '0.25rem 0.5rem', 
              background: 'transparent', 
              color: '#ff4d4f', 
              border: '1px solid #ff4d4f', 
              borderRadius: '4px', 
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;