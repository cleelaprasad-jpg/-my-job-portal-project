import { useEffect, useState } from "react";
import { api } from "../Services/services";
import { Button } from "../components/Buttons";
import { Link } from "react-router-dom";

export function BrowseJobs() {
  const [jobs, setJobs] = useState([]); //stores a list of objects from the backend
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await api.get("jobs/joblist/");
        setJobs(response.data);
      } catch (error) {
        alert("Failed to Load Jobs");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <div>
        {jobs.length === 0 ? (
          <p>No Jobs Available</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              style={{
                border: "1px solid gray",
                marginBottom: "3px",
                padding: "5px",
              }}
            >
              <p>
                {" "}
                <strong>Title:</strong>
                {job.title}
              </p>
              <p>
                <strong>Company:</strong>
                {job.company_name}
              </p>
              <p>
                <strong>Location:</strong>
                {job.location}
              </p>
              <p>
                <strong>Job Type:</strong>
                {job.job_type}
              </p>
              <Link to={`/jobs/${job.id}/`}>
                <Button type="button">View Details</Button>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
}
