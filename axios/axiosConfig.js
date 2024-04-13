import axios from "axios";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "./endPoints";

const axiosInstance = axios.create({
  baseURL: "https://sentinel-backend-14.onrender.com",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const register = async (username, email, password) => {
  try {
    const response = await axiosInstance.post(REGISTER_ENDPOINT, {
     username,
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
