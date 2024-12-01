import axios from 'axios';
import type { EmployeeDashboardData } from '../types/dashboard';

const API_URL = import.meta.env.VITE_API_URL;

export const dashboardService = {
  getEmployeeDashboard: async (): Promise<EmployeeDashboardData> => {
    try {
      const response = await axios.get(`${API_URL}/employee/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw new Error('Unable to connect to the server. Please check if the backend service is running.');
        }
        if (error.response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(error.response.data?.message || 'Failed to fetch dashboard data');
      }
      throw error;
    }
  },

  getAssetSuggestions: async (query: string): Promise<string[]> => {
    try {
      const response = await axios.get(`${API_URL}/assets/suggestions`, {
        params: { query },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  }
};
