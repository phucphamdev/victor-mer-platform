# 🚀 Victor Mer Platform - Docker Deployment Guide

**Built with ❤️ by Victor Mer Development Team**

Hướng dẫn triển khai Victor Mer Platform với Docker Compose cho cả môi trường Development (localhost) và Production (VPS).

---

## 📋 Mục lục

- [🚀 Quick Start - 3 Cách Chạy Dự Án](#-quick-start---3-cách-chạy-dự-án)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Quick Start - Development](#-quick-start---development)
- [Quick Start - Production](#-quick-start---production)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Các lệnh thường dùng](#-các-lệnh-thường-dùng)
- [Hướng dẫn lấy API Keys](#-hướng-dẫn-lấy-api-keys)
- [Deploy lên VPS Production](#-deploy-lên-vps-production)
- [Bảo mật](#-bảo-mật)
- [Monitoring & Backup](#-monitoring--backup)
- [Troubleshooting](#-troubleshooting)

---

## � Quick S tart - 3 Cách Chạy Dự Án

Dự án cung cấp **3 scripts tự động** để chạy dễ dàng:

### 🖥️ Cách 1: Native (Không Docker) - Nhanh nhất
```bash
./run-local-native.sh
```
✅ Tự động kiểm tra Node.js, MongoDB  
✅ Tự động xử lý port conflicts  
✅ Tự động import dữ liệu demo  
✅ Phù hợp cho: Development, debugging

### 🐳 Cách 2: Docker Local - Test nhẹ nhàng
```bash
./run-docker-local.sh
```
✅ Tự động cài Docker (nếu chưa có)  
✅ Tự động build và start services  
✅ Tự động health check  
✅ Phù hợp cho: Testing, môi trường giống production

### 🌐 Cách 3: Docker Production - VPS với SSL
```bash
sudo ./run-docker-production.sh
```
✅ Tự động setup Nginx + SSL (Let's Encrypt)  
✅ Tự động configure firewall  
✅ Tự động SSL renewal  
✅ Phù hợp cho: Production deployment

📖 **Chi tiết đầy đủ**: Xem [QUICK_START.md](./QUICK_START.md) hoặc [DEPLOYMENT_GUIDE_VI.md](./DEPLOYMENT_GUIDE_VI.md)

---

## 📋 Yêu cầu hệ thống

### Development (Laptop)
- Docker Desktop 20.10+
- Docker Compose 2.0+
- RAM: 4GB trở lên
- Disk: 10GB trống

### Production (VPS)
- Docker 20.10+
- Docker Compose 2.0+
- RAM: 4GB trở lên (khuyến nghị 8GB)
- Disk: 20GB trở lên
- Ubuntu 20.04+ / Debian 11+ / CentOS 8+

---

## 🚀 Quick Start - Development

### Bước 1: Cài đặt Docker Desktop
- **Windows/Mac**: Tải từ https://www.docker.com/products/docker-desktop
- **Linux**: `curl -fsSL https://get.docker.com | sh`

### Bước 2: Clone project
```bash
git clone <your-repo>
cd victor-mer-platform
```

### Bước 3: Cấu hình môi trường
```bash
# Copy file cấu hình
cp .env.example .env.local

# Chỉnh sửa các thông tin cần thiết
nano .env.local
```

**Các biến BẮT BUỘC phải cấu hình:**
- `EMAIL_USER`: Email của bạn (Gmail)
- `EMAIL_PASS`: App password
- `CLOUDINARY_*`: Thông tin Cloudinary
- `STRIPE_KEY`: Stripe test key
- `GOOGLE_CLIENT_ID`: Google OAuth client ID

### Bước 4: Generate credentials bảo mật
```bash
# Tự động generate (khuyến nghị)
chmod +x generate-secrets.sh
./generate-secrets.sh

# Hoặc thủ công
openssl rand -base64 32  # MongoDB password
openssl rand -hex 64     # JWT secrets
```

### Bước 5: Chạy ứng dụng
```bash
# Cách 1: Dùng Makefile (khuyến nghị)
make dev

# Cách 2: Dùng docker-compose
docker-compose --env-file .env.local up -d
```

### Bước 6: Import dữ liệu mẫu
```bash
make seed
```

### Bước 7: Truy cập ứng dụng
- **Frontend**: http://localhost:3500
- **Admin Panel**: http://localhost:4000
- **Backend API**: http://localhost:7000
- **API Documentation (Swagger)**: http://localhost:7000/api-docs

---

## 📚 API Testing Guide

### Truy cập Swagger UI
Sau khi chạy ứng dụng, mở trình duyệt và truy cập:
```
http://localhost:7000/api-docs
```

### Các API Endpoints có sẵn:

#### 🔐 Authentication
- **User**: `/api/user/signup`, `/api/user/login`
- **Admin**: `/api/admin/register`, `/api/admin/login`

#### 📦 Products & Categories
- **Products**: `/api/product/*` - CRUD operations, search, filter
- **Categories**: `/api/category/*` - Category management
- **Brands**: `/api/brand/*` - Brand management

#### 🛒 Orders & Coupons
- **Orders**: `/api/order/*` - Order management
- **User Orders**: `/api/user-order/*` - User order history, dashboard
- **Coupons**: `/api/coupon/*` - Coupon management

#### 📝 Reviews & Media
- **Reviews**: `/api/review/*` - Product reviews
- **Upload**: `/api/upload/single` - File upload
- **Cloudinary**: `/api/cloudinary/*` - Image management

### Test API với Docker Compose

#### Cách 1: Sử dụng Test Script (Khuyến nghị)

```bash
# 1. Start services
make dev

# 2. Chạy test script tự động
chmod +x test-api.sh
./test-api.sh dev

# Hoặc test production
./test-api.sh prod
```

Script sẽ tự động test:
- ✅ Health check
- ✅ Get categories, brands, products
- ✅ User signup & login
- ✅ Authenticated endpoints
- ✅ Swagger documentation

#### Cách 2: Test thủ công với curl

```bash
# 1. Start services
make dev

# 2. Kiểm tra health
curl http://localhost:7000/health

# 3. Test các endpoints
# Get all categories
curl http://localhost:7000/api/category/all | jq

# Get all products
curl http://localhost:7000/api/product/all | jq

# Get all brands
curl http://localhost:7000/api/brand/all | jq

# Get top rated products
curl http://localhost:7000/api/product/top-rated | jq

# 4. Test authentication
# Đăng ký user
curl -X POST http://localhost:7000/api/user/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123456"}' | jq

# Login và lấy token
TOKEN=$(curl -X POST http://localhost:7000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123456"}' | jq -r '.token')

echo "Token: $TOKEN"

# Sử dụng token để test protected endpoints
curl -X GET http://localhost:7000/api/user-order \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | jq
```

#### Cách 3: Test với Docker Compose exec

```bash
# Vào container backend
docker exec -it victormer-backend-dev sh

# Test từ bên trong container
apk add curl jq  # Install curl và jq nếu chưa có

# Test health
curl http://localhost:7000/health

# Test API
curl http://localhost:7000/api/category/all
```

### Test với Postman/Thunder Client

1. Import Swagger JSON:
   - Mở http://localhost:7000/api-docs
   - Click vào link `/api-docs.json`
   - Import vào Postman

2. Hoặc test trực tiếp trên Swagger UI:
   - Click "Try it out" trên bất kỳ endpoint nào
   - Điền parameters/body
   - Click "Execute"

### Authentication trong Swagger

Để test các API cần authentication:

1. Login qua `/api/user/login` hoặc `/api/admin/login`
2. Copy token từ response
3. Click nút "Authorize" 🔒 ở đầu trang Swagger
4. Nhập: `Bearer YOUR_TOKEN_HERE`
5. Click "Authorize"
6. Bây giờ có thể test các protected endpoints

### Tổng hợp tất cả API Endpoints

#### 🔐 User Authentication (`/api/user`)
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

#### 👨‍💼 Admin Management (`/api/admin`)
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

#### 📦 Product Management (`/api/product`)
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

#### 🏷️ Category Management (`/api/category`)
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

#### 🏢 Brand Management (`/api/brand`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add` | Thêm brand | ✅ |
| POST | `/add-all` | Thêm nhiều brand | ✅ |
| GET | `/all` | Lấy tất cả brand | ❌ |
| GET | `/active` | Brand đang active | ❌ |
| GET | `/get/:id` | Chi tiết brand | ❌ |
| PATCH | `/edit/:id` | Cập nhật brand | ✅ |
| DELETE | `/delete/:id` | Xóa brand | ✅ |

#### 🛒 Order Management (`/api/order`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/create-payment-intent` | Tạo payment intent | ❌ |
| POST | `/saveOrder` | Lưu đơn hàng | ✅ |
| GET | `/orders` | Lấy tất cả đơn hàng | ✅ |
| GET | `/:id` | Chi tiết đơn hàng | ✅ |
| PATCH | `/update-status/:id` | Cập nhật trạng thái | ✅ |

#### 📊 User Order & Dashboard (`/api/user-order`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Đơn hàng của user | ✅ |
| GET | `/:id` | Chi tiết đơn hàng | ✅ |
| GET | `/dashboard-amount` | Thống kê dashboard | ✅ |
| GET | `/sales-report` | Báo cáo doanh số | ✅ |
| GET | `/most-selling-category` | Category bán chạy | ✅ |
| GET | `/dashboard-recent-order` | Đơn hàng gần đây | ✅ |

#### 🎟️ Coupon Management (`/api/coupon`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add` | Thêm coupon | ✅ |
| POST | `/all` | Thêm nhiều coupon | ✅ |
| GET | `/` | Lấy tất cả coupon | ❌ |
| GET | `/:id` | Chi tiết coupon | ❌ |
| PATCH | `/:id` | Cập nhật coupon | ✅ |
| DELETE | `/:id` | Xóa coupon | ✅ |

#### ⭐ Review Management (`/api/review`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add` | Thêm review | ✅ |
| DELETE | `/delete/:id` | Xóa review | ✅ |

#### 📤 File Upload (`/api/upload`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/single` | Upload 1 file | ✅ |

#### ☁️ Cloudinary Management (`/api/cloudinary`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add-img` | Upload 1 ảnh | ✅ |
| POST | `/add-multiple-img` | Upload nhiều ảnh (max 5) | ✅ |
| DELETE | `/img-delete` | Xóa ảnh | ✅ |

**Tổng cộng: 80+ API endpoints** đã được document đầy đủ với Swagger! 🎉

📖 **Chi tiết đầy đủ**: Xem file [API_ENDPOINTS.md](./API_ENDPOINTS.md) để biết request/response examples và cách sử dụng từng endpoint.

---

## 🌐 Quick Start - Production

### Bước 1: Chuẩn bị VPS
```bash
# SSH vào VPS
ssh root@your-vps-ip

# Cài Docker
curl -fsSL https://get.docker.com | sh

# Cài Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker --version
docker-compose --version
```

### Bước 2: Cấu hình Firewall
```bash
sudo apt install ufw -y
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Bước 3: Clone project
```bash
cd /var/www
git clone <your-repo> victor-mer
cd victor-mer
```

### Bước 4: Cấu hình production
```bash
cp .env.example .env.prod
nano .env.prod
```

**QUAN TRỌNG - Thay đổi:**
- `MONGO_ROOT_USER`: Username phức tạp
- `MONGO_ROOT_PASSWORD`: Mật khẩu mạnh (min 20 ký tự)
- `MONGO_DB_NAME`: Tên database không dễ đoán
- `TOKEN_SECRET`: Generate mới (128 ký tự)
- `JWT_SECRET_FOR_VERIFY`: Generate mới (128 ký tự)
- `STRIPE_KEY`: Stripe LIVE key
- `BACKEND_URL`, `STORE_URL`, `ADMIN_URL`: Domain thật

### Bước 5: Cấu hình Domain & DNS
Trỏ DNS về VPS:
```
Type    Name    Value           TTL
A       @       <VPS-IP>        3600
A       www     <VPS-IP>        3600
A       api     <VPS-IP>        3600
A       admin   <VPS-IP>        3600
```

### Bước 6: Cấu hình SSL
```bash
# Update domain trong nginx.conf
nano nginx/nginx.conf

# Generate SSL certificate
docker run -it --rm -v $(pwd)/nginx/ssl:/etc/letsencrypt \
  -p 80:80 -p 443:443 \
  certbot/certbot certonly --standalone \
  -d yourdomain.com -d www.yourdomain.com \
  -d api.yourdomain.com -d admin.yourdomain.com \
  --email your-email@example.com \
  --agree-tos
```

### Bước 7: Deploy
```bash
# Build và start
make prod-build

# Import seed data (nếu cần)
make seed-prod
```

### Bước 8: Verify
```bash
# Check status
docker-compose -f docker-compose.prod.yml ps

# Check logs
make prod-logs

# Test endpoints
curl https://api.yourdomain.com/health
```

---

## 📁 Cấu trúc dự án

```
victor-mer-platform/
├── docker-compose.yml          # Development config
├── docker-compose.prod.yml     # Production config
├── .env.local                  # Development environment
├── .env.prod                   # Production environment
├── .env.example                # Template mẫu
├── Makefile                    # Shortcuts commands
├── generate-secrets.sh         # Script tạo credentials
├── mongo-init.js              # MongoDB initialization
├── mer-backend/
│   ├── Dockerfile             # Backend container
│   └── ...
├── mer-front-end/
│   ├── Dockerfile             # Frontend container
│   └── ...
├── mer-admin-panel/
│   ├── Dockerfile             # Admin container
│   └── ...
└── nginx/
    ├── nginx.conf             # Nginx reverse proxy
    └── ssl/                   # SSL certificates
```

---

## 🛠️ Các lệnh thường dùng

### 🎯 Deployment Scripts

```bash
# Deployment
./run-local-native.sh          # Native (no Docker)
./run-docker-local.sh          # Docker local
sudo ./run-docker-production.sh # Production with SSL

# Utilities
./health-check.sh              # Health monitoring
./backup.sh                    # Database backup
./restore.sh                   # Database restore
./setup-cron-backup.sh         # Auto backup setup
```

📖 **Full Guide**: [docs/DEPLOYMENT_SCRIPTS.md](./docs/DEPLOYMENT_SCRIPTS.md)

### Makefile Commands

```bash
make help           # Hiển thị tất cả commands
make dev            # Start development
make dev-build      # Build và start development
make dev-logs       # Xem logs development
make dev-down       # Stop development

make prod           # Start production
make prod-build     # Build và start production
make prod-logs      # Xem logs production
make prod-down      # Stop production

make seed           # Import seed data (dev)
make seed-prod      # Import seed data (prod)
make backup-db      # Backup database
make clean          # Xóa tất cả containers và volumes

# API Testing commands
make test-api       # Test tất cả API endpoints (dev)
make test-api-prod  # Test tất cả API endpoints (prod)
make health-check   # Kiểm tra health của services
make swagger        # Mở Swagger UI documentation
```

### Docker Compose Commands

```bash
# Development
docker-compose --env-file .env.local up -d
docker-compose --env-file .env.local down
docker-compose --env-file .env.local logs -f
docker-compose --env-file .env.local ps

# Production
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
docker-compose -f docker-compose.prod.yml --env-file .env.prod down
docker-compose -f docker-compose.prod.yml --env-file .env.prod logs -f
```

### Container Management

```bash
# Vào container
docker exec -it victormer-backend-dev sh
docker exec -it victormer-mongodb-dev mongosh

# Restart service
docker-compose restart backend
docker-compose restart frontend

# Xem logs của service cụ thể
docker-compose logs -f backend
docker-compose logs -f mongodb
```

---

## 📝 Hướng dẫn lấy API Keys

### 1. Gmail App Password
1. Vào https://myaccount.google.com/security
2. Bật "2-Step Verification"
3. Tìm "App passwords"
4. Chọn "Mail" và "Other"
5. Copy password và paste vào `EMAIL_PASS`

### 2. Cloudinary
1. Đăng ký tại https://cloudinary.com
2. Vào Dashboard
3. Copy: Cloud name, API Key, API Secret
4. Tạo Upload Preset: Settings → Upload → Add upload preset

### 3. Stripe
1. Đăng ký tại https://stripe.com
2. Vào Developers → API keys
3. Copy "Secret key" (test hoặc live)
4. **Development**: Dùng test keys (sk_test_...)
5. **Production**: Dùng live keys (sk_live_...)

### 4. Google OAuth
1. Vào https://console.cloud.google.com
2. Tạo project mới
3. APIs & Services → Credentials
4. Create OAuth 2.0 Client ID
5. Thêm Authorized redirect URIs:
   - Development: `http://localhost:3500`
   - Production: `https://yourdomain.com`
6. Copy Client ID

---

## 🚀 Deploy lên VPS Production

### Cấu hình Environment Variables

```bash
# Generate secure credentials
openssl rand -hex 64  # TOKEN_SECRET
openssl rand -hex 64  # JWT_SECRET_FOR_VERIFY
openssl rand -base64 32  # MONGO_ROOT_PASSWORD
```

**File .env.prod mẫu:**
```bash
# MongoDB - Dùng credentials phức tạp
MONGO_ROOT_USER=victormer_prod_db_master_2024_a7f3c9e2
MONGO_ROOT_PASSWORD=Pr0d_V1ct0r_M0ng0DB_S3cur3_P@ssw0rd_2024!K9mX7nQ2
MONGO_DB_NAME=victormer_ecommerce_production_2024

# JWT Secrets - 128 ký tự
TOKEN_SECRET=8f7e6d5c4b3a2918f7e6d5c4b3a2918f7e6d5c4b3a2918f7e6d5c4b3a291...
JWT_SECRET_FOR_VERIFY=9a8b7c6d5e4f3a2b1c9a8b7c6d5e4f3a2b1c9a8b7c6d5e4f3a2b1c...

# Email - Production email
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASS=your_production_app_password

# Cloudinary - Production credentials
CLOUDINARY_NAME=your_production_cloud
CLOUDINARY_API_KEY=your_production_key
CLOUDINARY_API_SECRET=your_production_secret
CLOUDINARY_UPLOAD_PRESET=your_production_preset

# Stripe - LIVE keys
STRIPE_KEY=sk_live_your_live_secret_key
STRIPE_PUBLIC_KEY=pk_live_your_live_public_key

# Google OAuth - Production
GOOGLE_CLIENT_ID=your_production_client_id.apps.googleusercontent.com

# URLs - Production domains
BACKEND_URL=https://api.yourdomain.com
STORE_URL=https://yourdomain.com
ADMIN_URL=https://admin.yourdomain.com
```

### SSL Certificate Auto-Renew

```bash
# Tạo cron job
crontab -e

# Thêm dòng này (renew mỗi tháng)
0 0 1 * * docker run --rm -v /var/www/victor-mer/nginx/ssl:/etc/letsencrypt certbot/certbot renew && docker-compose -f /var/www/victor-mer/docker-compose.prod.yml restart nginx
```

### Zero-Downtime Update

```bash
# Pull latest code
cd /var/www/victor-mer
git pull origin main

# Update từng service
docker-compose -f docker-compose.prod.yml up -d --no-deps --build backend
docker-compose -f docker-compose.prod.yml up -d --no-deps --build frontend
docker-compose -f docker-compose.prod.yml up -d --no-deps --build admin
```

---

## 🔐 Bảo mật

### Checklist Bảo Mật Production

#### MongoDB
- [x] Username phức tạp (không dùng admin, root)
- [x] Password tối thiểu 20 ký tự với chữ hoa, thường, số, ký tự đặc biệt
- [x] Database name không dễ đoán
- [x] Chỉ bind 127.0.0.1 (không expose ra ngoài)
- [x] Enable authentication
- [x] Backup định kỳ

#### JWT & Tokens
- [x] TOKEN_SECRET: 128 ký tự random
- [x] JWT_SECRET_FOR_VERIFY: 128 ký tự random khác
- [x] Không dùng lại secrets từ development
- [x] Rotate secrets định kỳ (3-6 tháng)

#### API Keys
- [x] Stripe: Dùng LIVE keys, không dùng test keys
- [x] Cloudinary: Tạo credentials riêng cho production
- [x] Google OAuth: Whitelist domain production
- [x] Email: Dùng email domain riêng

#### Network & Firewall
- [x] UFW enabled
- [x] Chỉ mở port 22, 80, 443
- [x] MongoDB không expose port ra ngoài
- [x] Backend API chỉ qua Nginx reverse proxy
- [x] Rate limiting enabled

#### SSL/TLS
- [x] HTTPS cho tất cả domains
- [x] Redirect HTTP → HTTPS
- [x] TLS 1.2+ only
- [x] Strong ciphers
- [x] Auto-renew certificate

### IP Whitelist cho Admin Panel (Optional)

Thêm vào `nginx/nginx.conf`:
```nginx
# Admin Panel
server {
    listen 443 ssl http2;
    server_name admin.yourdomain.com;
    
    # Chỉ cho phép IP cụ thể truy cập admin
    allow 1.2.3.4;        # IP văn phòng
    allow 5.6.7.8;        # IP nhà
    deny all;
    
    location / {
        proxy_pass http://admin;
        # ...
    }
}
```

### Fail2Ban cho SSH

```bash
# Cài đặt
sudo apt install fail2ban -y

# Cấu hình
sudo nano /etc/fail2ban/jail.local
```

Thêm:
```ini
[sshd]
enabled = true
port = 22
maxretry = 3
bantime = 3600
```

### Password Requirements

**Development (.env.local)**
- Minimum: 12 ký tự
- Ví dụ: `V1ct0r_D3v_M0ng0_P@ssw0rd_2024!xYz`

**Production (.env.prod)**
- Minimum: 20 ký tự
- Bắt buộc: Chữ hoa, chữ thường, số, ký tự đặc biệt
- Không dùng từ điển, tên dự án, năm sinh
- Ví dụ: `Pr0d_V1ct0r_M0ng0DB_S3cur3_P@ssw0rd_2024!K9mX7nQ2`

### Rotate Credentials

**Khi nào cần đổi?**
- Mỗi 3-6 tháng (định kỳ)
- Khi có nhân viên nghỉ việc
- Khi nghi ngờ bị lộ credentials
- Sau khi phát hiện security breach

**Cách đổi MongoDB Password:**
```bash
# 1. Vào MongoDB container
docker exec -it victormer-mongodb-prod mongosh -u OLD_USER -p OLD_PASS --authenticationDatabase admin

# 2. Đổi password
use admin
db.changeUserPassword("OLD_USER", "NEW_PASSWORD")

# 3. Update .env.prod
nano .env.prod

# 4. Restart services
docker-compose -f docker-compose.prod.yml restart
```

---

## 📊 Monitoring & Backup

### 🏥 Health Check

```bash
./health-check.sh
```

Checks: MongoDB, Backend API, Frontend, Admin Panel, Nginx, SSL, System Resources

### Xem Logs

```bash
# Tất cả services
make logs

# Service cụ thể
docker-compose logs -f backend
docker-compose logs -f mongodb
docker-compose logs -f nginx

# Logs với timestamp
docker-compose logs -f --timestamps

# Xem failed login attempts
docker-compose logs backend | grep "failed"

# Xem suspicious requests
docker-compose logs nginx | grep "403\|404\|500"
```

### Kiểm tra Resource Usage

```bash
# Container stats
docker stats

# Disk usage
df -h

# Memory usage
free -h
```

### 💾 Backup & Restore

```bash
./backup.sh                    # Backup database & config
./restore.sh                   # Restore from backup
./setup-cron-backup.sh         # Setup auto backup
```

Features: MongoDB backup, environment files, Nginx config, auto-cleanup (7 days)

---

## 🐛 Troubleshooting

### Port đã được sử dụng

```bash
# Kiểm tra port đang dùng
sudo lsof -i :3500
sudo lsof -i :7000
sudo lsof -i :4000

# Thay đổi port trong .env.local
FRONTEND_PORT=3501
BACKEND_PORT=7001
ADMIN_PORT=4001
```

### MongoDB connection failed

```bash
# Kiểm tra MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb

# Kiểm tra credentials
docker exec -it victormer-mongodb-dev mongosh -u USER -p PASS --authenticationDatabase admin
```

### Out of memory

```bash
# Kiểm tra memory usage
docker stats

# Development: Giảm resource limits trong docker-compose.yml
# Production: Tăng RAM cho VPS hoặc tăng swap

# Tăng swap
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Build failed

```bash
# Clean và rebuild
make clean
make dev-build

# Xóa cache Docker
docker system prune -a
```

### SSL certificate issues

```bash
# Check certificate
openssl x509 -in nginx/ssl/fullchain.pem -text -noout

# Renew certificate
docker run --rm -v $(pwd)/nginx/ssl:/etc/letsencrypt certbot/certbot renew

# Restart nginx
docker-compose -f docker-compose.prod.yml restart nginx
```

### Container không start

```bash
# Check logs
docker-compose logs <service-name>

# Check container status
docker ps -a

# Restart specific service
docker-compose restart <service-name>

# Rebuild specific service
docker-compose up -d --no-deps --build <service-name>
```

---

## 📝 Development vs Production

| Feature | Development | Production |
|---------|-------------|------------|
| Hot reload | ✅ Yes | ❌ No |
| Source maps | ✅ Yes | ❌ No |
| Minification | ❌ No | ✅ Yes |
| Resource limits | Low | High |
| Security | Basic | Enhanced |
| SSL | ❌ No | ✅ Yes |
| Nginx | ❌ No | ✅ Yes |
| MongoDB Auth | Simple | Strong |
| Rate Limiting | ❌ No | ✅ Yes |
| Backup | Manual | Automated |

---

## 🎯 Performance Optimization

### 1. Enable Redis Cache (Optional)

Thêm Redis vào `docker-compose.prod.yml`:

```yaml
redis:
  image: redis:7-alpine
  container_name: victormer-redis-prod
  restart: always
  ports:
    - "127.0.0.1:6379:6379"
  networks:
    - victormer-network
  deploy:
    resources:
      limits:
        cpus: '0.5'
        memory: 256M
```

### 2. CDN cho Static Assets

Sử dụng Cloudflare hoặc AWS CloudFront để cache static files.

### 3. Database Indexing

Đã được cấu hình tự động trong `mongo-init.js`:
- Users: email (unique), createdAt
- Products: slug (unique), category, status, createdAt
- Orders: userId, orderNumber (unique), status, createdAt
- Categories & Brands: slug (unique)
- Reviews: productId, userId

### 4. Nginx Optimization

Đã được cấu hình:
- Gzip compression
- Keepalive connections
- Worker processes auto
- Client max body size: 20MB

---

## 🚨 Emergency Response

### Nếu bị hack:

1. **Ngay lập tức stop tất cả services**
   ```bash
   docker-compose -f docker-compose.prod.yml down
   ```

2. **Backup database hiện tại**
   ```bash
   make backup-db
   ```

3. **Đổi TẤT CẢ credentials**
   - MongoDB password
   - JWT secrets
   - API keys (Stripe, Cloudinary, etc.)

4. **Review logs**
   ```bash
   docker-compose -f docker-compose.prod.yml logs > incident.log
   ```

5. **Restore từ backup sạch (nếu cần)**

6. **Update và restart với credentials mới**

---

## 📞 Support & Contact

Nếu gặp vấn đề:
1. Kiểm tra logs: `make logs` hoặc `make prod-logs`
2. Xem troubleshooting section
3. Check container status: `docker-compose ps`
4. Verify environment variables: `cat .env.local` hoặc `cat .env.prod`
5. Test connectivity: `curl -v https://api.yourdomain.com/health`

---

## 📄 License

MIT License

---

---

## 🚀 Quick Test - Chạy ngay sau khi setup

Sau khi chạy `make dev`, test ngay với các lệnh sau:

```bash
# 1. Kiểm tra tất cả services đang chạy
make health-check

# 2. Test tất cả API endpoints tự động
make test-api

# 3. Mở Swagger UI để test thủ công
make swagger

# 4. Hoặc test nhanh với curl
curl http://localhost:7000/health
curl http://localhost:7000/api/product/all | jq
curl http://localhost:7000/api/category/all | jq
```

**Kết quả mong đợi:**
- ✅ Backend health check: OK
- ✅ Frontend accessible: HTTP 200
- ✅ Admin panel accessible: HTTP 200
- ✅ MongoDB ping: OK
- ✅ Swagger UI: http://localhost:7000/api-docs
- ✅ 80+ API endpoints hoạt động

---

## 📚 Documentation Files

- **[README.md](./README.md)** - Hướng dẫn deployment và setup
- **[API_ENDPOINTS.md](./API_ENDPOINTS.md)** - Chi tiết tất cả API endpoints
- **[OPTIMIZATION_PLAN.md](./OPTIMIZATION_PLAN.md)** - Kế hoạch tối ưu hóa
- **[CHANGELOG.md](./CHANGELOG.md)** - Lịch sử thay đổi
- **Swagger UI** - http://localhost:7000/api-docs (interactive)

---

**Built with ❤️ by Victor Mer Development Team**

© 2024 Victor Mer Platform. All rights reserved.
