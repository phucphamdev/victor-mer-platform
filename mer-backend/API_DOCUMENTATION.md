# API Documentation

## Overview
This project includes interactive API documentation using Swagger UI.

## Accessing the API Documentation

Once the server is running, you can access the API documentation at:

```
http://localhost:7000/api-docs
```

## Features

- **Interactive API Testing**: Test all API endpoints directly from the browser
- **Request/Response Examples**: View sample requests and responses
- **Authentication**: Test protected endpoints with JWT tokens
- **Schema Validation**: See required fields and data types for each endpoint

## Using the Documentation

### 1. Authentication
For protected endpoints:
1. Click the "Authorize" button at the top right
2. Enter your JWT token in the format: `Bearer YOUR_TOKEN`
3. Click "Authorize"

### 2. Testing Endpoints
1. Click on any endpoint to expand it
2. Click "Try it out"
3. Fill in the required parameters
4. Click "Execute"
5. View the response below

## API Categories

- **User**: Authentication and user management
- **Product**: Product CRUD operations
- **Category**: Category management
- **Order**: Order processing and management
- **Coupon**: Coupon management
- **Review**: Product reviews
- **Brand**: Brand management

## Development

To add documentation for new endpoints, use JSDoc comments in your route files:

```javascript
/**
 * @swagger
 * /api/endpoint:
 *   get:
 *     summary: Endpoint description
 *     tags: [TagName]
 *     responses:
 *       200:
 *         description: Success response
 */
router.get('/endpoint', controller.method);
```

## Configuration

Swagger configuration is located in `config/swagger.js`. You can modify:
- API title and description
- Server URLs
- Security schemes
- API version
