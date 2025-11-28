# RESTful API Framework Documentation

## Overview
This framework provides a standardized approach for building RESTful APIs following Google API Design Guide standards.

## Features
- ✅ JWT Authentication (required for all endpoints except login/signup)
- ✅ Input validation with express-validator
- ✅ Automatic pagination (default: 10 items per page)
- ✅ Search functionality
- ✅ Filtering and sorting
- ✅ Standardized response format
- ✅ Error handling
- ✅ Base service class for CRUD operations
- ✅ Swagger UI with authentication support

## Authentication

### Overview
All API endpoints require JWT authentication except:
- `POST /api/user/signup` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/confirmEmail/:token` - Email verification
- `PATCH /api/user/forget-password` - Password reset request
- `PATCH /api/user/confirm-forget-password` - Password reset confirmation

### Getting Started

1. **Register a new user:**
```bash
POST /api/user/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

2. **Login to get access token:**
```bash
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "status": "success",
  "message": "Successfully logged in",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

3. **Use token in subsequent requests:**
```bash
GET /api/product/all
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Using Swagger UI

1. Navigate to `/api-docs` in your browser
2. Click the "Authorize" button (lock icon) at the top right
3. Enter your token in the format: `Bearer <your-token>`
4. Click "Authorize" and then "Close"
5. All subsequent API calls will include your authentication token

### Authentication Errors

**401 Unauthorized - No token provided:**
```json
{
  "success": false,
  "status": "fail",
  "message": "Authentication required",
  "error": "You are not logged in. Please provide a valid authentication token."
}
```

**403 Forbidden - Invalid or expired token:**
```json
{
  "success": false,
  "status": "fail",
  "message": "Authentication failed",
  "error": "Invalid token. Please provide a valid authentication token."
}
```

## Installation

Install required dependency:
```bash
npm install express-validator
```

## Usage Examples

### 1. API Endpoints with Pagination & Search

**Get all brands with pagination:**
```
GET /api/brand/all?page=1&limit=10
```

**Search brands:**
```
GET /api/brand/all?search=nike&searchFields=name,description
```

**Filter by status:**
```
GET /api/brand/all?status=active
```

**Sort results:**
```
GET /api/brand/all?sort=name,-createdAt
```

**Combined query:**
```
GET /api/brand/all?page=2&limit=20&search=adidas&status=active&sort=-createdAt
```

### 2. Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Brands retrieved successfully",
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalItems": 45,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    {
      "field": "name",
      "message": "Brand name is required",
      "value": ""
    }
  ]
}
```

### 3. Creating New Validators

Create a validator file in `validators/` directory:

```javascript
const { body, param, query } = require('express-validator');

const myValidators = {
  create: [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email')
  ],
  
  update: [
    param('id').isMongoId().withMessage('Invalid ID'),
    body('name').optional().notEmpty()
  ],
  
  list: [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 })
  ]
};

module.exports = myValidators;
```

### 4. Creating Services with BaseService

```javascript
const BaseService = require('./base.service');
const MyModel = require('../model/MyModel');

class MyService extends BaseService {
  constructor() {
    super(MyModel);
  }

  // Use inherited methods or add custom ones
  async getActive(queryString) {
    const modifiedQuery = { ...queryString, status: 'active' };
    return await this.getAll(modifiedQuery);
  }
}

module.exports = new MyService();
```

### 5. Controller Pattern

```javascript
const myService = require('../services/my.service');
const ApiResponse = require('../utils/apiResponse');

exports.getAll = async (req, res, next) => {
  try {
    const { data, pagination } = await myService.getAll(req.query);
    return ApiResponse.successWithPagination(res, {
      data,
      pagination,
      message: 'Data retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};
```

### 6. Route Setup

```javascript
const router = require('express').Router();
const controller = require('../controller/my.controller');
const validators = require('../validators/my.validator');
const { validateRequest } = require('../middleware/validation');

router.get('/all', 
  validators.list, 
  validateRequest, 
  controller.getAll
);

router.post('/add', 
  validators.create, 
  validateRequest, 
  controller.create
);
```

## Query Parameters

### Pagination
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

### Search
- `search` - Search keyword
- `searchFields` - Comma-separated fields to search (default: name,title,description)

### Filtering
- Any model field can be used as filter
- Example: `?status=active&category=electronics`

### Sorting
- `sort` - Comma-separated fields
- Prefix with `-` for descending order
- Example: `?sort=name,-createdAt`

### Field Selection
- `fields` - Comma-separated fields to include
- Example: `?fields=name,email,status`

## Available Response Methods

```javascript
// Success responses
ApiResponse.success(res, { data, message, statusCode, meta })
ApiResponse.successWithPagination(res, { data, pagination, message })
ApiResponse.created(res, { data, message })
ApiResponse.noContent(res)

// Error responses
ApiResponse.error(res, { message, statusCode, errors })
ApiResponse.validationError(res, { errors, message })
ApiResponse.notFound(res, { message })
ApiResponse.unauthorized(res, { message })
ApiResponse.forbidden(res, { message })
```

## BaseService Methods

```javascript
// CRUD operations
await service.getAll(queryString, populateOptions)
await service.getById(id, populateOptions)
await service.create(data)
await service.update(id, data)
await service.delete(id)

// Additional methods
await service.getByField(field, value, populateOptions)
await service.count(filter)
await service.exists(filter)
```

## Migration Guide

To migrate existing endpoints to the new framework:

1. Install express-validator
2. Create validator file for your resource
3. Update service to extend BaseService
4. Update controller to use ApiResponse
5. Add validation middleware to routes

Example: Brand endpoints have been fully migrated as reference.
