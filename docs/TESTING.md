# Testing Guide - Victor Mer E-commerce Platform

## Overview

This document provides comprehensive testing guidelines for the Victor Mer platform.

## Quick Testing

### Automated Testing (Recommended)

```bash
# Test all APIs automatically
make test-api

# Or use the script directly
./scripts/testing/test-api.sh dev

# Test production
./scripts/testing/test-api.sh prod
```

The test script automatically checks:
- ✅ Health check
- ✅ Get categories, brands, products
- ✅ User signup & login
- ✅ Authenticated endpoints
- ✅ Swagger documentation

### Interactive Testing with Swagger UI

```bash
# Open Swagger UI
make swagger
# Or visit: http://localhost:7000/api-docs
```

Features:
- Try all endpoints interactively
- View request/response schemas
- Test authentication
- See example responses

## Testing Scripts

### Available Test Scripts

1. **test-api.sh** - General API testing (80+ endpoints)
2. **test-shipment-api.sh** - Shipment-specific API testing
3. **test-collection-api.sh** - Collection endpoints testing
4. **restart-and-test.sh** - Restart services and run tests
5. **health-check.sh** - Check all services health

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

### 2. Collection Categories Testing

#### Create Collection Category
```bash
curl -X POST "http://localhost:4000/api/collection-category" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Seasonal Collections",
    "slug": "seasonal-collections",
    "description": "Collections that change with the seasons",
    "icon": "🌸",
    "status": "active",
    "priority": 10
  }'
```

#### Get All Collection Categories
```bash
curl "http://localhost:4000/api/collection-category?page=1&limit=20"
```

#### Get Collection Category by ID (with collection count)
```bash
curl "http://localhost:4000/api/collection-category/CATEGORY_ID"
```

#### Update Collection Category
```bash
curl -X PATCH "http://localhost:4000/api/collection-category/CATEGORY_ID" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Seasonal Collections",
    "icon": "🌺",
    "status": "active",
    "priority": 15
  }'
```

#### Delete Collection Category
```bash
curl -X DELETE "http://localhost:4000/api/collection-category/CATEGORY_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Collections Testing

#### Create Collection (with categories)
```bash
curl -X POST "http://localhost:4000/api/collection" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Summer Collection",
    "slug": "summer-collection",
    "description": "Hot summer products",
    "icon": "☀️",
    "type": "seasonal",
    "status": "active",
    "priority": 10,
    "featured": true,
    "categories": ["CATEGORY_ID_1", "CATEGORY_ID_2"]
  }'
```

#### Get All Collections (with categories populated)
```bash
curl "http://localhost:4000/api/collection?page=1&limit=10"
```

#### Get Collection by ID (with categories populated)
```bash
curl "http://localhost:4000/api/collection/COLLECTION_ID"
```

Expected Response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Summer Collection",
    "slug": "summer-collection",
    "icon": "☀️",
    "type": "seasonal",
    "categories": [
      {
        "_id": "...",
        "name": "Seasonal Collections",
        "slug": "seasonal-collections",
        "icon": "🌸",
        "status": "active"
      }
    ],
    "productCount": 0,
    "status": "active",
    "priority": 10
  }
}
```

#### Get Collection by Slug
```bash
curl "http://localhost:4000/api/collection/slug/summer-collection"
```

#### Update Collection (with categories)
```bash
curl -X PATCH "http://localhost:4000/api/collection/COLLECTION_ID" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Summer Collection",
    "icon": "🌞",
    "status": "active",
    "priority": 20,
    "categories": ["CATEGORY_ID_1", "CATEGORY_ID_3"]
  }'
```

#### Delete Collection
```bash
curl -X DELETE "http://localhost:4000/api/collection/COLLECTION_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Flash Sales Testing

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

### 5. Inventory Testing

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

### 6. Shipment Testing

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

### 7. Order Returns Testing

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

### 8. Invoice Testing

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

### 9. Affiliate Testing

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


## Testing with curl

### Basic API Tests

```bash
# Health check
curl http://localhost:7000/health

# Get all products
curl http://localhost:7000/api/product/all | jq

# Get all categories
curl http://localhost:7000/api/category/all | jq

# Get all brands
curl http://localhost:7000/api/brand/all | jq

# Get top rated products
curl http://localhost:7000/api/product/top-rated | jq
```

### Authentication Tests

```bash
# User signup
curl -X POST http://localhost:7000/api/user/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123456"}' | jq

# User login and get token
TOKEN=$(curl -X POST http://localhost:7000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123456"}' | jq -r '.token')

echo "Token: $TOKEN"

# Use token for authenticated requests
curl -X GET http://localhost:7000/api/user-order \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | jq
```

### Admin Authentication

```bash
# Admin login
ADMIN_TOKEN=$(curl -X POST http://localhost:7000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' | jq -r '.token')

# Use admin token
curl -X GET http://localhost:7000/api/order/orders \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq
```

## Testing with Postman/Thunder Client

### Import Swagger JSON

1. Open http://localhost:7000/api-docs
2. Click on `/api-docs.json` link
3. Import into Postman/Thunder Client

### Manual Testing

1. Create a new request
2. Set method (GET, POST, etc.)
3. Set URL: `http://localhost:7000/api/...`
4. Add headers if needed:
   - `Content-Type: application/json`
   - `Authorization: Bearer YOUR_TOKEN`
5. Add body for POST/PATCH requests
6. Send request

## Testing from Docker Container

```bash
# Enter backend container
docker exec -it victormer-backend-dev sh

# Install curl and jq if needed
apk add curl jq

# Test from inside container
curl http://localhost:7000/health
curl http://localhost:7000/api/category/all
```

## Health Check Script

```bash
# Run health check
./scripts/maintenance/health-check.sh
```

Checks:
- ✅ MongoDB connection
- ✅ Backend API health
- ✅ Frontend accessibility
- ✅ Admin panel accessibility
- ✅ Nginx status (production)
- ✅ SSL certificate (production)
- ✅ System resources

## Automated Testing Scripts

### 1. Test All APIs
```bash
./scripts/testing/test-api.sh dev
```

Tests:
- Health endpoints
- Public endpoints (products, categories, brands)
- User authentication flow
- Protected endpoints
- Swagger documentation

### 2. Test Shipment APIs
```bash
./scripts/testing/test-shipment-api.sh
```

### 3. Test Collection APIs
```bash
./scripts/testing/test-collection-api.sh
```

### 4. Restart and Test
```bash
./scripts/testing/restart-and-test.sh
```

Performs:
1. Stop all services
2. Clean up
3. Start services
4. Wait for ready
5. Run all tests

## Performance Testing

### Load Testing with Apache Bench

```bash
# Install Apache Bench
sudo apt install apache2-utils

# Test endpoint performance
ab -n 1000 -c 10 http://localhost:7000/api/product/all

# Test with authentication
ab -n 1000 -c 10 -H "Authorization: Bearer TOKEN" \
  http://localhost:7000/api/user-order
```

### Monitoring Response Times

```bash
# Test response time
time curl http://localhost:7000/api/product/all

# Multiple requests
for i in {1..10}; do
  time curl -s http://localhost:7000/api/product/all > /dev/null
done
```

## Integration Testing

### Test Complete User Flow

```bash
# 1. Signup
curl -X POST http://localhost:7000/api/user/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"Test123"}' | jq

# 2. Login
TOKEN=$(curl -X POST http://localhost:7000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123"}' | jq -r '.token')

# 3. Browse products
curl http://localhost:7000/api/product/all | jq

# 4. View product details
PRODUCT_ID=$(curl http://localhost:7000/api/product/all | jq -r '.data[0]._id')
curl http://localhost:7000/api/product/single-product/$PRODUCT_ID | jq

# 5. Create order
curl -X POST http://localhost:7000/api/order/saveOrder \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"products":[{"product":"'$PRODUCT_ID'","quantity":1}],"total":100}' | jq

# 6. View orders
curl http://localhost:7000/api/user-order \
  -H "Authorization: Bearer $TOKEN" | jq
```

## Troubleshooting Tests

### API Not Responding

```bash
# Check if backend is running
docker ps | grep backend

# Check backend logs
docker logs victormer-backend-dev

# Restart backend
docker-compose restart backend
```

### Authentication Failing

```bash
# Verify credentials
curl -X POST http://localhost:7000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' -v

# Check token format
echo $TOKEN

# Token should start with "eyJ"
```

### Database Connection Issues

```bash
# Check MongoDB
docker exec -it victormer-mongodb-dev mongosh

# Test connection
docker exec victormer-backend-dev node -e "
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected'))
    .catch(err => console.error('Error:', err));
"
```

## Test Coverage Goals

- [ ] All API endpoints tested
- [ ] Authentication flows verified
- [ ] Error handling validated
- [ ] Performance benchmarks met
- [ ] Security tests passed
- [ ] Integration tests complete

## Continuous Testing

### Setup Git Hooks

```bash
# Pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "Running tests..."
./scripts/testing/test-api.sh dev
EOF

chmod +x .git/hooks/pre-commit
```

### CI/CD Integration

Add to your CI/CD pipeline:

```yaml
test:
  script:
    - docker-compose up -d
    - sleep 30
    - ./scripts/testing/test-api.sh dev
    - docker-compose down
```

## Best Practices

1. **Always test locally before deploying**
2. **Use automated scripts for consistency**
3. **Test both success and error cases**
4. **Monitor response times**
5. **Keep test data separate from production**
6. **Document test results**
7. **Update tests when APIs change**

## Resources

- Swagger UI: http://localhost:7000/api-docs
- API Documentation: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Deployment Guide: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Scripts Documentation: [DEPLOYMENT_SCRIPTS.md](./DEPLOYMENT_SCRIPTS.md)
