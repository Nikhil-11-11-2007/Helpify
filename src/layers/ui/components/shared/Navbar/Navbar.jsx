import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <header className="navbar">
      {/* Left */}
      <div className="navbar__left">
        <h2 className="navbar__logo">
          SupportAI
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
            N
          </div>

          <div className="navbar__user">
            <h4>Noor Ahmed</h4>
            <p>Admin</p>
          </div>
        </div>

        <NavLink
          to="/auth/login"
          className="navbar__logout"
        >
          Logout
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;