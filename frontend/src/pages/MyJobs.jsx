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

  //delete job component
  const handleDelete = async (jobid) => {
    const confirmDelete = window.confirm(
      "Are You sure you want to delete this Job.",
    );
    if (!confirmDelete) return; //if no return
    try {
      await api.delete(`jobs/job/${jobid}/delete/`);

      setJobs((currentjobs) => currentjobs.filter((job) => job.id !== jobid)); //here the current value in jobs will come as value to currentsjobs parameter
      alert("job Successfully deleted.");
      {
        /*always receives the latest state even if multiple state updates happen close together ifs the recommeded pattern whenever the new state depends on the previous state */
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete the job.");
    }
  };

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
            <Button onClick={() => handleDelete(job.id)}> Delete</Button> &nbsp;
            <Button>View Applicants</Button>&nbsp;
          </div>
        ))
      )}
    </>
  );
}
