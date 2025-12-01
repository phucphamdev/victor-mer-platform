const mongoose = require('mongoose');
const Collection = require('../model/Collection');
require('dotenv').config();

// Sample collection data
const collectionsData = [
  // Custom Collections
  {
    name: "Gift Ideas",
    slug: "gift-ideas",
    description: "Perfect gifts for every occasion and everyone on your list",
    icon: "🎁",
    type: "custom",
    status: "active",
    priority: 10,
    featured: true,
    seo: {
      metaTitle: "Gift Ideas - Find Perfect Gifts",
      metaDescription: "Discover unique gift ideas for birthdays, holidays, and special occasions",
      metaKeywords: ["gifts", "gift ideas", "presents"]
    }
  },
  {
    name: "Premium Collection",
    slug: "premium-collection",
    description: "Luxury and high-end products for discerning customers",
    icon: "💎",
    type: "custom",
    status: "active",
    priority: 9,
    featured: true,
    seo: {
      metaTitle: "Premium Collection - Luxury Products",
      metaDescription: "Explore our premium collection of luxury and high-end products"
    }
  },

  // Seasonal Collections
  {
    name: "Summer Essentials",
    slug: "summer-essentials",
    description: "Everything you need for a perfect summer season",
    icon: "🌸",
    type: "seasonal",
    status: "active",
    priority: 8,
    featured: false,
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-08-31'),
    seo: {
      metaTitle: "Summer Essentials - Seasonal Collection",
      metaDescription: "Shop our summer collection with the best products for the season"
    }
  },
  {
    name: "Holiday Special",
    slug: "holiday-special",
    description: "Celebrate the holidays with our special collection",
    icon: "🎉",
    type: "seasonal",
    status: "active",
    priority: 7,
    featured: true,
    seo: {
      metaTitle: "Holiday Special Collection",
      metaDescription: "Special holiday collection with amazing deals and products"
    }
  },

  // Trending Collections
  {
    name: "Hot Right Now",
    slug: "hot-right-now",
    description: "The most popular products everyone is talking about",
    icon: "🔥",
    type: "trending",
    status: "active",
    priority: 10,
    featured: true,
    seo: {
      metaTitle: "Hot Right Now - Trending Products",
      metaDescription: "Discover the hottest trending products of the moment"
    }
  },
  {
    name: "Staff Picks",
    slug: "staff-picks",
    description: "Hand-picked favorites from our team",
    icon: "⭐",
    type: "trending",
    status: "active",
    priority: 6,
    featured: false,
    seo: {
      metaTitle: "Staff Picks - Curated Selection",
      metaDescription: "Our team's favorite products, carefully selected for you"
    }
  },

  // New Arrival Collections
  {
    name: "Just Arrived",
    slug: "just-arrived",
    description: "Fresh new products just added to our store",
    icon: "🚀",
    type: "new-arrival",
    status: "active",
    priority: 9,
    featured: true,
    seo: {
      metaTitle: "Just Arrived - New Products",
      metaDescription: "Check out our latest arrivals and newest products"
    }
  },
  {
    name: "New This Week",
    slug: "new-this-week",
    description: "Discover what's new this week",
    icon: "✨",
    type: "new-arrival",
    status: "active",
    priority: 8,
    featured: false,
    seo: {
      metaTitle: "New This Week - Latest Products",
      metaDescription: "See what's new this week in our store"
    }
  },

  // Best Seller Collections
  {
    name: "Customer Favorites",
    slug: "customer-favorites",
    description: "Most loved products by our customers",
    icon: "🏆",
    type: "best-seller",
    status: "active",
    priority: 10,
    featured: true,
    seo: {
      metaTitle: "Customer Favorites - Best Sellers",
      metaDescription: "Shop our best-selling products loved by customers"
    }
  },
  {
    name: "Top Rated",
    slug: "top-rated",
    description: "Highest rated products with excellent reviews",
    icon: "🌟",
    type: "best-seller",
    status: "active",
    priority: 9,
    featured: true,
    seo: {
      metaTitle: "Top Rated Products - Best Sellers",
      metaDescription: "Browse our top-rated products with the best customer reviews"
    }
  },

  // Additional Collections
  {
    name: "Budget Friendly",
    slug: "budget-friendly",
    description: "Great products at affordable prices",
    icon: "💝",
    type: "custom",
    status: "active",
    priority: 5,
    featured: false,
    seo: {
      metaTitle: "Budget Friendly - Affordable Products",
      metaDescription: "Quality products at prices that won't break the bank"
    }
  },
  {
    name: "Limited Edition",
    slug: "limited-edition",
    description: "Exclusive limited edition items - get them while they last",
    icon: "👑",
    type: "custom",
    status: "active",
    priority: 8,
    featured: true,
    seo: {
      metaTitle: "Limited Edition - Exclusive Products",
      metaDescription: "Exclusive limited edition products available for a short time"
    }
  }
];

// Seed function
async function seedCollections() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mer-ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing collections
    await Collection.deleteMany({});
    console.log('Cleared existing collections');

    // Insert new collections
    const result = await Collection.insertMany(collectionsData);
    console.log(`✅ Successfully seeded ${result.length} collections`);

    // Display summary
    console.log('\n📊 Collections Summary:');
    const types = await Collection.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);
    
    types.forEach(type => {
      console.log(`   ${type._id}: ${type.count} collections`);
    });

    console.log('\n✨ Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding collections:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeder
seedCollections();
