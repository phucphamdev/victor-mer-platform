const mongoose = require('mongoose');
const CollectionCategory = require('../model/CollectionCategory');
const { secret } = require('../config/secret');

const categories = [
  {
    name: 'Seasonal Collections',
    slug: 'seasonal-collections',
    description: 'Collections that change with the seasons',
    icon: '🌸',
    status: 'active',
    priority: 10,
  },
  {
    name: 'Special Events',
    slug: 'special-events',
    description: 'Collections for holidays and special occasions',
    icon: '🎉',
    status: 'active',
    priority: 9,
  },
  {
    name: 'Best Sellers',
    slug: 'best-sellers',
    description: 'Our most popular collection categories',
    icon: '🏆',
    status: 'active',
    priority: 8,
  },
  {
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'Latest collection categories',
    icon: '✨',
    status: 'active',
    priority: 7,
  },
  {
    name: 'Trending',
    slug: 'trending',
    description: 'What\'s hot right now',
    icon: '🔥',
    status: 'active',
    priority: 6,
  },
  {
    name: 'Custom Collections',
    slug: 'custom-collections',
    description: 'Curated collections for specific themes',
    icon: '🎨',
    status: 'active',
    priority: 5,
  },
];

async function seedCollectionCategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect(secret.db_url);
    console.log('Connected to MongoDB');

    // Clear existing categories
    await CollectionCategory.deleteMany({});
    console.log('Cleared existing collection categories');

    // Insert new categories
    const result = await CollectionCategory.insertMany(categories);
    console.log(`✅ Successfully seeded ${result.length} collection categories`);

    console.log('\n📊 Collection Categories Summary:');
    result.forEach((cat) => {
      console.log(`   ${cat.icon} ${cat.name} (Priority: ${cat.priority})`);
    });

    console.log('\n✨ Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding collection categories:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedCollectionCategories();
