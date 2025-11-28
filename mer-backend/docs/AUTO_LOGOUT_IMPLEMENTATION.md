# Auto-Logout Implementation Guide

## Backend Changes

The backend now returns `requiresLogout: true` in error responses when:
- Token is missing (401)
- Token is invalid or expired (401)

Example error response:
```json
{
  "status": "error",
  "message": "Authentication failed. Token has expired. Please login again.",
  "requiresLogout": true
}
```

## Frontend Implementation

### For Admin Panel (Next.js)

Add this to `mer-admin-panel/src/utils/axios.js` or create an axios interceptor:

```javascript
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000',
});

// Request interceptor - add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle auto-logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if backend requires logout
    if (error.response?.data?.requiresLogout === true) {
      // Clear all auth data
      Cookies.remove('adminToken');
      Cookies.remove('adminInfo');
      localStorage.clear();
      
      // Redirect to login
      window.location.href = '/login';
      
      // Show notification
      alert('Your session has expired. Please login again.');
    }
    return Promise.reject(error);
  }
);

export default api;
```

### For Frontend (Next.js)

Add this to `mer-front-end/src/utils/axios.js`:

```javascript
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000',
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - auto logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.requiresLogout === true) {
      Cookies.remove('userToken');
      Cookies.remove('userInfo');
      localStorage.clear();
      window.location.href = '/login';
      alert('Your session has expired. Please login again.');
    }
    return Promise.reject(error);
  }
);

export default api;
```

## Usage

Replace all `axios` calls with the configured `api` instance:

```javascript
// Before
import axios from 'axios';
const response = await axios.get('/api/products');

// After
import api from '@/utils/axios';
const response = await api.get('/api/products');
```

## Benefits

1. **Automatic Security**: Invalid tokens immediately logout users
2. **Better UX**: Clear error messages and automatic redirect
3. **Prevent Unauthorized Access**: No stale sessions
4. **Centralized Logic**: All API calls handled consistently

## Token Expiry Times

- **Access Token**: 1 hour (can be refreshed)
- **Refresh Token**: 7 days (requires re-login after)
- **Verification Token**: 10 minutes (for email/password reset)

## Testing

1. Login successfully
2. Wait for token to expire (or manually invalidate)
3. Make any API call
4. Should automatically logout and redirect to login page
