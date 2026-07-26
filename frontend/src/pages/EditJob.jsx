import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Buttons";
import { api } from "../Services/services";

export function EditJob() {
  const { id } = useParams(); // takes the job id from the url dynamically
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    job_type: "",
    experienced_required: "",
  });

  //fetch the current job details for update
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`jobs/job/${id}/`);
        setFormData(response.data);
      } catch (error) {
        console.log(error);
        console.log("failed to get job details");
      }
    };
    fetchDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`jobs/job/${id}/update/`, formData);
      alert("Job Updated Successfully");
      navigate("/myjobs/");
    } catch (error) {
      console.log(error);
      alert("Failed to Update the Job");
    }
  };
  return (
    <>
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">description:</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="location">location:</label>
        <input
          type="text"
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="salary">salary:</label>
        <input
          type="text"
          name="salary"
          value={formData.salary || ""}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="job_type">Job Type:</label>
        <select
          name="job_type"
          value={formData.job_type || ""}
          onChange={handleChange}
        >
          <option value="full_time">full_time</option>
          <option value="part_time">part_time</option>
          <option value="contract">contract</option>
        </select>
        <br />
        <label htmlFor="experience_required">Experience required:</label>
        <input
          type="text"
          name="experience_required"
          value={formData.experience_required || ""}
          onChange={handleChange}
        />
        <br />
        <Button type="submit">Update Job</Button>
      </form>
    </>
  );
}
