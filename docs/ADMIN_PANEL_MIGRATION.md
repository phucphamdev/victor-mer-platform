# Admin Panel Migration - Victor Mer Platform

## Tổng quan

Tài liệu này mô tả quá trình migration admin panel từ Material Tailwind sang Shadcn UI với Next.js 16.

## Vị trí

- **Admin Panel Cũ:** `mer-admin-panel/`
- **Admin Panel Mới:** `mer-admin-panel-new/`

## So sánh Tech Stack

| Feature | Admin Panel Cũ | Admin Panel Mới |
|---------|---------------|-----------------|
| Framework | Next.js 13.4.4 | Next.js 16 |
| React | 18.2.0 | 19.0 |
| UI Library | Material Tailwind | Shadcn UI (Radix) |
| State Management | Redux Toolkit | Zustand |
| Forms | React Hook Form + Yup | React Hook Form + Zod |
| Styling | Tailwind CSS 3 | Tailwind CSS 4 |
| TypeScript | Partial | Full |
| Authentication | Custom JWT | Custom JWT |

## Lợi ích Migration

### 1. Performance
- **Faster:** Next.js 16 + React 19 với App Router
- **Smaller Bundle:** Shadcn UI components are tree-shakeable
- **Better Caching:** Improved caching strategies

### 2. Developer Experience
- **Better Type Safety:** Full TypeScript với Zod validation
- **Cleaner Code:** Feature-based structure
- **Modern Stack:** Latest technologies
- **Better Documentation:** Comprehensive guides

### 3. Maintainability
- **Easier to Extend:** Feature-based organization
- **Better Testing:** Easier to test components
- **Consistent Patterns:** Standardized code patterns

### 4. UI/UX
- **Modern Design:** Shadcn UI components
- **Accessible:** Built on Radix UI (WCAG compliant)
- **Customizable:** Easy to customize components
- **Responsive:** Mobile-first design

## Cấu trúc API Integration

### Centralized API Client

```
src/lib/api/
├── client.ts      # Base API client
├── auth.ts        # Authentication endpoints
├── products.ts    # Products management
├── orders.ts      # Orders management
├── users.ts       # Users management
└── index.ts       # Central export
```

### Type-Safe API Calls

```typescript
// Old way (mer-admin-panel)
const response = await fetch('/api/product/all');
const data = await response.json();

// New way (mer-admin-panel-new)
const products = await productsApi.getAll({ page: 1, limit: 10 }, token);
// TypeScript knows the exact shape of products
```

## Migration Strategy

### Option 1: Phased Migration (Khuyến nghị)

**Giai đoạn 1: Setup & Core Features (1-2 tuần)**
- Setup admin panel mới
- Migrate authentication
- Migrate dashboard
- Migrate products management

**Giai đoạn 2: Additional Features (2-3 tuần)**
- Migrate orders management
- Migrate categories & brands
- Migrate collections
- Migrate coupons

**Giai đoạn 3: Advanced Features (1-2 tuần)**
- Migrate inventory
- Migrate shipments
- Migrate flash sales
- Migrate affiliates

**Giai đoạn 4: Testing & Deployment (1 tuần)**
- Comprehensive testing
- Bug fixes
- Performance optimization
- Production deployment

**Tổng thời gian:** 5-8 tuần

### Option 2: Big Bang Migration

Migrate tất cả cùng lúc trong 2-3 tuần. **Không khuyến nghị** vì rủi ro cao.

## Implementation Status

### ✅ Hoàn thành

1. **Project Setup**
   - Clone next-shadcn-dashboard-starter
   - Remove git history
   - Install dependencies
   - Configure environment

2. **API Integration Layer**
   - Base API client
   - Authentication API
   - Products API
   - Orders API
   - Users API

3. **Documentation**
   - MIGRATION_GUIDE.md
   - README.md
   - IMPLEMENTATION_PLAN.md
   - Updated docs/

### 🔄 Đang thực hiện

- Authentication pages
- Dashboard layout
- Products management pages

### 📋 Chưa bắt đầu

- Orders management
- Categories & Brands
- Collections
- Coupons
- Reviews
- Inventory
- Shipments
- Flash Sales
- Affiliates
- Settings

## Tài liệu

### Trong mer-admin-panel-new/

1. **README.md** - Quick start guide
2. **MIGRATION_GUIDE.md** - Complete migration guide
3. **IMPLEMENTATION_PLAN.md** - Detailed implementation plan

### Trong docs/

1. **API_DOCUMENTATION.md** - Backend API reference
2. **FEATURES.md** - Platform features
3. **TESTING.md** - Testing guide
4. **CHANGELOG.md** - Change history

## API Endpoints Integration

### Authentication
- ✅ `POST /admin/login` - Login
- ✅ `POST /admin/register` - Register
- ✅ `POST /admin/refresh-token` - Refresh token
- ✅ `POST /admin/logout` - Logout
- ✅ `PATCH /admin/password` - Change password

### Products
- ✅ `GET /product` - Get all products
- ✅ `GET /product/:id` - Get single product
- ✅ `POST /product` - Create product
- ✅ `PATCH /product/:id` - Update product
- ✅ `DELETE /product/:id` - Delete product
- ✅ `GET /product/stock-out` - Get stock out products

### Orders
- ✅ `GET /order` - Get all orders
- ✅ `GET /order/:id` - Get single order
- ✅ `PATCH /order/:id` - Update order status

### Users
- ✅ `GET /user/:id` - Get user
- ✅ `PATCH /user/:id` - Update user

## Testing Strategy

### 1. Unit Tests
- API client functions
- Utility functions
- Custom hooks

### 2. Integration Tests
- API integration
- Form submissions
- Data fetching

### 3. E2E Tests
- Login flow
- Product CRUD
- Order management

### 4. Manual Testing
- UI/UX testing
- Cross-browser testing
- Mobile responsiveness

## Deployment Plan

### Staging Environment

1. Deploy admin panel mới to staging
2. Test all features
3. Fix bugs
4. Performance testing

### Production Deployment

1. Backup current admin panel
2. Deploy new admin panel
3. Monitor for issues
4. Rollback if needed

### Rollback Plan

Keep old admin panel running in parallel:
- Old: `admin.victormer.com`
- New: `admin-new.victormer.com`

After 1-2 weeks of stable operation, switch domains.

## Success Metrics

### Performance
- [ ] Page load time < 2s
- [ ] API response time < 500ms
- [ ] Lighthouse score > 90

### Functionality
- [ ] All features working
- [ ] No critical bugs
- [ ] Mobile responsive
- [ ] Cross-browser compatible

### User Experience
- [ ] Intuitive interface
- [ ] Fast navigation
- [ ] Clear error messages
- [ ] Helpful documentation

## Timeline

### Week 1-2: Setup & Core Features
- ✅ Project setup
- ✅ API integration
- ✅ Documentation
- 🔄 Authentication pages
- 🔄 Dashboard layout

### Week 3-4: Products & Orders
- Products list page
- Product form
- Orders list page
- Order details page

### Week 5-6: Additional Features
- Categories & Brands
- Collections
- Coupons
- Reviews

### Week 7-8: Advanced Features & Testing
- Inventory
- Shipments
- Flash Sales
- Affiliates
- Comprehensive testing

### Week 9: Deployment
- Staging deployment
- Bug fixes
- Production deployment
- Monitoring

## Risks & Mitigation

### Risk 1: Breaking Changes
**Mitigation:** Keep old admin panel running in parallel

### Risk 2: Data Loss
**Mitigation:** Comprehensive testing before deployment

### Risk 3: User Confusion
**Mitigation:** Provide training and documentation

### Risk 4: Performance Issues
**Mitigation:** Performance testing and optimization

## Next Steps

1. **Immediate:**
   - Complete authentication pages
   - Complete dashboard layout
   - Start products management

2. **This Week:**
   - Complete products CRUD
   - Start orders management

3. **Next Week:**
   - Complete orders management
   - Start additional features

## Support & Resources

### Documentation
- `mer-admin-panel-new/README.md`
- `mer-admin-panel-new/MIGRATION_GUIDE.md`
- `mer-admin-panel-new/IMPLEMENTATION_PLAN.md`

### API Reference
- `http://localhost:7000/api-docs` - Swagger documentation
- `docs/API_DOCUMENTATION.md` - API documentation

### Community
- Next.js: https://nextjs.org/docs
- Shadcn UI: https://ui.shadcn.com
- Zustand: https://zustand-demo.pmnd.rs

## Conclusion

Migration sang admin panel mới với Shadcn UI sẽ mang lại nhiều lợi ích về performance, developer experience và maintainability. Với kế hoạch chi tiết và phương pháp phased migration, chúng ta có thể đảm bảo quá trình migration diễn ra suôn sẻ và an toàn.
