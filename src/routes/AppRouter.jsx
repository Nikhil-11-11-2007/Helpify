import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import AuthLayout from "../layers/ui/components/layout/AuthLayout/AuthLayout";
import LoginPage from "../layers/ui/pages/auth/LoginPage/LoginPage";
import RegisterPage from "../layers/ui/pages/auth/RegisterPage/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
