import { useEffect, useState } from "react";
import { api } from "../Services/services";
import { useParams } from "react-router-dom";
import { Button } from "../components/Buttons";

export function ViewApplications() {
  const [applications, setApplications] = useState([]);
  const { id } = useParams(); //the variable must be in curly braces or the value returned as a object to the backend api.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get(`applications/job/${id}/applications/`);
        setApplications(response.data);
      } catch (error) {
        setError(error);
        alert("failed to get applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [id]);

  //handle Status Update

  const handleStatusUpdate = async (applicationId) => {
    try {
      await api.patch(
        `applications/applications/${applicationId}/status/`,
        status,
      );
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: status.status } : app,
        ),
      );
      alert("status Updated Succesfully");
    } catch (error) {
      alert("Failed to update status");
      console.error("Error Updating Status:", error);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <h2>Applications Page</h2>

      <div>
        {" "}
        {/*mandatory to store key for every value */}{" "}
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Applicant name</th>
              <th>Applicant email</th>
              <th>Resume</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  <p>No Applications Yet.</p>
                </td>
              </tr>
            ) : (
              applications.map((applications) => (
                <tr key={applications.id}>
                  <td>{applications.id}</td>
                  <td>{applications.job_title}</td>
                  <td>{applications.applicant_name}</td>
                  <td>{applications.applicant_email}</td>
                  <td>
                    {applications.resume ? (
                      <a
                        href={`${applications.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span>No Resume Uploaded</span>
                    )}
                  </td>
                  <td>
                    <select
                      value={status?.status || applications.status}
                      onChange={(e) =>
                        setStatus({ ...status, status: e.target.value })
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="rejected">Rejected</option>
                      <option value="accepted">Accepted</option>
                    </select>
                  </td>
                  <td>
                    {new Date(applications.applied_at).getDate()}/
                    {new Date(applications.applied_at).getMonth() + 1}/
                    {new Date(applications.applied_at).getFullYear()}
                  </td>
                  <td>
                    <Button
                      type="button"
                      onClick={() => handleStatusUpdate(applications.id)}
                    >
                      Update Status
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <br />
      </div>
    </>
  );
}
