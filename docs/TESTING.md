# Testing Guide - Victor Mer E-commerce Platform

## Overview

This document provides comprehensive testing guidelines for the Victor Mer platform.

## Testing Scripts

### Available Test Scripts

1. **test-api.sh** - General API testing
2. **test-shipment-api.sh** - Shipment-specific API testing

## Manual Testing

### 1. Authentication Testing

#### Admin Login
```bash
curl -X POST "http://localhost:7000/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your_password"
  }'
```

Expected Response:
```json
{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": { ... }
  }
}
```

#### User Login
```bash
curl -X POST "http://localhost:7000/api/user/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password"
  }'
```

### 2. Collections Testing

#### Create Collection
```bash
curl -X POST "http://localhost:7000/api/collection/add" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Summer Collection",
    "slug": "summer-collection",
    "description": "Hot summer products",
    "type": "seasonal",
    "status": "active"
  }'
```

#### Get All Collections
```bash
curl "http://localhost:7000/api/collection/all?page=1&limit=10"
```

#### Get Collection by Slug
```bash
curl "http://localhost:7000/api/collection/slug/summer-collection"
```

### 3. Flash Sales Testing

#### Create Flash Sale
```bash
curl -X POST "http://localhost:7000/api/flash-sale/add" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Black Friday Sale",
    "slug": "black-friday-2024",
    "startDate": "2024-11-29T00:00:00Z",
    "endDate": "2024-11-30T23:59:59Z",
    "products": [
      {
        "product": "PRODUCT_ID",
        "originalPrice": 1000000,
        "salePrice": 500000,
        "quantity": 100
      }
    ]
  }'
```

#### Get Active Flash Sales
```bash
curl "http://localhost:7000/api/flash-sale/active"
```

### 4. Inventory Testing

#### Create Inventory Record
```bash
curl -X POST "http://localhost:7000/api/inventory/add" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product": "PRODUCT_ID",
    "sku": "SKU-001",
    "quantity": 100,
    "warehouse": "main",
    "lowStockThreshold": 10
  }'
```

#### Get Low Stock Items
```bash
curl "http://localhost:7000/api/inventory/low-stock" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Update Inventory
```bash
curl -X PATCH "http://localhost:7000/api/inventory/INVENTORY_ID" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 150,
    "type": "restock",
    "reason": "New stock arrival"
  }'
```

### 5. Shipment Testing

#### Create Shipment
```bash
curl -X POST "http://localhost:7000/api/shipment/add" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "order": "ORDER_ID",
    "trackingNumber": "TRACK123456",
    "carrier": "ghn",
    "shippingAddress": {
      "fullName": "John Doe",
      "phone": "0123456789",
      "address": "123 Main St",
      "ward": "Ward 1",
      "district": "District 1",
      "city": "Ho Chi Minh"
    },
    "estimatedDelivery": "2024-12-05T00:00:00Z"
  }'
```

#### Track Shipment (Public)
```bash
curl "http://localhost:7000/api/shipment/track/TRACK123456"
```

#### Update Shipment Status
```bash
curl -X PATCH "http://localhost:7000/api/shipment/status/SHIPMENT_ID" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in-transit",
    "location": "Distribution Center",
    "description": "Package is on the way"
  }'
```

### 6. Order Returns Testing

#### Create Return Request
```bash
curl -X POST "http://localhost:7000/api/order-return/add" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "order": "ORDER_ID",
    "customer": "USER_ID",
    "items": [
      {
        "product": "PRODUCT_ID",
        "quantity": 1,
        "reason": "defective"
      }
    ],
    "reason": "Product is defective",
    "requestedAction": "refund"
  }'
```

#### Approve Return
```bash
curl -X PATCH "http://localhost:7000/api/order-return/approve/RETURN_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 7. Invoice Testing

#### Create Invoice
```bash
curl -X POST "http://localhost:7000/api/invoice/add" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "order": "ORDER_ID",
    "customer": "USER_ID",
    "items": [...],
    "subtotal": 1000000,
    "tax": 100000,
    "total": 1100000
  }'
```

#### Mark Invoice as Paid
```bash
curl -X PATCH "http://localhost:7000/api/invoice/mark-paid/INVOICE_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 8. Affiliate Testing

#### Register Affiliate
```bash
curl -X POST "http://localhost:7000/api/affiliate/register" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user": "USER_ID",
    "commissionRate": 10
  }'
```

#### Track Affiliate Click
```bash
curl -X POST "http://localhost:7000/api/affiliate/track/AFFILIATE_CODE" \
  -H "Content-Type: application/json" \
  -d '{
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "landingPage": "/products/product-1"
  }'
```

#### Get Affiliate Stats
```bash
curl "http://localhost:7000/api/affiliate/stats/AFFILIATE_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Integration Testing

### Test Workflow: Complete Order Lifecycle

1. **Create Order**
2. **Create Invoice** for the order
3. **Create Shipment** for the order
4. **Update Shipment Status** (picked-up → in-transit → delivered)
5. **Mark Invoice as Paid**
6. **(Optional) Create Return Request** if needed

### Test Workflow: Flash Sale

1. **Create Flash Sale** with products
2. **Verify Active Flash Sales** endpoint
3. **Check Product Prices** are updated
4. **Monitor Sale Progress** (sold quantity)
5. **Verify Sale Ends** automatically

## Error Testing

### Test Invalid Token
```bash
curl "http://localhost:7000/api/inventory/all" \
  -H "Authorization: Bearer INVALID_TOKEN"
```

Expected: 401 Unauthorized

### Test Missing Authorization
```bash
curl "http://localhost:7000/api/inventory/all"
```

Expected: 401 Unauthorized

### Test Insufficient Permissions
```bash
# Login as regular user, try admin endpoint
curl "http://localhost:7000/api/inventory/all" \
  -H "Authorization: Bearer USER_TOKEN"
```

Expected: 403 Forbidden

### Test Invalid Data
```bash
curl -X POST "http://localhost:7000/api/collection/add" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": ""
  }'
```

Expected: 400 Bad Request with validation errors

## Performance Testing

### Load Testing with Apache Bench
```bash
# Test 1000 requests with 10 concurrent connections
ab -n 1000 -c 10 http://localhost:7000/api/collection/all
```

### Response Time Testing
```bash
# Measure response time
curl -w "@curl-format.txt" -o /dev/null -s "http://localhost:7000/api/collection/all"
```

Create `curl-format.txt`:
```
time_namelookup:  %{time_namelookup}\n
time_connect:  %{time_connect}\n
time_appconnect:  %{time_appconnect}\n
time_pretransfer:  %{time_pretransfer}\n
time_redirect:  %{time_redirect}\n
time_starttransfer:  %{time_starttransfer}\n
----------\n
time_total:  %{time_total}\n
```

## Automated Testing

### Unit Tests (To be implemented)
```bash
cd mer-backend
npm test
```

### Integration Tests (To be implemented)
```bash
cd mer-backend
npm run test:integration
```

## Testing Checklist

### Before Deployment
- [ ] All authentication endpoints work
- [ ] All CRUD operations work for each feature
- [ ] Authorization checks work correctly
- [ ] Pagination works on list endpoints
- [ ] Filtering and search work
- [ ] Error handling returns proper status codes
- [ ] Validation catches invalid data
- [ ] Token refresh works
- [ ] Rate limiting is functional
- [ ] Swagger documentation is accessible

### After Deployment
- [ ] Health check endpoint responds
- [ ] Database connection is stable
- [ ] All services are running
- [ ] Logs are being generated
- [ ] Performance is acceptable
- [ ] No memory leaks
- [ ] HTTPS is working (production)
- [ ] CORS is configured correctly

## Common Issues & Solutions

### Issue: 401 Unauthorized
**Solution:** Get a fresh token by logging in again

### Issue: 403 Forbidden
**Solution:** Ensure user has admin role (case-insensitive check is implemented)

### Issue: 404 Not Found
**Solution:** Verify the resource ID/slug exists in database

### Issue: 500 Internal Server Error
**Solution:** Check server logs for detailed error message

## Test Data

### Sample Admin Credentials
```
Email: dorothy@gmail.com
Password: 123456
```

### Sample User Credentials
```
Email: user@example.com
Password: password123
```

## Swagger UI Testing

Access interactive API documentation:
```
http://localhost:7000/api-docs
```

Use Swagger UI to:
- View all available endpoints
- Test endpoints directly
- See request/response schemas
- Try different parameters

## Monitoring

### Check Server Health
```bash
curl http://localhost:7000/health
```

### Check Database Connection
```bash
curl http://localhost:7000/api/health/db
```

### View Logs
```bash
# Docker logs
docker logs mer-backend

# Or if running locally
tail -f mer-backend/logs/app.log
```
