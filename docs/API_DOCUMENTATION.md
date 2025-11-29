# API Documentation - Victor Mer E-commerce Platform

## Base URL
- Development: `http://localhost:7000/api`
- Production: `https://your-domain.com/api`

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Get Admin Token
```bash
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your_password"
}
```

## API Endpoints Overview

### 1. Collections (Product Collections)
**Base URL:** `/api/collection`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create new collection | Admin |
| GET | `/all` | Get all collections | Public |
| GET | `/slug/:slug` | Get collection by slug | Public |
| GET | `/:id` | Get collection by ID | Public |
| PATCH | `/:id` | Update collection | Admin |
| DELETE | `/:id` | Delete collection | Admin |

**Query Parameters (GET /all):**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (active, inactive, scheduled)
- `type` - Filter by type (seasonal, trending, new-arrival, best-seller, custom)

### 2. Flash Sales
**Base URL:** `/api/flash-sale`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create flash sale | Admin |
| GET | `/all` | Get all flash sales | Public |
| GET | `/active` | Get active flash sales | Public |
| GET | `/slug/:slug` | Get flash sale by slug | Public |
| PATCH | `/:id` | Update flash sale | Admin |
| DELETE | `/:id` | Delete flash sale | Admin |

### 3. Product Tags
**Base URL:** `/api/product-tag`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create product tag | Admin |
| GET | `/all` | Get all tags | Public |
| GET | `/slug/:slug` | Get tag by slug | Public |
| PATCH | `/:id` | Update tag | Admin |
| DELETE | `/:id` | Delete tag | Admin |

### 4. Product Labels
**Base URL:** `/api/product-label`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create product label | Admin |
| GET | `/all` | Get all labels | Public |
| GET | `/slug/:slug` | Get label by slug | Public |
| PATCH | `/:id` | Update label | Admin |
| DELETE | `/:id` | Delete label | Admin |

### 5. Inventory Management
**Base URL:** `/api/inventory`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create inventory record | Admin |
| GET | `/all` | Get all inventory | Admin |
| GET | `/low-stock` | Get low stock items | Admin |
| GET | `/:id` | Get inventory by ID | Admin |
| PATCH | `/:id` | Update inventory | Admin |
| DELETE | `/:id` | Delete inventory | Admin |

**Update Inventory Body:**
```json
{
  "quantity": 100,
  "type": "restock",
  "reason": "New stock arrival"
}
```

### 6. Shipments
**Base URL:** `/api/shipment`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create shipment | Admin |
| GET | `/all` | Get all shipments | Admin |
| GET | `/track/:trackingNumber` | Track shipment | Public |
| GET | `/:id` | Get shipment by ID | Admin |
| PATCH | `/status/:id` | Update shipment status | Admin |
| DELETE | `/:id` | Delete shipment | Admin |

**Carriers:** ghn, ghtk, viettel-post, vnpost, j&t, ninja-van, other

**Shipment Status:** pending, picked-up, in-transit, out-for-delivery, delivered, failed, returned

### 7. Order Returns
**Base URL:** `/api/order-return`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create return request | User |
| GET | `/all` | Get all returns | Admin |
| GET | `/number/:returnNumber` | Get return by number | User |
| GET | `/:id` | Get return by ID | User |
| PATCH | `/approve/:id` | Approve return | Admin |
| PATCH | `/status/:id` | Update return status | Admin |
| DELETE | `/:id` | Delete return | Admin |

**Return Status:** pending, approved, rejected, processing, refunded, exchanged, cancelled

### 8. Invoices
**Base URL:** `/api/invoice`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create invoice | Admin |
| GET | `/all` | Get all invoices | Admin |
| GET | `/number/:invoiceNumber` | Get invoice by number | User |
| GET | `/:id` | Get invoice by ID | User |
| PATCH | `/mark-paid/:id` | Mark invoice as paid | Admin |
| PATCH | `/:id` | Update invoice | Admin |
| DELETE | `/:id` | Delete invoice | Admin |

**Invoice Status:** draft, sent, paid, overdue, cancelled

**Payment Status:** unpaid, partial, paid, refunded

### 9. Affiliates
**Base URL:** `/api/affiliate`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register affiliate | User |
| GET | `/all` | Get all affiliates | Admin |
| GET | `/code/:code` | Get affiliate by code | Public |
| GET | `/:id` | Get affiliate by ID | User |
| GET | `/stats/:id` | Get affiliate statistics | User |
| POST | `/track/:affiliateCode` | Track affiliate click | Public |
| PATCH | `/approve/:id` | Approve affiliate | Admin |
| PATCH | `/:id` | Update affiliate | Admin |

### 10. Products
**Base URL:** `/api/product`

Standard CRUD operations for product management.

### 11. Categories
**Base URL:** `/api/category`

Standard CRUD operations for category management.

### 12. Orders
**Base URL:** `/api/order`

Standard CRUD operations for order management.

### 13. Brands
**Base URL:** `/api/brand`

Standard CRUD operations for brand management.

### 14. Reviews
**Base URL:** `/api/review`

Standard CRUD operations for review management.

### 15. Coupons
**Base URL:** `/api/coupon`

Standard CRUD operations for coupon management.

### 16. Pages
**Base URL:** `/api/page`

Standard CRUD operations for page management.

### 17. Users
**Base URL:** `/api/user`

User authentication and profile management.

### 18. Admins
**Base URL:** `/api/admin`

Admin authentication and management.

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Success with Pagination
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "currentPage": 1,
    "previousPage": null,
    "nextPage": 2
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Swagger Documentation

Interactive API documentation available at:
```
http://localhost:7000/api-docs
```

## Rate Limiting

API requests are rate-limited to prevent abuse:
- 100 requests per 15 minutes per IP address
- Admin endpoints may have stricter limits

## Notes

- All timestamps are in ISO 8601 format
- All monetary values are in VND (Vietnamese Dong)
- Pagination is available on all list endpoints
- Filtering and search capabilities vary by endpoint
- Case-insensitive role checking is implemented for authorization
