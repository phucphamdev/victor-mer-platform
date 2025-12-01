const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const affiliateSchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  affiliateCode: {
    type: String,
    required: [true, 'Affiliate code is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended', 'banned'],
    default: 'pending'
  },
  commissionRate: {
    type: Number,
    required: true,
    default: 5,
    min: 0,
    max: 100
  },
  totalClicks: {
    type: Number,
    default: 0,
    min: 0
  },
  totalOrders: {
    type: Number,
    default: 0,
    min: 0
  },
  totalRevenue: {
    type: Number,
    default: 0,
    min: 0
  },
  totalCommission: {
    type: Number,
    default: 0,
    min: 0
  },
  paidCommission: {
    type: Number,
    default: 0,
    min: 0
  },
  pendingCommission: {
    type: Number,
    default: 0,
    min: 0
  },
  paymentInfo: {
    method: {
      type: String,
      enum: ['bank-transfer', 'paypal', 'momo', 'zalopay']
    },
    bankName: String,
    accountNumber: String,
    accountName: String,
    paypalEmail: String,
    momoPhone: String
  },
  referralUrl: String,
  notes: String,
  approvedAt: Date,
  lastPayoutAt: Date
}, {
  timestamps: true
});

// Generate affiliate code
affiliateSchema.pre('save', async function(next) {
  if (!this.affiliateCode) {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.affiliateCode = `AFF${randomCode}`;
  }
  next();
});

// Index
affiliateSchema.index({ affiliateCode: 1 });
affiliateSchema.index({ user: 1 });
affiliateSchema.index({ status: 1 });

const Affiliate = mongoose.model('Affiliate', affiliateSchema);

module.exports = Affiliate;
