const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const invoiceSchema = mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: [true, 'Invoice number is required'],
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
  invoiceDate: {
    type: Date,
    default: Date.now
  },
  dueDate: Date,
  status: {
    type: String,
    enum: ['draft', 'sent', 'paid', 'overdue', 'cancelled'],
    default: 'draft'
  },
  items: [{
    product: {
      type: ObjectId,
      ref: 'Products'
    },
    name: String,
    quantity: Number,
    price: Number,
    discount: {
      type: Number,
      default: 0
    },
    total: Number
  }],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  tax: {
    type: Number,
    default: 0,
    min: 0
  },
  taxRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  shippingFee: {
    type: Number,
    default: 0,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'VND'
  },
  billingAddress: {
    fullName: String,
    company: String,
    taxCode: String,
    phone: String,
    email: String,
    address: String,
    ward: String,
    district: String,
    city: String,
    country: {
      type: String,
      default: 'Vietnam'
    }
  },
  paymentMethod: String,
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'partial', 'paid', 'refunded'],
    default: 'unpaid'
  },
  paidAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  paidDate: Date,
  notes: String,
  pdfUrl: String
}, {
  timestamps: true
});

// Auto-generate invoice number
invoiceSchema.pre('save', async function(next) {
  if (!this.invoiceNumber) {
    const count = await mongoose.model('Invoice').countDocuments();
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    this.invoiceNumber = `INV-${year}${month}-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

// Index
invoiceSchema.index({ invoiceNumber: 1 });
invoiceSchema.index({ order: 1 });
invoiceSchema.index({ customer: 1 });
invoiceSchema.index({ status: 1 });

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
