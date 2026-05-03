import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import AuthLayout from "../layers/ui/components/layout/AuthLayout/AuthLayout";
import DashboardLayout from "../layers/ui/components/layout/DashboardLayout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

import LoginPage from "../layers/ui/pages/auth/LoginPage/LoginPage";
import RegisterPage from "../layers/ui/pages/auth/RegisterPage/RegisterPage";

import DashboardPage from "../layers/ui/pages/dashboard/DashboardPage/DashboardPage";
import FaqsPage from "../layers/ui/pages/faqs/FaqsPage/FaqsPage";
import TicketsPage from "../layers/ui/pages/tickets/TicketsPage/TicketsPage";
import ChatPage from "../layers/ui/pages/chat/ChatPage/ChatPage";
import BusinessPage from "../layers/ui/pages/business/BusinessPage/BusinessPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },

  // Auth Routes (public)
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },

  // Dashboard Routes (protected)
  {
    path: "/app",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "faqs",
            element: <FaqsPage />,
          },
          {
            path: "tickets",
            element: <TicketsPage />,
          },
          {
            path: "chat",
            element: <ChatPage />,
          },
          {
            path: "business",
            element: <BusinessPage />,
          },
        ],
      },
    ],
  },

  // 404 fallback
  {
    path: "*",
    element: <Navigate to="/auth/login" replace />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
