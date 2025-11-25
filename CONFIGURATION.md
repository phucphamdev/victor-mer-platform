# 📋 Hướng dẫn cấu hình tập trung

## 🎯 Tổng quan

Dự án sử dụng **hệ thống cấu hình tập trung** với file `config.env` làm nguồn duy nhất cho tất cả cấu hình. Khi bạn thay đổi `config.env`, tất cả các file `.env` của từng service sẽ được tự động tạo lại.

## 📁 Cấu trúc file cấu hình

```
ecommerce-platform/
├── config.env                    # ⭐ FILE CẤU HÌNH CHÍNH (nguồn duy nhất)
├── config.env.example            # Template mẫu
│
├── .env                          # Auto-generated cho docker-compose
├── config.json                   # Auto-generated cho scripts
│
├── backend/
│   └── .env                     # Auto-generated cho Laravel
│
└── apps/
    ├── landing/
    │   └── .env.local           # Auto-generated cho Next.js
    └── storefront/
        └── .env.local           # Auto-generated cho Next.js
```

## 🚀 Bắt đầu

### 1. Tạo file cấu hình

```bash
# Copy từ template
cp config.env.example config.env

# Chỉnh sửa theo nhu cầu
nano config.env
```

### 2. Tạo file .env cho tất cả services

```bash
bash scripts/generate-config.sh
```

### 3. Khởi động dự án

```bash
bash scripts/start.sh
```

## 🔧 Các biến cấu hình quan trọng

### 🌐 Ports

| Biến | Mô tả | Mặc định |
|------|-------|----------|
| `LANDING_PORT` | Port cho landing page | 3008 |
| `STOREFRONT_PORT` | Port cho storefront | 3009 |
| `BACKEND_PORT` | Port cho backend API | 8080 |
| `MYSQL_PORT` | Port MySQL (external) | 3306 |
| `REDIS_PORT` | Port Redis (external) | 6379 |
| `ELASTICSEARCH_PORT` | Port Elasticsearch | 9200 |
| `KIBANA_PORT` | Port Kibana | 5601 |
| `MAILHOG_WEB_PORT` | Port MailHog web UI | 8025 |

### 🔗 URLs

| Biến | Mô tả | Mặc định |
|------|-------|----------|
| `LANDING_URL` | URL landing page | http://localhost:3008 |
| `STOREFRONT_URL` | URL storefront | http://localhost:3009 |
| `BACKEND_URL` | URL backend API | http://localhost:8080 |

### 🗄️ Database

| Biến | Mô tả | Mặc định |
|------|-------|----------|
| `DB_DATABASE` | Tên database | ecommerce_db |
| `DB_USERNAME` | Username | ecommerce_user |
| `DB_PASSWORD` | Password | ecommerce_pass_2024 |
| `DB_ROOT_PASSWORD` | Root password | root_pass_2024 |

### 🌍 Application

| Biến | Mô tả | Mặc định |
|------|-------|----------|
| `APP_NAME` | Tên ứng dụng | Victor Mer Platform |
| `APP_ENV` | Environment | local |
| `APP_DEBUG` | Debug mode | true |
| `APP_TIMEZONE` | Timezone | Asia/Ho_Chi_Minh |
| `APP_LOCALE` | Ngôn ngữ | vi |
| `APP_CURRENCY` | Đơn vị tiền tệ | VND |

### 🏢 Company Information

| Biến | Mô tả | Mặc định |
|------|-------|----------|
| `COMPANY_NAME` | Tên công ty | Victor Mer |
| `COMPANY_SLOGAN` | Slogan | Built with ❤️ by Victor Mer |
| `COMPANY_EMAIL` | Email liên hệ | phuc.pham.dev@gmail.com |
| `COMPANY_PHONE` | Số điện thoại | +84 938 788 091 |
| `COMPANY_ADDRESS` | Địa chỉ | 1180 Street, Ward 8, Go Vap District, Ho Chi Minh City, 700000 |

## 📝 Các tình huống thường gặp

### 1. Thay đổi port của một service

**Cách 1: Sử dụng script (khuyến nghị)**

```bash
# Thay đổi port storefront
bash scripts/change-port.sh storefront 3005

# Thay đổi port backend
bash scripts/change-port.sh backend 9000

# Thay đổi port MySQL
bash scripts/change-port.sh mysql 3307
```

**Cách 2: Chỉnh sửa thủ công**

```bash
# 1. Chỉnh sửa config.env
nano config.env
# Thay đổi: STOREFRONT_PORT=3005

# 2. Tạo lại file cấu hình
bash scripts/generate-config.sh

# 3. Khởi động lại
docker-compose down && docker-compose up -d
```

### 2. Thay đổi thông tin database

```bash
# 1. Chỉnh sửa config.env
nano config.env

# Thay đổi:
# DB_DATABASE=my_database
# DB_USERNAME=my_user
# DB_PASSWORD=my_password

# 2. Tạo lại cấu hình
bash scripts/generate-config.sh

# 3. Khởi động lại (sẽ tạo database mới)
docker-compose down -v
docker-compose up -d
```

### 3. Thay đổi timezone và locale

```bash
# 1. Chỉnh sửa config.env
nano config.env

# Thay đổi:
# APP_TIMEZONE=Asia/Bangkok
# APP_LOCALE=th
# APP_CURRENCY=THB

# 2. Tạo lại cấu hình
bash scripts/generate-config.sh

# 3. Khởi động lại backend
docker-compose restart backend
```

### 4. Cấu hình mail server thật

```bash
# 1. Chỉnh sửa config.env
nano config.env

# Thay đổi:
# MAIL_MAILER=smtp
# MAIL_HOST=smtp.gmail.com
# MAIL_PORT=587
# MAIL_USERNAME=your-email@gmail.com
# MAIL_PASSWORD=your-app-password
# MAIL_ENCRYPTION=tls
# MAIL_FROM_ADDRESS=your-email@gmail.com

# 2. Tạo lại cấu hình
bash scripts/generate-config.sh

# 3. Khởi động lại backend
docker-compose restart backend
```

### 5. Thay đổi memory cho Elasticsearch

```bash
# 1. Chỉnh sửa config.env
nano config.env

# Thay đổi:
# ELASTICSEARCH_MEMORY_MIN=1g
# ELASTICSEARCH_MEMORY_MAX=2g

# 2. Tạo lại cấu hình
bash scripts/generate-config.sh

# 3. Khởi động lại Elasticsearch
docker-compose restart elasticsearch
```

### 6. Chuyển sang production mode

```bash
# 1. Chỉnh sửa config.env
nano config.env

# Thay đổi:
# APP_ENV=production
# APP_DEBUG=false
# NODE_ENV=production

# 2. Tạo lại cấu hình
bash scripts/generate-config.sh

# 3. Rebuild và khởi động lại
docker-compose down
docker-compose build
docker-compose up -d
```

## 🛠️ Scripts hữu ích

### Xem thông tin cấu hình hiện tại

```bash
bash scripts/info.sh
```

Output:
```
╔════════════════════════════════════════════════════════════╗
║      VICTOR MER E-COMMERCE - CONFIGURATION INFO          ║
╚════════════════════════════════════════════════════════════╝

📦 PROJECT INFORMATION
  Name:        ecommerce-platform
  Environment: local
  Debug:       true

🌐 URLS & PORTS
  Landing:     http://localhost:3008 (Port: 3008)
  Storefront:  http://localhost:3009 (Port: 3009)
  Backend:     http://localhost:8080 (Port: 8080)
  Admin:       http://localhost:8080/admin

🗄️  DATABASE
  Host:        mysql (External Port: 3306)
  Database:    ecommerce_db
  Username:    ecommerce_user
```

### Tạo lại tất cả file cấu hình

```bash
bash scripts/generate-config.sh
```

### Thay đổi port nhanh

```bash
bash scripts/change-port.sh [service] [port]

# Ví dụ:
bash scripts/change-port.sh storefront 3005
bash scripts/change-port.sh backend 9000
```

## ⚠️ Lưu ý quan trọng

### ❌ KHÔNG nên làm

1. **KHÔNG chỉnh sửa trực tiếp các file .env được auto-generated**
   - `.env` (root)
   - `backend/.env`
   - `apps/storefront/.env.local`
   - `apps/landing/.env.local`
   
   ➡️ Các file này sẽ bị ghi đè khi chạy `generate-config.sh`

2. **KHÔNG hard-code giá trị trong code**
   - Dockerfile
   - docker-compose.yml
   - next.config.js
   - package.json scripts
   
   ➡️ Luôn sử dụng biến môi trường

### ✅ NÊN làm

1. **Chỉ chỉnh sửa `config.env`**
2. **Chạy `generate-config.sh` sau mỗi thay đổi**
3. **Commit `config.env.example` vào git**
4. **KHÔNG commit `config.env` (đã có trong .gitignore)**

## 🔄 Workflow chuẩn

```bash
# 1. Chỉnh sửa cấu hình
nano config.env

# 2. Tạo lại file .env
bash scripts/generate-config.sh

# 3. Khởi động lại services cần thiết
docker-compose restart backend
# hoặc
docker-compose down && docker-compose up -d

# 4. Kiểm tra
bash scripts/info.sh
```

## 🐛 Troubleshooting

### Port đã được sử dụng

```bash
# Kiểm tra port nào đang bị chiếm
sudo lsof -i :3001

# Thay đổi port
bash scripts/change-port.sh storefront 3005
docker-compose down && docker-compose up -d
```

### File cấu hình bị lỗi

```bash
# Xóa tất cả file .env
rm .env backend/.env apps/storefront/.env.local apps/landing/.env.local

# Tạo lại từ config.env
bash scripts/generate-config.sh
```

### Cần reset toàn bộ

```bash
# Dừng và xóa tất cả containers + volumes
docker-compose down -v

# Tạo lại cấu hình
bash scripts/generate-config.sh

# Khởi động lại
docker-compose up -d
```

## 📚 Tham khảo thêm

- [README.md](README.md) - Hướng dẫn tổng quan
- [SETUP.md](SETUP.md) - Hướng dẫn cài đặt chi tiết
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Laravel Environment Configuration](https://laravel.com/docs/configuration)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
