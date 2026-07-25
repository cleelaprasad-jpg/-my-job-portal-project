// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectRoute from "./components/ProtectRoute.jsx";
import { RecruiterDashBoard } from "./pages/RecruiterDashBoard.jsx";
import { JobSeekerSignup, Login, RecruiterSignup } from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="jobseeker/signup/" element={<JobSeekerSignup />} />
        <Route path="recruiter/signup/" element={<RecruiterSignup />} />
        <Route
          path="/recruiter/dashboard/"
          element={
            <ProtectRoute role="recruiter">
              <RecruiterDashBoard />
            </ProtectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
