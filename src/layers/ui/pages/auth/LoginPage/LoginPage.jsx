import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.scss";
import { useRef, useEffect } from "react";
import {
  animateFormEntry,
  animateFormFields,
} from "../../../../../layers/animations/auth.animations";
const LoginPage = () => {
  const pageRef = useRef(null);
  useEffect(() => {
    animateFormEntry(pageRef);
    animateFormFields(pageRef);
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page" ref={pageRef}>
      <div className="login-page__header">
        <h2 className="login-page__title">Welcome back</h2>
        <p className="login-page__subtitle">
          Sign in to your NexaSupport dashboard
        </p>
      </div>

      <form className="login-page__form" onSubmit={(e) => e.preventDefault()}>
        {/* ── Email */}
        <div className="login-page__field">
          <label className="login-page__label" htmlFor="email">
            Email address
          </label>
          <div className="login-page__input-wrap">
            <span className="login-page__input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <input
              id="email"
              type="email"
              className="login-page__input"
              placeholder="you@company.com"
              autoComplete="email"
            />
          </div>
        </div>

        {/* ── Password */}
        <div className="login-page__field">
          <div className="login-page__label-row">
            <label className="login-page__label" htmlFor="password">
              Password
            </label>
            <Link to="/auth/forgot-password" className="login-page__forgot">
              Forgot password?
            </Link>
          </div>
          <div className="login-page__input-wrap">
            <span className="login-page__input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="login-page__input login-page__input--password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="login-page__toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Remember me */}
        <div className="login-page__remember">
          <label className="login-page__checkbox-label">
            <input type="checkbox" className="login-page__checkbox" />
            <span className="login-page__checkbox-custom" />
            <span className="login-page__checkbox-text">Keep me signed in</span>
          </label>
        </div>

        {/* ── Submit */}
        <button type="submit" className="login-page__btn">
          <span>Sign In</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>

      {/* ── Divider */}
      <div className="login-page__divider">
        <span className="login-page__divider-line" />
        <span className="login-page__divider-text">or</span>
        <span className="login-page__divider-line" />
      </div>

      {/* ── SSO option */}
      <button type="button" className="login-page__sso-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      {/* ── Register link */}
      <p className="login-page__register-prompt">
        Don't have an account?{" "}
        <Link to="/auth/register" className="login-page__register-link">
          Create one free
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
