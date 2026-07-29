import { Link } from "react-router-dom";
import { Button } from "../components/Buttons";

export function JobSeekerDashboard() {
  return (
    <>
      <h2>Job Seeker Dashboard</h2>
      <h2>Welcome </h2>
      <p>Quick Actions</p>
      <Link to="/jobs/">
        <Button type="button">Browse Jobs</Button>
      </Link>{" "}
      <Link to="/job/my-applications/">
        <Button type="button">My Applications</Button>
      </Link>{" "}
      <Link to="">
        <Button type="button">Edit Profile</Button>
      </Link>
    </>
  );
}
