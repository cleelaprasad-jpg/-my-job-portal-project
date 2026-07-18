import { api } from "./Services";

//jobseeker signup

export const jobSeekerSignup = async (data) => {
  try {
    const response = await api.post("/accounts/jobseeker/signup/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    localStorage.setItem("role", response.data.role);
    alert("Successfully created your Account");
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    alert(JSON.stringify(error.response.data));
  }
};

//recruiter signup

export const recruiterSignup = async (data) => {
  try {
    const response = await api.post("accounts/recruiter/signup/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    localStorage.setItem("role", response.data.role);
    alert("Account has Successfully registered");
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    alert("invalid credentials");
    alert(JSON.stringify(error.response.data));
  }
};

//Login jobseeker/recruiter users

export const login = async (email, password) => {
  try {
    const response = await api.post("accounts/login/", { email, password });
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    localStorage.setItem("role", response.data.role);
    alert("Logged in Successfully");
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    alert(JSON.stringify(error.response.data));
  }
};
