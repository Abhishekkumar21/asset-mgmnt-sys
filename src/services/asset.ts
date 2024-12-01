import axios from 'axios';
import { API_BASE_URL } from '../config';
import type { Asset, AssetRequest, ServiceRequest } from '../types/asset';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const assetService = {
  // Get all assets with optional filters
  getAssets: async (params?: { category?: string; search?: string }) => {
    const response = await API.get('/assets', { params });
    return response.data;
  },

  // Get asset by ID
  getAssetById: async (id: string): Promise<Asset> => {
    const response = await API.get(`/assets/${id}`);
    return response.data;
  },

  // Get asset suggestions for search
  getAssetSuggestions: async (query: string): Promise<string[]> => {
    const response = await API.get(`/assets/suggestions`, {
      params: { query }
    });
    return response.data;
  },

  // Request new asset
  requestAsset: async (request: AssetRequest) => {
    const response = await API.post('/assets/request', request);
    return response.data;
  },

  // Request service for an asset
  requestService: async (request: ServiceRequest) => {
    const response = await API.post('/assets/service', request);
    return response.data;
  },

  // Verify asset (for admin)
  verifyAsset: async (assetId: string, verified: boolean) => {
    const response = await API.post(`/assets/${assetId}/verify`, { verified });
    return response.data;
  },

  // Get asset categories
  getCategories: async () => {
    const response = await API.get('/assets/categories');
    return response.data;
  }
};
