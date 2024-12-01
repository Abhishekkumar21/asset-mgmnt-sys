import { User } from '../types';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface LoginResponse {
  token: string;
  user: User;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends Omit<User, 'id' | 'role'> {
  password: string;
}

export const authService = {
  setAuthToken(token: string) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  },

  removeAuthToken() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  },

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { token, user } = response.data;
      this.setAuthToken(token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
    } catch (error) {
      throw error;
    }
  },

  async register(data: RegisterData): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/register`, data);
    } catch (error) {
      throw error;
    }
  },

  logout(): void {
    this.removeAuthToken();
    localStorage.removeItem('user');
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = this.getAuthToken();
      if (!token) {
        return null;
      }

      // First try to get from localStorage for immediate UI update
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }

      // If no stored user, fetch from API
      const response = await axios.get(`${API_URL}/auth/me`);
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      this.removeAuthToken();
      localStorage.removeItem('user');
      throw error;
    }
  },

  async refreshToken(): Promise<string> {
    try {
      const response = await axios.post(`${API_URL}/auth/refresh-token`);
      const { token } = response.data;
      this.setAuthToken(token);
      return token;
    } catch (error) {
      this.removeAuthToken();
      throw error;
    }
  }
};
