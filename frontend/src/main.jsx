import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import { JobSeekerSignup, Login, RecruiterSignup } from "./pages/Login";
import App from "./App";

// import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
