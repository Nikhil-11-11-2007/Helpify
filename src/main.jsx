import "./layers/animations/gsap.config"; // ← add this line
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles/index.scss";
import App from "./app/App.jsx";
import { Provider } from "react-redux";
import store from "./app/app.store.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
