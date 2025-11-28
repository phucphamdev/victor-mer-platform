# Quick API Reference - Shipment Endpoints

## 🔓 Public Endpoints (No Authentication Required)

### Track Shipment
```bash
GET /api/shipment/track/{trackingNumber}

# Example
curl http://localhost:7000/api/shipment/track/TRACK123
```

## 🔐 Protected Endpoints (Requires Admin Token)

### 1. Get Admin Token
```bash
POST /api/admin/login
Content-Type: application/json

{
  "email": "dorothy@gmail.com",
  "password": "123456"
}

# Example
curl -X POST http://localhost:7000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"dorothy@gmail.com","password":"123456"}'
```

### 2. Get All Shipments
```bash
GET /api/shipment/all
Authorization: Bearer {token}

# Example
curl http://localhost:7000/api/shipment/all \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Create Shipment
```bash
POST /api/shipment/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "order": "ORDER_ID",
  "trackingNumber": "TRACK123",
  "carrier": "DHL",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "City",
    "country": "Country"
  },
  "estimatedDelivery": "2025-12-01T00:00:00.000Z"
}
```

### 4. Update Shipment Status
```bash
PATCH /api/shipment/status/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "in_transit",
  "location": "Distribution Center",
  "description": "Package is on the way"
}
```

### 5. Delete Shipment
```bash
DELETE /api/shipment/{id}
Authorization: Bearer {token}
```

## 🔄 Token Management

### Refresh Token
```bash
POST /api/admin/refresh-token
Content-Type: application/json

{
  "refreshToken": "YOUR_REFRESH_TOKEN"
}
```

### Logout
```bash
POST /api/admin/logout
Content-Type: application/json

{
  "refreshToken": "YOUR_REFRESH_TOKEN"
}
```

## ⚠️ Common Issues

### 401 Unauthorized
- **Cause**: Invalid or expired token
- **Solution**: Login again to get a new token

### 403 Forbidden
- **Cause**: User doesn't have admin role
- **Solution**: Use an admin account (was fixed with case-insensitive role check)

### 404 Not Found
- **Cause**: Shipment with tracking number doesn't exist
- **Solution**: Check the tracking number or create a shipment first

## 🧪 Quick Test

Run the test script:
```bash
./test-shipment-api.sh
```

Or use the existing test script:
```bash
./test-api.sh
```
