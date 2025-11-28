const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const flashSaleSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Flash sale name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: String,
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  status: {
    type: String,
    enum: ['scheduled', 'active', 'ended', 'cancelled'],
    default: 'scheduled'
  },
  products: [{
    product: {
      type: ObjectId,
      ref: 'Products',
      required: true
    },
    originalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    salePrice: {
      type: Number,
      required: true,
      min: 0
    },
    discountPercent: {
      type: Number,
      min: 0,
      max: 100
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    sold: {
      type: Number,
      default: 0,
      min: 0
    },
    remaining: {
      type: Number,
      default: 0,
      min: 0
    }
  }],
  banner: String,
  priority: {
    type: Number,
    default: 0
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
    canonicalUrl: String
  }
}, {
  timestamps: true
});

// Calculate remaining quantity
flashSaleSchema.pre('save', function(next) {
  this.products.forEach(item => {
    item.remaining = item.quantity - item.sold;
    if (!item.discountPercent) {
      item.discountPercent = Math.round(((item.originalPrice - item.salePrice) / item.originalPrice) * 100);
    }
  });
  next();
});

// Index
flashSaleSchema.index({ slug: 1 });
flashSaleSchema.index({ status: 1 });
flashSaleSchema.index({ startDate: 1, endDate: 1 });

const FlashSale = mongoose.model('FlashSale', flashSaleSchema);

module.exports = FlashSale;
