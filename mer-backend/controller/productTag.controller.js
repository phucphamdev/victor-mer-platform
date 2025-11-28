const ProductTag = require('../model/ProductTag');
const ApiResponse = require('../utils/apiResponse');

// Create tag
exports.createTag = async (req, res, next) => {
  try {
    const tag = await ProductTag.create(req.body);
    return ApiResponse.created(res, {
      data: tag,
      message: 'Product tag created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get all tags
exports.getAllTags = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const tags = await ProductTag.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await ProductTag.countDocuments(filter);
    
    return ApiResponse.successWithPagination(res, {
      data: tags,
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

// Get tag by slug
exports.getTagBySlug = async (req, res, next) => {
  try {
    const tag = await ProductTag.findOne({ slug: req.params.slug });
    if (!tag) {
      return ApiResponse.notFound(res, { message: 'Tag not found' });
    }
    
    return ApiResponse.success(res, { data: tag });
  } catch (error) {
    next(error);
  }
};

// Update tag
exports.updateTag = async (req, res, next) => {
  try {
    const tag = await ProductTag.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!tag) {
      return ApiResponse.notFound(res, { message: 'Tag not found' });
    }
    
    return ApiResponse.success(res, {
      data: tag,
      message: 'Tag updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Delete tag
exports.deleteTag = async (req, res, next) => {
  try {
    const tag = await ProductTag.findByIdAndDelete(req.params.id);
    if (!tag) {
      return ApiResponse.notFound(res, { message: 'Tag not found' });
    }
    
    return ApiResponse.success(res, { message: 'Tag deleted successfully' });
  } catch (error) {
    next(error);
  }
};
