/**
 * Products API
 */

import { apiClient } from './client';

export interface Product {
  _id: string;
  title: string;
  slug: string;
  price: number;
  discount?: number;
  category: string;
  brand?: string;
  description?: string;
  images?: string[];
  stock: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  status: string;
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  search?: string;
}

export const productsApi = {
  // Get all products with filters
  getAll: async (
    filters: ProductFilters = {},
    token?: string
  ): Promise<ProductsResponse> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient.get<ProductsResponse>(`/product${query}`, token);
  },

  // Get single product
  getById: async (id: string, token?: string): Promise<Product> => {
    return apiClient.get<Product>(`/product/${id}`, token);
  },

  // Create product
  create: async (data: Partial<Product>, token: string): Promise<Product> => {
    return apiClient.post<Product>('/product', data, token);
  },

  // Update product
  update: async (
    id: string,
    data: Partial<Product>,
    token: string
  ): Promise<Product> => {
    return apiClient.patch<Product>(`/product/${id}`, data, token);
  },

  // Delete product
  delete: async (id: string, token: string): Promise<void> => {
    return apiClient.delete<void>(`/product/${id}`, token);
  },

  // Get stock out products
  getStockOut: async (token: string): Promise<Product[]> => {
    return apiClient.get<Product[]>('/product/stock-out', token);
  },
};
