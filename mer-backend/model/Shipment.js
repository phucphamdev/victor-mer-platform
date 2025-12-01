const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const shipmentSchema = mongoose.Schema({
  order: {
    type: ObjectId,
    ref: 'Order',
    required: [true, 'Order reference is required']
  },
  trackingNumber: {
    type: String,
    required: [true, 'Tracking number is required'],
    unique: true,
    trim: true
  },
  carrier: {
    type: String,
    required: [true, 'Carrier is required'],
    enum: ['ghn', 'ghtk', 'viettel-post', 'vnpost', 'j&t', 'ninja-van', 'other'],
    default: 'ghn'
  },
  carrierName: String,
  status: {
    type: String,
    enum: ['pending', 'picked-up', 'in-transit', 'out-for-delivery', 'delivered', 'failed', 'returned'],
    default: 'pending'
  },
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    ward: String,
    district: String,
    city: String,
    country: {
      type: String,
      default: 'Vietnam'
    },
    postalCode: String
  },
  estimatedDelivery: Date,
  actualDelivery: Date,
  shippingFee: {
    type: Number,
    default: 0,
    min: 0
  },
  weight: {
    type: Number,
    min: 0
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  notes: String,
  trackingHistory: [{
    status: String,
    location: String,
    description: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for tracking
shipmentSchema.index({ trackingNumber: 1 });
shipmentSchema.index({ order: 1 });
shipmentSchema.index({ status: 1 });

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;
