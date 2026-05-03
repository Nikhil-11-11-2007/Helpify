import { Outlet } from "react-router-dom";
import "./DashboardLayout.scss";

import Navbar from "../../shared/Navbar/Navbar";
import Sidebar from "../../shared/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;