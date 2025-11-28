const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const orderReturnSchema = mongoose.Schema({
  returnNumber: {
    type: String,
    required: [true, 'Return number is required'],
    unique: true,
    trim: true
  },
  order: {
    type: ObjectId,
    ref: 'Order',
    required: [true, 'Order reference is required']
  },
  customer: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: ObjectId,
      ref: 'Products'
    },
    name: String,
    quantity: Number,
    price: Number,
    reason: {
      type: String,
      enum: ['defective', 'wrong-item', 'not-as-described', 'damaged', 'changed-mind', 'other'],
      required: true
    },
    reasonDetail: String,
    images: [String]
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'received', 'refunded', 'exchanged'],
    default: 'pending'
  },
  returnType: {
    type: String,
    enum: ['refund', 'exchange'],
    default: 'refund'
  },
  refundAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  refundMethod: {
    type: String,
    enum: ['original-payment', 'bank-transfer', 'store-credit']
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  approvedDate: Date,
  completedDate: Date,
  notes: String,
  adminNotes: String,
  trackingNumber: String
}, {
  timestamps: true
});

// Auto-generate return number
orderReturnSchema.pre('save', async function(next) {
  if (!this.returnNumber) {
    const count = await mongoose.model('OrderReturn').countDocuments();
    const year = new Date().getFullYear();
    this.returnNumber = `RET-${year}-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Index
orderReturnSchema.index({ returnNumber: 1 });
orderReturnSchema.index({ order: 1 });
orderReturnSchema.index({ customer: 1 });
orderReturnSchema.index({ status: 1 });

const OrderReturn = mongoose.model('OrderReturn', orderReturnSchema);

module.exports = OrderReturn;
