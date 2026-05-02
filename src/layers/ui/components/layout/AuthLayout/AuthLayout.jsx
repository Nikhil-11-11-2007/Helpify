import { Outlet } from "react-router-dom";
import "./AuthLayout.scss";
import { useRef, useEffect } from "react";
import {
  animatePanelEntry,
  animateChatBubbles,
} from "../../../../animations/auth.animations";
const AuthLayout = () => {
  const panelRef = useRef(null);
  useEffect(() => {
    animatePanelEntry(panelRef);
    animateChatBubbles(panelRef);
  }, []);
  return (
    <div className="auth-layout" ref={panelRef}>
      {/* ── Left Panel */}
      <div className="auth-layout__panel">
        <div className="auth-layout__panel-inner">
          {/* Brand */}
          <div className="auth-layout__brand">
            <div className="auth-layout__logo">
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <path
                  d="M8 14C8 10.686 10.686 8 14 8C17.314 8 20 10.686 20 14C20 17.314 17.314 20 14 20"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="14" cy="14" r="3" fill="white" />
                <path
                  d="M14 20C12.343 20 11 18.657 11 17C11 15.343 12.343 14 14 14"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="auth-layout__brand-name">NexaSupport</span>
          </div>

          {/* Main content — centered */}
          <div className="auth-layout__panel-content">
            <div className="auth-layout__tag">AI-Powered Customer Support</div>

            <h1 className="auth-layout__headline">
              Resolve every
              <br />
              customer query
              <br />
              <span className="auth-layout__headline-accent">instantly.</span>
            </h1>

            <p className="auth-layout__subtext">
              Deploy an intelligent support agent trained on your business data
              — available 24/7, no downtime, no wait times.
            </p>

            <div className="auth-layout__stats">
              <div className="auth-layout__stat">
                <span className="auth-layout__stat-value">98%</span>
                <span className="auth-layout__stat-label">Resolution Rate</span>
              </div>
              <div className="auth-layout__stat">
                <span className="auth-layout__stat-value">&lt;2s</span>
                <span className="auth-layout__stat-label">Avg Response</span>
              </div>
              <div className="auth-layout__stat">
                <span className="auth-layout__stat-value">24/7</span>
                <span className="auth-layout__stat-label">Always On</span>
              </div>
            </div>

            {/* Chat preview */}
            <div className="auth-layout__chat-preview">
              <div className="auth-layout__chat-preview-label">Live Demo</div>

              <div className="auth-layout__chat-bubble auth-layout__chat-bubble--bot">
                <div className="auth-layout__chat-avatar">AI</div>
                <div className="auth-layout__chat-text">
                  Hi! I'm your AI support agent. How can I help you today?
                </div>
              </div>

              <div className="auth-layout__chat-bubble auth-layout__chat-bubble--user">
                <div className="auth-layout__chat-text">
                  I need help with my order #48291.
                </div>
              </div>

              <div className="auth-layout__chat-bubble auth-layout__chat-bubble--bot">
                <div className="auth-layout__chat-avatar">AI</div>
                <div className="auth-layout__chat-text">
                  Found it! Your order is out for delivery — expected by 3PM
                  today. 📦
                </div>
              </div>
            </div>
          </div>
          {/* end panel-content */}
        </div>

        {/* Decorative orbs */}
        <div className="auth-layout__orb auth-layout__orb--1" />
        <div className="auth-layout__orb auth-layout__orb--2" />
      </div>

      {/* ── Right Panel — Form */}
      <div className="auth-layout__form-area">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
