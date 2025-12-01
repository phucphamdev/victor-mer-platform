/**
 * Loading State Component
 * Reusable loading states for different scenarios
 */

import React from 'react';
import Loading from '@/app/components/common/loading';

interface LoadingStateProps {
  isLoading: boolean;
  error?: string | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
  loadingMessage?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  isLoading,
  error,
  isEmpty = false,
  emptyMessage = 'No data available',
  children,
  loadingMessage = 'Loading...',
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="mb-4 text-base text-gray-600">{loadingMessage}</p>
        <Loading loading={isLoading} spinner="scale" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-500 text-lg font-medium">Error</p>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500 text-base">{emptyMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
};

// Compact loading spinner
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`} />
    </div>
  );
};
