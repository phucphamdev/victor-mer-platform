/**
 * Orders API
 */

import { apiClient } from './client';

export interface Order {
  _id: string;
  user: string;
  cart: any[];
  shippingAddress: any;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  status: string;
  data: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface OrderFilters {
  page?: number;
  limit?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export const ordersApi = {
  // Get all orders with filters
  getAll: async (
    filters: OrderFilters = {},
    token: string
  ): Promise<OrdersResponse> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient.get<OrdersResponse>(`/order${query}`, token);
  },

  // Get single order
  getById: async (id: string, token: string): Promise<Order> => {
    return apiClient.get<Order>(`/order/${id}`, token);
  },

  // Update order status
  updateStatus: async (
    id: string,
    status: string,
    token: string
  ): Promise<Order> => {
    return apiClient.patch<Order>(`/order/${id}`, { status }, token);
  },
};
