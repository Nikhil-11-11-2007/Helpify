import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.scss";

const Navbar = ({ user }) => {
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname.includes('/dashboard')) return 'Dashboard';
    if (location.pathname.includes('/faqs')) return 'FAQs';
    if (location.pathname.includes('/tickets')) return 'Tickets';
    if (location.pathname.includes('/chat')) return 'Live Chat';
    if (location.pathname.includes('/business')) return 'Business Settings';
    return 'SupportAI';
  };

  return (
    <header className="navbar">
      {/* Left */}
      <div className="navbar__left">
        <h2 className="navbar__logo">
          {getPageTitle()}
        </h2>

        <div className="navbar__search">
          <input
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Right */}
      <div className="navbar__right">
        <button className="navbar__icon">
          🔔
        </button>

        <button className="navbar__icon">
          ⚙
        </button>

        <div className="navbar__profile">
          <div className="navbar__avatar">
            {user?.username?.[0]?.toUpperCase() || 'N'}
          </div>

          <div className="navbar__user">
            <h4>{user?.username || 'Admin'}</h4>
            <p>Admin</p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;