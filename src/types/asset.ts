export type AssetStatus = 'available' | 'assigned' | 'maintenance' | 'retired';
export type RequestStatus = 'pending' | 'approved' | 'rejected';
export type ServiceRequestType = 'malfunction' | 'repair' | 'return';

export interface Asset {
  id: string;
  name: string;
  category: string;
  status: AssetStatus;
  assignedTo?: string;
  serialNumber: string;
  purchaseDate: string;
  warranty: string;
  location: string;
  condition: string;
  notes?: string;
  image?: string;
  description?: string;
  specifications?: Record<string, string>;
  price?: number;
}

export interface AssetRequest {
  category: string;
  reason: string;
  priority: 'low' | 'medium' | 'high';
  specifications?: Record<string, string>;
  notes?: string;
}

export interface ServiceRequest {
  assetId: string;
  assetNo: string;
  description: string;
  issueType: ServiceRequestType;
  priority: 'low' | 'medium' | 'high';
  attachments?: File[];
}

export interface DashboardData {
  totalAssets: number;
  assignedAssets: number;
  availableAssets: number;
  underMaintenanceAssets: number;
  recentActivities: Array<{
    id: string;
    date: string;
    assetName: string;
    action: string;
    user: string;
    status?: RequestStatus;
  }>;
  assetsByCategory: Array<{
    category: string;
    count: number;
    available: number;
  }>;
  myRequests?: {
    pending: number;
    approved: number;
    rejected: number;
  };
}

export interface AssetCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface AssetSearchResult {
  id: string;
  name: string;
  category: string;
  status: AssetStatus;
  image?: string;
  description?: string;
}
