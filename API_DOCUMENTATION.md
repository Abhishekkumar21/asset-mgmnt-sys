# Employee Asset Management System - API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

### Authentication Endpoints

#### 1. Login
```
POST /auth/login
```
Request:
```json
{
  "email": "string",
  "password": "string"
}
```
Response (200 OK):
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "ADMIN" | "EMPLOYEE",
    "department": "string",
    "contactNumber": "string",
    "address": "string",
    "gender": "string"
  }
}
```
Error (401 Unauthorized):
```json
{
  "message": "Invalid credentials"
}
```

#### 2. Register
```
POST /auth/register
```
Request:
```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "department": "string",
  "contactNumber": "string",
  "address": "string",
  "gender": "string"
}
```
Response (201 Created):
```json
{
  "message": "Registration successful"
}
```
Error (400 Bad Request):
```json
{
  "message": "Email already exists"
}
```

#### 3. Get Current User
```
GET /auth/me
```
Response (200 OK):
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "role": "ADMIN" | "EMPLOYEE",
  "department": "string",
  "contactNumber": "string",
  "address": "string",
  "gender": "string"
}
```
Error (401 Unauthorized):
```json
{
  "message": "Authentication required"
}
```

#### 4. Refresh Token
```
POST /auth/refresh-token
```
Request: No body required, uses existing token from Authorization header
Response (200 OK):
```json
{
  "token": "string"
}
```

## Dashboard

#### Get Employee Dashboard Data
```
GET /employee/dashboard
```
Response (200 OK):
```json
{
  "myAssets": {
    "total": number,
    "pending": number,
    "approved": number,
    "rejected": number
  },
  "myRequests": {
    "pending": number,
    "approved": number,
    "rejected": number
  },
  "recentActivities": [
    {
      "id": "string",
      "date": "ISO-8601 string",
      "assetName": "string",
      "action": "Request" | "Service Request" | "Return",
      "status": "pending" | "approved" | "rejected"
    }
  ],
  "myAssetsByCategory": [
    {
      "category": "string",
      "count": number
    }
  ]
}
```

## Assets

#### 1. Get All Assets
```
GET /assets
```
Query Parameters:
- category (optional): Filter by category
- status (optional): Filter by status

Response (200 OK):
```json
[
  {
    "id": "string",
    "name": "string",
    "category": "string",
    "status": "available" | "assigned" | "maintenance",
    "assignedTo": "string | null",
    "condition": "excellent" | "good" | "fair" | "poor",
    "purchaseDate": "ISO-8601 string",
    "warrantyEnd": "ISO-8601 string"
  }
]
```

#### 2. Get Asset Categories
```
GET /assets/categories
```
Response (200 OK):
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string"
  }
]
```

#### 3. Get Asset Suggestions
```
GET /assets/suggestions
```
Query Parameters:
- query: Search term

Response (200 OK):
```json
[
  "string" // Asset names matching the search query
]
```

#### 4. Request Asset
```
POST /assets/request
```
Request:
```json
{
  "assetName": "string",
  "category": "string",
  "reason": "string",
  "priority": "high" | "medium" | "low"
}
```
Response (201 Created):
```json
{
  "message": "Asset request submitted successfully",
  "requestId": "string"
}
```

## Service Requests

#### 1. Get Service Requests
```
GET /service-requests
```
Query Parameters:
- status (optional): Filter by status

Response (200 OK):
```json
[
  {
    "id": "string",
    "assetId": "string",
    "type": "repair" | "maintenance",
    "status": "pending" | "in_progress" | "completed" | "rejected",
    "description": "string",
    "priority": "high" | "medium" | "low",
    "requestedBy": "string",
    "requestDate": "ISO-8601 string"
  }
]
```

#### 2. Create Service Request
```
POST /assets/service
```
Request:
```json
{
  "assetId": "string",
  "type": "repair" | "maintenance",
  "description": "string",
  "priority": "high" | "medium" | "low"
}
```
Response (201 Created):
```json
{
  "message": "Service request submitted successfully",
  "requestId": "string"
}
```

## Error Responses
All endpoints may return these error responses:

401 Unauthorized:
```json
{
  "message": "Authentication required"
}
```

403 Forbidden:
```json
{
  "message": "Insufficient permissions"
}
```

404 Not Found:
```json
{
  "message": "Resource not found"
}
```

500 Internal Server Error:
```json
{
  "message": "Internal server error"
}
```

## Response Headers
All responses should include:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Content-Type: application/json
```

## Rate Limiting
- Rate limit: 100 requests per minute per IP
- Rate limit headers:
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: <remaining requests>
  X-RateLimit-Reset: <timestamp>
  ```

## Notes for Implementation
1. All timestamps should be in ISO-8601 format
2. All IDs should be unique strings
3. Implement proper input validation
4. Use appropriate HTTP status codes
5. Include pagination for list endpoints
6. Implement proper error handling
7. Use secure password hashing (e.g., bcrypt)
8. Implement JWT token expiration
9. Add request logging
10. Implement database transactions where needed
