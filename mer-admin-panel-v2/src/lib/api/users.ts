/**
 * Users API
 */

import { apiClient } from './client';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const usersApi = {
  // Get user by ID
  getById: async (id: string, token: string): Promise<User> => {
    return apiClient.get<User>(`/user/${id}`, token);
  },

  // Update user
  update: async (
    id: string,
    data: Partial<User>,
    token: string
  ): Promise<User> => {
    return apiClient.patch<User>(`/user/${id}`, data, token);
  },
};
