import { useEffect, useState } from "react";
import { Button } from "../components/Buttons";
import { api } from "../Services/services";

export function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get("jobs/myjobs/");
        setJobs(response.data);
      } catch (error) {
        console.log(error.response.data);
        setError("Enable to load Jobs detail");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <h2>This is My Jobs Page</h2>
      <h2>Welcome to the JOb Portal Web App</h2>
      <hr />
      {jobs.length === 0 ? (
        <p>No Jobs Posted Yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id}>
            <h1>{job.title}</h1>
            <p>{job.location}</p>
            <p>{job.salary}</p>
            <p>{job.job_type}</p>
            <Button>Edit</Button> &nbsp;
            <Button>Delete</Button> &nbsp;
            <Button>View Applicants</Button>&nbsp;
          </div>
        ))
      )}
    </>
  );
}
