const mongoose = require('mongoose');

const collectionCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const CollectionCategory = mongoose.model('CollectionCategory', collectionCategorySchema);

module.exports = CollectionCategory;
