export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE';
  gender: string;
  contactNumber: string;
  address: string;
}

export interface Asset {
  assetNo: string;
  assetName: string;
  assetCategory: string;
  assetModel: string;
  manufacturingDate: string;
  expiryDate: string;
  assetValue: number;
  status: 'AVAILABLE' | 'ASSIGNED' | 'IN_SERVICE' | 'RETIRED';
  image?: string;
}

export interface AssetRequest {
  id: string;
  employeeId: string;
  assetNo: string;
  requestType: 'NEW' | 'SERVICE' | 'RETURN';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  description?: string;
  issueType?: 'MALFUNCTION' | 'REPAIR';
  requestDate: string;
}

export interface AuditRequest {
  id: string;
  employeeId: string;
  assetNo: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  requestDate: string;
  responseDate?: string;
}
