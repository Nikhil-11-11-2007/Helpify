import { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.scss";
import { useRef, useEffect } from "react";
import {
  animateFormEntry,
  animateFormFields,
} from "../../../../../layers/animations/auth.animations";
const RegisterPage = () => {
  const pageRef = useRef(null);
  useEffect(() => {
    animateFormEntry(pageRef);
    animateFormFields(pageRef);
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="register-page" ref={pageRef}>
      <div className="register-page__header">
        <h2 className="register-page__title">Create your account</h2>
        <p className="register-page__subtitle">
          Start your 14-day free trial — no credit card required
        </p>
      </div>

      <form
        className="register-page__form"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* ── Name row */}
        <div className="register-page__row">
          <div className="register-page__field">
            <label className="register-page__label" htmlFor="firstName">
              First name
            </label>
            <div className="register-page__input-wrap">
              <span className="register-page__input-icon">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                id="firstName"
                type="text"
                className="register-page__input"
                placeholder="John"
                autoComplete="given-name"
              />
            </div>
          </div>

          <div className="register-page__field">
            <label className="register-page__label" htmlFor="lastName">
              Last name
            </label>
            <div className="register-page__input-wrap">
              <input
                id="lastName"
                type="text"
                className="register-page__input register-page__input--no-icon"
                placeholder="Doe"
                autoComplete="family-name"
              />
            </div>
          </div>
        </div>

        {/* ── Business name */}
        <div className="register-page__field">
          <label className="register-page__label" htmlFor="businessName">
            Business name
          </label>
          <div className="register-page__input-wrap">
            <span className="register-page__input-icon">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
            </span>
            <input
              id="businessName"
              type="text"
              className="register-page__input"
              placeholder="Acme Inc."
              autoComplete="organization"
            />
          </div>
        </div>

        {/* ── Email */}
        <div className="register-page__field">
          <label className="register-page__label" htmlFor="regEmail">
            Work email
          </label>
          <div className="register-page__input-wrap">
            <span className="register-page__input-icon">
              <svg
                width="17"
                height="17"
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
              id="regEmail"
              type="email"
              className="register-page__input"
              placeholder="you@company.com"
              autoComplete="email"
            />
          </div>
        </div>

        {/* ── Password */}
        <div className="register-page__field">
          <label className="register-page__label" htmlFor="regPassword">
            Password
          </label>
          <div className="register-page__input-wrap">
            <span className="register-page__input-icon">
              <svg
                width="17"
                height="17"
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
              id="regPassword"
              type={showPassword ? "text" : "password"}
              className="register-page__input register-page__input--password"
              placeholder="Min. 8 characters"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="register-page__toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  width="17"
                  height="17"
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
                  width="17"
                  height="17"
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

          {/* Password strength bar */}
          <div className="register-page__strength">
            <div className="register-page__strength-bars">
              <span className="register-page__strength-bar register-page__strength-bar--filled" />
              <span className="register-page__strength-bar register-page__strength-bar--filled" />
              <span className="register-page__strength-bar" />
              <span className="register-page__strength-bar" />
            </div>
            <span className="register-page__strength-label">Fair</span>
          </div>
        </div>

        {/* ── Confirm password */}
        <div className="register-page__field">
          <label className="register-page__label" htmlFor="confirmPassword">
            Confirm password
          </label>
          <div className="register-page__input-wrap">
            <span className="register-page__input-icon">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              className="register-page__input register-page__input--password"
              placeholder="Repeat password"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="register-page__toggle-password"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? (
                <svg
                  width="17"
                  height="17"
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
                  width="17"
                  height="17"
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

        {/* ── Terms */}
        <div className="register-page__terms">
          <label className="register-page__checkbox-label">
            <input type="checkbox" className="register-page__checkbox" />
            <span className="register-page__checkbox-custom" />
            <span className="register-page__checkbox-text">
              I agree to the{" "}
              <Link to="/terms" className="register-page__terms-link">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="register-page__terms-link">
                Privacy Policy
              </Link>
            </span>
          </label>
        </div>

        {/* ── Submit */}
        <button type="submit" className="register-page__btn">
          <span>Create Account</span>
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

      {/* ── Login link */}
      <p className="register-page__login-prompt">
        Already have an account?{" "}
        <Link to="/auth/login" className="register-page__login-link">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
