import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
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
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error registering user:', error);
      return { data: null, error: error.response?.data?.error || error.message };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error logging in:', error);
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
  },

  // Logout (client-side)
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  }
};

// Admin API functions
export const adminAPI = {
  // Get all users
  getUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { data: null, error: error.response?.data?.error || error.message };
    }
  },

  // Update user role
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

// Booking API functions
export const bookingAPI = {
  // Get all bookings
  getAll: async () => {
    try {
      const response = await api.get('/bookings');
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return { data: null, error: error.response?.data?.error || error.message };
    }
  },

  // Create new booking
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

// Contact submissions API functions
export const contactAPI = {
  // Get all contact submissions
  getAll: async () => {
    try {
      const response = await api.get('/contact-submissions');
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      return { data: null, error: error.response?.data?.error || error.message };
    }
  },

  // Create new contact submission
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