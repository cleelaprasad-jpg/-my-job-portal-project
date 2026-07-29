import { useState, useEffect } from "react";
import { api } from "../Services/services";
import { Button } from "../components/Buttons";
import { useNavigate } from "react-router-dom";
export function MyApplication() {
  const [applications, setApplication] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchapplication = async () => {
      try {
        const response = await api.get("applications/job/my-applications/");
        setApplication(response.data);
      } catch (error) {
        console.log(error);
        window.alert("Failed to get applications");
      } finally {
        setLoading(false);
      }
    };
    fetchapplication();
  }, []);

  if (loading) return <h2>Loading..</h2>;

  return (
    <>
      <div>
        <table
          border="1"
          cellPadding="4"
          cellSpacing="0"
          style={{
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <p>No Applied Jobs</p>
            ) : (
              applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.job_title}</td>
                  <td>{app.company_name}</td>
                  <td>{app.status}</td>
                  <td>
                    {new Date(app.applied_at).getDate()}/
                    {new Date(app.applied_at).getMonth() + 1}/
                    {new Date(app.applied_at).getFullYear()}
                  </td>
                  <td>
                    <Button onClick={() => navigate(`/jobs/${app.job}`)}>
                      View Job
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
