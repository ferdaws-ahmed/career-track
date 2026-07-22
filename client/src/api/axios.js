import axios from 'axios';

// 🔹 Step 1: Determine the base URL with a robust fallback
const getBaseURL = () => {
  // Check if environment variable exists
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // If no env var, use production URL as fallback
  return 'https://career-track-9jjt.onrender.com/api';
};

// 🔹 Step 2: Create an Axios instance with the base URL
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000, // 15-second timeout (prevents hanging requests)
  headers: {
    'Content-Type': 'application/json'
  }
});

// 🔹 Step 3: Add Request Interceptor (auto-adds auth token)
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem('token');
    if (token) {
      // Add token to request headers
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// 🔹 Step 4: Add Response Interceptor (handles auth errors)
api.interceptors.response.use(
  (response) => {
    // Return successful responses
    return response;
  },
  (error) => {
    // If 401 Unauthorized, log out the user
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
