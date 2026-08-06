import axios from "axios";

const API = axios.create({
  baseURL: "https://campushub-ai-um6d.onrender.com/api",
});

// Token automatically attach karega
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;