import { useEffect, useState } from "react";
import { api } from "../Services/services";
import { useParams } from "react-router-dom";
import { Button } from "../components/Buttons";

export function JobDetails() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await api.get(`jobs/job/${id}/`);
        setDetail(response.data);
      } catch (error) {
        console.log(error);
        alert("Falied to load Job Details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleApply = async (jobId) => {
    try {
      await api.post(`applications/job/${jobId}/apply/`);
      alert("Applied Successfully.");
    } catch (error) {
      if (error.response.status == 400) {
        alert("Already Applyed for this Job");
      } else {
        alert("Failed to apply for this Job");
      }
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <h2>Details</h2>
      <div key={detail.id}>
        <p>
          <strong>Title:</strong>
          {detail.title}
        </p>
        <p>
          <strong>Company:</strong>
          {detail.company_name}
        </p>
        <p>
          <strong>Location:</strong>
          {detail.location}
        </p>
        <p>
          <strong>salary:</strong>
          {detail.salary}
        </p>
        <p>
          <strong>Job Type:</strong>
          {detail.job_type}
        </p>
        <p>
          <strong>Experienced Required:</strong>
          {detail.experience_required}
        </p>
        <p>
          <strong>Description:</strong>
          {detail.description}
        </p>
        <Button
          onClick={() => handleApply(detail.id)}
          type="button"
          disable={detail.has_applied.toString()}
        >
          {detail.has_applied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
    </>
  );
}
