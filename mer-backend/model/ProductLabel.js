const mongoose = require('mongoose');

const productLabelSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Label name is required'],
    trim: true,
    unique: true,
    maxLength: [50, 'Label name cannot exceed 50 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  type: {
    type: String,
    enum: ['new', 'hot', 'sale', 'best-seller', 'featured', 'limited', 'custom'],
    default: 'custom'
  },
  color: {
    type: String,
    default: '#FF0000'
  },
  backgroundColor: {
    type: String,
    default: '#FFFFFF'
  },
  icon: String,
  position: {
    type: String,
    enum: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    default: 'top-right'
  },
  priority: {
    type: Number,
    default: 0,
    min: 0
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
  }
}, {
  timestamps: true
});

const ProductLabel = mongoose.model('ProductLabel', productLabelSchema);

module.exports = ProductLabel;
