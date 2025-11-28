/**
 * Format Utilities
 * Common formatting functions
 */

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * Format currency with locale
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (
  num: number,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale).format(num);
};

/**
 * Format date
 */
export const formatDate = (
  date: string | Date,
  format: string = 'DD/MM/YYYY'
): string => {
  return dayjs(date).format(format);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format percentage
 */
export const formatPercentage = (
  value: number,
  total: number,
  decimals: number = 0
): string => {
  if (total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(decimals)}%`;
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phone;
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (
  text: string,
  maxLength: number = 50,
  suffix: string = '...'
): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Capitalize first letter
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Title case
 */
export const titleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Slugify text
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Format order status with color
 */
export const getOrderStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: 'text-yellow-600 bg-yellow-100',
    processing: 'text-blue-600 bg-blue-100',
    delivered: 'text-green-600 bg-green-100',
    cancelled: 'text-red-600 bg-red-100',
  };
  
  return colors[status.toLowerCase()] || 'text-gray-600 bg-gray-100';
};

/**
 * Format product status with color
 */
export const getProductStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    'in-stock': 'text-green-600 bg-green-100',
    'out-of-stock': 'text-red-600 bg-red-100',
    'discontinued': 'text-gray-600 bg-gray-100',
  };
  
  return colors[status.toLowerCase()] || 'text-gray-600 bg-gray-100';
};
