const ProductLabel = require('../model/ProductLabel');
const ApiResponse = require('../utils/apiResponse');

// Create label
exports.createLabel = async (req, res, next) => {
  try {
    const label = await ProductLabel.create(req.body);
    return ApiResponse.created(res, {
      data: label,
      message: 'Product label created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get all labels
exports.getAllLabels = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    
    const labels = await ProductLabel.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ priority: -1, createdAt: -1 });
    
    const total = await ProductLabel.countDocuments(filter);
    
    return ApiResponse.successWithPagination(res, {
      data: labels,
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

// Get label by slug
exports.getLabelBySlug = async (req, res, next) => {
  try {
    const label = await ProductLabel.findOne({ slug: req.params.slug });
    
    if (!label) {
      return ApiResponse.notFound(res, { message: 'Product label not found' });
    }
    
    return ApiResponse.success(res, { data: label });
  } catch (error) {
    next(error);
  }
};

// Update label
exports.updateLabel = async (req, res, next) => {
  try {
    const label = await ProductLabel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!label) {
      return ApiResponse.notFound(res, { message: 'Product label not found' });
    }
    
    return ApiResponse.success(res, {
      data: label,
      message: 'Product label updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Delete label
exports.deleteLabel = async (req, res, next) => {
  try {
    const label = await ProductLabel.findByIdAndDelete(req.params.id);
    if (!label) {
      return ApiResponse.notFound(res, { message: 'Product label not found' });
    }
    
    return ApiResponse.success(res, { message: 'Product label deleted successfully' });
  } catch (error) {
    next(error);
  }
};
