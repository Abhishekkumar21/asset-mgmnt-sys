# Mock Server for Development

This directory contains a mock server implementation using [Mock Service Worker (MSW)](https://mswjs.io/) for development purposes. It intercepts API requests and returns mock data, allowing frontend development to proceed without a backend server.

## Structure

- `browser.ts` - MSW browser setup and event logging
- `handlers.ts` - API route handlers and mock responses
- `data/` - Mock data used by the handlers

## Mock API Endpoints

### Employee Dashboard
- `GET /api/employee/dashboard` - Returns mock dashboard data
- `GET /api/assets/suggestions` - Returns filtered asset suggestions based on search query
- `POST /api/assets/request` - Handles new asset requests
- `POST /api/assets/service` - Handles service requests

## Usage

The mock server is automatically started in development mode. You'll see console logs for:
- 🔸 Mock server startup
- ✅ Successfully mocked requests
- ❌ Unhandled requests

## Removing Mock Server

When the real backend is ready:
1. Remove the `mocks/` directory
2. Remove the MSW initialization code from `main.tsx`
3. Uninstall MSW: `npm uninstall msw`
