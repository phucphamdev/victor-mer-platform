const ApiError = require('../errors/api-error');
const ApiFeatures = require('../utils/apiFeatures');

/**
 * Base service class with common CRUD operations
 * Provides standardized methods for all services
 */
class BaseService {
  constructor(model) {
    this.model = model;
  }

  /**
   * Get all documents with pagination, search, filter, and sort
   */
  async getAll(queryString, populateOptions = null) {
    const features = new ApiFeatures(this.model.find(), queryString)
      .filter()
      .search()
      .sort()
      .limitFields();

    // Get total count before pagination
    await features.countDocuments();

    // Apply pagination
    features.paginate();

    // Apply population if specified
    let query = features.query;
    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const data = await query;
    const pagination = features.getPaginationMeta();

    return { data, pagination };
  }

  /**
   * Get single document by ID
   */
  async getById(id, populateOptions = null) {
    let query = this.model.findById(id);
    
    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const document = await query;

    if (!document) {
      throw new ApiError(404, `${this.model.modelName} not found`);
    }

    return document;
  }

  /**
   * Create new document
   */
  async create(data) {
    const document = await this.model.create(data);
    return document;
  }

  /**
   * Update document by ID
   */
  async update(id, data) {
    const document = await this.model.findById(id);

    if (!document) {
      throw new ApiError(404, `${this.model.modelName} not found`);
    }

    const updated = await this.model.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    return updated;
  }

  /**
   * Delete document by ID
   */
  async delete(id) {
    const document = await this.model.findById(id);

    if (!document) {
      throw new ApiError(404, `${this.model.modelName} not found`);
    }

    await this.model.findByIdAndDelete(id);
    return document;
  }

  /**
   * Get documents by specific field
   */
  async getByField(field, value, populateOptions = null) {
    let query = this.model.find({ [field]: value });
    
    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const documents = await query;
    return documents;
  }

  /**
   * Count documents with optional filter
   */
  async count(filter = {}) {
    return await this.model.countDocuments(filter);
  }

  /**
   * Check if document exists
   */
  async exists(filter) {
    const document = await this.model.findOne(filter);
    return !!document;
  }
}

module.exports = BaseService;
