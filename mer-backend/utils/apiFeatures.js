/**
 * API Features utility class for handling pagination, search, filtering, and sorting
 * Following Google API Design Guide standards
 */
class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.totalCount = 0;
  }

  /**
   * Pagination with default page size of 10
   * Supports: ?page=1&limit=20
   */
  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;

    this.pagination = {
      page,
      limit,
      skip
    };

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  /**
   * Search functionality
   * Supports: ?search=keyword&searchFields=name,description
   */
  search() {
    if (this.queryString.search) {
      const searchFields = this.queryString.searchFields 
        ? this.queryString.searchFields.split(',')
        : ['name', 'title', 'description'];

      const searchConditions = searchFields.map(field => ({
        [field]: { $regex: this.queryString.search, $options: 'i' }
      }));

      this.query = this.query.find({ $or: searchConditions });
    }
    return this;
  }

  /**
   * Filter by specific fields
   * Supports: ?status=active&category=electronics
   * Excludes: page, limit, sort, search, searchFields
   */
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'limit', 'sort', 'search', 'searchFields', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    // Advanced filtering for gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  /**
   * Sort results
   * Supports: ?sort=name,-createdAt (- for descending)
   */
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  /**
   * Field limiting/projection
   * Supports: ?fields=name,email,status
   */
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  /**
   * Get total count for pagination metadata
   */
  async countDocuments() {
    const countQuery = this.query.model.find(this.query.getFilter());
    this.totalCount = await countQuery.countDocuments();
    return this;
  }

  /**
   * Get pagination metadata following Google API standards
   */
  getPaginationMeta() {
    if (!this.pagination) return null;

    const { page, limit } = this.pagination;
    const totalPages = Math.ceil(this.totalCount / limit);

    return {
      page: page,
      limit: limit,
      total: this.totalCount,
      currentPage: page,
      previousPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null
    };
  }
}

module.exports = ApiFeatures;
