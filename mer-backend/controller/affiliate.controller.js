const Affiliate = require('../model/Affiliate');
const AffiliateCommission = require('../model/AffiliateCommission');
const AffiliateClick = require('../model/AffiliateClick');
const ApiResponse = require('../utils/apiResponse');

// Register affiliate
exports.registerAffiliate = async (req, res, next) => {
  try {
    const { user } = req.body;
    
    // Check if user already has affiliate account
    const existingAffiliate = await Affiliate.findOne({ user });
    if (existingAffiliate) {
      return ApiResponse.error(res, {
        message: 'User already has an affiliate account',
        statusCode: 400
      });
    }
    
    const affiliate = await Affiliate.create(req.body);
    return ApiResponse.created(res, {
      data: affiliate,
      message: 'Affiliate registration successful. Pending approval.'
    });
  } catch (error) {
    next(error);
  }
};

// Get all affiliates
exports.getAllAffiliates = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    
    const affiliates = await Affiliate.find(filter)
      .populate('user', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Affiliate.countDocuments(filter);
    
    return ApiResponse.successWithPagination(res, {
      data: affiliates,
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

// Get affiliate by code
exports.getAffiliateByCode = async (req, res, next) => {
  try {
    const affiliate = await Affiliate.findOne({ affiliateCode: req.params.code })
      .populate('user', 'name email');
    
    if (!affiliate) {
      return ApiResponse.notFound(res, { message: 'Affiliate not found' });
    }
    
    return ApiResponse.success(res, { data: affiliate });
  } catch (error) {
    next(error);
  }
};

// Get affiliate by ID
exports.getAffiliateById = async (req, res, next) => {
  try {
    const affiliate = await Affiliate.findById(req.params.id)
      .populate('user', 'name email');
    
    if (!affiliate) {
      return ApiResponse.notFound(res, { message: 'Affiliate not found' });
    }
    
    return ApiResponse.success(res, { data: affiliate });
  } catch (error) {
    next(error);
  }
};

// Track affiliate click
exports.trackClick = async (req, res, next) => {
  try {
    const { affiliateCode } = req.params;
    const { ipAddress, userAgent, referrer, landingPage } = req.body;
    
    const affiliate = await Affiliate.findOne({ affiliateCode });
    if (!affiliate) {
      return ApiResponse.notFound(res, { message: 'Invalid affiliate code' });
    }
    
    // Create click record
    await AffiliateClick.create({
      affiliate: affiliate._id,
      affiliateCode,
      ipAddress,
      userAgent,
      referrer,
      landingPage
    });
    
    // Update total clicks
    affiliate.totalClicks += 1;
    await affiliate.save();
    
    return ApiResponse.success(res, { message: 'Click tracked successfully' });
  } catch (error) {
    next(error);
  }
};

// Get affiliate statistics
exports.getAffiliateStats = async (req, res, next) => {
  try {
    const affiliate = await Affiliate.findById(req.params.id);
    if (!affiliate) {
      return ApiResponse.notFound(res, { message: 'Affiliate not found' });
    }
    
    const commissions = await AffiliateCommission.find({ affiliate: affiliate._id });
    const clicks = await AffiliateClick.find({ affiliate: affiliate._id });
    
    const stats = {
      totalClicks: affiliate.totalClicks,
      totalOrders: affiliate.totalOrders,
      totalRevenue: affiliate.totalRevenue,
      totalCommission: affiliate.totalCommission,
      paidCommission: affiliate.paidCommission,
      pendingCommission: affiliate.pendingCommission,
      conversionRate: affiliate.totalClicks > 0 
        ? ((affiliate.totalOrders / affiliate.totalClicks) * 100).toFixed(2) 
        : 0,
      recentCommissions: commissions.slice(0, 10),
      recentClicks: clicks.slice(0, 10)
    };
    
    return ApiResponse.success(res, { data: stats });
  } catch (error) {
    next(error);
  }
};

// Approve affiliate
exports.approveAffiliate = async (req, res, next) => {
  try {
    const affiliate = await Affiliate.findById(req.params.id);
    if (!affiliate) {
      return ApiResponse.notFound(res, { message: 'Affiliate not found' });
    }
    
    affiliate.status = 'active';
    affiliate.approvedAt = new Date();
    await affiliate.save();
    
    return ApiResponse.success(res, {
      data: affiliate,
      message: 'Affiliate approved successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Update affiliate
exports.updateAffiliate = async (req, res, next) => {
  try {
    const affiliate = await Affiliate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!affiliate) {
      return ApiResponse.notFound(res, { message: 'Affiliate not found' });
    }
    
    return ApiResponse.success(res, {
      data: affiliate,
      message: 'Affiliate updated successfully'
    });
  } catch (error) {
    next(error);
  }
};
