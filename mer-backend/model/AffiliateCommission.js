const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const affiliateCommissionSchema = mongoose.Schema({
  affiliate: {
    type: ObjectId,
    ref: 'Affiliate',
    required: true
  },
  order: {
    type: ObjectId,
    ref: 'Order',
    required: true
  },
  orderAmount: {
    type: Number,
    required: true,
    min: 0
  },
  commissionRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  commissionAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'paid', 'cancelled'],
    default: 'pending'
  },
  approvedAt: Date,
  paidAt: Date,
  payoutId: String,
  notes: String
}, {
  timestamps: true
});

// Calculate commission
affiliateCommissionSchema.pre('save', function(next) {
  if (!this.commissionAmount) {
    this.commissionAmount = (this.orderAmount * this.commissionRate) / 100;
  }
  next();
});

// Index
affiliateCommissionSchema.index({ affiliate: 1 });
affiliateCommissionSchema.index({ order: 1 });
affiliateCommissionSchema.index({ status: 1 });

const AffiliateCommission = mongoose.model('AffiliateCommission', affiliateCommissionSchema);

module.exports = AffiliateCommission;
