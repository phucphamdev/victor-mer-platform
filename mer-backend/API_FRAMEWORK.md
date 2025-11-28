# RESTful API Framework Documentation

## Overview
This framework provides a standardized approach for building RESTful APIs following Google API Design Guide standards.

## Features
- ✅ Input validation with express-validator
- ✅ Automatic pagination (default: 10 items per page)
- ✅ Search functionality
- ✅ Filtering and sorting
- ✅ Standardized response format
- ✅ Error handling
- ✅ Base service class for CRUD operations

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
