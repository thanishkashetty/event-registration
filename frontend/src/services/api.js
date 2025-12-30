import axios from 'axios';

const API_URL = 'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000, // 5 second timeout
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Smart API functions that try real backend first, then fallback to mock
export const authAPI = {
  login: async (email, password) => {
    console.log('🔐 Attempting REAL login...');
    return api.post('/auth/login', { email, password });
  },

  register: async (userData) => {
    console.log('👤 Attempting REAL registration...');
    return api.post('/auth/register', userData);
  },

  getCurrentUser: () => {
    return api.get('/auth/me');
  }
};

// Similar hybrid approach for events and registrations
export const eventsAPI = {
  getAll: () => api.get('/events')
};

export const registrationsAPI = {
  register: (eventId) => api.post('/registrations', { eventId }),

  getMyRegistrations: () => api.get('/registrations/my-registrations'),

  cancel: (registrationId) => api.delete(`/registrations/${registrationId}`)
  
};

export default api;