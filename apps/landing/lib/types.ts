// Data Models

export interface Template {
  id: string;
  name: string;
  description: string;
  screenshot: string;
  demoUrl: string;
  features: string[];
  category: 'fashion' | 'electronics' | 'food' | 'general';
  previewImages: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  limits: {
    products: number;
    orders: number;
    storage: string;
    bandwidth: string;
  };
  recommended: boolean;
  stripePriceId?: string;
}

export interface LicensePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  codeModules: string[];
  documentation: string;
  support: 'community' | 'email' | 'priority';
}

export interface ContactFormData {
  name: string;
  email: string;
  inquiryType: 'rental' | 'license' | 'general' | 'support';
  message: string;
  phone?: string;
}

export interface RentalSignupData {
  email: string;
  businessName: string;
  templateId: string;
  planId: string;
  desiredDomain?: string;
}

export interface LicensePurchaseData {
  email: string;
  companyName: string;
  packageIds: string[];
  totalPrice: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Offering {
  id: string;
  title: string;
  description: string;
  icon: string;
  ctaText: string;
  ctaLink: string;
  highlights?: string[];
}
