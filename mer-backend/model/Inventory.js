const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const inventorySchema = mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Products',
    required: [true, 'Product reference is required']
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    trim: true
  },
  warehouse: {
    type: String,
    default: 'main'
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  reserved: {
    type: Number,
    default: 0,
    min: 0
  },
  available: {
    type: Number,
    default: 0,
    min: 0
  },
  lowStockThreshold: {
    type: Number,
    default: 10,
    min: 0
  },
  status: {
    type: String,
    enum: ['in-stock', 'low-stock', 'out-of-stock', 'discontinued'],
    default: 'in-stock'
  },
  lastRestocked: Date,
  stockHistory: [{
    type: {
      type: String,
      enum: ['restock', 'sale', 'return', 'adjustment', 'damaged']
    },
    quantity: Number,
    previousQuantity: Number,
    newQuantity: Number,
    reason: String,
    reference: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  location: {
    aisle: String,
    shelf: String,
    bin: String
  }
}, {
  timestamps: true
});

// Calculate available quantity
inventorySchema.pre('save', function(next) {
  this.available = this.quantity - this.reserved;
  
  // Update status based on quantity
  if (this.quantity === 0) {
    this.status = 'out-of-stock';
  } else if (this.quantity <= this.lowStockThreshold) {
    this.status = 'low-stock';
  } else {
    this.status = 'in-stock';
  }
  
  next();
});

// Index
inventorySchema.index({ product: 1 });
inventorySchema.index({ sku: 1 });
inventorySchema.index({ status: 1 });

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
