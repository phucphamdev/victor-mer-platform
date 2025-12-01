const FlashSale = require('../model/FlashSale');
const ApiResponse = require('../utils/apiResponse');

// Create flash sale
exports.createFlashSale = async (req, res, next) => {
  try {
    const flashSale = await FlashSale.create(req.body);
    return ApiResponse.created(res, {
      data: flashSale,
      message: 'Flash sale created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get all flash sales
exports.getAllFlashSales = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    
    const flashSales = await FlashSale.find(filter)
      .populate('products.product', 'title img')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ priority: -1, startDate: -1 });
    
    const total = await FlashSale.countDocuments(filter);
    
    return ApiResponse.successWithPagination(res, {
      data: flashSales,
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

// Get active flash sales
exports.getActiveFlashSales = async (req, res, next) => {
  try {
    const now = new Date();
    const flashSales = await FlashSale.find({
      status: 'active',
      startDate: { $lte: now },
      endDate: { $gte: now }
    })
      .populate('products.product', 'title img')
      .sort({ priority: -1 });
    
    return ApiResponse.success(res, { data: flashSales });
  } catch (error) {
    next(error);
  }
};

// Get flash sale by slug
exports.getFlashSaleBySlug = async (req, res, next) => {
  try {
    const flashSale = await FlashSale.findOne({ slug: req.params.slug })
      .populate('products.product');
    
    if (!flashSale) {
      return ApiResponse.notFound(res, { message: 'Flash sale not found' });
    }
    
    return ApiResponse.success(res, { data: flashSale });
  } catch (error) {
    next(error);
  }
};

// Update flash sale
exports.updateFlashSale = async (req, res, next) => {
  try {
    const flashSale = await FlashSale.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!flashSale) {
      return ApiResponse.notFound(res, { message: 'Flash sale not found' });
    }
    
    return ApiResponse.success(res, {
      data: flashSale,
      message: 'Flash sale updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Delete flash sale
exports.deleteFlashSale = async (req, res, next) => {
  try {
    const flashSale = await FlashSale.findByIdAndDelete(req.params.id);
    if (!flashSale) {
      return ApiResponse.notFound(res, { message: 'Flash sale not found' });
    }
    
    return ApiResponse.success(res, { message: 'Flash sale deleted successfully' });
  } catch (error) {
    next(error);
  }
};
