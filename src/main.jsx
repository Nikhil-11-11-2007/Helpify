import "./layers/animations/gsap.config"; // ← add this line
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles/index.scss";
import App from "./app/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
