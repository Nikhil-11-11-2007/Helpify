import { useEffect } from "react";
import AppRouter from "../routes/AppRouter";
import useAuth from "../layers/hooks/useAuth";
import "./App.scss";

const App = () => {
  const { user, loading, getMe } = useAuth();

  useEffect(() => {
    if (!user) {
      getMe();
    }
  }, []);

  // ── Show loading spinner while checking auth status
  if (loading && !user) {
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

  return <AppRouter />;
};

export default App;
