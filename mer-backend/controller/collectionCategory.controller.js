const CollectionCategory = require('../model/CollectionCategory');
const ApiResponse = require('../utils/apiResponse');

// Create collection category
exports.createCollectionCategory = async (req, res, next) => {
  try {
    if (!req.body.name) {
      return ApiResponse.badRequest(res, { message: 'Category name is required' });
    }

    // Auto-generate slug if not provided
    if (!req.body.slug && req.body.name) {
      req.body.slug = req.body.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    const category = await CollectionCategory.create(req.body);
    return ApiResponse.created(res, {
      data: category,
      message: 'Collection category created successfully'
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return ApiResponse.badRequest(res, { 
        message: `A category with this ${field} already exists` 
      });
    }
    next(error);
  }
};

// Get all collection categories
exports.getAllCollectionCategories = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    
    const categories = await CollectionCategory.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ priority: -1, createdAt: -1 });
    
    const total = await CollectionCategory.countDocuments(filter);
    
    return ApiResponse.successWithPagination(res, {
      data: categories,
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

// Get collection category by ID
exports.getCollectionCategoryById = async (req, res, next) => {
  try {
    const category = await CollectionCategory.findById(req.params.id);
    
    if (!category) {
      return ApiResponse.notFound(res, { message: 'Collection category not found' });
    }
    
    return ApiResponse.success(res, { data: category });
  } catch (error) {
    next(error);
  }
};

// Update collection category
exports.updateCollectionCategory = async (req, res, next) => {
  try {
    if (req.body.name && !req.body.slug) {
      req.body.slug = req.body.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    const category = await CollectionCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return ApiResponse.notFound(res, { message: 'Collection category not found' });
    }
    
    return ApiResponse.success(res, {
      data: category,
      message: 'Collection category updated successfully'
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return ApiResponse.badRequest(res, { 
        message: `A category with this ${field} already exists` 
      });
    }
    next(error);
  }
};

// Delete collection category
exports.deleteCollectionCategory = async (req, res, next) => {
  try {
    const category = await CollectionCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return ApiResponse.notFound(res, { message: 'Collection category not found' });
    }
    
    return ApiResponse.success(res, { message: 'Collection category deleted successfully' });
  } catch (error) {
    next(error);
  }
};
