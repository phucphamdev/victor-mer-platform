/**
 * Confirm Dialog Component
 * Reusable confirmation dialog
 */

'use client';

import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'warning',
}) => {
  if (!isOpen) return null;

  const variantColors = {
    danger: 'bg-red-600 hover:bg-red-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    info: 'bg-blue-600 hover:bg-blue-700',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onCancel}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {cancelText}
          </button>
          
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-lg transition-colors ${variantColors[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Hook for confirm dialog
export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [config, setConfig] = React.useState<Omit<ConfirmDialogProps, 'isOpen' | 'onConfirm' | 'onCancel'>>({
    title: '',
    message: '',
  });
  const resolveRef = React.useRef<((value: boolean) => void) | null>(null);

  const confirm = (newConfig: Omit<ConfirmDialogProps, 'isOpen' | 'onConfirm' | 'onCancel'>): Promise<boolean> => {
    setConfig(newConfig);
    setIsOpen(true);
    
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const handleConfirm = () => {
    resolveRef.current?.(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    resolveRef.current?.(false);
    setIsOpen(false);
  };

  return {
    confirm,
    ConfirmDialog: () => (
      <ConfirmDialog
        {...config}
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    ),
  };
};
