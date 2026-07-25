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

//response interceptor
/*
  automatically detect 401 unauthorized (access token expired)
  send the stored refresh token to get new access token (refresh/)
  recieves also saves the new access token 
  retries the original request
*/

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refresh_token");
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}accounts/refresh/`,
          { refresh: refresh },
        );
        const newAccess = response.data.access;
        localStorage.setItem("access_token", newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("role");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export { api };
