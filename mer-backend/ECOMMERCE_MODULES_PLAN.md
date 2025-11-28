# Kế hoạch phát triển Module Ecommerce & Affiliate

## Phân tích hiện trạng

### ✅ Đã có (Modules hiện tại):
1. Products - Sản phẩm
2. Brands - Thương hiệu  
3. Categories - Danh mục sản phẩm
4. Orders - Đơn hàng
5. Reviews - Đánh giá
6. Coupons - Mã giảm giá
7. Users/Customers - Khách hàng

### ❌ Cần bổ sung (Từ menu Ecommerce):

#### 1. **Report** - Báo cáo tổng quan
   - Model: Report
   - Thống kê doanh thu, đơn hàng, sản phẩm bán chạy
   - SEO: Meta tags cho trang báo cáo

#### 2. **Incomplete Orders** - Đơn hàng chưa hoàn thành
   - Mở rộng Order model
   - Filter orders với status: pending, processing

#### 3. **Order Returns** - Đơn hàng trả lại
   - Model: OrderReturn
   - Quản lý yêu cầu hoàn trả, lý do, trạng thái

#### 4. **Shipments** - Vận chuyển
   - Model: Shipment
   - Tracking code, carrier, status, delivery date

#### 5. **Invoices** - Hóa đơn
   - Model: Invoice
   - Tạo hóa đơn từ order, PDF export

#### 6. **Product Prices** - Giá sản phẩm
   - Model: ProductPrice (Price history)
   - Lịch sử thay đổi giá, giá theo khu vực

#### 7. **Product Inventory** - Tồn kho sản phẩm
   - Model: Inventory
   - Quản lý số lượng, warehouse, stock alerts

#### 8. **Product Tags** - Thẻ sản phẩm
   - Model: ProductTag
   - Tags cho SEO và filtering

#### 9. **Product Attributes** - Thuộc tính sản phẩm
   - Model: ProductAttribute
   - Size, Color, Material, etc.

#### 10. **Product Options** - Tùy chọn sản phẩm
   - Model: ProductOption
   - Variants, combinations

#### 11. **Product Collections** - Bộ sưu tập
   - Model: Collection
   - Nhóm sản phẩm theo theme, season

#### 12. **Product Labels** - Nhãn sản phẩm
   - Model: ProductLabel
   - New, Hot, Sale, Best Seller badges

#### 13. **Flash Sales** - Giảm giá nhanh
   - Model: FlashSale
   - Time-limited deals, countdown

#### 14. **Discounts** - Giảm giá
   - Mở rộng Coupon model
   - Bulk discounts, tiered pricing

#### 15. **Custom Fields** - Trường tùy chỉnh
   - Model: CustomField
   - Dynamic fields cho products

#### 16. **Pages** - Trang nội dung
   - Model: Page
   - CMS pages với SEO metadata

#### 17. **Affiliate System** - Hệ thống Affiliate
   - Model: Affiliate, AffiliateCommission, AffiliateClick
   - Tracking, commission calculation

## Cấu trúc SEO Metadata (Áp dụng cho tất cả modules)

```javascript
seo: {
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  ogTitle: String,
  ogDescription: String,
  ogImage: String,
  canonicalUrl: String,
  structuredData: Object, // JSON-LD schema
  robots: {
    index: Boolean,
    follow: Boolean
  }
}
```

## Thứ tự triển khai (Ưu tiên)

### Phase 1 - Core Ecommerce (Tuần 1-2):
1. Product Inventory
2. Product Tags
3. Product Attributes
4. Product Labels
5. Shipments
6. Invoices

### Phase 2 - Advanced Features (Tuần 3-4):
7. Flash Sales
8. Product Collections
9. Order Returns
10. Product Prices (History)
11. Report Dashboard

### Phase 3 - Content & Affiliate (Tuần 5-6):
12. Pages (CMS)
13. Custom Fields
14. Affiliate System
15. Product Options

## Cấu trúc file cho mỗi module:

```
mer-backend/
├── model/
│   └── [ModuleName].js
├── controller/
│   └── [moduleName].controller.js
├── services/
│   └── [moduleName].service.js
├── routes/
│   └── [moduleName].routes.js
├── validators/
│   └── [moduleName].validator.js
```

## Ghi chú:
- Tất cả modules sẽ có SEO metadata
- Sử dụng BaseService pattern
- RESTful API chuẩn
- Swagger documentation
- Validation với express-validator
- JWT authentication
