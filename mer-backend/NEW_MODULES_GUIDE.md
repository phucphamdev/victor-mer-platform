# Hướng dẫn sử dụng Module Ecommerce & Affiliate mới

## 📦 Các Module đã được bổ sung

### 1. **Invoice (Hóa đơn)** - `/api/invoice`
Quản lý hóa đơn cho đơn hàng với đầy đủ thông tin thuế, phí vận chuyển.

**Endpoints:**
- `POST /api/invoice/add` - Tạo hóa đơn mới
- `GET /api/invoice/all` - Lấy danh sách hóa đơn (có phân trang)
- `GET /api/invoice/number/:invoiceNumber` - Lấy hóa đơn theo số
- `PATCH /api/invoice/mark-paid/:id` - Đánh dấu đã thanh toán
- `PATCH /api/invoice/:id` - Cập nhật hóa đơn
- `DELETE /api/invoice/:id` - Xóa hóa đơn

**Features:**
- Tự động tạo mã hóa đơn (INV-YYYYMM-00001)
- Quản lý trạng thái: draft, sent, paid, overdue, cancelled
- Tính toán thuế, phí vận chuyển, giảm giá
- Hỗ trợ xuất PDF (pdfUrl field)

### 2. **Inventory (Tồn kho)** - `/api/inventory`
Quản lý tồn kho sản phẩm theo kho, SKU với cảnh báo hết hàng.

**Endpoints:**
- `POST /api/inventory/add` - Tạo bản ghi tồn kho
- `GET /api/inventory/all` - Lấy danh sách tồn kho
- `GET /api/inventory/low-stock` - Lấy sản phẩm sắp hết hàng
- `PATCH /api/inventory/:id` - Cập nhật tồn kho
- `DELETE /api/inventory/:id` - Xóa bản ghi

**Features:**
- Theo dõi số lượng available = quantity - reserved
- Lịch sử thay đổi tồn kho (stockHistory)
- Cảnh báo low-stock tự động
- Quản lý theo warehouse (kho)
- Vị trí lưu trữ (aisle, shelf, bin)

### 3. **Shipment (Vận chuyển)** - `/api/shipment`
Theo dõi vận chuyển với tracking code và lịch sử di chuyển.

**Endpoints:**
- `POST /api/shipment/add` - Tạo đơn vận chuyển
- `GET /api/shipment/all` - Danh sách vận chuyển
- `GET /api/shipment/track/:trackingNumber` - Tra cứu vận chuyển
- `PATCH /api/shipment/status/:id` - Cập nhật trạng thái
- `DELETE /api/shipment/:id` - Xóa đơn vận chuyển

**Features:**
- Hỗ trợ các đơn vị vận chuyển VN: GHN, GHTK, Viettel Post, VNPost, J&T, Ninja Van
- Tracking history với location và timestamp
- Trạng thái: pending, picked-up, in-transit, out-for-delivery, delivered, failed, returned
- Tính phí vận chuyển, cân nặng, kích thước

### 4. **Flash Sale (Giảm giá nhanh)** - `/api/flash-sale`
Tạo chương trình flash sale với countdown và số lượng giới hạn.

**Endpoints:**
- `POST /api/flash-sale/add` - Tạo flash sale
- `GET /api/flash-sale/all` - Danh sách flash sale
- `GET /api/flash-sale/active` - Flash sale đang diễn ra
- `GET /api/flash-sale/slug/:slug` - Chi tiết flash sale
- `PATCH /api/flash-sale/:id` - Cập nhật
- `DELETE /api/flash-sale/:id` - Xóa

**Features:**
- Quản lý thời gian bắt đầu/kết thúc
- Theo dõi số lượng sold/remaining cho từng sản phẩm
- Tự động tính % giảm giá
- SEO metadata đầy đủ
- Priority để sắp xếp hiển thị

### 5. **Product Tag (Thẻ sản phẩm)** - `/api/product-tag`
Quản lý tags cho sản phẩm, hỗ trợ SEO và filtering.

**Endpoints:**
- `POST /api/product-tag/add` - Tạo tag
- `GET /api/product-tag/all` - Danh sách tags
- `GET /api/product-tag/slug/:slug` - Chi tiết tag
- `PATCH /api/product-tag/:id` - Cập nhật
- `DELETE /api/product-tag/:id` - Xóa

**Features:**
- SEO metadata: metaTitle, metaDescription, keywords
- Robots index/follow control
- Đếm số sản phẩm (productCount)
- Màu sắc tùy chỉnh
- Full-text search

### 6. **Product Label (Nhãn sản phẩm)** - `/api/product-label`
Tạo badges như "New", "Hot", "Sale", "Best Seller" cho sản phẩm.

**Endpoints:**
- `POST /api/product-label/add` - Tạo label
- `GET /api/product-label/all` - Danh sách labels
- `PATCH /api/product-label/:id` - Cập nhật
- `DELETE /api/product-label/:id` - Xóa

**Features:**
- Types: new, hot, sale, best-seller, featured, limited, custom
- Tùy chỉnh màu sắc, background, icon
- Vị trí hiển thị: top-left, top-right, bottom-left, bottom-right
- Priority để sắp xếp

### 7. **Collection (Bộ sưu tập)** - `/api/collection`
Nhóm sản phẩm theo theme, season, hoặc campaign.

**Endpoints:**
- `POST /api/collection/add` - Tạo collection
- `GET /api/collection/all` - Danh sách collections
- `GET /api/collection/slug/:slug` - Chi tiết collection
- `PATCH /api/collection/:id` - Cập nhật
- `DELETE /api/collection/:id` - Xóa

**Features:**
- Types: seasonal, trending, new-arrival, best-seller, custom
- Quản lý danh sách products
- Thời gian bắt đầu/kết thúc
- Featured flag
- SEO metadata đầy đủ với structured data

### 8. **Page (CMS)** - `/api/page`
Quản lý trang nội dung với SEO optimization.

**Endpoints:**
- `POST /api/page/add` - Tạo trang
- `GET /api/page/all` - Danh sách trang
- `GET /api/page/slug/:slug` - Xem trang (tự động tăng view count)
- `PATCH /api/page/publish/:id` - Xuất bản trang
- `PATCH /api/page/:id` - Cập nhật
- `DELETE /api/page/:id` - Xóa

**Features:**
- Templates: default, full-width, sidebar-left, sidebar-right, landing
- Status: draft, published, private
- SEO đầy đủ: meta tags, OG tags, structured data, canonical URL
- Tự động tính reading time
- View count tracking
- Custom CSS/JS support

### 9. **Order Return (Trả hàng)** - `/api/order-return`
Quản lý yêu cầu trả hàng/hoàn tiền.

**Endpoints:**
- `POST /api/order-return/add` - Tạo yêu cầu trả hàng
- `GET /api/order-return/all` - Danh sách yêu cầu
- `GET /api/order-return/number/:returnNumber` - Chi tiết theo mã
- `PATCH /api/order-return/approve/:id` - Phê duyệt
- `PATCH /api/order-return/status/:id` - Cập nhật trạng thái
- `DELETE /api/order-return/:id` - Xóa

**Features:**
- Tự động tạo mã trả hàng (RET-YYYY-000001)
- Lý do trả: defective, wrong-item, not-as-described, damaged, changed-mind, other
- Loại: refund hoặc exchange
- Upload hình ảnh minh chứng
- Tracking number cho việc gửi lại hàng
- Admin notes

### 10. **Affiliate (Tiếp thị liên kết)** - `/api/affiliate`
Hệ thống affiliate marketing với tracking và commission.

**Endpoints:**
- `POST /api/affiliate/register` - Đăng ký affiliate
- `GET /api/affiliate/all` - Danh sách affiliates (admin)
- `GET /api/affiliate/code/:code` - Thông tin affiliate theo code
- `POST /api/affiliate/track/:affiliateCode` - Track click
- `GET /api/affiliate/stats/:id` - Thống kê affiliate
- `PATCH /api/affiliate/approve/:id` - Phê duyệt affiliate
- `PATCH /api/affiliate/:id` - Cập nhật

**Features:**
- Tự động tạo affiliate code (AFF + random)
- Tracking clicks với IP, user agent, referrer
- Tính commission tự động
- Quản lý trạng thái: pending, active, suspended, banned
- Thống kê: clicks, orders, revenue, commission
- Conversion rate calculation
- Payment info: bank transfer, PayPal, MoMo, ZaloPay

**Models liên quan:**
- `AffiliateCommission` - Lưu trữ hoa hồng từng đơn
- `AffiliateClick` - Tracking mỗi lần click

## 🎯 SEO Metadata Structure

Tất cả các module đều có cấu trúc SEO metadata chuẩn:

```javascript
seo: {
  metaTitle: String,           // Tối đa 60 ký tự
  metaDescription: String,     // Tối đa 160 ký tự
  metaKeywords: [String],      // Từ khóa
  ogTitle: String,             // Open Graph title
  ogDescription: String,       // Open Graph description
  ogImage: String,             // Open Graph image URL
  ogType: String,              // Open Graph type (website, article, etc.)
  canonicalUrl: String,        // Canonical URL
  structuredData: Object,      // JSON-LD schema
  robots: {
    index: Boolean,            // Cho phép index
    follow: Boolean            // Cho phép follow links
  },
  focusKeyword: String,        // Từ khóa chính
  readingTime: Number          // Thời gian đọc (phút)
}
```

## 🔐 Authentication

Tất cả endpoints đều yêu cầu JWT authentication trừ:
- Public endpoints: GET collections, pages, flash sales, tags
- Tracking endpoint: POST /api/affiliate/track/:affiliateCode

**Cách sử dụng:**
```bash
# Thêm header Authorization
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📊 Response Format

Tất cả API đều tuân theo chuẩn Google API Design Guide:

**Success với pagination:**
```json
{
  "status": "success",
  "data": [...],
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

**Success đơn lẻ:**
```json
{
  "status": "success",
  "data": {...},
  "message": "Operation successful"
}
```

**Error:**
```json
{
  "status": "error",
  "message": "Error message",
  "errors": [...]
}
```

## 🚀 Cách test API

1. Khởi động server:
```bash
cd mer-backend
npm start
```

2. Truy cập Swagger UI:
```
http://localhost:7000/api-docs
```

3. Authenticate:
- Click nút "Authorize" 
- Nhập: `Bearer YOUR_TOKEN`
- Test các endpoints

## 📝 Ví dụ sử dụng

### Tạo Flash Sale
```bash
POST /api/flash-sale/add
{
  "name": "Black Friday 2024",
  "slug": "black-friday-2024",
  "description": "Giảm giá khủng Black Friday",
  "startDate": "2024-11-29T00:00:00Z",
  "endDate": "2024-11-30T23:59:59Z",
  "products": [
    {
      "product": "product_id_here",
      "originalPrice": 1000000,
      "salePrice": 500000,
      "quantity": 100
    }
  ],
  "seo": {
    "metaTitle": "Black Friday 2024 - Giảm giá đến 50%",
    "metaDescription": "Chương trình Black Friday với hàng ngàn sản phẩm giảm giá lên đến 50%"
  }
}
```

### Track Affiliate Click
```bash
POST /api/affiliate/track/AFF123456
{
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "referrer": "https://facebook.com",
  "landingPage": "/products/iphone-15"
}
```

### Tạo Page với SEO
```bash
POST /api/page/add
{
  "title": "Chính sách bảo hành",
  "slug": "chinh-sach-bao-hanh",
  "content": "Nội dung chính sách...",
  "template": "default",
  "status": "published",
  "seo": {
    "metaTitle": "Chính sách bảo hành - Shop ABC",
    "metaDescription": "Tìm hiểu về chính sách bảo hành sản phẩm tại Shop ABC",
    "metaKeywords": ["bảo hành", "chính sách", "hỗ trợ"],
    "robots": {
      "index": true,
      "follow": true
    }
  }
}
```

## 🎨 Tích hợp Frontend

Các module này đã sẵn sàng để tích hợp với admin panel và frontend:

1. **Admin Panel** - Quản lý tất cả modules
2. **Frontend** - Hiển thị flash sales, collections, pages
3. **Affiliate Dashboard** - Theo dõi clicks, commissions
4. **Customer Portal** - Tạo return requests, xem invoices

## 📈 Tiếp theo

Các tính năng có thể phát triển thêm:
- Product Attributes (Size, Color, Material)
- Product Options (Variants)
- Custom Fields (Dynamic fields)
- Report Dashboard (Analytics)
- Email notifications cho các events
- Webhook integrations
- Export/Import data

## 🐛 Troubleshooting

Nếu gặp lỗi:
1. Check logs trong `mer-backend/logs/`
2. Verify JWT token còn hạn
3. Kiểm tra MongoDB connection
4. Xem Swagger docs để đảm bảo request format đúng

## 📞 Support

Tất cả modules đã được test cơ bản. Để phát triển chi tiết hơn, cần:
- Thêm validators cho từng module
- Viết unit tests
- Tối ưu queries với indexes
- Thêm caching layer
