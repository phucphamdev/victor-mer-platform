# Victor Mer E-Commerce Platform

Platform thương mại điện tử đa kênh với Laravel backend và Next.js frontend.

## 🚀 Cấu hình tập trung

Dự án sử dụng **hệ thống cấu hình tập trung** - bạn chỉ cần chỉnh sửa **một file duy nhất** để thay đổi toàn bộ cấu hình.

### File cấu hình chính: `config.env`

Tất cả các cấu hình (ports, URLs, database, mail, v.v.) được quản lý trong file `config.env`. Khi bạn thay đổi file này và chạy script generate, tất cả các file `.env` của từng service sẽ được tự động cập nhật.

```bash
# Chỉnh sửa cấu hình
nano config.env

# Tạo lại tất cả file .env
bash scripts/generate-config.sh
```

## 📋 Yêu cầu hệ thống

- Docker & Docker Compose
- Node.js 18+
- Bash shell

## ⚡ Cài đặt nhanh

### 1. Clone repository

```bash
git clone <repository-url>
cd ecommerce-platform
```

### 2. Cấu hình

```bash
# Chỉnh sửa config.env theo nhu cầu
nano config.env

# Tạo file cấu hình cho tất cả services
bash scripts/generate-config.sh
```

### 3. Khởi động

```bash
# Development mode
bash scripts/dev.sh

# Production mode
bash scripts/start.sh
```

## 🔧 Scripts hữu ích

### Xem thông tin cấu hình hiện tại
```bash
bash scripts/info.sh
```

### Thay đổi port nhanh
```bash
# Thay đổi port storefront
bash scripts/change-port.sh storefront 3005

# Thay đổi port backend
bash scripts/change-port.sh backend 9000

# Thay đổi port MySQL
bash scripts/change-port.sh mysql 3307
```

### Tạo lại cấu hình
```bash
bash scripts/generate-config.sh
```

## 📁 Cấu trúc dự án

```
ecommerce-platform/
├── config.env                    # ⭐ FILE CẤU HÌNH CHÍNH
├── .env                          # Auto-generated từ config.env
├── docker-compose.yml            # Sử dụng biến từ .env
│
├── apps/
│   ├── landing/                  # Landing page (Next.js)
│   │   └── .env.local           # Auto-generated
│   └── storefront/              # Storefront (Next.js)
│       └── .env.local           # Auto-generated
│
├── backend/                      # Laravel Application
│   └── .env                     # Auto-generated
│
└── scripts/
    ├── generate-config.sh       # Tạo file .env từ config.env
    ├── change-port.sh           # Thay đổi port nhanh
    ├── info.sh                  # Hiển thị thông tin
    ├── dev.sh                   # Khởi động development
    └── start.sh                 # Khởi động production
```

## 🎯 Workflow thay đổi cấu hình

### Thay đổi port

```bash
# Cách 1: Sử dụng script
bash scripts/change-port.sh storefront 3005

# Cách 2: Chỉnh sửa trực tiếp config.env
nano config.env
# Thay đổi STOREFRONT_PORT=3005
bash scripts/generate-config.sh

# Khởi động lại
docker-compose down && docker-compose up -d
```

### Thay đổi database credentials

```bash
# Chỉnh sửa config.env
nano config.env
# Thay đổi:
# DB_DATABASE=my_database
# DB_USERNAME=my_user
# DB_PASSWORD=my_password

# Tạo lại cấu hình
bash scripts/generate-config.sh

# Khởi động lại
docker-compose down && docker-compose up -d
```

### Thay đổi timezone hoặc locale

```bash
# Chỉnh sửa config.env
nano config.env
# Thay đổi:
# APP_TIMEZONE=Asia/Bangkok
# APP_LOCALE=th
# APP_CURRENCY=THB

# Tạo lại cấu hình
bash scripts/generate-config.sh
```

## 🌐 Truy cập ứng dụng

Sau khi khởi động, truy cập:

- **Landing Page**: http://localhost:3000
- **Storefront**: http://localhost:3001
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin
- **Kibana**: http://localhost:5601
- **MailHog**: http://localhost:8025

(Ports có thể khác nếu bạn đã thay đổi trong `config.env`)

## 🔑 Các biến cấu hình quan trọng

### Ports
- `LANDING_PORT` - Port cho landing page
- `STOREFRONT_PORT` - Port cho storefront
- `BACKEND_PORT` - Port cho backend API
- `MYSQL_PORT` - Port cho MySQL (external)
- `REDIS_PORT` - Port cho Redis (external)

### URLs
- `LANDING_URL` - URL truy cập landing page
- `STOREFRONT_URL` - URL truy cập storefront
- `BACKEND_URL` - URL truy cập backend API

### Database
- `DB_DATABASE` - Tên database
- `DB_USERNAME` - Username database
- `DB_PASSWORD` - Password database
- `DB_ROOT_PASSWORD` - Root password MySQL

### Application
- `APP_ENV` - Environment (local/production)
- `APP_DEBUG` - Debug mode (true/false)
- `APP_TIMEZONE` - Timezone
- `APP_LOCALE` - Ngôn ngữ mặc định
- `APP_CURRENCY` - Đơn vị tiền tệ

## 🛠️ Troubleshooting

### Port đã được sử dụng

```bash
# Thay đổi port bị conflict
bash scripts/change-port.sh storefront 3005
docker-compose down && docker-compose up -d
```

### Cần reset toàn bộ cấu hình

```bash
# Xóa các file .env cũ
rm .env backend/.env apps/storefront/.env.local apps/landing/.env.local

# Tạo lại từ config.env
bash scripts/generate-config.sh
```

### Xem logs

```bash
# Xem logs tất cả services
docker-compose logs -f

# Xem logs một service cụ thể
docker-compose logs -f backend
docker-compose logs -f storefront
```

## � Productuion Deployment

### Quick Deploy

```bash
# 1. Chuẩn bị cấu hình production
cp config.env.prod.example config.env.prod
nano config.env.prod

# 2. Chạy script deploy tự động
bash scripts/deploy-production.sh
```

### Quản lý Production

```bash
# Sử dụng script quản lý
bash scripts/manage-production.sh

# Hoặc các lệnh thủ công:
docker-compose -f docker-compose.prod.yml ps          # Xem trạng thái
docker-compose -f docker-compose.prod.yml logs -f     # Xem logs
docker-compose -f docker-compose.prod.yml restart     # Restart services
```

### Các môi trường khác nhau

```bash
# Development (lightweight, hot-reload)
docker-compose -f docker-compose.dev.yml up -d

# Production (full-featured, optimized)
docker-compose -f docker-compose.prod.yml up -d

# Default (balanced)
docker-compose up -d
```

## 📚 Tài liệu thêm

- [SETUP.md](SETUP.md) - Hướng dẫn cài đặt chi tiết
- [CONFIGURATION.md](CONFIGURATION.md) - Hướng dẫn cấu hình chi tiết
- [PRODUCTION-DEPLOY.md](PRODUCTION-DEPLOY.md) - Hướng dẫn deploy production
- [Next.js Documentation](https://nextjs.org/docs)
- [Laravel Documentation](https://laravel.com/docs)

## 📞 Liên hệ

**Victor Mer Platform**
- � Emacil: phuc.pham.dev@gmail.com
- 📱 Phone: +84 938 788 091
- 📍 Address: 1180 Street, Ward 8, Go Vap District, Ho Chi Minh City, 700000

Built with ❤️ by Victor Mer

## 📄 License

This project is licensed under the MIT License.
