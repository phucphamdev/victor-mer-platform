export interface ICollection {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  type: string;
  products: string[];
  productCount: number;
  status: string;
  priority: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAddCollection {
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  type?: string;
  products?: string[];
  status?: string;
  priority?: number;
  featured?: boolean;
}
