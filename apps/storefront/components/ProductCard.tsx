'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/api';
import type { Product } from '@/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.image}>{product.image || '📦'}</div>
      {product.category && (
        <span className={styles.category}>{product.category}</span>
      )}
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>{formatPrice(product.price)}</p>
      {product.stock !== undefined && (
        <p className={`${styles.stock} ${product.stock === 0 ? styles.outOfStock : ''}`}>
          {product.stock > 0 ? `Còn lại: ${product.stock}` : 'Hết hàng'}
        </p>
      )}
      <button
        className={`${styles.button} ${added ? styles.added : ''}`}
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        {added ? '✓ Đã thêm' : product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
      </button>
    </div>
  );
}
