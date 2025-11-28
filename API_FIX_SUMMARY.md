# API Authentication Fix Summary

## Problem Identified

The API was returning a 401 Unauthorized error when accessing `/api/shipment/all` endpoint with a valid admin token.

### Root Cause

**Case-sensitivity mismatch in role authorization:**
- The authorization middleware was checking for role `'admin'` (lowercase)
- But users in the database have role `'Admin'` (capitalized)
- This caused the authorization check to fail even with valid tokens

## Solution Applied

### Fixed File: `mer-backend/middleware/authorization.js`

Updated the authorization middleware to perform **case-insensitive role comparison**:

```javascript
module.exports = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    // Case-insensitive role comparison
    const normalizedUserRole = userRole?.toLowerCase();
    const normalizedRoles = role.map(r => r.toLowerCase());
    
    if(!normalizedRoles.includes(normalizedUserRole)){
      return res.status(403).json({
        status: "fail",
        error: "You are not authorized to access this"
      });
    }

    next();
  };
};
```

## Impact

This fix affects all routes using the `authorization()` middleware, including:

### Shipment Routes
- `POST /api/shipment/add`
- `GET /api/shipment/all`
- `PATCH /api/shipment/status/:id`
- `DELETE /api/shipment/:id`

### Other Affected Routes
- Affiliate routes (`/api/affiliate/*`)
- Flash Sale routes (`/api/flash-sale/*`)
- Order routes (`/api/order/*`)
- Invoice routes (`/api/invoice/*`)
- Product Tag routes (`/api/product-tag/*`)
- Review routes (`/api/review/*`)

## Testing

### Get a Valid Token

```bash
curl -X POST "http://localhost:7000/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"dorothy@gmail.com","password":"123456"}'
```

### Test the Fixed Endpoint

```bash
# Replace YOUR_TOKEN with the token from login response
curl -X GET "http://localhost:7000/api/shipment/all" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Important Notes

1. **Server Restart Required**: The backend server must be restarted for changes to take effect
2. **Public Tracking Endpoint**: The `/api/shipment/track/:trackingNumber` endpoint does NOT require authentication and can be accessed without a token
3. **Token Expiration**: Access tokens expire after 1 hour. Use the refresh token endpoint if needed:
   ```bash
   curl -X POST "http://localhost:7000/api/admin/refresh-token" \
     -H "Content-Type: application/json" \
     -d '{"refreshToken":"YOUR_REFRESH_TOKEN"}'
   ```

## Next Steps

1. Restart the backend server
2. Test the endpoints with a fresh token
3. Consider standardizing role names in the database (all lowercase or all capitalized) for consistency
