import { useState, useEffect } from "react";
import { api } from "../Services/services";
import { Button } from "../components/Buttons.jsx";

//recruiter dashboard
export function RecruiterDashBoard() {
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await api.get("accounts/company/profile/");
        setCompany(response.data);
      } catch (error) {
        console.log(error.response.data);
        setError("Enable to load company details");
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, []);
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  return (
    <>
      <h2>This is Recruiter DashBoard Page</h2>
      <h4>Welcome to the JOb Portal Web App</h4>
      <hr />
      <div>
        {company.logo && (
          <img src={company.logo} alt={company.name} width="120" />
        )}

        <h2>{company.name}</h2>
        <p>
          <strong>Website:</strong>
          {company.website}
        </p>
        <p>
          <strong>description:</strong>
          {company.description}
        </p>
      </div>
      <div>
        <br />
        <h2>Quick Actions</h2>
        <Button type="button">Post JObs</Button> &nbsp;
        <Button type="button">My JObs</Button> &nbsp;
        <Button type="button">Edit Company</Button> &nbsp;
      </div>
    </>
  );
}
