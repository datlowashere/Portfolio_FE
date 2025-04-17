import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
console.log('API_BASE_URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Profile API
export const getProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// Blog API
export const getBlogs = async () => {
  const response = await api.get('/blogs');
  return response.data;
};

export const getBlogById = async (id: string) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

// Project API
export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProjectById = async (id: string) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

// Experience API
export const getExperiences = async () => {
  try {
    const response = await api.get('/experience');
    return response.data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw new Error('Failed to fetch experiences. Please try again later.');
  }
};

// Skills API
export const getSkills = async () => {
  const response = await api.get('/skills');
  return response.data;
};

// Contact API
export const sendMessage = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  const response = await api.post('/contact', data);
  return response.data;
};

export default api; 