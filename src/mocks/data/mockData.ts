import { EmployeeDashboardData } from '../../types/dashboard';

// Mock user data
export const mockUsers = [
  {
    id: '1',
    email: 'employee@example.com',
    name: 'John Employee',
    role: 'EMPLOYEE',
    department: 'Engineering'
  },
  {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'ADMIN',
    department: 'IT'
  }
];

// Mock categories
export const mockCategories = [
  { id: '1', name: 'Laptops', description: 'Work laptops and accessories' },
  { id: '2', name: 'Furniture', description: 'Office chairs and desks' },
  { id: '3', name: 'Mobile Devices', description: 'Phones and tablets' },
  { id: '4', name: 'Peripherals', description: 'Keyboards, mice, and monitors' }
];

// Mock assets
export const mockAssets = [
  {
    id: 'ASSET-001',
    name: 'MacBook Pro M1',
    category: 'Laptops',
    status: 'assigned',
    assignedTo: '1',
    condition: 'excellent',
    purchaseDate: '2023-01-15',
    warrantyEnd: '2024-01-15'
  },
  {
    id: 'ASSET-002',
    name: 'Herman Miller Chair',
    category: 'Furniture',
    status: 'assigned',
    assignedTo: '1',
    condition: 'good',
    purchaseDate: '2023-02-20',
    warrantyEnd: '2026-02-20'
  },
  {
    id: 'ASSET-003',
    name: 'iPhone 13 Pro',
    category: 'Mobile Devices',
    status: 'available',
    assignedTo: null,
    condition: 'new',
    purchaseDate: '2024-01-10',
    warrantyEnd: '2025-01-10'
  }
];

// Mock service requests
export const mockServiceRequests = [
  {
    id: 'SR-001',
    assetId: 'ASSET-001',
    type: 'repair',
    status: 'pending',
    description: 'Battery not holding charge',
    priority: 'high',
    requestedBy: '1',
    requestDate: '2024-02-15'
  },
  {
    id: 'SR-002',
    assetId: 'ASSET-002',
    type: 'maintenance',
    status: 'in_progress',
    description: 'Regular maintenance check',
    priority: 'low',
    requestedBy: '1',
    requestDate: '2024-02-10'
  }
];

export const mockDashboardData: EmployeeDashboardData = {
  myAssets: {
    total: 5,
    pending: 1,
    approved: 3,
    rejected: 1
  },
  myRequests: {
    pending: 2,
    approved: 4,
    rejected: 1
  },
  recentActivities: [
    {
      id: '1',
      date: new Date('2024-02-20').toISOString(),
      assetName: 'MacBook Pro M1',
      action: 'Request',
      status: 'approved'
    },
    {
      id: '2',
      date: new Date('2024-02-19').toISOString(),
      assetName: 'Office Chair',
      action: 'Service Request',
      status: 'pending'
    },
    {
      id: '3',
      date: new Date('2024-02-18').toISOString(),
      assetName: 'Monitor Dell 27"',
      action: 'Return',
      status: 'approved'
    }
  ],
  myAssetsByCategory: [
    { category: 'Laptop', count: 2 },
    { category: 'Furniture', count: 2 },
    { category: 'Gadgets', count: 1 }
  ]
};

export const mockAssetSuggestions = [
  'MacBook Pro M1',
  'MacBook Air M2',
  'Dell XPS 13',
  'Herman Miller Chair',
  'Dell 27" Monitor',
  'iPhone 13 Pro',
  'iPad Pro 12.9"',
  'Logitech MX Master 3'
];
