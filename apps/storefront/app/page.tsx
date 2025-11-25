'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProducts, checkBackendHealth, formatPrice } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import { useBackendStatus } from '@/hooks/useBackendStatus';
import type { Product } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const { addItem } = useCart();
  const { status: backendStatus } = useBackendStatus();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = async () => {
    try {
      const data = await getProducts();
      setProducts(data.slice(0, 6));
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Chào mừng đến với Bagisto SaaS Platform</h1>
          <p>Nền tảng thương mại điện tử đa kênh</p>
          <div className={styles.status}>
            Backend Status:{' '}
            <span
              className={
                backendStatus === 'connected' ? styles.statusConnected : styles.statusError
              }
            >
              {backendStatus === 'checking'
                ? ' ⏳ Đang kiểm tra...'
                : backendStatus === 'connected'
                ? ' ✓ Kết nối'
                : ' ✗ Offline (Dùng dữ liệu local)'}
            </span>
          </div>
        </section>

        <section className={styles.products}>
          <h2>Sản phẩm nổi bật</h2>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Đang tải sản phẩm...</p>
            </div>
          ) : (
            <>
              <div className={styles.productGrid}>
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className={styles.productCard}
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <div className={styles.productImage}>{product.image || '📦'}</div>
                    <h3>{product.name}</h3>
                    <p className={styles.description}>{product.description}</p>
                    <p className={styles.price}>{formatPrice(product.price)}</p>
                    {product.stock !== undefined && (
                      <p className={styles.stock}>
                        Còn lại: {product.stock} sản phẩm
                      </p>
                    )}
                    <button 
                      className={styles.addToCart}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.viewAll}>
                <button onClick={() => router.push('/products')}>
                  Xem tất cả sản phẩm →
                </button>
              </div>
            </>
          )}
        </section>

        <section className={styles.features}>
          <h2>Tính năng</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚀</div>
              <h3>Hiệu suất cao</h3>
              <p>Next.js 14 + TypeScript</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔒</div>
              <h3>Bảo mật</h3>
              <p>Laravel Sanctum API</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📦</div>
              <h3>Quản lý sản phẩm</h3>
              <p>Bagisto E-commerce</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔄</div>
              <h3>Fallback thông minh</h3>
              <p>Auto-switch sang JSON local</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
