import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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