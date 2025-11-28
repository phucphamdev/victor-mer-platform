const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Page title is required'],
    trim: true,
    maxLength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Page content is required']
  },
  excerpt: {
    type: String,
    maxLength: [300, 'Excerpt cannot exceed 300 characters']
  },
  featuredImage: String,
  template: {
    type: String,
    enum: ['default', 'full-width', 'sidebar-left', 'sidebar-right', 'landing'],
    default: 'default'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'private'],
    default: 'draft'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  publishedAt: Date,
  viewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  seo: {
    metaTitle: {
      type: String,
      maxLength: [60, 'Meta title should not exceed 60 characters']
    },
    metaDescription: {
      type: String,
      maxLength: [160, 'Meta description should not exceed 160 characters']
    },
    metaKeywords: [String],
    ogTitle: String,
    ogDescription: String,
    ogImage: String,
    ogType: {
      type: String,
      default: 'website'
    },
    canonicalUrl: String,
    structuredData: Object,
    robots: {
      index: {
        type: Boolean,
        default: true
      },
      follow: {
        type: Boolean,
        default: true
      }
    },
    focusKeyword: String,
    readingTime: Number
  },
  customCSS: String,
  customJS: String
}, {
  timestamps: true
});

// Calculate reading time
pageSchema.pre('save', function(next) {
  if (this.content) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.seo.readingTime = Math.ceil(wordCount / wordsPerMinute);
  }
  next();
});

// Index
pageSchema.index({ slug: 1 });
pageSchema.index({ status: 1 });
pageSchema.index({ title: 'text', content: 'text' });

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
