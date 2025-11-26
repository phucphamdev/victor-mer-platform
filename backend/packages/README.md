# Bagisto Packages

Thư mục chứa các custom packages và extensions cho Bagisto backend.

## 📦 Installed Packages

### Core Packages (Built-in)
- **Admin** - Admin panel
- **Attribute** - Product attributes
- **Category** - Category management
- **Checkout** - Checkout process
- **CMS** - Content management
- **Core** - Core functionality
- **Customer** - Customer management
- **DataGrid** - Data grid component
- **Inventory** - Inventory management
- **Payment** - Payment methods
- **Product** - Product management
- **Sales** - Sales & orders
- **Shipping** - Shipping methods
- **Shop** - Storefront
- **Tax** - Tax management
- **User** - User management

### Marketing & SEO
- **Marketing** - Marketing campaigns
- **CartRule** - Cart price rules
- **CatalogRule** - Catalog price rules
- **Sitemap** - XML sitemap
- **SocialLogin** - Social media login
- **SocialShare** - Social sharing

### E-commerce Features
- **Blog** - Blog functionality
- **BookingProduct** - Booking/reservation products
- **PreOrder** - Pre-order products
- **ProductLabel** - Product labels/badges
- **RewardPoints** - Loyalty program
- **StockNotify** - Stock notification

### Tools & Utilities
- **BulkUpload** - Bulk product upload
- **DataTransfer** - Data import/export
- **ImageGallery** - Product image gallery
- **Reports** - Analytics & reports
- **RestAPI** - REST API endpoints
- **SearchSuggestion** - Search autocomplete

### Advanced Features
- **DebugBar** - Debug toolbar
- **FPC** - Full page cache
- **GDPR** - GDPR compliance
- **MagicAI** - AI features
- **Notification** - Push notifications
- **Paypal** - PayPal integration
- **Theme** - Theme management

## 🆕 Packages Cần Cài Đặt

### 1. OTP Login (Bagisto-login-by-OTP)
**Mục đích**: Đăng nhập bằng OTP qua email/SMS

**Features**:
- OTP login cho admin
- OTP login cho customer
- Email OTP notification
- Security enhancement

**Cài đặt**:
```bash
# Extract package
unzip template_code/archive/Bagisto-login-by-OTP-master.zip -d /tmp/

# Copy to packages
cp -r /tmp/Bagisto-login-by-OTP-master/src backend/packages/Webkul/OTPLogin/

# Update composer.json
# Add to psr-4:
"Webkul\\OTPLogin\\": "packages/Webkul/OTPLogin/src"

# Run commands
composer dump-autoload
php artisan migrate
php artisan config:clear
```

**Configuration**:
- Admin > Configuration > OTP Login
- Enable/disable OTP
- Configure OTP expiry time

---

### 2. Advanced Order Number
**Mục đích**: Tùy chỉnh số thứ tự đơn hàng

**Features**:
- Custom order number format
- Prefix/suffix support
- Sequential numbering
- Reset counter command
- Invoice & shipment numbering

**Cài đặt**:
```bash
# Extract và copy
unzip template_code/archive/advanced-order-number-main.zip -d /tmp/
cp -r /tmp/advanced-order-number-main/src backend/packages/Webkul/AdvancedOrderNumber/

# Update composer.json
"Webkul\\AdvancedOrderNumber\\": "packages/Webkul/AdvancedOrderNumber/src"

# Run commands
composer dump-autoload
php artisan migrate
php artisan vendor:publish --provider="Webkul\AdvancedOrderNumber\Providers\AdvancedOrderNumberServiceProvider"
```

**Configuration**:
- Admin > Configuration > Sales > Order Number
- Format: PREFIX-{YYYY}-{MM}-{COUNTER}
- Example: ORD-2024-11-00001

---

### 3. Stripe Payment Gateway
**Mục đích**: Tích hợp thanh toán Stripe

**Features**:
- Credit card payment
- Secure payment processing
- Refund support
- Webhook integration

**Cài đặt**:
```bash
# Extract và copy
unzip template_code/archive/Bagisto-Stripe-Payment-Gateway-main.zip -d /tmp/
cp -r /tmp/Bagisto-Stripe-Payment-Gateway-main/src backend/packages/Webkul/StripePayment/

# Update composer.json
"Webkul\\StripePayment\\": "packages/Webkul/StripePayment/src"

# Install Stripe SDK
composer require stripe/stripe-php

# Run commands
composer dump-autoload
php artisan vendor:publish --provider="Webkul\StripePayment\Providers\StripeServiceProvider"
```

**Configuration**:
- Admin > Configuration > Sales > Payment Methods > Stripe
- Add Stripe API keys (Publishable & Secret)
- Enable/disable payment method

---

### 4. B2B Suite
**Mục đích**: Tính năng B2B cho doanh nghiệp

**Features**:
- Wholesale pricing
- Bulk ordering
- Quote requests
- Company accounts
- Credit limits
- Custom pricing per customer

**Cài đặt**:
```bash
# Extract và copy
unzip template_code/archive/b2b-suite-master.zip -d /tmp/
cp -r /tmp/b2b-suite-master/src backend/packages/Webkul/B2BSuite/

# Update composer.json
"Webkul\\B2BSuite\\": "packages/Webkul/B2BSuite/src"

# Run commands
composer dump-autoload
php artisan migrate
php artisan vendor:publish --provider="Webkul\B2BSuite\Providers\B2BSuiteServiceProvider"
```

**Configuration**:
- Admin > Configuration > B2B Suite
- Enable B2B features
- Configure wholesale pricing
- Set credit limits

---

### 5. Meta Tags Manager
**Mục đích**: Quản lý meta tags cho SEO

**Features**:
- Custom meta tags per page
- Dynamic meta generation
- Open Graph tags
- Twitter Card tags

**Cài đặt**:
```bash
# Extract và copy
unzip template_code/archive/Meta-master.zip -d /tmp/
cp -r /tmp/Meta-master/src backend/packages/Webkul/Meta/

# Update composer.json
"Webkul\\Meta\\": "packages/Webkul/Meta/src"

# Run commands
composer dump-autoload
php artisan migrate
```

---

### 6. LiteSpeed Cache
**Mục đích**: Tối ưu hiệu suất với LiteSpeed cache

**Features**:
- Full page caching
- Object caching
- Image optimization
- CSS/JS minification

**Cài đặt**:
```bash
# Extract và copy
unzip template_code/archive/lite-speed-cache-main.zip -d /tmp/
cp -r /tmp/lite-speed-cache-main/src backend/packages/Webkul/LiteSpeedCache/

# Update composer.json
"Webkul\\LiteSpeedCache\\": "packages/Webkul/LiteSpeedCache/src"

# Run commands
composer dump-autoload
php artisan vendor:publish --provider="Webkul\LiteSpeedCache\Providers\LiteSpeedCacheServiceProvider"
```

**Configuration**:
- Admin > Configuration > Performance > LiteSpeed Cache
- Enable caching
- Configure cache TTL

---

## 🚀 Quick Install All

Sử dụng script tự động:

```bash
bash scripts/install-packages.sh
```

Script sẽ:
1. Extract tất cả packages
2. Copy vào backend/packages/Webkul/
3. Hướng dẫn cập nhật composer.json
4. Chạy composer dump-autoload

---

## 📝 Manual Installation Steps

### 1. Update composer.json

Thêm vào `autoload.psr-4`:

```json
{
    "autoload": {
        "psr-4": {
            "Webkul\\OTPLogin\\": "packages/Webkul/OTPLogin/src",
            "Webkul\\AdvancedOrderNumber\\": "packages/Webkul/AdvancedOrderNumber/src",
            "Webkul\\StripePayment\\": "packages/Webkul/StripePayment/src",
            "Webkul\\B2BSuite\\": "packages/Webkul/B2BSuite/src",
            "Webkul\\Meta\\": "packages/Webkul/Meta/src",
            "Webkul\\LiteSpeedCache\\": "packages/Webkul/LiteSpeedCache/src"
        }
    }
}
```

### 2. Register Service Providers

Thêm vào `config/app.php`:

```php
'providers' => [
    // ...
    Webkul\OTPLogin\Providers\OTPLoginServiceProvider::class,
    Webkul\AdvancedOrderNumber\Providers\AdvancedOrderNumberServiceProvider::class,
    Webkul\StripePayment\Providers\StripeServiceProvider::class,
    Webkul\B2BSuite\Providers\B2BSuiteServiceProvider::class,
    Webkul\Meta\Providers\MetaServiceProvider::class,
    Webkul\LiteSpeedCache\Providers\LiteSpeedCacheServiceProvider::class,
],
```

### 3. Run Commands

```bash
# Dump autoload
composer dump-autoload

# Publish assets
php artisan vendor:publish --all

# Run migrations
php artisan migrate

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Optimize
php artisan optimize
```

---

## 🔧 Configuration

Sau khi cài đặt, cấu hình packages tại:

**Admin Panel** > **Configuration** > **[Package Name]**

---

## 🐛 Troubleshooting

### Package không load

```bash
# Clear all cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Regenerate autoload
composer dump-autoload

# Check service provider
php artisan package:discover
```

### Migration errors

```bash
# Rollback last migration
php artisan migrate:rollback

# Re-run migrations
php artisan migrate

# Check migration status
php artisan migrate:status
```

### Assets không load

```bash
# Publish assets again
php artisan vendor:publish --all --force

# Link storage
php artisan storage:link

# Clear view cache
php artisan view:clear
```

---

## 📚 Package Development

### Create New Package

```bash
# Use package generator
php artisan package:make Webkul/PackageName

# Or manually create structure:
packages/Webkul/PackageName/
├── src/
│   ├── Config/
│   ├── Database/
│   │   └── Migrations/
│   ├── Http/
│   │   └── Controllers/
│   ├── Models/
│   ├── Providers/
│   │   └── PackageServiceProvider.php
│   ├── Resources/
│   │   ├── lang/
│   │   └── views/
│   └── Routes/
│       └── web.php
├── composer.json
└── README.md
```

---

## 🔐 Security

- Review third-party packages before installation
- Keep packages updated
- Use official sources only
- Test on development environment first

---

## 📞 Support

**Victor MER Development Team**
- Email: phuc.pham.dev@gmail.com
- Phone: +84 938 788 091

---

**Last Updated**: November 26, 2024
