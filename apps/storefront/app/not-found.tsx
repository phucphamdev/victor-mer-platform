import Link from 'next/link';

export default function NotFound() {
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
      <h1 style={{ fontSize: '6rem', margin: 0, color: '#3498db' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>
        Không tìm thấy trang
      </h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <Link
        href="/"
        style={{
          padding: '0.75rem 2rem',
          background: '#3498db',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 600,
        }}
      >
        Về trang chủ
      </Link>
    </div>
  );
}
