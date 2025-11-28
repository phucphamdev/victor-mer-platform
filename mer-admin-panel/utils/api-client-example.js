/**
 * API Client với Auto Refresh Token
 * 
 * Sử dụng file này làm template cho việc gọi API
 * Tự động refresh access token khi hết hạn
 */

import axios from 'axios';

// Tạo axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Thêm access token vào mọi request
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Auto refresh token khi hết hạn
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 403 (token expired) và chưa retry
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          // Không có refresh token → redirect to login
          handleLogout();
          return Promise.reject(error);
        }

        // Gọi API refresh token
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000'}/api/admin/refresh-token`,
          { refreshToken }
        );

        const { token } = response.data;
        
        // Lưu access token mới
        localStorage.setItem('accessToken', token);

        // Retry request ban đầu với token mới
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);

      } catch (refreshError) {
        // Refresh token cũng hết hạn hoặc invalid
        console.error('Refresh token failed:', refreshError);
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Helper function để logout
function handleLogout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('adminInfo');
  
  // Redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

// ============================================
// API Functions
// ============================================

/**
 * Login
 */
export async function login(email, password) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000'}/api/admin/login`,
      { email, password }
    );

    const { token, refreshToken, ...adminInfo } = response.data;

    // Lưu tokens và thông tin admin
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('adminInfo', JSON.stringify(adminInfo));

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Logout
 */
export async function logout() {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (refreshToken) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000'}/api/admin/logout`,
        { refreshToken }
      );
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    handleLogout();
  }
}

/**
 * Get current admin info
 */
export function getAdminInfo() {
  const adminInfo = localStorage.getItem('adminInfo');
  return adminInfo ? JSON.parse(adminInfo) : null;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  return !!localStorage.getItem('accessToken');
}

// ============================================
// API Endpoints
// ============================================

// Products
export const productAPI = {
  getAll: (params) => apiClient.get('/api/product/all', { params }),
  getById: (id) => apiClient.get(`/api/product/single-product/${id}`),
  create: (data) => apiClient.post('/api/product/add', data),
  update: (id, data) => apiClient.patch(`/api/product/edit-product/${id}`, data),
  delete: (id) => apiClient.delete(`/api/product/${id}`),
};

// Categories
export const categoryAPI = {
  getAll: (params) => apiClient.get('/api/category/all', { params }),
  getById: (id) => apiClient.get(`/api/category/get/${id}`),
  create: (data) => apiClient.post('/api/category/add', data),
  update: (id, data) => apiClient.patch(`/api/category/edit/${id}`, data),
  delete: (id) => apiClient.delete(`/api/category/delete/${id}`),
};

// Brands
export const brandAPI = {
  getAll: (params) => apiClient.get('/api/brand/all', { params }),
  getById: (id) => apiClient.get(`/api/brand/${id}`),
  create: (data) => apiClient.post('/api/brand/add', data),
  update: (id, data) => apiClient.patch(`/api/brand/${id}`, data),
  delete: (id) => apiClient.delete(`/api/brand/${id}`),
};

// Orders
export const orderAPI = {
  getAll: (params) => apiClient.get('/api/order/orders', { params }),
  getById: (id) => apiClient.get(`/api/order/${id}`),
  updateStatus: (id, status) => apiClient.patch(`/api/order/update-status/${id}`, { status }),
};

// Coupons
export const couponAPI = {
  getAll: () => apiClient.get('/api/coupon/'),
  getById: (id) => apiClient.get(`/api/coupon/${id}`),
  create: (data) => apiClient.post('/api/coupon/add', data),
  update: (id, data) => apiClient.patch(`/api/coupon/${id}`, data),
  delete: (id) => apiClient.delete(`/api/coupon/${id}`),
};

// Staff/Admin
export const staffAPI = {
  getAll: () => apiClient.get('/api/admin/all'),
  getById: (id) => apiClient.get(`/api/admin/get/${id}`),
  create: (data) => apiClient.post('/api/admin/add', data),
  update: (id, data) => apiClient.patch(`/api/admin/update-stuff/${id}`, data),
  delete: (id) => apiClient.delete(`/api/admin/${id}`),
  changePassword: (data) => apiClient.patch('/api/admin/change-password', data),
};

export default apiClient;

// ============================================
// Usage Examples
// ============================================

/*

// 1. Login
import { login } from '@/utils/api-client';

async function handleLogin() {
  try {
    const data = await login('admin@example.com', 'password123');
    console.log('Logged in:', data);
    // Redirect to dashboard
    router.push('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
  }
}

// 2. Fetch Products (auto refresh token nếu cần)
import { productAPI } from '@/utils/api-client';

async function fetchProducts() {
  try {
    const response = await productAPI.getAll({ page: 1, limit: 10 });
    console.log('Products:', response.data);
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
}

// 3. Create Product
async function createProduct(productData) {
  try {
    const response = await productAPI.create(productData);
    console.log('Product created:', response.data);
  } catch (error) {
    console.error('Failed to create product:', error);
  }
}

// 4. Logout
import { logout } from '@/utils/api-client';

async function handleLogout() {
  await logout();
  // User will be redirected to login page
}

// 5. Protected Route Component
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/utils/api-client';

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, []);

  return <div>Protected Content</div>;
}

// 6. React Hook for Auth
import { useState, useEffect } from 'react';
import { getAdminInfo, isAuthenticated } from '@/utils/api-client';

export function useAuth() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      setAdmin(getAdminInfo());
    }
    setLoading(false);
  }, []);

  return { admin, loading, isAuthenticated: isAuthenticated() };
}

*/
