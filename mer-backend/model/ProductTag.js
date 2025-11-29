const mongoose = require('mongoose');

const productTagSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tag name is required'],
    trim: true,
    unique: true,
    maxLength: [50, 'Tag name cannot exceed 50 characters']
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
    maxLength: [200, 'Description cannot exceed 200 characters']
  },
  color: {
    type: String,
    default: '#000000'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  productCount: {
    type: Number,
    default: 0,
    min: 0
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
    canonicalUrl: String,
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

// Index for search
productTagSchema.index({ name: 'text', description: 'text' });

const ProductTag = mongoose.model('ProductTag', productTagSchema);

module.exports = ProductTag;
