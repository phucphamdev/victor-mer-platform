const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const collectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Collection name is required'],
    trim: true,
    unique: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    maxLength: [500, 'Description cannot exceed 500 characters']
  },
  image: String,
  banner: String,
  type: {
    type: String,
    enum: ['seasonal', 'trending', 'new-arrival', 'best-seller', 'custom'],
    default: 'custom'
  },
  products: [{
    type: ObjectId,
    ref: 'Products'
  }],
  productCount: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'scheduled'],
    default: 'active'
  },
  startDate: Date,
  endDate: Date,
  priority: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  seo: {
    metaTitle: {
      type: String,
      maxLength: [60, 'Meta title should not exceed 60 characters']
    },
    metaDescription: {
      type: String,
      maxLength: [160, 'Meta description should not exceed 160 characters']
    },
    metaKeywords: [String],
    ogTitle: String,
    ogDescription: String,
    ogImage: String,
    canonicalUrl: String,
    structuredData: Object,
    robots: {
      index: {
        type: Boolean,
        default: true
      },
      follow: {
        type: Boolean,
        default: true
      }
    }
  }
}, {
  timestamps: true
});

// Update product count
collectionSchema.pre('save', function(next) {
  this.productCount = this.products.length;
  next();
});

// Index
collectionSchema.index({ slug: 1 });
collectionSchema.index({ status: 1 });
collectionSchema.index({ name: 'text', description: 'text' });

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
