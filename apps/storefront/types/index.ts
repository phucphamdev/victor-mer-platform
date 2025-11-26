export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  image?: string;
  category?: string;
  stock?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}
