/**
 * Reusable Data Table Component
 * Generic table with built-in loading, error, and empty states
 */

import React from 'react';
import { LoadingState } from './LoadingState';
import { SafeArray } from './SafeArray';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[] | undefined;
  columns: Column<T>[];
  isLoading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  rowKey: keyof T;
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  isLoading = false,
  error = null,
  emptyMessage = 'No data available',
  rowKey,
  onRowClick,
  className = '',
}: DataTableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <LoadingState
        isLoading={isLoading}
        error={error}
        isEmpty={!data || data.length === 0}
        emptyMessage={emptyMessage}
      >
        <table className="w-full text-base text-left">
          <thead className="bg-white">
            <tr className="border-b border-gray6">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`pr-8 py-5 whitespace-nowrap font-medium ${column.className || ''}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <SafeArray
              data={data}
              renderItem={(item) => (
                <tr
                  key={String(item[rowKey])}
                  className={`bg-white border-b border-gray6 last:border-0 ${
                    onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
                  }`}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`pr-8 py-5 whitespace-nowrap ${column.className || ''}`}
                    >
                      {column.render
                        ? column.render(item)
                        : item[column.key]}
                    </td>
                  ))}
                </tr>
              )}
            />
          </tbody>
        </table>
      </LoadingState>
    </div>
  );
}
