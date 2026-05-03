import { Outlet } from "react-router-dom";
import "./DashboardLayout.scss";

import Navbar from "../../shared/Navbar/Navbar";
import Sidebar from "../../shared/Sidebar/Sidebar";
import useAuth from "../../../../../layers/hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-layout">
      <Sidebar user={user} />

      <div className="dashboard-main">
        <Navbar user={user} />

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
