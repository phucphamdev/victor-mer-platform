/**
 * Safe Array Component
 * Prevents undefined/null array errors by providing safe rendering
 */

import React from 'react';

interface SafeArrayProps<T> {
  data: T[] | undefined | null;
  renderItem: (item: T, index: number) => React.ReactNode;
  fallback?: React.ReactNode;
  emptyMessage?: string;
}

export function SafeArray<T>({
  data,
  renderItem,
  fallback = null,
  emptyMessage = 'No items found',
}: SafeArrayProps<T>) {
  // Handle undefined/null
  if (!data) {
    return <>{fallback}</>;
  }

  // Handle empty array
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  // Render items safely
  return <>{data.map((item, index) => renderItem(item, index))}</>;
}

// Hook for safe array operations
export function useSafeArray<T>(data: T[] | undefined | null) {
  const safeData = data ?? [];
  
  return {
    data: safeData,
    isEmpty: safeData.length === 0,
    isNotEmpty: safeData.length > 0,
    length: safeData.length,
    map: <U,>(fn: (item: T, index: number) => U) => safeData.map(fn),
    filter: (fn: (item: T) => boolean) => safeData.filter(fn),
    find: (fn: (item: T) => boolean) => safeData.find(fn),
    some: (fn: (item: T) => boolean) => safeData.some(fn),
    every: (fn: (item: T) => boolean) => safeData.every(fn),
  };
}
