const Page = require('../model/Page');
const ApiResponse = require('../utils/apiResponse');

// Create page
exports.createPage = async (req, res, next) => {
  try {
    const page = await Page.create(req.body);
    return ApiResponse.created(res, {
      data: page,
      message: 'Page created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get all pages
exports.getAllPages = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const pages = await Page.find(filter)
      .populate('author', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Page.countDocuments(filter);
    
    return ApiResponse.successWithPagination(res, {
      data: pages,
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

// Get page by slug
exports.getPageBySlug = async (req, res, next) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug })
      .populate('author', 'name email');
    
    if (!page) {
      return ApiResponse.notFound(res, { message: 'Page not found' });
    }
    
    // Increment view count
    page.viewCount += 1;
    await page.save();
    
    return ApiResponse.success(res, { data: page });
  } catch (error) {
    next(error);
  }
};

// Update page
exports.updatePage = async (req, res, next) => {
  try {
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!page) {
      return ApiResponse.notFound(res, { message: 'Page not found' });
    }
    
    return ApiResponse.success(res, {
      data: page,
      message: 'Page updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Publish page
exports.publishPage = async (req, res, next) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return ApiResponse.notFound(res, { message: 'Page not found' });
    }
    
    page.status = 'published';
    page.publishedAt = new Date();
    await page.save();
    
    return ApiResponse.success(res, {
      data: page,
      message: 'Page published successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Delete page
exports.deletePage = async (req, res, next) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      return ApiResponse.notFound(res, { message: 'Page not found' });
    }
    
    return ApiResponse.success(res, { message: 'Page deleted successfully' });
  } catch (error) {
    next(error);
  }
};
