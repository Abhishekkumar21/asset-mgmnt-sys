// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  department: string;
  contactNumber: string;
  address: string;
  gender: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: string;
  contactNumber: string;
  address: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'ADMIN' | 'EMPLOYEE';

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

export interface RegisterResponse {
  message: string;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}

// Asset Types
export interface Asset {
  id: string;
  name: string;
  category: string;
  status: AssetStatus;
  condition: AssetCondition;
  assignedTo?: string;
  location: string;
  purchaseDate: string;
  warrantyExpiry?: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type AssetStatus = 'available' | 'assigned' | 'maintenance' | 'retired';
export type AssetCondition = 'new' | 'good' | 'fair' | 'poor';

export interface Category {
  id: string;
  name: string;
  description: string;
  assetCount: number;
}

// Asset Request Types
export interface AssetRequest {
  assetType: string;
  reason: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  notes?: string;
  requestedDate?: string;
}

export interface AssetRequestResponse {
  message: string;
  requestId: string;
  request: AssetRequest;
}

// Service Types
export interface ServiceRequest {
  assetId: string;
  issue: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  description?: string;
  requestedDate?: string;
}

export interface ServiceRequestResponse {
  message: string;
  requestId: string;
  request: ServiceRequest;
}

export type ServiceType = 'repair' | 'maintenance' | 'replacement';

// Dashboard Types
export interface DashboardResponse {
  assetSummary: {
    total: number;
    available: number;
    assigned: number;
    maintenance: number;
  };
  requestSummary: {
    pending: number;
    approved: number;
    rejected: number;
    completed: number;
  };
  recentAssets: Asset[];
  recentRequests: ServiceRequest[];
}
