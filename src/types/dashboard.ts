export interface BaseStats {
  totalAssets: number;
  assignedAssets: number;
  availableAssets: number;
  underMaintenanceAssets: number;
}

export interface Activity {
  id: string;
  date: string;
  assetName: string;
  action: string;
  status: 'pending' | 'approved' | 'rejected';
  user?: string;
}

export interface CategoryCount {
  category: string;
  count: number;
  available?: number;
}

export interface AssetStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface RequestStats {
  pending: number;
  approved: number;
  rejected: number;
}

export interface EmployeeDashboardData {
  myAssets: AssetStats;
  myRequests: RequestStats;
  recentActivities: Activity[];
  myAssetsByCategory: CategoryCount[];
}

export interface AdminDashboardData {
  totalAssets: number;
  assignedAssets: number;
  availableAssets: number;
  underMaintenanceAssets: number;
  pendingRequests: number;
  totalEmployees: number;
  activeEmployees: number;
  recentActivities: Activity[];
  assetsByCategory: CategoryCount[];
  assetUtilization: number;
  maintenanceAlerts: number;
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  status: string;
  imageUrl: string;
  description: string;
  price?: number;
  purchaseDate?: string;
  warrantyExpiry?: string;
  specifications?: Record<string, string>;
  assignedTo?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
}
