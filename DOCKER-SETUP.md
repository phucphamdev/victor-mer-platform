# Docker Setup Guide

Hướng dẫn sử dụng Docker Compose cho môi trường Development và Production.

## 📋 Tổng quan

Dự án có 2 file docker-compose riêng biệt:

- **docker-compose.dev.yml** - Môi trường phát triển (nhẹ, tập trung code)
- **docker-compose.prod.yml** - Môi trường production (đầy đủ SSL, reverse proxy, security)

## 🚀 Development Environment (Localhost)

### Đặc điểm
- ✅ Hot reload cho Next.js và Laravel
- ✅ Expose ports trực tiếp (không qua proxy)
- ✅ Volume mount code để chỉnh sửa real-time
- ✅ MailHog để test email
- ✅ Không có SSL
- ✅ Nhẹ, khởi động nhanh

### Cách sử dụng

```bash
# 1. Copy và chỉnh sửa file config
cp config.env.example config.env
nano config.env

# 2. Tạo file .env cho các services
bash scripts/generate-config.sh

# 3. Khởi động development environment
docker-compose -f docker-compose.dev.yml up -d

# 4. Xem logs
docker-compose -f docker-compose.dev.yml logs -f

# 5. Dừng services
docker-compose -f docker-compose.dev.yml down

# 6. Dừng và xóa volumes (reset database)
docker-compose -f docker-compose.dev.yml down -v
```

### Truy cập services

- Landing Page: http://localhost:3008
- Storefront: http://localhost:3009
- Backend API: http://localhost:8080
- MySQL: localhost:3306
- Redis: localhost:6379
- MailHog UI: http://localhost:8025

## 🏭 Production Environment

### Đặc điểm
- ✅ Nginx reverse proxy với SSL/TLS
- ✅ Security headers
- ✅ Gzip compression
- ✅ Redis với password
- ✅ Elasticsearch với authentication
- ✅ Logging với rotation
- ✅ Health checks
- ✅ Auto restart
- ✅ Không expose ports trực tiếp (chỉ qua nginx)

### Chuẩn bị

#### 1. Tạo SSL certificates

```bash
# Tạo thư mục SSL
mkdir -p nginx/ssl

# Option 1: Self-signed certificate (cho testing)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/key.pem \
  -out nginx/ssl/cert.pem \
  -subj "/C=VN/ST=HCM/L=HoChiMinh/O=YourCompany/CN=yourdomain.com"

# Option 2: Let's Encrypt (cho production thật)
# Sử dụng certbot hoặc acme.sh
```

#### 2. Tạo Basic Auth cho Kibana (optional)

```bash
# Cài đặt apache2-utils
sudo apt-get install apache2-utils

# Tạo password file
htpasswd -c nginx/.htpasswd admin
```

#### 3. Cấu hình file config.env cho production

```bash
cp config.env.example config.env.prod
nano config.env.prod
```

Chỉnh sửa các giá trị sau:
```env
APP_ENV=production
APP_DEBUG=false
NODE_ENV=production

# Thêm password cho Redis
REDIS_PASSWORD=your-strong-redis-password

# Thêm password cho Elasticsearch
ELASTICSEARCH_PASSWORD=your-strong-elastic-password

# Cấu hình SMTP thật (không dùng MailHog)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls

# Cấu hình domain
LANDING_URL=https://landing.yourdomain.com
STOREFRONT_URL=https://store.yourdomain.com
BACKEND_URL=https://api.yourdomain.com
```

#### 4. Cập nhật nginx config với domain của bạn

```bash
nano nginx/conf.d/default.conf
# Thay đổi server_name từ *.yourdomain.com thành domain thật của bạn
```

### Khởi động Production

```bash
# 1. Load config production
export $(cat config.env.prod | xargs)

# 2. Build và khởi động
docker-compose -f docker-compose.prod.yml up -d --build

# 3. Xem logs
docker-compose -f docker-compose.prod.yml logs -f

# 4. Kiểm tra health
docker-compose -f docker-compose.prod.yml ps
```

### Truy cập services (Production)

- Landing Page: https://landing.yourdomain.com
- Storefront: https://store.yourdomain.com
- Backend API: https://api.yourdomain.com
- Kibana: https://kibana.yourdomain.com (với basic auth)

## 🔧 Các lệnh hữu ích

### Development

```bash
# Rebuild một service cụ thể
docker-compose -f docker-compose.dev.yml up -d --build backend

# Vào shell của container
docker-compose -f docker-compose.dev.yml exec backend bash
docker-compose -f docker-compose.dev.yml exec frontend sh

# Xem logs của một service
docker-compose -f docker-compose.dev.yml logs -f backend

# Restart một service
docker-compose -f docker-compose.dev.yml restart backend
```

### Production

```bash
# Update code và restart
git pull
docker-compose -f docker-compose.prod.yml up -d --build

# Backup database
docker-compose -f docker-compose.prod.yml exec mysql mysqldump -u root -p${DB_ROOT_PASSWORD} ${DB_DATABASE} > backup.sql

# Restore database
docker-compose -f docker-compose.prod.yml exec -T mysql mysql -u root -p${DB_ROOT_PASSWORD} ${DB_DATABASE} < backup.sql

# Xem resource usage
docker stats

# Clean up unused images
docker system prune -a
```

## 📊 Monitoring

### Development
- MailHog UI: http://localhost:8025 - Xem email test

### Production
- Kibana: https://kibana.yourdomain.com - Elasticsearch monitoring
- Nginx logs: `docker-compose -f docker-compose.prod.yml logs nginx-proxy`
- Application logs: `docker-compose -f docker-compose.prod.yml logs backend`

## 🔒 Security Checklist (Production)

- [ ] Đổi tất cả passwords mặc định
- [ ] Sử dụng SSL certificates hợp lệ
- [ ] Cấu hình firewall (chỉ mở port 80, 443)
- [ ] Enable basic auth cho Kibana
- [ ] Backup database định kỳ
- [ ] Monitor logs thường xuyên
- [ ] Update images thường xuyên
- [ ] Giới hạn resource cho containers

## 🐛 Troubleshooting

### Port đã được sử dụng
```bash
# Kiểm tra port nào đang chạy
sudo lsof -i :3008
sudo lsof -i :8080

# Đổi port trong config.env
```

### Container không khởi động
```bash
# Xem logs chi tiết
docker-compose -f docker-compose.dev.yml logs backend

# Rebuild từ đầu
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d --build
```

### Database connection failed
```bash
# Kiểm tra MySQL đã ready chưa
docker-compose -f docker-compose.dev.yml exec mysql mysqladmin ping -h localhost -u root -p

# Reset database
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d
```

## 📝 Notes

- File `docker-compose.yml` cũ vẫn giữ nguyên để tương thích
- Development environment không cần SSL certificates
- Production environment cần cấu hình DNS trỏ về server
- Volumes được tách riêng cho dev và prod (mysql-dev-data vs mysql-prod-data)
