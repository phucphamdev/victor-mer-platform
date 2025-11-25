'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getProducts, searchProducts } from '@/lib/api';
import { useCategories } from '@/hooks/useCategories';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import styles from './products.module.css';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { categories } = useCategories();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [searchParams]);

  const loadData = async () => {
    try {
      setLoading(true);
      const searchQuery = searchParams.get('search');
      
      if (searchQuery) {
        const data = await searchProducts(searchQuery);
        setProducts(data);
      } else {
        const data = await getProducts();
        setProducts(data);
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>
          {searchParams.get('search')
            ? `Kết quả tìm kiếm: "${searchParams.get('search')}"`
            : 'Tất cả sản phẩm'}
        </h1>

        <div className={styles.filters}>
          <button
            className={selectedCategory === 'all' ? styles.active : ''}
            onClick={() => setSelectedCategory('all')}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={selectedCategory === cat.name ? styles.active : ''}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Đang tải sản phẩm...</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product.id)}>
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className={styles.empty}>
            <p>Không tìm thấy sản phẩm nào</p>
            <button onClick={() => router.push('/products')}>
              Xem tất cả sản phẩm
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
