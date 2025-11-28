# 🚀 Victor Mer Platform - Docker Deployment Guide

**Built with ❤️ by Victor Mer Development Team**

Hướng dẫn triển khai Victor Mer Platform với Docker Compose cho cả môi trường Development (localhost) và Production (VPS).

---

## 📋 Mục lục

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
├── shofy-backend/
│   ├── Dockerfile             # Backend container
│   └── ...
├── shofy-front-end/
│   ├── Dockerfile             # Frontend container
│   └── ...
├── shofy-admin-panel/
│   ├── Dockerfile             # Admin container
│   └── ...
└── nginx/
    ├── nginx.conf             # Nginx reverse proxy
    └── ssl/                   # SSL certificates
```

---

## 🛠️ Các lệnh thường dùng

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

### Backup Database

```bash
# Manual backup
make backup-db

# Backup sẽ được lưu trong thư mục backups/
```

### Auto Backup Script

```bash
# Tạo script backup
sudo nano /usr/local/bin/backup-victormer-db.sh
```

Script:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/victormer"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

cd /var/www/victor-mer
docker-compose -f docker-compose.prod.yml exec -T mongodb \
  mongodump --uri="mongodb://USER:PASS@localhost:27017/DB?authSource=admin" \
  --archive=/tmp/backup_$DATE.gz --gzip

docker cp victormer-mongodb-prod:/tmp/backup_$DATE.gz $BACKUP_DIR/

# Xóa backup cũ hơn 30 ngày
find $BACKUP_DIR -name "backup_*.gz" -mtime +30 -delete

echo "Backup completed: backup_$DATE.gz"
```

```bash
# Set permissions
chmod +x /usr/local/bin/backup-victormer-db.sh

# Tạo cron job
crontab -e

# Backup mỗi ngày lúc 3AM
0 3 * * * /usr/local/bin/backup-victormer-db.sh
```

### Restore Database

```bash
make restore-db BACKUP=backup-20231201-120000
```

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

**Built with ❤️ by Victor Mer Development Team**

© 2024 Victor Mer Platform. All rights reserved.
