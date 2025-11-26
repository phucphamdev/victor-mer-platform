import { config } from './config';
import type {
  ContactFormData,
  RentalSignupData,
  LicensePurchaseData,
  ApiResponse,
} from './types';

/**
 * API Client for communicating with the backend
 * Uses configured URLs from environment variables
 */
export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.apiBaseUrl;
  }

  /**
   * Submit contact form data to the backend
   */
  async submitContactForm(
    data: ContactFormData
  ): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Contact form submission error:', error);
      throw error;
    }
  }

  /**
   * Create a rental signup request
   */
  async createRentalSignup(
    data: RentalSignupData
  ): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/rental/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Rental signup error:', error);
      throw error;
    }
  }

  /**
   * Create a license purchase request
   */
  async createLicensePurchase(
    data: LicensePurchaseData
  ): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/license/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('License purchase error:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
