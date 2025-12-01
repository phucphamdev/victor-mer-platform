/**
 * Authentication API
 */

import { apiClient } from './client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  image?: string;
}

export const authApi = {
  // Admin login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>('/admin/login', credentials);
  },

  // Admin register
  register: async (data: RegisterData): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>('/admin/register', data);
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    return apiClient.post<{ token: string }>('/admin/refresh-token', {
      refreshToken,
    });
  },

  // Logout
  logout: async (refreshToken: string): Promise<void> => {
    return apiClient.post<void>('/admin/logout', { refreshToken });
  },

  // Change password
  changePassword: async (
    oldPassword: string,
    newPassword: string,
    token: string
  ): Promise<void> => {
    return apiClient.patch<void>(
      '/admin/password',
      { oldPassword, newPassword },
      token
    );
  },
};
