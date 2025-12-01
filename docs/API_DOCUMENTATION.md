# API Documentation - Victor Mer E-commerce Platform

## Base URL
- Development: `http://localhost:7000/api`
- Production: `https://your-domain.com/api`
- Swagger UI: `http://localhost:7000/api-docs`

## Platform URLs
- **Frontend Store**: http://localhost:3500
- **Admin Panel (New)**: http://localhost:3000
- **Admin Panel (Old)**: http://localhost:4000
- **Backend API**: http://localhost:7000
- **API Documentation**: http://localhost:7000/api-docs

## Admin Panel Migration

### New Admin Panel (mer-admin-panel-new)
- **Tech Stack**: Next.js 16, Shadcn UI, TypeScript, Zustand
- **Port**: 3000
- **Features**: Modern UI, Type-safe API integration, Settings page
- **Status**: ✅ Active development

### Old Admin Panel (mer-admin-panel)
- **Tech Stack**: Next.js 13, Material Tailwind, Redux
- **Port**: 4000
- **Status**: 🔄 Being migrated

See [ADMIN_PANEL_MIGRATION.md](./ADMIN_PANEL_MIGRATION.md) for complete migration guide.

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Get Admin Token
```bash
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your_password"
}
```

## API Endpoints Overview

### 1. Collections (Product Collections)
**Base URL:** `/api/collection`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create new collection | Admin |
| GET | `/` | Get all collections | Public |
| GET | `/slug/:slug` | Get collection by slug | Public |
| GET | `/:id` | Get collection by ID | Public |
| PATCH | `/:id` | Update collection | Admin |
| DELETE | `/:id` | Delete collection | Admin |

**Collection Schema:**
- `name` - Collection name (required)
- `slug` - URL slug (auto-generated if not provided)
- `description` - Collection description
- `icon` - Icon/emoji for collection
- `type` - Collection type (seasonal, trending, new-arrival, best-seller, custom)
- `products` - Array of product IDs
- `categories` - Array of collection category IDs (many-to-many relationship)
- `status` - Status (active, inactive, scheduled)
- `priority` - Display priority (number)
- `featured` - Featured flag (boolean)

**Query Parameters (GET /):**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (active, inactive, scheduled)
- `type` - Filter by type (seasonal, trending, new-arrival, best-seller, custom)

### 1.1. Collection Categories
**Base URL:** `/api/collection-category`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create new collection category | Admin |
| GET | `/` | Get all collection categories | Public |
| GET | `/:id` | Get collection category by ID | Public |
| PATCH | `/:id` | Update collection category | Admin |
| DELETE | `/:id` | Delete collection category | Admin |

**Collection Category Schema:**
- `name` - Category name (required)
- `slug` - URL slug (auto-generated if not provided)
- `description` - Category description
- `icon` - Icon/emoji for category
- `status` - Status (active, inactive)
- `priority` - Display priority (number)
- `collectionCount` - Number of collections in this category (auto-calculated)

**Query Parameters (GET /):**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `status` - Filter by status (active, inactive)

**Relationship:**
- One category can have many collections
- One collection can belong to many categories (many-to-many)

### 2. Flash Sales
**Base URL:** `/api/flash-sale`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create flash sale | Admin |
| GET | `/all` | Get all flash sales | Public |
| GET | `/active` | Get active flash sales | Public |
| GET | `/slug/:slug` | Get flash sale by slug | Public |
| PATCH | `/:id` | Update flash sale | Admin |
| DELETE | `/:id` | Delete flash sale | Admin |

### 3. Product Tags
**Base URL:** `/api/product-tag`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create product tag | Admin |
| GET | `/all` | Get all tags | Public |
| GET | `/slug/:slug` | Get tag by slug | Public |
| PATCH | `/:id` | Update tag | Admin |
| DELETE | `/:id` | Delete tag | Admin |

### 4. Product Labels
**Base URL:** `/api/product-label`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create product label | Admin |
| GET | `/all` | Get all labels | Public |
| GET | `/slug/:slug` | Get label by slug | Public |
| PATCH | `/:id` | Update label | Admin |
| DELETE | `/:id` | Delete label | Admin |

### 5. Inventory Management
**Base URL:** `/api/inventory`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create inventory record | Admin |
| GET | `/all` | Get all inventory | Admin |
| GET | `/low-stock` | Get low stock items | Admin |
| GET | `/:id` | Get inventory by ID | Admin |
| PATCH | `/:id` | Update inventory | Admin |
| DELETE | `/:id` | Delete inventory | Admin |

**Update Inventory Body:**
```json
{
  "quantity": 100,
  "type": "restock",
  "reason": "New stock arrival"
}
```

### 6. Shipments
**Base URL:** `/api/shipment`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create shipment | Admin |
| GET | `/all` | Get all shipments | Admin |
| GET | `/track/:trackingNumber` | Track shipment | Public |
| GET | `/:id` | Get shipment by ID | Admin |
| PATCH | `/status/:id` | Update shipment status | Admin |
| DELETE | `/:id` | Delete shipment | Admin |

**Carriers:** ghn, ghtk, viettel-post, vnpost, j&t, ninja-van, other

**Shipment Status:** pending, picked-up, in-transit, out-for-delivery, delivered, failed, returned

### 7. Order Returns
**Base URL:** `/api/order-return`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create return request | User |
| GET | `/all` | Get all returns | Admin |
| GET | `/number/:returnNumber` | Get return by number | User |
| GET | `/:id` | Get return by ID | User |
| PATCH | `/approve/:id` | Approve return | Admin |
| PATCH | `/status/:id` | Update return status | Admin |
| DELETE | `/:id` | Delete return | Admin |

**Return Status:** pending, approved, rejected, processing, refunded, exchanged, cancelled

### 8. Invoices
**Base URL:** `/api/invoice`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create invoice | Admin |
| GET | `/all` | Get all invoices | Admin |
| GET | `/number/:invoiceNumber` | Get invoice by number | User |
| GET | `/:id` | Get invoice by ID | User |
| PATCH | `/mark-paid/:id` | Mark invoice as paid | Admin |
| PATCH | `/:id` | Update invoice | Admin |
| DELETE | `/:id` | Delete invoice | Admin |

**Invoice Status:** draft, sent, paid, overdue, cancelled

**Payment Status:** unpaid, partial, paid, refunded

### 9. Affiliates
**Base URL:** `/api/affiliate`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register affiliate | User |
| GET | `/all` | Get all affiliates | Admin |
| GET | `/code/:code` | Get affiliate by code | Public |
| GET | `/:id` | Get affiliate by ID | User |
| GET | `/stats/:id` | Get affiliate statistics | User |
| POST | `/track/:affiliateCode` | Track affiliate click | Public |
| PATCH | `/approve/:id` | Approve affiliate | Admin |
| PATCH | `/:id` | Update affiliate | Admin |

### 10. Products
**Base URL:** `/api/product`

Standard CRUD operations for product management.

### 11. Categories
**Base URL:** `/api/category`

Standard CRUD operations for category management.

### 12. Orders
**Base URL:** `/api/order`

Standard CRUD operations for order management.

### 13. Brands
**Base URL:** `/api/brand`

Standard CRUD operations for brand management.

### 14. Reviews
**Base URL:** `/api/review`

Standard CRUD operations for review management.

### 15. Coupons
**Base URL:** `/api/coupon`

Standard CRUD operations for coupon management.

### 16. Pages
**Base URL:** `/api/page`

Standard CRUD operations for page management.

### 17. Users
**Base URL:** `/api/user`

User authentication and profile management.

### 18. Admins
**Base URL:** `/api/admin`

Admin authentication and management.

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Success with Pagination
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "currentPage": 1,
    "previousPage": null,
    "nextPage": 2
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Swagger Documentation

Interactive API documentation available at:
```
http://localhost:7000/api-docs
```

## Rate Limiting

API requests are rate-limited to prevent abuse:
- 100 requests per 15 minutes per IP address
- Admin endpoints may have stricter limits

## Notes

- All timestamps are in ISO 8601 format
- All monetary values are in VND (Vietnamese Dong)
- Pagination is available on all list endpoints
- Filtering and search capabilities vary by endpoint
- Case-insensitive role checking is implemented for authorization

## Frontend Integration

### New Admin Panel (next-shadcn-admin-dashboard)

The new admin panel uses a centralized API client for all backend communication.

**API Client Location:** `mer-admin-panel-new/src/lib/api/`

**Available API Modules:**
- `auth.ts` - Authentication endpoints
- `products.ts` - Products management
- `orders.ts` - Orders management
- `users.ts` - Users management
- `client.ts` - Base API client

**Example Usage:**
```typescript
import { authApi, productsApi } from '@/lib/api';

// Login
const result = await authApi.login({ email, password });

// Get products
const products = await productsApi.getAll({ page: 1, limit: 10 }, token);

// Create product
const newProduct = await productsApi.create(productData, token);
```

**Environment Configuration:**
```env
NEXT_PUBLIC_API_URL=http://localhost:7000/api
```

See `mer-admin-panel-new/MIGRATION_GUIDE.md` for complete integration guide.


---

## Migration Guide: Old Admin → New Admin

### Overview

Complete guide for migrating from old admin panel (mer-admin-panel) to new admin panel (mer-admin-panel-new) with Shadcn UI.

### Tech Stack Comparison

**Old Admin Panel:**
- Next.js 13.4.4
- React 18.2.0
- Material Tailwind
- Redux Toolkit
- React Hook Form + Yup

**New Admin Panel:**
- Next.js 16 (App Router)
- React 19
- Shadcn UI (Radix UI)
- Zustand
- React Hook Form + Zod
- Full TypeScript

### Setup Steps

1. **Install Dependencies**
```bash
cd mer-admin-panel-new
npm install
```

2. **Configure Environment**
```env
NEXT_PUBLIC_API_URL=http://localhost:7000/api
```

3. **Start Development**
```bash
npm run dev
```

### API Integration Examples

**Authentication:**
```typescript
import { authApi } from '@/lib/api';

const result = await authApi.login({
  email: 'admin@example.com',
  password: '123456'
});
```

**Products:**
```typescript
import { productsApi } from '@/lib/api';

const products = await productsApi.getAll({
  page: 1,
  limit: 10
}, token);
```

**Orders:**
```typescript
import { ordersApi } from '@/lib/api';

const orders = await ordersApi.getAll({
  status: 'pending'
}, token);
```

### Component Migration

**Old (Material Tailwind):**
```tsx
import { Button, Input } from '@material-tailwind/react';

<Button color="blue">Submit</Button>
<Input label="Email" />
```

**New (Shadcn UI):**
```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

<Button>Submit</Button>
<Input placeholder="Email" />
```

### Form Validation Migration

**Old (Yup):**
```tsx
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
});
```

**New (Zod):**
```tsx
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});
```

### State Management Migration

**Old (Redux):**
```tsx
import { useDispatch, useSelector } from 'react-redux';

const user = useSelector(state => state.user);
dispatch(setUser(data));
```

**New (Zustand):**
```tsx
import { useAuthStore } from '@/stores/auth-store';

const { user, setUser } = useAuthStore();
setUser(data);
```

### Benefits

- Modern stack with latest Next.js 16 and React 19
- Better UI/UX with accessible Shadcn UI components
- Improved type safety with Zod validation
- Cleaner code structure
- Better developer experience
- Easier to maintain and extend



## Complete API Endpoints Reference

### 🔐 User Authentication (`/api/user`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Đăng ký user mới | ❌ |
| POST | `/login` | Đăng nhập user | ❌ |
| PATCH | `/forget-password` | Quên mật khẩu | ❌ |
| PATCH | `/confirm-forget-password` | Xác nhận reset password | ❌ |
| PATCH | `/change-password` | Đổi mật khẩu | ✅ |
| GET | `/confirmEmail/:token` | Xác nhận email | ❌ |
| PUT | `/update-user/:id` | Cập nhật thông tin user | ✅ |
| POST | `/register/:token` | OAuth login | ❌ |

### 👨‍💼 Admin Management (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Đăng ký admin | ❌ |
| POST | `/login` | Đăng nhập admin | ❌ |
| PATCH | `/change-password` | Đổi mật khẩu admin | ✅ |
| POST | `/add` | Thêm staff | ✅ |
| GET | `/all` | Lấy danh sách staff | ✅ |
| GET | `/get/:id` | Lấy thông tin staff | ✅ |
| PATCH | `/update-stuff/:id` | Cập nhật staff | ✅ |
| DELETE | `/:id` | Xóa staff | ✅ |
| PATCH | `/forget-password` | Quên mật khẩu admin | ❌ |
| PATCH | `/confirm-forget-password` | Xác nhận reset password | ❌ |

### 📦 Product Management (`/api/product`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add` | Thêm sản phẩm | ✅ |
| POST | `/add-all` | Thêm nhiều sản phẩm | ✅ |
| GET | `/all` | Lấy tất cả sản phẩm | ❌ |
| GET | `/offer` | Sản phẩm có offer | ❌ |
| GET | `/top-rated` | Sản phẩm đánh giá cao | ❌ |
| GET | `/review-product` | Sản phẩm có review | ❌ |
| GET | `/popular/:type` | Sản phẩm phổ biến theo loại | ❌ |
| GET | `/related-product/:id` | Sản phẩm liên quan | ❌ |
| GET | `/single-product/:id` | Chi tiết sản phẩm | ❌ |
| GET | `/stock-out` | Sản phẩm hết hàng | ❌ |
| GET | `/:type` | Sản phẩm theo loại | ❌ |
| PATCH | `/edit-product/:id` | Cập nhật sản phẩm | ✅ |
| DELETE | `/:id` | Xóa sản phẩm | ✅ |

### 🏷️ Category Management (`/api/category`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add` | Thêm category | ✅ |
| POST | `/add-all` | Thêm nhiều category | ✅ |
| GET | `/all` | Lấy tất cả category | ❌ |
| GET | `/show` | Category hiển thị | ❌ |
| GET | `/show/:type` | Category theo loại | ❌ |
| GET | `/get/:id` | Chi tiết category | ❌ |
| PATCH | `/edit/:id` | Cập nhật category | ✅ |
| DELETE | `/delete/:id` | Xóa category | ✅ |

### 🏢 Brand Management (`/api/brand`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add` | Thêm brand | ✅ |
| POST | `/add-all` | Thêm nhiều brand | ✅ |
| GET | `/all` | Lấy tất cả brand | ❌ |
| GET | `/active` | Brand đang active | ❌ |
| GET | `/get/:id` | Chi tiết brand | ❌ |
| PATCH | `/edit/:id` | Cập nhật brand | ✅ |
| DELETE | `/delete/:id` | Xóa brand | ✅ |

### 🛒 Order Management (`/api/order`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/create-payment-intent` | Tạo payment intent | ❌ |
| POST | `/saveOrder` | Lưu đơn hàng | ✅ |
| GET | `/orders` | Lấy tất cả đơn hàng | ✅ |
| GET | `/:id` | Chi tiết đơn hàng | ✅ |
| PATCH | `/update-status/:id` | Cập nhật trạng thái | ✅ |

### 📊 User Order & Dashboard (`/api/user-order`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Đơn hàng của user | ✅ |
| GET | `/:id` | Chi tiết đơn hàng | ✅ |
| GET | `/dashboard-amount` | Thống kê dashboard | ✅ |
| GET | `/sales-report` | Báo cáo doanh số | ✅ |
| GET | `/most-selling-category` | Category bán chạy | ✅ |
| GET | `/dashboard-recent-order` | Đơn hàng gần đây | ✅ |

### 🎟️ Coupon Management (`/api/coupon`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add` | Thêm coupon | ✅ |
| POST | `/all` | Thêm nhiều coupon | ✅ |
| GET | `/` | Lấy tất cả coupon | ❌ |
| GET | `/:id` | Chi tiết coupon | ❌ |
| PATCH | `/:id` | Cập nhật coupon | ✅ |
| DELETE | `/:id` | Xóa coupon | ✅ |

### ⭐ Review Management (`/api/review`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add` | Thêm review | ✅ |
| DELETE | `/delete/:id` | Xóa review | ✅ |

### 📤 File Upload (`/api/upload`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/single` | Upload 1 file | ✅ |

### ☁️ Cloudinary Management (`/api/cloudinary`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add-img` | Upload 1 ảnh | ✅ |
| POST | `/add-multiple-img` | Upload nhiều ảnh (max 5) | ✅ |
| DELETE | `/img-delete` | Xóa ảnh | ✅ |

**Tổng cộng: 80+ API endpoints** được document đầy đủ với Swagger UI tại `http://localhost:7000/api-docs`

## Testing APIs

### Quick Test Commands

```bash
# Test all APIs automatically
make test-api

# Test specific endpoints
curl http://localhost:7000/health
curl http://localhost:7000/api/product/all | jq
curl http://localhost:7000/api/category/all | jq

# Test with authentication
TOKEN=$(curl -X POST http://localhost:7000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123456"}' | jq -r '.token')

curl -X GET http://localhost:7000/api/user-order \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Using Swagger UI

1. Open http://localhost:7000/api-docs
2. Click "Try it out" on any endpoint
3. Fill in parameters/body
4. Click "Execute"
5. View response

For authenticated endpoints:
1. Login via `/api/user/login` or `/api/admin/login`
2. Copy token from response
3. Click "Authorize" 🔒 button at top
4. Enter: `Bearer YOUR_TOKEN_HERE`
5. Click "Authorize"

## Support

For issues or questions:
- Check Swagger UI: http://localhost:7000/api-docs
- Check [TESTING.md](./TESTING.md) for testing guide
- Check [FEATURES.md](./FEATURES.md) for feature list
- Contact development team
