const brandService = require('../services/brand.service');
const ApiResponse = require('../utils/apiResponse');

/**
 * Create a new brand
 */
exports.addBrand = async (req, res, next) => {
  try {
    const result = await brandService.createBrand(req.body);
    return ApiResponse.created(res, {
      data: result,
      message: 'Brand created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Bulk insert brands (for seeding)
 */
exports.addAllBrand = async (req, res, next) => {
  try {
    const result = await brandService.addAllBrands(req.body);
    return ApiResponse.success(res, {
      data: result,
      message: 'Brands added successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all brands with pagination, search, and filters
 * Supports: ?page=1&limit=10&search=nike&status=active&sort=name
 */
exports.getAllBrands = async (req, res, next) => {
  try {
    const { data, pagination } = await brandService.getAllBrands(req.query);
    return ApiResponse.successWithPagination(res, {
      data,
      pagination,
      message: 'Brands retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get active brands only with pagination
 */
exports.getActiveBrands = async (req, res, next) => {
  try {
    const { data, pagination } = await brandService.getActiveBrands(req.query);
    return ApiResponse.successWithPagination(res, {
      data,
      pagination,
      message: 'Active brands retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single brand by ID
 */
exports.getSingleBrand = async (req, res, next) => {
  try {
    const result = await brandService.getSingleBrand(req.params.id);
    return ApiResponse.success(res, {
      data: result,
      message: 'Brand retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update brand by ID
 */
exports.updateBrand = async (req, res, next) => {
  try {
    const result = await brandService.updateBrand(req.params.id, req.body);
    return ApiResponse.success(res, {
      data: result,
      message: 'Brand updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete brand by ID
 */
exports.deleteBrand = async (req, res, next) => {
  try {
    await brandService.deleteBrand(req.params.id);
    return ApiResponse.success(res, {
      data: null,
      message: 'Brand deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};