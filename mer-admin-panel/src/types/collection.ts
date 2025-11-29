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
  categories?: string[]; // Array of category IDs
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
  categories?: string[]; // Array of category IDs
}

export interface ICollectionCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  status: string;
  priority: number;
  collectionCount?: number; // Count of collections in this category
  createdAt: string;
  updatedAt: string;
}

export interface IAddCollectionCategory {
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  status?: string;
  priority?: number;
}
