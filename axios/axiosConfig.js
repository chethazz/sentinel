import axios from "axios";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "./endPoints";
import { EDIT_ENDPOINT, SOS_ENDPOINT } from "./endPoints";

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

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post(LOGIN_ENDPOINT, {
      email,
      password,
    });
    return response.users;
  } catch (error) {
    throw error;
  }
};

export const editUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.post(
      `${EDIT_ENDPOINT}/${userId}`,
      userData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const sos_Api = async ({allergies ,address ,bloodType }) => {
  try {
    const response = await axiosInstance.post(SOS_ENDPOINT, {
      allergies ,address ,bloodType,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
