import api from './api';
import { Asset, AssetRequest, AuditRequest } from '../types';

interface AssetQueryParams {
  search?: string;
  category?: string;
  status?: Asset['status'];
  page?: number;
  pageSize?: number;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export const assetService = {
  // Asset Management
  getAllAssets: async (params: AssetQueryParams): Promise<PaginatedResponse<Asset>> => {
    const response = await api.get<PaginatedResponse<Asset>>('/assets', { params });
    return response.data;
  },

  getAssetById: async (assetNo: string): Promise<Asset> => {
    const response = await api.get<Asset>(`/assets/${assetNo}`);
    return response.data;
  },

  createAsset: async (asset: Omit<Asset, 'assetNo'>): Promise<Asset> => {
    const response = await api.post<Asset>('/assets', asset);
    return response.data;
  },

  updateAsset: async (assetNo: string, asset: Partial<Asset>): Promise<Asset> => {
    const response = await api.put<Asset>(`/assets/${assetNo}`, asset);
    return response.data;
  },

  deleteAsset: async (assetNo: string): Promise<void> => {
    await api.delete(`/assets/${assetNo}`);
  },

  // Asset Requests
  createAssetRequest: async (request: Omit<AssetRequest, 'id' | 'status' | 'requestDate'>): Promise<AssetRequest> => {
    const response = await api.post<AssetRequest>('/asset-requests', request);
    return response.data;
  },

  getUserAssetRequests: async (): Promise<AssetRequest[]> => {
    const response = await api.get<AssetRequest[]>('/asset-requests/user');
    return response.data;
  },

  getAllAssetRequests: async (params?: { status?: AssetRequest['status'] }): Promise<AssetRequest[]> => {
    const response = await api.get<AssetRequest[]>('/asset-requests', { params });
    return response.data;
  },

  updateAssetRequest: async (requestId: string, status: AssetRequest['status']): Promise<AssetRequest> => {
    const response = await api.put<AssetRequest>(`/asset-requests/${requestId}`, { status });
    return response.data;
  },

  // Asset Audit
  createAuditRequest: async (employeeId: string, assetNo: string): Promise<AuditRequest> => {
    const response = await api.post<AuditRequest>('/audit-requests', { employeeId, assetNo });
    return response.data;
  },

  getAuditRequests: async (params?: { status?: AuditRequest['status'] }): Promise<AuditRequest[]> => {
    const response = await api.get<AuditRequest[]>('/audit-requests', { params });
    return response.data;
  },

  respondToAuditRequest: async (requestId: string, status: 'VERIFIED' | 'REJECTED'): Promise<AuditRequest> => {
    const response = await api.put<AuditRequest>(`/audit-requests/${requestId}/respond`, { status });
    return response.data;
  },

  // Employee Assets
  getEmployeeAssets: async (employeeId?: string): Promise<Asset[]> => {
    const response = await api.get<Asset[]>(`/assets/employee/${employeeId || 'current'}`);
    return response.data;
  },

  // Asset Categories
  getAssetCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/assets/categories');
    return response.data;
  },
};
