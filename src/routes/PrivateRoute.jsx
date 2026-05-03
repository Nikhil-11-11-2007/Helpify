import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../layers/hooks/useAuth';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loader loader--fullscreen">
        <div className="loader__content loader__md">
          <div className="loader__spinner">
            <div className="loader__spinner-circle" />
          </div>
          <p className="loader__text">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
