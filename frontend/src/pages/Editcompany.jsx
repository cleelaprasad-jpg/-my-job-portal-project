import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../Services/services";
import { Button } from "../components/Buttons";

export function EditCompany() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    website: "",
    description: "",
    logo: null,
  });

  const [loading, setLoading] = useState(true);

  //get the current company details for update
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`accounts/company/profile/`);

        setFormData({
          name: response.data.name || "",
          website: response.data.website || "",
          description: response.data.description || "",
          logo: null,
        });
      } catch (error) {
        alert("failed to get company details");
        console.error(JSON.stringify(error));
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      setFormData((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("website", formData.website);
    data.append("description", formData.description);
    if (formData.logo) {
      data.append("logo", formData.logo);
    }

    try {
      await api.patch(`accounts/company/profile/`, data);
      alert("Company Details Updated Successfully");
      navigate("/recruiter/dashboard/");
    } catch (error) {
      alert("Failed to Update Company Details");
      console.log(error);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  return (
    <>
      <h2>Company Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Company Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <label htmlFor="website">Website:</label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <label htmlFor="logo">Logo:</label>
        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={(e) => handleChange(e)}
        />
        <br />

        <Button type="submit">Update Company</Button>
      </form>
    </>
  );
}
