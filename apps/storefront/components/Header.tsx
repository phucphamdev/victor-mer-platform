'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useBackendStatus } from '@/hooks/useBackendStatus';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { status } = useBackendStatus();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          🛍️ Bagisto Store
        </a>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            🔍
          </button>
        </form>

        <nav className={styles.nav}>
          <a href="/">Trang chủ</a>
          <a href="/products">Sản phẩm</a>
          <a href="/cart" className={styles.cartLink}>
            Giỏ hàng
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </a>
          <a href="http://localhost:8000/admin" target="_blank" rel="noopener noreferrer">
            Admin
          </a>
          <div className={styles.statusIndicator}>
            <span className={`${styles.dot} ${styles[status]}`}></span>
          </div>
        </nav>
      </div>
    </header>
  );
}
