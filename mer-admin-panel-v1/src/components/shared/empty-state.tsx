import React from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Chưa có dữ liệu",
  message = "Tính năng này đang được phát triển. Vui lòng quay lại sau.",
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-12">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 mb-6 rounded-full bg-slate-100 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">{title}</h3>
        <p className="text-slate-500 max-w-md">{message}</p>
      </div>
    </div>
  );
};

export default EmptyState;
