'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProducts, formatPrice } from '@/lib/api';
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
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Giải Pháp Công Nghệ<br/>
              <span className={styles.gradient}>Toàn Diện</span> Cho Doanh Nghiệp
            </h1>
            <p className={styles.heroDescription}>
              Chuyên thiết kế website, SEO, Digital Marketing và phát triển ứng dụng.
              Đồng hành cùng doanh nghiệp phát triển bền vững.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/contact" className={styles.primaryButton}>
                Tư Vấn Miễn Phí
              </Link>
              <Link href="/projects/featured" className={styles.secondaryButton}>
                Xem Dự Án
              </Link>
            </div>
            <div className={styles.status}>
              <span className={`${styles.statusDot} ${styles[backendStatus]}`}></span>
              <span className={styles.statusText}>
                {backendStatus === 'connected' ? 'Hệ thống hoạt động tốt' : 'Đang kiểm tra...'}
              </span>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className={styles.services}>
          <div className={styles.sectionHeader}>
            <h2>Dịch Vụ Của Chúng Tôi</h2>
            <p>Giải pháp toàn diện cho mọi nhu cầu của bạn</p>
          </div>
          <div className={styles.serviceGrid}>
            <Link href="/services/website-design" className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🎨</div>
              <h3>Thiết Kế Website</h3>
              <p>Website đẹp, chuẩn SEO, tối ưu chuyển đổi</p>
            </Link>
            <Link href="/services/seo" className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🔍</div>
              <h3>SEO Website</h3>
              <p>Đưa website lên top Google, tăng traffic tự nhiên</p>
            </Link>
            <Link href="/services/google-ads" className={styles.serviceCard}>
              <div className={styles.serviceIcon}>📊</div>
              <h3>Google Ads</h3>
              <p>Quảng cáo hiệu quả, tối ưu chi phí, ROI cao</p>
            </Link>
            <Link href="/services/digital-marketing" className={styles.serviceCard}>
              <div className={styles.serviceIcon}>📱</div>
              <h3>Digital Marketing</h3>
              <p>Chiến lược marketing đa kênh, tăng doanh thu</p>
            </Link>
            <Link href="/services/web-maintenance" className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🔧</div>
              <h3>Bảo Trì Website</h3>
              <p>Bảo trì 24/7, đảm bảo website luôn hoạt động</p>
            </Link>
            <Link href="/services/ui-ux-branding" className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🎯</div>
              <h3>UI/UX & Branding</h3>
              <p>Thiết kế trải nghiệm, xây dựng thương hiệu</p>
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.stats}>
          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Dự Án Hoàn Thành</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Khách Hàng Hài Lòng</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>5+</div>
              <div className={styles.statLabel}>Năm Kinh Nghiệm</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Hỗ Trợ Khách Hàng</div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        {products.length > 0 && (
          <section className={styles.products}>
            <div className={styles.sectionHeader}>
              <h2>Sản Phẩm Nổi Bật</h2>
              <p>Khám phá các sản phẩm chất lượng của chúng tôi</p>
            </div>
            {loading ? (
              <div className={styles.loading}>
                <div className="loading"></div>
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
                      <div className={styles.productContent}>
                        <h3>{product.name}</h3>
                        <p className={styles.description}>{product.description}</p>
                        <div className={styles.productFooter}>
                          <p className={styles.price}>{formatPrice(product.price)}</p>
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
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.viewAll}>
                  <Link href="/products" className={styles.viewAllButton}>
                    Xem Tất Cả Sản Phẩm →
                  </Link>
                </div>
              </>
            )}
          </section>
        )}

        {/* CTA Section */}
        <section className={styles.cta}>
          <h2>Sẵn Sàng Bắt Đầu Dự Án?</h2>
          <p>Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí</p>
          <Link href="/contact" className={styles.ctaButton}>
            Liên Hệ Ngay
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
