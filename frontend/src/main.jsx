import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { JobSeekerSignup, Login, RecruiterSignup } from "./pages/Login";
// import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <JobSeekerSignup />
    <br />
    <br />
    <RecruiterSignup />
    <br />
    <br />
    <Login />
  </StrictMode>,
);
