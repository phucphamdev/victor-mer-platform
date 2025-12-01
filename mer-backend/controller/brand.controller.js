const brandService = require('../services/brand.service');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Create a new brand
 */
exports.addBrand = asyncHandler(async (req, res) => {
  const result = await brandService.createBrand(req.body);
  return ApiResponse.created(res, {
    data: result,
    message: 'Brand created successfully'
  });
});

/**
 * Bulk insert brands (for seeding)
 */
exports.addAllBrand = asyncHandler(async (req, res) => {
  const result = await brandService.addAllBrands(req.body);
  return ApiResponse.success(res, {
    data: result,
    message: 'Brands added successfully'
  });
});

/**
 * Get all brands with pagination, search, and filters
 * Supports: ?page=1&limit=10&search=nike&status=active&sort=name
 */
exports.getAllBrands = asyncHandler(async (req, res) => {
  const { data, pagination } = await brandService.getAllBrands(req.query);
  return ApiResponse.successWithPagination(res, {
    data,
    pagination,
    message: 'Brands retrieved successfully'
  });
});

/**
 * Get active brands only with pagination
 */
exports.getActiveBrands = asyncHandler(async (req, res) => {
  const { data, pagination } = await brandService.getActiveBrands(req.query);
  return ApiResponse.successWithPagination(res, {
    data,
    pagination,
    message: 'Active brands retrieved successfully'
  });
});

/**
 * Get single brand by ID
 */
exports.getSingleBrand = asyncHandler(async (req, res) => {
  const result = await brandService.getSingleBrand(req.params.id);
  return ApiResponse.success(res, {
    data: result,
    message: 'Brand retrieved successfully'
  });
});

/**
 * Update brand by ID
 */
exports.updateBrand = asyncHandler(async (req, res) => {
  const result = await brandService.updateBrand(req.params.id, req.body);
  return ApiResponse.success(res, {
    data: result,
    message: 'Brand updated successfully'
  });
});

/**
 * Delete brand by ID
 */
exports.deleteBrand = asyncHandler(async (req, res) => {
  await brandService.deleteBrand(req.params.id);
  return ApiResponse.success(res, {
    data: null,
    message: 'Brand deleted successfully'
  });
});