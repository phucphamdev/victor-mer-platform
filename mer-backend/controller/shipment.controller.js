const Shipment = require('../model/Shipment');
const ApiResponse = require('../utils/apiResponse');

// Create shipment
exports.createShipment = async (req, res, next) => {
  try {
    const shipment = await Shipment.create(req.body);
    return ApiResponse.created(res, {
      data: shipment,
      message: 'Shipment created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get all shipments
exports.getAllShipments = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, carrier } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (carrier) filter.carrier = carrier;
    
    const shipments = await Shipment.find(filter)
      .populate('order', 'orderNumber total')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Shipment.countDocuments(filter);
    
    return ApiResponse.successWithPagination(res, {
      data: shipments,
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

// Get shipment by tracking number
exports.getShipmentByTracking = async (req, res, next) => {
  try {
    const shipment = await Shipment.findOne({ trackingNumber: req.params.trackingNumber })
      .populate('order');
    
    if (!shipment) {
      return ApiResponse.notFound(res, { message: 'Shipment not found' });
    }
    
    return ApiResponse.success(res, { data: shipment });
  } catch (error) {
    next(error);
  }
};

// Get shipment by ID
exports.getShipmentById = async (req, res, next) => {
  try {
    const shipment = await Shipment.findById(req.params.id)
      .populate('order');
    
    if (!shipment) {
      return ApiResponse.notFound(res, { message: 'Shipment not found' });
    }
    
    return ApiResponse.success(res, { data: shipment });
  } catch (error) {
    next(error);
  }
};

// Update shipment status
exports.updateShipmentStatus = async (req, res, next) => {
  try {
    const { status, location, description } = req.body;
    
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return ApiResponse.notFound(res, { message: 'Shipment not found' });
    }
    
    shipment.status = status;
    shipment.trackingHistory.push({
      status,
      location,
      description,
      timestamp: new Date()
    });
    
    if (status === 'delivered') {
      shipment.actualDelivery = new Date();
    }
    
    await shipment.save();
    
    return ApiResponse.success(res, {
      data: shipment,
      message: 'Shipment status updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Delete shipment
exports.deleteShipment = async (req, res, next) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(req.params.id);
    if (!shipment) {
      return ApiResponse.notFound(res, { message: 'Shipment not found' });
    }
    
    return ApiResponse.success(res, { message: 'Shipment deleted successfully' });
  } catch (error) {
    next(error);
  }
};
