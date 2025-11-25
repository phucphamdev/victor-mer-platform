import axios, { AxiosError } from 'axios';
import type { Product, Category, ApiResponse } from '@/types';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const API_TIMEOUT = 5000;

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để xử lý lỗi
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.warn('API Error:', error.message);
    return Promise.reject(error);
  }
);

// Helper function để format giá tiền
export const formatPrice = (price: number, currency: string = 'VND'): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

// Kiểm tra backend status
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health', { timeout: 3000 });
    return response.status === 200;
  } catch (error) {
    console.warn('Backend không khả dụng, sử dụng dữ liệu local');
    return false;
  }
};

// Lấy danh sách sản phẩm
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Product[]>>('/products');
    return response.data.data;
  } catch (error) {
    console.warn('Sử dụng dữ liệu sản phẩm local');
    return productsData as Product[];
  }
};

// Lấy chi tiết sản phẩm
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.warn('Sử dụng dữ liệu sản phẩm local');
    const product = productsData.find((p) => p.id === id);
    return product ? (product as Product) : null;
  }
};

// Lấy danh sách danh mục
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  } catch (error) {
    console.warn('Sử dụng dữ liệu danh mục local');
    return categoriesData as Category[];
  }
};

// Tìm kiếm sản phẩm
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Product[]>>('/products/search', {
      params: { q: query },
    });
    return response.data.data;
  } catch (error) {
    console.warn('Sử dụng tìm kiếm local');
    const lowerQuery = query.toLowerCase();
    return productsData.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description?.toLowerCase().includes(lowerQuery)
    ) as Product[];
  }
};

export default apiClient;
