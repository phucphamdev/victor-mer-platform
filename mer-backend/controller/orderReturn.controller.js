const OrderReturn = require('../model/OrderReturn');
const ApiResponse = require('../utils/apiResponse');

// Create return request
exports.createReturnRequest = async (req, res, next) => {
  try {
    const returnRequest = await OrderReturn.create(req.body);
    return ApiResponse.created(res, {
      data: returnRequest,
      message: 'Return request created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get all return requests
exports.getAllReturns = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    
    const returns = await OrderReturn.find(filter)
      .populate('order', 'orderNumber total')
      .populate('customer', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await OrderReturn.countDocuments(filter);
    
    return ApiResponse.successWithPagination(res, {
      data: returns,
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

// Get return by number
exports.getReturnByNumber = async (req, res, next) => {
  try {
    const returnRequest = await OrderReturn.findOne({ returnNumber: req.params.returnNumber })
      .populate('order')
      .populate('customer');
    
    if (!returnRequest) {
      return ApiResponse.notFound(res, { message: 'Return request not found' });
    }
    
    return ApiResponse.success(res, { data: returnRequest });
  } catch (error) {
    next(error);
  }
};

// Approve return
exports.approveReturn = async (req, res, next) => {
  try {
    const returnRequest = await OrderReturn.findById(req.params.id);
    if (!returnRequest) {
      return ApiResponse.notFound(res, { message: 'Return request not found' });
    }
    
    returnRequest.status = 'approved';
    returnRequest.approvedDate = new Date();
    await returnRequest.save();
    
    return ApiResponse.success(res, {
      data: returnRequest,
      message: 'Return request approved'
    });
  } catch (error) {
    next(error);
  }
};

// Update return status
exports.updateReturnStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    
    const returnRequest = await OrderReturn.findById(req.params.id);
    if (!returnRequest) {
      return ApiResponse.notFound(res, { message: 'Return request not found' });
    }
    
    returnRequest.status = status;
    if (adminNotes) returnRequest.adminNotes = adminNotes;
    
    if (status === 'refunded' || status === 'exchanged') {
      returnRequest.completedDate = new Date();
    }
    
    await returnRequest.save();
    
    return ApiResponse.success(res, {
      data: returnRequest,
      message: 'Return status updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Delete return
exports.deleteReturn = async (req, res, next) => {
  try {
    const returnRequest = await OrderReturn.findByIdAndDelete(req.params.id);
    if (!returnRequest) {
      return ApiResponse.notFound(res, { message: 'Return request not found' });
    }
    
    return ApiResponse.success(res, { message: 'Return request deleted successfully' });
  } catch (error) {
    next(error);
  }
};
