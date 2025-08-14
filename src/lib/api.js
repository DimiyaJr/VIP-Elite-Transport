// Replace your existing api.js content with this enhanced version

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
  console.log('Request data:', config.data);
  
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error(`❌ API Error:`, {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method
    });
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Test connection
  test: async () => {
    try {
      const response = await api.get('/test');
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Test API failed:', error);
      return { data: null, error: error.message };
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      console.log('🔐 Registering user:', { email: userData.email, full_name: userData.full_name });
      const response = await api.post('/auth/register', userData);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('❌ Registration failed:', error);
      return { data: null, error: error.response?.data?.error || error.message };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      console.log('🔐 Logging in user:', { email: credentials.email });
      const response = await api.post('/auth/login', credentials);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('❌ Login failed:', error);
      return { data: null, error: error.response?.data?.error || error.message };
    }
  },

  // Google OAuth login
  googleLogin: async (token) => {
    try {
      const response = await api.post('/auth/google', { token });
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error with Google login:', error);
      return { data: null, error: error.response?.data?.error || error.message };
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error fetching profile:', error);
      return { data: null, error: error.response?.data?.error || error.message };
    }
  }
};

// Keep your existing booking and contact API functions as they are
export const bookingAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/bookings');
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return { data: null, error: error.response?.data?.error || error.message };
    }
  },

  create: async (bookingData) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error creating booking:', error);
      return { data: null, error: error.response?.data?.error || error.message };
    }
  }
};

export const contactAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/contact-submissions');
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      return { data: null, error: error.response?.data?.error || error.message };
    }
  },

  create: async (contactData) => {
    try {
      const response = await api.post('/contact-submissions', contactData);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error creating contact submission:', error);
      return { data: null, error: error.response?.data?.error || error.message };
    }
  }
};

export const adminAPI = {
  getUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { data: null, error: error.response?.data?.error || error.message };
    }
  },

  updateUserRole: async (userId, role) => {
    try {
      const response = await api.put(`/admin/users/${userId}/role`, { role });
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error updating user role:', error);
      return { data: null, error: error.response?.data?.error || error.message };
    }
  }
};

// Test server connection
export const testConnection = async () => {
  try {
    const response = await api.get('/test');
    return { data: response.data, error: null };
  } catch (error) {
    console.error('Error testing connection:', error);
    return { data: null, error: error.message };
  }
};