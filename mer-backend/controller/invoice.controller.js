const Invoice = require('../model/Invoice');
const ApiResponse = require('../utils/apiResponse');

// Create invoice
exports.createInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.create(req.body);
    return ApiResponse.created(res, {
      data: invoice,
      message: 'Invoice created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get all invoices
exports.getAllInvoices = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, paymentStatus } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    
    const invoices = await Invoice.find(filter)
      .populate('order', 'orderNumber')
      .populate('customer', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Invoice.countDocuments(filter);
    
    return ApiResponse.successWithPagination(res, {
      data: invoices,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        currentPage: parseInt(page),
        previousPage: page > 1 ? parseInt(page) - 1 : null,
        nextPage: page * limit < total ? parseInt(page) + 1 : null
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get invoice by number
exports.getInvoiceByNumber = async (req, res, next) => {
  try {
    const invoice = await Invoice.findOne({ invoiceNumber: req.params.invoiceNumber })
      .populate('order')
      .populate('customer');
    
    if (!invoice) {
      return ApiResponse.notFound(res, { message: 'Invoice not found' });
    }
    
    return ApiResponse.success(res, { data: invoice });
  } catch (error) {
    next(error);
  }
};

// Update invoice
exports.updateInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!invoice) {
      return ApiResponse.notFound(res, { message: 'Invoice not found' });
    }
    
    return ApiResponse.success(res, {
      data: invoice,
      message: 'Invoice updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Mark invoice as paid
exports.markAsPaid = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return ApiResponse.notFound(res, { message: 'Invoice not found' });
    }
    
    invoice.status = 'paid';
    invoice.paymentStatus = 'paid';
    invoice.paidAmount = invoice.total;
    invoice.paidDate = new Date();
    await invoice.save();
    
    return ApiResponse.success(res, {
      data: invoice,
      message: 'Invoice marked as paid'
    });
  } catch (error) {
    next(error);
  }
};

// Delete invoice
exports.deleteInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return ApiResponse.notFound(res, { message: 'Invoice not found' });
    }
    
    return ApiResponse.success(res, { message: 'Invoice deleted successfully' });
  } catch (error) {
    next(error);
  }
};
