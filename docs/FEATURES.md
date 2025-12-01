# Features - Victor Mer E-commerce Platform

## 🛍️ Core E-commerce Features

### Product Management
- ✅ Product CRUD operations
- ✅ Product variants and options
- ✅ Product images and galleries
- ✅ Product categories and subcategories
- ✅ Product tags and labels
- ✅ Product reviews and ratings
- ✅ Product search and filtering
- ✅ SEO optimization per product

### Collections & Organization
- ✅ **Product Collections** - Group products by themes
  - Full CRUD operations (Create, Read, Update, Delete)
  - Icon/emoji support for visual representation
  - Collection types: seasonal, trending, new-arrival, best-seller, custom
  - Auto-generated slugs from names
  - Priority sorting
  - Status management (active, inactive, scheduled)
  - Product count tracking
  - Search and filter functionality
  - Pagination support
  - Grid and Table view modes
  - Modal popup for add/edit operations
  - Many-to-many relationship with categories
- ✅ **Collection Categories** - Organize collections into categories
  - Full CRUD operations
  - Icon/emoji support
  - Priority sorting
  - Status management (active, inactive)
  - Collection count tracking per category
  - Grid and Table view modes
  - Modal popup for add/edit operations
  - Many-to-many relationship with collections
- ✅ **Product Tags** - Flexible product tagging system
- ✅ **Product Labels** - Visual badges (New, Sale, Hot, etc.)
- ✅ **Brand Management** - Organize products by brands

### Promotions & Sales
- ✅ **Flash Sales** - Time-limited promotional campaigns
  - Countdown timers
  - Limited quantity tracking
  - Automatic price updates
  - Sale performance analytics
- ✅ **Coupons & Discounts**
  - Percentage discounts
  - Fixed amount discounts
  - Minimum order requirements
  - Usage limits
  - Expiration dates

### Order Management
- ✅ **Order Processing**
  - Order creation and tracking
  - Order status management
  - Order history
  - Order notifications
- ✅ **Order Returns**
  - Return request system
  - Return approval workflow
  - Refund processing
  - Exchange handling
  - Return tracking

### Inventory Management
- ✅ **Stock Tracking**
  - Real-time inventory updates
  - Low stock alerts
  - Multi-warehouse support
  - Stock history tracking
  - Inventory adjustments
- ✅ **SKU Management**
  - Unique SKU per product variant
  - Warehouse location tracking

### Shipping & Logistics
- ✅ **Shipment Management**
  - Multiple carrier support (GHN, GHTK, Viettel Post, VNPost, J&T, Ninja Van)
  - Tracking number generation
  - Real-time shipment tracking
  - Delivery status updates
  - Estimated delivery dates
  - Shipment history

### Financial Management
- ✅ **Invoice System**
  - Automatic invoice generation
  - Invoice numbering system
  - Payment tracking
  - Tax calculations
  - Billing address management
  - Invoice PDF generation support

### Affiliate Marketing
- ✅ **Affiliate Program**
  - Affiliate registration and approval
  - Unique affiliate codes
  - Click tracking
  - Commission calculation
  - Performance statistics
  - Payment management
  - Conversion tracking

## 👥 User Management

### Customer Features
- ✅ User registration and authentication
- ✅ User profiles
- ✅ Order history
- ✅ Wishlist
- ✅ Address book
- ✅ Review and rating system

### Admin Features
- ✅ Admin authentication
- ✅ Role-based access control
- ✅ Admin dashboard
- ✅ Staff management
- ✅ Activity logging

## 🎨 Frontend Features

### Customer Portal
- ✅ Responsive design
- ✅ Product browsing and search
- ✅ Shopping cart
- ✅ Checkout process
- ✅ User account management
- ✅ Order tracking

### Admin Panel
- ✅ Modern dashboard interface
- ✅ Product management interface (List, Grid, Add/Edit)
- ✅ Order management interface
- ✅ Customer management
- ✅ Analytics and reports
- ✅ Settings and configuration
- ✅ **Complete Admin Pages:**
  - Dashboard
  - Products (List, Grid, Add/Edit)
  - Categories
  - Orders
  - Brands
  - Reviews
  - Coupons
  - Collections
  - Flash Sales
  - Product Tags
  - Product Labels
  - Inventory
  - Shipments
  - Order Returns
  - Invoices
  - Affiliates
  - Profile
  - Staff Management

## 🔧 Technical Features

### API & Integration
- ✅ RESTful API architecture
- ✅ JWT authentication
- ✅ Swagger API documentation
- ✅ CORS support
- ✅ Rate limiting
- ✅ Error handling

### Database
- ✅ MongoDB with Mongoose ODM
- ✅ Data validation
- ✅ Indexing for performance
- ✅ Relationship management
- ✅ Transaction support

### Security
- ✅ Password hashing (bcrypt)
- ✅ JWT token authentication
- ✅ Role-based authorization
- ✅ Input validation
- ✅ XSS protection
- ✅ CSRF protection

### Performance
- ✅ Response compression
- ✅ Database query optimization
- ✅ Pagination support
- ✅ Caching strategies
- ✅ Image optimization

### DevOps
- ✅ Docker containerization
- ✅ Docker Compose orchestration
- ✅ Environment configuration
- ✅ Logging system
- ✅ Health check endpoints

## 📱 Platform Support

- ✅ Web (Desktop & Mobile)
- ✅ Responsive design
- ✅ Cross-browser compatibility

## 🌐 Localization

- ✅ Multi-language support ready
- ✅ Currency formatting (VND)
- ✅ Date/time localization

## 📊 Analytics & Reporting

- ✅ Sales analytics
- ✅ Product performance
- ✅ Customer insights
- ✅ Affiliate performance
- ✅ Inventory reports

## 🎨 Admin Panel

### Current Admin Panel (mer-admin-panel)
- Next.js 13.4.4
- Material Tailwind UI
- Redux Toolkit
- Full CRUD for all features

### New Admin Panel (mer-admin-panel-new) ✨
- ✅ **Next.js 16 + React 19** - Latest stack
- ✅ **Shadcn UI** - Modern, accessible components
- ✅ **Zustand** - Lightweight state management
- ✅ **TypeScript** - Full type safety
- ✅ **API Integration** - Centralized API client
- ✅ **Feature-based Structure** - Better organization
- ✅ **Migration Guide** - Complete documentation

**API Integration:**
- Centralized API client (`src/lib/api/`)
- Type-safe API calls
- Authentication handling
- Error handling
- Token management

**See:** `mer-admin-panel-new/MIGRATION_GUIDE.md`

## 🛠️ Development Tools

### 1. Native Development (`run-native.sh`) ⚡
**Fastest performance - No Docker overhead**

```bash
./run-native.sh
```

**Features:**
- Runs directly on your laptop
- Auto-install dependencies
- Auto-start MongoDB
- Nodemon + Next.js Fast Refresh
- Instant hot reload
- Lowest resource usage

**Best for:**
- Daily development
- Quick testing
- Debugging
- Laptop with limited resources

### 2. Docker Local (`run-docker-local.sh`) 🐳
**Lightweight testing with easy cleanup**

```bash
./run-docker-local.sh
```

**Features:**
- Isolated environment
- Easy cleanup (docker-compose down)
- Consistent across machines
- No local dependencies needed
- Quick start/stop

**Best for:**
- Testing before deployment
- Clean environment testing
- Team collaboration
- CI/CD testing

### 3. Docker Production (`run-docker-production.sh`) 🌐
**Full production setup with SSL**

```bash
sudo ./run-docker-production.sh
```

**Features:**
- Nginx reverse proxy
- Let's Encrypt SSL (auto-renewal)
- UFW firewall configuration
- Automatic backups (daily)
- Production optimizations
- Health monitoring

**Best for:**
- VPS deployment
- Production environment
- Public-facing websites
- SSL/HTTPS required

### 4. Unified Dev Manager (`dev.sh`)
**Interactive menu for all operations**

```bash
./dev.sh
```

**Features:**
- Interactive menu (19 options)
- Start/stop services individually
- Live log viewing
- MongoDB management
- Health checks & testing
- Clean install utilities
- Service status monitoring

**Best for:**
- Managing multiple services
- Debugging specific services
- Log monitoring
- Database operations

## 🔄 Upcoming Features

### Planned Enhancements
- [ ] Real-time notifications (WebSocket)
- [ ] Advanced search with Elasticsearch
- [ ] Product recommendations
- [ ] Loyalty program
- [ ] Gift cards
- [ ] Subscription products
- [ ] Multi-vendor marketplace
- [ ] Live chat support
- [ ] Social media integration
- [ ] Email marketing integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app (iOS & Android)

### Performance Improvements
- [ ] Redis caching
- [ ] CDN integration
- [ ] Image lazy loading
- [ ] Code splitting
- [ ] Service workers
- [ ] Progressive Web App (PWA)

## 🎯 Feature Highlights

### Recently Added (Latest Update)
- ✅ **Collection Categories & Many-to-Many Relationship** (2024-11-29)
  - Collection Categories management system
  - Many-to-many relationship between Collections and Categories
  - Grid/Table view toggle for both Collections and Categories
  - Unified modal popup design for add/edit operations
  - Category selector with checkboxes in Collection forms
  - Auto-calculated collection count per category
  - Sidebar menu auto-active for nested routes
  - Backend API with populate support for categories
  - Sample seed data for testing

- ✅ **Admin Panel UI Complete** (2024-11-29)
  - All 9 missing admin pages created
  - Empty state component for features in development
  - Fixed all 404 navigation errors
  - Consistent breadcrumb navigation
  - Professional "Coming Soon" messaging
  
- ✅ **9 Backend Features** (2024-11-29)
  - Collections management
  - Flash sales system
  - Product tags
  - Product labels
  - Inventory tracking
  - Shipment management
  - Order returns
  - Invoice system
  - Affiliate program

### Key Differentiators
- Comprehensive inventory management
- Advanced shipping integration
- Built-in affiliate marketing
- Flexible product organization
- Complete order lifecycle management
- Professional invoice system
