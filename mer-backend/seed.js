require('dotenv').config();

const connectDB = require('./config/db');

const Brand = require('./model/Brand');
const brandData = require('./utils/brands');

const Category = require('./model/Category');
const categoryData = require('./utils/categories');

const Products = require('./model/Products');
const productsData = require('./utils/products');

const Coupon = require('./model/Coupon');
const couponData = require('./utils/coupons');

const Order = require('./model/Order');
const orderData = require('./utils/orders');

const User = require('./model/User');
const userData = require('./utils/users');

const Reviews = require('./model/Review');
const reviewsData = require('./utils/reviews');

const Admin = require('./model/Admin');
const adminData = require('./utils/admin');

const CollectionCategory = require('./model/CollectionCategory');
const collectionCategoryData = require('./utils/collectionCategories');

const Collection = require('./model/Collection');
const collectionData = require('./utils/collections');

connectDB();
const importData = async () => {
  try {
    await Brand.deleteMany();
    await Brand.insertMany(brandData);

    await Category.deleteMany();
    await Category.insertMany(categoryData);

    await Products.deleteMany();
    await Products.insertMany(productsData);

    await Coupon.deleteMany();
    await Coupon.insertMany(couponData);
    
    await Order.deleteMany();
    await Order.insertMany(orderData);
    
    await User.deleteMany();
    await User.insertMany(userData);
    
    await Reviews.deleteMany();
    await Reviews.insertMany(reviewsData);
    
    await Admin.deleteMany();
    await Admin.insertMany(adminData);

    // Insert collection categories first
    await CollectionCategory.deleteMany();
    const insertedCategories = await CollectionCategory.insertMany(collectionCategoryData);
    console.log('Collection categories inserted successfully!');

    // Insert collections with category references
    await Collection.deleteMany();
    const collectionsWithCategories = collectionData.map((collection, index) => {
      // Assign categories to collections
      if (index === 0) { // Customer Favorites -> Best Sellers
        collection.categories = [insertedCategories[2]._id];
      } else if (index === 1) { // Hot Right Now -> Trending
        collection.categories = [insertedCategories[4]._id];
      } else if (index === 2) { // Gift Ideas -> Special Events
        collection.categories = [insertedCategories[1]._id];
      } else if (index === 3) { // Top Rated -> Best Sellers
        collection.categories = [insertedCategories[2]._id];
      } else if (index === 4) { // Premium Collection -> Custom Collections
        collection.categories = [insertedCategories[5]._id];
      }
      return collection;
    });
    await Collection.insertMany(collectionsWithCategories);
    console.log('Collections inserted successfully!');

    console.log('All data inserted successfully!');
    process.exit();
  } catch (error) {
    console.log('error', error);
    process.exit(1);
  }
};

importData();
