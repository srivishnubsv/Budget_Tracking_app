import axios from 'axios';
import { apiPaths } from './apiPaths';

const apiClient = axios.create({
  baseURL: 'https://your-api-url.com', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (credentials) => {
  try {
    const response = await apiClient.post(apiPaths.login, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signup = async (userData) => {
  try {
    const response = await apiClient.post(apiPaths.signup, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};