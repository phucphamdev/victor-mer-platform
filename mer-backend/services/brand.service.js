const BaseService = require('./base.service');
const Brand = require('../model/Brand');

class BrandService extends BaseService {
  constructor() {
    super(Brand);
  }

  /**
   * Get all brands with pagination, search, and filters
   */
  async getAllBrands(queryString) {
    return await this.getAll(queryString, 'products');
  }

  /**
   * Get active brands only
   */
  async getActiveBrands(queryString) {
    const modifiedQuery = { ...queryString, status: 'active' };
    return await this.getAll(modifiedQuery, 'products');
  }

  /**
   * Get single brand by ID
   */
  async getSingleBrand(id) {
    return await this.getById(id, 'products');
  }

  /**
   * Create new brand
   */
  async createBrand(data) {
    return await this.create(data);
  }

  /**
   * Update brand
   */
  async updateBrand(id, data) {
    return await this.update(id, data);
  }

  /**
   * Delete brand
   */
  async deleteBrand(id) {
    return await this.delete(id);
  }

  /**
   * Bulk insert brands (for seeding)
   */
  async addAllBrands(data) {
    await Brand.deleteMany();
    const brands = await Brand.insertMany(data);
    return brands;
  }
}

module.exports = new BrandService();