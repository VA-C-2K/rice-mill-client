// api/axiosInstance.js
import axios from 'axios';
import { baseURL } from '.';

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers["Content-type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, logging out ...');
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;