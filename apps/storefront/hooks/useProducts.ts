import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/api';
import type { Product } from '@/types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Không thể tải sản phẩm');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    loadProducts();
  };

  return { products, loading, error, refetch };
}
