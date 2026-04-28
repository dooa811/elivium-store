import axios from 'axios';

// استخدام environment variable بدل hardcoded URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🌐 API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - إضافة token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('elivium_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - معالجة errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // إذا الـ token منتهي الصلاحية
    if (error.response?.status === 401) {
      localStorage.removeItem('elivium_token');
      localStorage.removeItem('elivium_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;