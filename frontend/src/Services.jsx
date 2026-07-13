import { axios } from "axios";

const api_base_url = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export { api_base_url };
