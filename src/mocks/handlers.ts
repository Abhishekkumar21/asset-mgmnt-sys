import { http, HttpResponse } from 'msw';
import { 
  mockDashboardData, 
  mockAssetSuggestions, 
  mockUsers,
  mockAssets,
  mockCategories,
  mockServiceRequests
} from './data/mockData';
import { 
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RegisterResponse,
  ErrorResponse,
  AssetRequest,
  AssetRequestResponse,
  ServiceRequest,
  ServiceRequestResponse,
  User
} from '../types/auth';

// Get the base API URL from environment or use a default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const handlers = [
  // Auth endpoints
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    const body = await request.json() as LoginRequest;
    const user = mockUsers.find(u => u.email === body.email) as User;

    if (!user || body.password !== 'password') {
      return new HttpResponse(
        JSON.stringify({ message: 'Invalid credentials' } as ErrorResponse),
        { status: 401 }
      );
    }

    const response: AuthResponse = {
      user,
      token: `mock-jwt-token-${user.role.toLowerCase()}`
    };

    return new HttpResponse(JSON.stringify(response), { status: 200 });
  }),

  http.post(`${API_URL}/auth/register`, async ({ request }) => {
    const body = await request.json() as RegisterRequest;
    
    if (mockUsers.some(u => u.email === body.email)) {
      return new HttpResponse(
        JSON.stringify({ message: 'Email already exists' } as ErrorResponse),
        { status: 400 }
      );
    }

    const response: RegisterResponse = {
      message: 'Registration successful'
    };

    return new HttpResponse(JSON.stringify(response), { status: 201 });
  }),

  http.get(`${API_URL}/auth/me`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new HttpResponse(
        JSON.stringify({ message: 'Authentication required' } as ErrorResponse),
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const role = token.includes('admin') ? 'ADMIN' : 'EMPLOYEE';
    const user = mockUsers.find(u => u.role === role) as User;

    if (!user) {
      return new HttpResponse(
        JSON.stringify({ message: 'User not found' } as ErrorResponse),
        { status: 404 }
      );
    }

    const response: AuthResponse = {
      user,
      token: `mock-jwt-token-${user.role.toLowerCase()}`
    };

    return new HttpResponse(JSON.stringify(response), { status: 200 });
  }),

  http.post(`${API_URL}/auth/refresh-token`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new HttpResponse(
        JSON.stringify({ message: 'Authentication required' } as ErrorResponse),
        { status: 401 }
      );
    }

    const oldToken = authHeader.split(' ')[1];
    const role = oldToken.includes('admin') ? 'admin' : 'employee';
    const newToken = `mock-jwt-token-${role}-${Date.now()}`;

    return new HttpResponse(JSON.stringify({ token: newToken }), { status: 200 });
  }),

  // Get employee dashboard data
  http.get(`${API_URL}/employee/dashboard`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new HttpResponse(
        JSON.stringify({ message: 'Authentication required' } as ErrorResponse),
        { status: 401 }
      );
    }

    return new HttpResponse(JSON.stringify(mockDashboardData), { status: 200 });
  }),

  // Asset endpoints
  http.get(`${API_URL}/assets`, async ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const status = url.searchParams.get('status');
    
    let filteredAssets = [...mockAssets];
    
    if (category) {
      filteredAssets = filteredAssets.filter(asset => asset.category === category);
    }
    
    if (status) {
      filteredAssets = filteredAssets.filter(asset => asset.status === status);
    }

    return new HttpResponse(JSON.stringify(filteredAssets), { status: 200 });
  }),

  http.get(`${API_URL}/assets/categories`, async () => {
    return new HttpResponse(JSON.stringify(mockCategories), { status: 200 });
  }),

  http.get(`${API_URL}/assets/suggestions`, async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query')?.toLowerCase() || '';
    
    const suggestions = mockAssetSuggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(query)
    );

    await new Promise(resolve => setTimeout(resolve, 300));

    return new HttpResponse(JSON.stringify(suggestions), { status: 200 });
  }),

  // Asset requests
  http.post(`${API_URL}/assets/request`, async ({ request }) => {
    const body = await request.json() as AssetRequest;
    
    // Validate required fields
    if (!body.assetType || !body.reason) {
      return new HttpResponse(
        JSON.stringify({
          message: 'Missing required fields: assetType and reason are required'
        } as ErrorResponse),
        { status: 400 }
      );
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    return new HttpResponse(
      JSON.stringify({
        message: 'Asset request submitted successfully',
        requestId: `req-${Date.now()}`,
        request: body
      } as AssetRequestResponse),
      { status: 201 }
    );
  }),

  // Service requests
  http.get(`${API_URL}/service-requests`, async ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    
    let filteredRequests = [...mockServiceRequests];
    if (status) {
      filteredRequests = filteredRequests.filter(req => req.status === status);
    }

    return new HttpResponse(JSON.stringify(filteredRequests), { status: 200 });
  }),

  http.post(`${API_URL}/assets/service`, async ({ request }) => {
    const body = await request.json() as ServiceRequest;
    
    // Validate required fields
    if (!body.assetId || !body.issue) {
      return new HttpResponse(
        JSON.stringify({
          message: 'Missing required fields: assetId and issue are required'
        } as ErrorResponse),
        { status: 400 }
      );
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    return new HttpResponse(
      JSON.stringify({
        message: 'Service request submitted successfully',
        requestId: `srv-${Date.now()}`,
        request: body
      } as ServiceRequestResponse),
      { status: 201 }
    );
  }),

  // Handle OPTIONS requests for CORS
  http.options('*', () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  })
];
