'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById, formatPrice } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './product.module.css';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  const loadProduct = async () => {
    try {
      const id = parseInt(params.id as string);
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Đang tải sản phẩm...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div className={styles.notFound}>
            <h1>Không tìm thấy sản phẩm</h1>
            <button onClick={() => router.push('/products')}>
              Quay lại danh sách sản phẩm
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <button className={styles.backButton} onClick={() => router.back()}>
          ← Quay lại
        </button>

        <div className={styles.productDetail}>
          <div className={styles.imageSection}>
            <div className={styles.productImage}>{product.image || '📦'}</div>
          </div>

          <div className={styles.infoSection}>
            <h1>{product.name}</h1>
            {product.category && (
              <span className={styles.category}>{product.category}</span>
            )}
            <p className={styles.description}>{product.description}</p>
            
            <div className={styles.priceSection}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              {product.stock !== undefined && (
                <span className={styles.stock}>
                  {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
                </span>
              )}
            </div>

            <div className={styles.actions}>
              <div className={styles.quantitySelector}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={product.stock || 999}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.stock !== undefined && quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <button
                className={`${styles.addButton} ${added ? styles.added : ''}`}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {added ? '✓ Đã thêm' : product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
