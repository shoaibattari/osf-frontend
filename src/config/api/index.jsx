import axios from "axios";

// API Modules (we'll define them shortly)
import authApi from "./authApi";
import adminApi from "./adminApi";

// Set your backend base URL here
import { baseUrl } from "../../constants/index";

const createBackendServer = (baseURL) => {
  const api = axios.create({
    baseURL: `${baseURL}`,
    headers: {
      Accept: "application/json",
    },
    timeout: 60 * 1000,
  });

  // Attach JWT token from localStorage
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Unified Error Handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const message =
        error?.response?.data?.data?.error ||
        error?.response?.data?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      return Promise.reject(message);
    }
  );

  // Combine all API modules
  return {
    ...authApi(api),
    ...adminApi(api),
  };
};

const apis = createBackendServer(baseUrl);

export default apis;
