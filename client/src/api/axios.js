import axios from 'axios';

// For debugging (log base url to check if it's set correctly
console.log('VITE_API_URL from env:', import.meta.env.VITE_API_URL);

// Correct base URL setup
const BASE_URL = import.meta.env.VITE_API_URL || 'https://career-track-9jjt.onrender.com/api';

console.log('Using Base URL:', BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Requesting to:', config.baseURL + config.url);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
