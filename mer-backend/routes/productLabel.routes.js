const express = require('express');
const router = express.Router();
const ProductLabel = require('../model/ProductLabel');
const ApiResponse = require('../utils/apiResponse');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: ProductLabel
 *   description: Product label management
 */

// Create label
router.post('/add', verifyToken, authorization('admin'), async (req, res, next) => {
  try {
    const label = await ProductLabel.create(req.body);
    return ApiResponse.created(res, { data: label, message: 'Label created successfully' });
  } catch (error) {
    next(error);
  }
});

// Get all labels
router.get('/all', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    
    const labels = await ProductLabel.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ priority: -1 });
    
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
});

router.patch('/:id', verifyToken, authorization('admin'), async (req, res, next) => {
  try {
    const label = await ProductLabel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return ApiResponse.success(res, { data: label, message: 'Label updated' });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', verifyToken, authorization('admin'), async (req, res, next) => {
  try {
    await ProductLabel.findByIdAndDelete(req.params.id);
    return ApiResponse.success(res, { message: 'Label deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
