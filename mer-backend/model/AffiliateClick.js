const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const affiliateClickSchema = mongoose.Schema({
  affiliate: {
    type: ObjectId,
    ref: 'Affiliate',
    required: true
  },
  affiliateCode: {
    type: String,
    required: true
  },
  ipAddress: String,
  userAgent: String,
  referrer: String,
  landingPage: String,
  converted: {
    type: Boolean,
    default: false
  },
  order: {
    type: ObjectId,
    ref: 'Order'
  },
  clickDate: {
    type: Date,
    default: Date.now
  },
  conversionDate: Date
}, {
  timestamps: true
});

// Index
affiliateClickSchema.index({ affiliate: 1 });
affiliateClickSchema.index({ affiliateCode: 1 });
affiliateClickSchema.index({ clickDate: 1 });
affiliateClickSchema.index({ converted: 1 });

const AffiliateClick = mongoose.model('AffiliateClick', affiliateClickSchema);

module.exports = AffiliateClick;
