// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectRoute from "./components/ProtectRoute.jsx";
import { RecruiterDashBoard } from "./pages/RecruiterDashBoard.jsx";
import { JobSeekerSignup, Login, RecruiterSignup } from "./pages/Login";
import { PostJob } from "./pages/PostJob.jsx";
import { MyJobs } from "./pages/MyJobs.jsx";
import { EditJob } from "./pages/EditJob.jsx";
import { ViewApplications } from "./pages/ViewApplications.jsx";
import { JobSeekerDashboard } from "./pages/JobSeekerDashboard.jsx";
import { EditCompany } from "./pages/Editcompany.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobseeker/signup/" element={<JobSeekerSignup />} />
        <Route path="/recruiter/signup/" element={<RecruiterSignup />} />
        <Route
          path="/recruiter/dashboard/"
          element={
            <ProtectRoute allowedRole="recruiter">
              <RecruiterDashBoard />
            </ProtectRoute>
          }
        />
        <Route
          path="/postjob/"
          element={
            <ProtectRoute allowedRole="recruiter">
              <PostJob />
            </ProtectRoute>
          }
        />
        <Route
          path="/myjobs/"
          element={
            <ProtectRoute allowedRole="recruiter">
              <MyJobs />
            </ProtectRoute>
          }
        />
        <Route
          path="/job/:id/edit/" //here :id expect a dynamic value
          element={
            <ProtectRoute allowedRole="recruiter">
              <EditJob />
            </ProtectRoute>
          }
        />
        <Route
          path="/applications/:id/view/"
          element={
            <ProtectRoute allowedRole="recruiter">
              <ViewApplications />
            </ProtectRoute>
          }
        />
        <Route
          path="/edit/company/"
          element={
            <ProtectRoute allowedRole="recruiter">
              <EditCompany />
            </ProtectRoute>
          }
        />
        {/*job seeker routes */}
        <Route
          path="/jobseeker/dashboard/"
          element={
            <ProtectRoute allowedRole="job_seeker">
              <JobSeekerDashboard />
            </ProtectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
