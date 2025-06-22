import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // Redirect to login or show unauthorized message
      window.location.href = "/login"; // Adjust the path as needed
      console.error("Unauthorized access - redirecting to login");
      // Optionally, you can redirect to login page here
    }
    if (error.response && error.response.status === 403) {
      // Handle forbidden access
      console.error(
        "Forbidden access - you do not have permission to perform this action"
      );
    }
    return Promise.reject(error);
  }
);
export const setAuthToken = (token) => {
  if (token) {
    // Apply token to every request
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export default axiosInstance;
