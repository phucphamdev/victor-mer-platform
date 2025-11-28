const Inventory = require('../model/Inventory');
const ApiResponse = require('../utils/apiResponse');

// Create inventory
exports.createInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.create(req.body);
    return ApiResponse.created(res, {
      data: inventory,
      message: 'Inventory created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get all inventory
exports.getAllInventory = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, warehouse } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (warehouse) filter.warehouse = warehouse;
    
    const inventory = await Inventory.find(filter)
      .populate('product', 'title img price')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Inventory.countDocuments(filter);
    
    return ApiResponse.successWithPagination(res, {
      data: inventory,
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

// Get low stock items
exports.getLowStockItems = async (req, res, next) => {
  try {
    const inventory = await Inventory.find({ status: 'low-stock' })
      .populate('product', 'title img price')
      .sort({ quantity: 1 });
    
    return ApiResponse.success(res, { data: inventory });
  } catch (error) {
    next(error);
  }
};

// Update inventory
exports.updateInventory = async (req, res, next) => {
  try {
    const { quantity, type, reason } = req.body;
    
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      return ApiResponse.notFound(res, { message: 'Inventory not found' });
    }
    
    const previousQuantity = inventory.quantity;
    inventory.quantity = quantity;
    
    inventory.stockHistory.push({
      type,
      quantity: Math.abs(quantity - previousQuantity),
      previousQuantity,
      newQuantity: quantity,
      reason,
      timestamp: new Date()
    });
    
    if (type === 'restock') {
      inventory.lastRestocked = new Date();
    }
    
    await inventory.save();
    
    return ApiResponse.success(res, {
      data: inventory,
      message: 'Inventory updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Delete inventory
exports.deleteInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) {
      return ApiResponse.notFound(res, { message: 'Inventory not found' });
    }
    
    return ApiResponse.success(res, { message: 'Inventory deleted successfully' });
  } catch (error) {
    next(error);
  }
};
