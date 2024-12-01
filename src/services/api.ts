import axios, { AxiosInstance, AxiosError } from 'axios';
import { message } from 'antd';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access
          localStorage.removeItem('token');
          window.location.href = '/login';
          message.error('Session expired. Please login again.');
          break;
        case 403:
          message.error('You do not have permission to perform this action.');
          break;
        case 404:
          message.error('Resource not found.');
          break;
        case 500:
          message.error('Internal server error. Please try again later.');
          break;
        default:
          message.error('An error occurred. Please try again.');
      }
    } else if (error.request) {
      message.error('Network error. Please check your connection.');
    } else {
      message.error('An error occurred. Please try again.');
    }
    return Promise.reject(error);
  }
);

export default api;
