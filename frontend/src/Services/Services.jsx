import axios from "axios";
//base url
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
//attaches token with every user requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (
      token &&
      !config.url.includes("signup") &&
      !config.url.includes("login")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
export { api };
