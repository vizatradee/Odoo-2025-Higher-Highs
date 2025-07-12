// lib/api.js
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const auth = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
};

export const users = {
  getPublicUsers: (search = '', availability = '') => api.get(`/users?search=${search}&availability=${availability}`),
  getUserProfile: (id) => api.get(`/users/${id}`),
  updateUserProfile: (id, data) => api.put(`/users/${id}`, data),
  uploadProfilePhoto: (id, formData) => api.put(`/users/${id}/profile-photo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const swapRequests = {
  createRequest: (data) => api.post('/swap-requests', data),
  getMyRequests: (status = '') => api.get(`/swap-requests/me?status=${status}`),
  acceptRequest: (id) => api.put(`/swap-requests/${id}/accept`),
  rejectRequest: (id) => api.put(`/swap-requests/${id}/reject`),
  deleteRequest: (id) => api.delete(`/swap-requests/${id}`),
  submitFeedback: (id, data) => api.put(`/swap-requests/${id}/feedback`, data),
};

// Admin APIs (conceptual, you'd add these on the backend)
export const admin = {
  rejectSkillDescription: (skillId) => api.put(`/admin/skills/${skillId}/reject`),
  banUser: (userId) => api.put(`/admin/users/${userId}/ban`),
  getSwapStats: () => api.get('/admin/stats/swaps'),
  sendPlatformMessage: (message) => api.post('/admin/messages', message),
};