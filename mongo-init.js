// MongoDB initialization script for production
// This script runs automatically when MongoDB container starts for the first time

// Get database name from environment variable or use default
const dbName = process.env.MONGO_DB_NAME || 'victormer_ecommerce_production_2024';
db = db.getSiblingDB(dbName);

// Create indexes for better performance and data integrity
db.users.createIndex({ email: 1 }, { unique: true, name: 'idx_users_email_unique' });
db.users.createIndex({ createdAt: -1 }, { name: 'idx_users_created' });

db.products.createIndex({ slug: 1 }, { unique: true, name: 'idx_products_slug_unique' });
db.products.createIndex({ category: 1 }, { name: 'idx_products_category' });
db.products.createIndex({ status: 1 }, { name: 'idx_products_status' });
db.products.createIndex({ createdAt: -1 }, { name: 'idx_products_created' });

db.orders.createIndex({ userId: 1 }, { name: 'idx_orders_user' });
db.orders.createIndex({ orderNumber: 1 }, { unique: true, name: 'idx_orders_number_unique' });
db.orders.createIndex({ status: 1 }, { name: 'idx_orders_status' });
db.orders.createIndex({ createdAt: -1 }, { name: 'idx_orders_created' });

db.categories.createIndex({ slug: 1 }, { unique: true, name: 'idx_categories_slug_unique' });
db.brands.createIndex({ slug: 1 }, { unique: true, name: 'idx_brands_slug_unique' });

db.reviews.createIndex({ productId: 1 }, { name: 'idx_reviews_product' });
db.reviews.createIndex({ userId: 1 }, { name: 'idx_reviews_user' });

print('✅ MongoDB indexes created successfully for database: ' + dbName);
