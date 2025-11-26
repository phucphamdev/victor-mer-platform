import { useState, useEffect } from 'react';
import { getCategories } from '@/lib/api';
import type { Category } from '@/types';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError('Không thể tải danh mục');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch: loadCategories };
}
