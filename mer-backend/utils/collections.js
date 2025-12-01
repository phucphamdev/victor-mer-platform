const collections = [
  {
    name: 'Customer Favorites',
    slug: 'customer-favorites',
    description: 'Most loved products by our customers',
    icon: '🏆',
    type: 'best-seller',
    status: 'active',
    priority: 10,
    featured: true,
    productCount: 0,
    products: []
  },
  {
    name: 'Hot Right Now',
    slug: 'hot-right-now',
    description: 'Trending products this week',
    icon: '🔥',
    type: 'trending',
    status: 'active',
    priority: 10,
    featured: true,
    productCount: 0,
    products: []
  },
  {
    name: 'Gift Ideas',
    slug: 'gift-ideas',
    description: 'Perfect gifts for any occasion',
    icon: '🎁',
    type: 'custom',
    status: 'active',
    priority: 10,
    featured: false,
    productCount: 0,
    products: []
  },
  {
    name: 'Top Rated',
    slug: 'top-rated',
    description: 'Highest rated products',
    icon: '⭐',
    type: 'best-seller',
    status: 'active',
    priority: 9,
    featured: false,
    productCount: 0,
    products: []
  },
  {
    name: 'Premium Collection',
    slug: 'premium-collection',
    description: 'Luxury and high-end products for discerning customers',
    icon: '💎',
    type: 'custom',
    status: 'active',
    priority: 9,
    featured: true,
    productCount: 0,
    products: []
  }
];

module.exports = collections;
