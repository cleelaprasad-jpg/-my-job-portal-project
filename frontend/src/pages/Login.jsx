import { useState } from "react";
import {
  jobSeekerSignup,
  login,
  recruiterSignup,
} from "../Services/authService";
import { Button } from "../components/Buttons.jsx";

//jobseeker signup component
export function JobSeekerSignup() {
  const styles = { width: "356px", height: "84px" };
  let [username, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [full_name, setFull_Name] = useState("");
  let [experience, setExperience] = useState("");
  let [resume, setResume] = useState(null);
  let [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("full_name", full_name);
    formData.append("experience", experience);
    formData.append("resume", resume);
    formData.append("location", location);

    jobSeekerSignup(formData);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Jobseeker SignUp Page</h2>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="phone">Mobile no:</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Enter your number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label htmlFor="full_name">Full Name:</label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          placeholder="Enter your full name"
          value={full_name}
          onChange={(e) => setFull_Name(e.target.value)}
          required
        />
        <br />
        <label htmlFor="experience">Experience:</label>
        <input
          id="experience"
          name="experience"
          type="number"
          placeholder="Enter your Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />
        <br />
        <label htmlFor="resume">Resume:</label>
        <input
          id="resume"
          name="resume"
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
          required
        />
        <br />
        <label htmlFor="location">Location:</label>
        <textarea
          id="location"
          cols={20}
          rows={20}
          style={styles}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        ></textarea>
        <br />

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

//recruiter sign up component
export function RecruiterSignup() {
  let [username, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [company_name, setCompany_Name] = useState("");
  let [designation, setDesignation] = useState("");
  let [company_logo, setCompany_Logo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("company_name", company_name);
    formData.append("designation", designation);
    formData.append("company_logo", company_logo);

    recruiterSignup(formData);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Recruiter SignUp Page</h2>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="phone">Mobile no:</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Enter your number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label htmlFor="company_name">Company Name:</label>
        <input
          id="company_name"
          name="company_name"
          type="text"
          placeholder="Enter your Company name"
          value={company_name}
          onChange={(e) => setCompany_Name(e.target.value)}
          required
        />
        <br />
        <label htmlFor="designation">Designation:</label>
        <input
          id="designation"
          name="designation"
          type="text"
          placeholder="Enter Designation Here"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          required
        />
        <br />
        <label htmlFor="Company_logo">Company Logo</label>
        <input
          id="company_logo"
          name="company_logo"
          type="file"
          onChange={(e) => setCompany_Logo(e.target.files[0])}
        />
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

//login component (jobseeker/recruiters)
export function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login Page</h2>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          placeholder="Enter Your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
          required
        />
        <br />
        <Button type="submit">Login</Button>
      </form>
    </>
  );
}
