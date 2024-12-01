import { http, HttpResponse } from 'msw';
import { 
  mockDashboardData, 
  mockAssetSuggestions, 
  mockUsers,
  mockAssets,
  mockCategories,
  mockServiceRequests
} from './data/mockData';

// Get the base API URL from environment or use a default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const handlers = [
  // Auth endpoints
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    const body = await request.json();
    const user = mockUsers.find(u => u.email === body.email);

    if (!user || body.password !== 'password') { // In real app, use proper password hashing
      return new HttpResponse(
        JSON.stringify({ message: 'Invalid credentials' }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    return HttpResponse.json({
      user,
      token: `mock-jwt-token-${user.role.toLowerCase()}`,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }),

  http.post(`${API_URL}/auth/register`, async ({ request }) => {
    const body = await request.json();
    
    if (mockUsers.some(u => u.email === body.email)) {
      return new HttpResponse(
        JSON.stringify({ message: 'Email already exists' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    return HttpResponse.json({
      message: 'Registration successful',
    }, {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }),

  // Get current user
  http.get(`${API_URL}/auth/me`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new HttpResponse(
        JSON.stringify({ message: 'Authentication required' }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    const token = authHeader.split(' ')[1];
    const role = token.includes('admin') ? 'ADMIN' : 'EMPLOYEE';
    const user = mockUsers.find(u => u.role === role);

    if (!user) {
      return new HttpResponse(
        JSON.stringify({ message: 'User not found' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    return HttpResponse.json(user, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }),

  // Refresh token
  http.post(`${API_URL}/auth/refresh-token`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new HttpResponse(
        JSON.stringify({ message: 'Authentication required' }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    const oldToken = authHeader.split(' ')[1];
    const role = oldToken.includes('admin') ? 'admin' : 'employee';
    const newToken = `mock-jwt-token-${role}-${Date.now()}`;

    return HttpResponse.json({ token: newToken }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }),

  // Get employee dashboard data
  http.get(`${API_URL}/employee/dashboard`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new HttpResponse(
        JSON.stringify({ message: 'Authentication required' }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    return HttpResponse.json(mockDashboardData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
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

    return HttpResponse.json(filteredAssets, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }),

  http.get(`${API_URL}/assets/categories`, async () => {
    return HttpResponse.json(mockCategories, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }),

  http.get(`${API_URL}/assets/suggestions`, async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query')?.toLowerCase() || '';
    
    const suggestions = mockAssetSuggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(query)
    );

    await new Promise(resolve => setTimeout(resolve, 300));

    return HttpResponse.json(suggestions, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }),

  // Asset requests
  http.post(`${API_URL}/assets/request`, async ({ request }) => {
    const body = await request.json();
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new HttpResponse(
      JSON.stringify({
        message: 'Asset request submitted successfully',
        requestId: 'mock-123'
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
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

    return HttpResponse.json(filteredRequests, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }),

  http.post(`${API_URL}/assets/service`, async ({ request }) => {
    const body = await request.json();
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new HttpResponse(
      JSON.stringify({
        message: 'Service request submitted successfully',
        requestId: 'mock-456'
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }),

  // Handle OPTIONS requests for CORS
  http.options('*', () => {
    return new HttpResponse(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  })
];
