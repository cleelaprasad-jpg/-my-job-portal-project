import { useState } from "react";
import { Button } from "../components/Buttons";
import { api } from "../Services/services";

export function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    job_type: "",
    experienced_required: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const response = await api.post("jobs/postjob/", formData);
      alert("job successfully posted");
      console.log(response.data);
      setFormData({
        title: "",
        description: "",
        location: "",
        salary: "",
        job_type: "",
        experienced_required: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job");
    }
  };
  return (
    <>
      <h2>Post New Jobs</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="job title here"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          name="description"
          type="text"
          placeholder="job description here"
          value={formData.description}
          cols="10"
          rows="10"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="job location here"
          value={formData.location}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="salary">Salary:</label>
        <input
          id="salary"
          name="salary"
          type="text"
          placeholder="job salary here"
          value={formData.salary}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="job_type">Job Type:</label>
        <select
          id="job_type"
          name="job_type"
          value={formData.job_type}
          onChange={handleChange}
        >
          <option value="">Select Job Type</option>
          <option value="full_time">full_time</option>
          <option value="part_time">part_time</option>
          <option value="contract">contract</option>
        </select>
        <br />
        <label htmlFor="experienced_required">Experienced Required:</label>
        <input
          id="experienced_required"
          name="experienced_required"
          type="number"
          value={formData.experienced_required}
          onChange={handleChange}
        />
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
