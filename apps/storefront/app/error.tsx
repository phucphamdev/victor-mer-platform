'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#e74c3c' }}>
        Đã xảy ra lỗi!
      </h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        {error.message || 'Có lỗi xảy ra khi tải trang'}
      </p>
      <button
        onClick={reset}
        style={{
          padding: '0.75rem 2rem',
          background: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        Thử lại
      </button>
    </div>
  );
}
