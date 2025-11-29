const Collection = require('../model/Collection');
const ApiResponse = require('../utils/apiResponse');

// Create collection
exports.createCollection = async (req, res, next) => {
  try {
    const collection = await Collection.create(req.body);
    return ApiResponse.created(res, {
      data: collection,
      message: 'Collection created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get all collections
exports.getAllCollections = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, type } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    
    const collections = await Collection.find(filter)
      .populate('products', 'title img price')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ priority: -1, createdAt: -1 });
    
    const total = await Collection.countDocuments(filter);
    
    return ApiResponse.successWithPagination(res, {
      data: collections,
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

// Get collection by slug
exports.getCollectionBySlug = async (req, res, next) => {
  try {
    const collection = await Collection.findOne({ slug: req.params.slug })
      .populate('products');
    
    if (!collection) {
      return ApiResponse.notFound(res, { message: 'Collection not found' });
    }
    
    return ApiResponse.success(res, { data: collection });
  } catch (error) {
    next(error);
  }
};

// Get collection by ID
exports.getCollectionById = async (req, res, next) => {
  try {
    const collection = await Collection.findById(req.params.id)
      .populate('products');
    
    if (!collection) {
      return ApiResponse.notFound(res, { message: 'Collection not found' });
    }
    
    return ApiResponse.success(res, { data: collection });
  } catch (error) {
    next(error);
  }
};

// Update collection
exports.updateCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!collection) {
      return ApiResponse.notFound(res, { message: 'Collection not found' });
    }
    
    return ApiResponse.success(res, {
      data: collection,
      message: 'Collection updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Delete collection
exports.deleteCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    if (!collection) {
      return ApiResponse.notFound(res, { message: 'Collection not found' });
    }
    
    return ApiResponse.success(res, { message: 'Collection deleted successfully' });
  } catch (error) {
    next(error);
  }
};
