/**
 * Status Badge Component
 * Reusable badge for displaying status with colors
 */

import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'order' | 'product' | 'custom';
  className?: string;
}

const orderStatusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const productStatusColors: Record<string, string> = {
  'in-stock': 'bg-green-100 text-green-800',
  'out-of-stock': 'bg-red-100 text-red-800',
  'discontinued': 'bg-gray-100 text-gray-800',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = 'custom',
  className = '',
}) => {
  const getColorClass = () => {
    const normalizedStatus = status.toLowerCase();
    
    switch (variant) {
      case 'order':
        return orderStatusColors[normalizedStatus] || 'bg-gray-100 text-gray-800';
      case 'product':
        return productStatusColors[normalizedStatus] || 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getColorClass()} ${className}`}
    >
      {status}
    </span>
  );
};
