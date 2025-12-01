# 🌐 Cơ Chế 3: Docker Compose Production (VPS)

## 📋 Yêu Cầu Hệ Thống

### VPS Requirements
- **OS**: Ubuntu 20.04+ / Debian 11+ / CentOS 8+
- **RAM**: Tối thiểu 4GB (khuyến nghị 8GB)
- **CPU**: 2 cores trở lên
- **Disk**: 20GB trở lên (SSD khuyến nghị)
- **Network**: Public IP, bandwidth ổn định

### Domain Requirements
- Domain đã mua (ví dụ: yourdomain.com)
- Quyền truy cập DNS settings

---

## 🚀 Bước 1: Chuẩn Bị VPS

### 1.1. SSH vào VPS

```bash
ssh root@your-vps-ip

# Hoặc dùng user khác
ssh username@your-vps-ip
```

### 1.2. Update hệ thống

```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# CentOS
sudo yum update -y
```

### 1.3. Cài Docker

```bash
# Cài Docker
curl -fsSL https://get.docker.com | sh

# Thêm user vào docker group (nếu không dùng root)
sudo usermod -aG docker $USER
newgrp docker

# Verify
docker --version
```

### 1.4. Cài Docker Compose

```bash
# Download Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Set permissions
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker-compose --version
```

### 1.5. Cấu hình Firewall

```bash
# Cài UFW (nếu chưa có)
sudo apt install ufw -y

# Cấu hình firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## 🚀 Bước 2: Clone Project

```bash
# Tạo thư mục
sudo mkdir -p /var/www
cd /var/www

# Clone project
sudo git clone <your-repo> victor-mer
cd victor-mer

# Set permissions
sudo chown -R $USER:$USER /var/www/victor-mer
```

---

## 🚀 Bước 3: Cấu Hình Environment

### 3.1. Generate Secure Credentials

```bash
# Generate MongoDB password
openssl rand -base64 32

# Generate JWT secrets (128 characters)
openssl rand -hex 64
openssl rand -hex 64
```

### 3.2. Tạo file .env.prod

```bash
cp .env.example .env.prod
nano .env.prod
```

**File .env.prod mẫu:**

```bash
# ============================================
# GENERAL SETTINGS
# ============================================
NODE_ENV=production
COMPOSE_PROJECT_NAME=victormer

# ============================================
# PORT CONFIGURATION
# ============================================
MONGO_PORT=27017
BACKEND_PORT=7000
FRONTEND_PORT=3500
ADMIN_PORT=4000
HTTP_PORT=80
HTTPS_PORT=443

# ============================================
# MONGODB CONFIGURATION (PRODUCTION)
# ============================================
# ⚠️ QUAN TRỌNG: Dùng credentials phức tạp!
MONGO_ROOT_USER=victormer_prod_db_master_2024_a7f3c9e2
MONGO_ROOT_PASSWORD=Pr0d_V1ct0r_M0ng0DB_S3cur3_P@ssw0rd_2024!K9mX7nQ2wL8pR5tY
MONGO_DB_NAME=victormer_ecommerce_production_2024

# ============================================
# JWT & TOKEN SECRETS (PRODUCTION)
# ============================================
# ⚠️ QUAN TRỌNG: Generate mới với openssl rand -hex 64
TOKEN_SECRET=8f7e6d5c4b3a2918f7e6d5c4b3a2918f7e6d5c4b3a2918f7e6d5c4b3a2918f7e6d5c4b3a2918f7e6d5c4b3a2918f7e6d5c4b3a2918f7e6d5c4b3a291
JWT_SECRET_FOR_VERIFY=9a8b7c6d5e4f3a2b1c9a8b7c6d5e4f3a2b1c9a8b7c6d5e4f3a2b1c9a8b7c6d5e4f3a2b1c9a8b7c6d5e4f3a2b1c9a8b7c6d5e4f3a2b1c9a8b7c6d

# ============================================
# EMAIL CONFIGURATION (PRODUCTION)
# ============================================
EMAIL_SERVICE=gmail
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASS=your_production_gmail_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465

# ============================================
# CLOUDINARY CONFIGURATION (PRODUCTION)
# ============================================
CLOUDINARY_NAME=your_production_cloud_name
CLOUDINARY_API_KEY=your_production_api_key
CLOUDINARY_API_SECRET=your_production_api_secret
CLOUDINARY_UPLOAD_PRESET=your_production_preset

# ============================================
# STRIPE CONFIGURATION (LIVE KEYS)
# ============================================
# ⚠️ QUAN TRỌNG: Dùng LIVE keys, không dùng test keys!
STRIPE_KEY=sk_live_your_live_secret_key_here
STRIPE_PUBLIC_KEY=pk_live_your_live_public_key_here

# ============================================
# GOOGLE OAUTH CONFIGURATION (PRODUCTION)
# ============================================
GOOGLE_CLIENT_ID=your_production_client_id.apps.googleusercontent.com

# ============================================
# URL CONFIGURATION (PRODUCTION DOMAINS)
# ============================================
# ⚠️ Thay đổi thành domain thật của bạn
BACKEND_URL=https://api.yourdomain.com
STORE_URL=https://yourdomain.com
ADMIN_URL=https://admin.yourdomain.com
```

### 3.3. Bảo vệ file .env.prod

```bash
# Set permissions
chmod 600 .env.prod

# Đảm bảo không commit vào git
echo ".env.prod" >> .gitignore
```

---

## 🚀 Bước 4: Cấu Hình Domain & DNS

### 4.1. Trỏ DNS về VPS

Vào trang quản lý domain (GoDaddy, Namecheap, Cloudflare, etc.) và thêm DNS records:

```
Type    Name    Value           TTL
A       @       <VPS-IP>        3600
A       www     <VPS-IP>        3600
A       api     <VPS-IP>        3600
A       admin   <VPS-IP>        3600
```

**Ví dụ**:
- yourdomain.com → 1.2.3.4
- www.yourdomain.com → 1.2.3.4
- api.yourdomain.com → 1.2.3.4
- admin.yourdomain.com → 1.2.3.4

### 4.2. Verify DNS

```bash
# Đợi DNS propagate (5-30 phút)
# Kiểm tra DNS
nslookup yourdomain.com
nslookup api.yourdomain.com
nslookup admin.yourdomain.com

# Hoặc dùng dig
dig yourdomain.com
```

---

## 🚀 Bước 5: Cấu Hình Nginx

### 5.1. Update nginx.conf với domain thật

```bash
nano nginx/nginx.conf
```

**Thay đổi**:
- `yourdomain.com` → domain thật của bạn
- `api.yourdomain.com` → API domain
- `admin.yourdomain.com` → Admin domain

### 5.2. Tạo thư mục SSL

```bash
mkdir -p nginx/ssl
mkdir -p nginx/logs
```

---

## 🚀 Bước 6: Generate SSL Certificate

### 6.1. Dùng Let's Encrypt (Miễn phí)

```bash
# Stop nginx nếu đang chạy
docker-compose -f docker-compose.prod.yml stop nginx

# Generate certificate
docker run -it --rm \
  -v $(pwd)/nginx/ssl:/etc/letsencrypt \
  -p 80:80 -p 443:443 \
  certbot/certbot certonly --standalone \
  -d yourdomain.com \
  -d www.yourdomain.com \
  -d api.yourdomain.com \
  -d admin.yourdomain.com \
  --email your-email@example.com \
  --agree-tos \
  --non-interactive

# Verify certificates
ls -la nginx/ssl/live/yourdomain.com/
```

### 6.2. Update nginx.conf với SSL paths

```bash
nano nginx/nginx.conf
```

Đảm bảo SSL paths đúng:
```nginx
ssl_certificate /etc/nginx/ssl/live/yourdomain.com/fullchain.pem;
ssl_certificate_key /etc/nginx/ssl/live/yourdomain.com/privkey.pem;
```

---

## 🚀 Bước 7: Deploy Application

### 7.1. Build và Start

```bash
# Build images
docker-compose -f docker-compose.prod.yml --env-file .env.prod build

# Start services
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Hoặc dùng Makefile
make prod-build
```

### 7.2. Kiểm tra services

```bash
# Check containers
docker-compose -f docker-compose.prod.yml ps

# Check logs
docker-compose -f docker-compose.prod.yml logs -f

# Hoặc dùng Makefile
make prod-logs
```

---

## 🚀 Bước 8: Import Seed Data (Optional)

```bash
# Đợi services khởi động (1-2 phút)
sleep 120

# Import seed data
make seed-prod

# Hoặc
docker-compose -f docker-compose.prod.yml --env-file .env.prod exec backend npm run data:import
```

---

## 🎉 Bước 9: Verify Deployment

### 9.1. Test HTTPS

```bash
# Test từ VPS
curl -I https://yourdomain.com
curl -I https://api.yourdomain.com
curl -I https://admin.yourdomain.com

# Test health endpoint
curl https://api.yourdomain.com/health
```

### 9.2. Test từ browser

- **Frontend**: https://yourdomain.com
- **Admin**: https://admin.yourdomain.com
- **API**: https://api.yourdomain.com/health
- **Swagger**: https://api.yourdomain.com/api-docs

### 9.3. Kiểm tra SSL

```bash
# Check SSL certificate
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com

# Hoặc dùng online tool
# https://www.ssllabs.com/ssltest/
```

---

## 🔧 Các Lệnh Thường Dùng

### Quản Lý Services

```bash
# Start
make prod

# Stop
make prod-down

# Restart
docker-compose -f docker-compose.prod.yml restart

# Restart service cụ thể
docker-compose -f docker-compose.prod.yml restart backend
docker-compose -f docker-compose.prod.yml restart nginx

# Xem logs
make prod-logs

# Xem logs service cụ thể
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f nginx

# Check status
docker-compose -f docker-compose.prod.yml ps
```

### Update Code (Zero-Downtime)

```bash
# Pull latest code
cd /var/www/victor-mer
git pull origin main

# Update từng service
docker-compose -f docker-compose.prod.yml up -d --no-deps --build backend
docker-compose -f docker-compose.prod.yml up -d --no-deps --build frontend
docker-compose -f docker-compose.prod.yml up -d --no-deps --build admin

# Restart nginx
docker-compose -f docker-compose.prod.yml restart nginx
```

### Backup Database

```bash
# Manual backup
make backup-db

# Hoặc thủ công
docker-compose -f docker-compose.prod.yml exec -T mongodb \
  mongodump --uri="mongodb://USER:PASS@localhost:27017/DB?authSource=admin" \
  --archive=/tmp/backup_$(date +%Y%m%d_%H%M%S).gz --gzip

# Copy backup ra ngoài
docker cp victormer-mongodb-prod:/tmp/backup_*.gz ./backups/
```

---

## 🔄 Auto Backup & SSL Renewal

### Setup Auto Backup

```bash
# Tạo backup script
sudo nano /usr/local/bin/backup-victormer-db.sh
```

**Script content:**
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
sudo chmod +x /usr/local/bin/backup-victormer-db.sh

# Test script
sudo /usr/local/bin/backup-victormer-db.sh
```

### Setup Cron Jobs

```bash
# Edit crontab
crontab -e
```

**Thêm các dòng sau:**
```bash
# Backup database mỗi ngày lúc 3AM
0 3 * * * /usr/local/bin/backup-victormer-db.sh

# Renew SSL certificate mỗi tháng
0 0 1 * * docker run --rm -v /var/www/victor-mer/nginx/ssl:/etc/letsencrypt certbot/certbot renew && docker-compose -f /var/www/victor-mer/docker-compose.prod.yml restart nginx

# Clean Docker mỗi tuần
0 2 * * 0 docker system prune -f
```

---

## 🔒 Bảo Mật Production

### 1. Fail2Ban cho SSH

```bash
# Cài Fail2Ban
sudo apt install fail2ban -y

# Cấu hình
sudo nano /etc/fail2ban/jail.local
```

**Thêm:**
```ini
[sshd]
enabled = true
port = 22
maxretry = 3
bantime = 3600
findtime = 600
```

```bash
# Restart Fail2Ban
sudo systemctl restart fail2ban
sudo systemctl enable fail2ban

# Check status
sudo fail2ban-client status sshd
```

### 2. IP Whitelist cho Admin (Optional)

```bash
nano nginx/nginx.conf
```

**Thêm vào server block của admin:**
```nginx
server {
    listen 443 ssl http2;
    server_name admin.yourdomain.com;
    
    # Chỉ cho phép IP cụ thể
    allow 1.2.3.4;        # IP văn phòng
    allow 5.6.7.8;        # IP nhà
    deny all;
    
    location / {
        proxy_pass http://admin;
        # ...
    }
}
```

### 3. Change SSH Port (Optional)

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Thay đổi port
Port 2222

# Restart SSH
sudo systemctl restart sshd

# Update firewall
sudo ufw allow 2222/tcp
sudo ufw delete allow 22/tcp
```

### 4. Disable Root Login

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Thay đổi
PermitRootLogin no
PasswordAuthentication no

# Restart SSH
sudo systemctl restart sshd
```

### 5. Setup Monitoring

```bash
# Cài htop
sudo apt install htop -y

# Cài netdata (monitoring dashboard)
bash <(curl -Ss https://my-netdata.io/kickstart.sh)

# Access: http://your-vps-ip:19999
```

---

## 📊 Monitoring & Logs

### Xem Logs

```bash
# Tất cả services
make prod-logs

# Service cụ thể
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f nginx

# Nginx access logs
tail -f nginx/logs/access.log

# Nginx error logs
tail -f nginx/logs/error.log

# Failed login attempts
docker-compose -f docker-compose.prod.yml logs backend | grep "failed"

# Suspicious requests
tail -f nginx/logs/access.log | grep "403\|404\|500"
```

### Resource Monitoring

```bash
# Container stats
docker stats

# Disk usage
df -h

# Memory usage
free -h

# CPU usage
top

# Network usage
iftop
```

### Health Checks

```bash
# Check all services
curl https://api.yourdomain.com/health
curl -I https://yourdomain.com
curl -I https://admin.yourdomain.com

# Check MongoDB
docker exec victormer-mongodb-prod mongosh --eval "db.adminCommand('ping')"

# Check containers
docker-compose -f docker-compose.prod.yml ps
```

---

## 🐛 Troubleshooting

### SSL Certificate Issues

```bash
# Check certificate
openssl x509 -in nginx/ssl/live/yourdomain.com/fullchain.pem -text -noout

# Renew certificate
docker run --rm -v $(pwd)/nginx/ssl:/etc/letsencrypt certbot/certbot renew

# Restart nginx
docker-compose -f docker-compose.prod.yml restart nginx
```

### Nginx 502 Bad Gateway

```bash
# Check backend is running
docker-compose -f docker-compose.prod.yml ps backend

# Check backend logs
docker-compose -f docker-compose.prod.yml logs backend

# Restart backend
docker-compose -f docker-compose.prod.yml restart backend

# Check nginx config
docker-compose -f docker-compose.prod.yml exec nginx nginx -t
```

### Out of Memory

```bash
# Check memory
free -h

# Check Docker stats
docker stats

# Tăng swap
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Database Connection Failed

```bash
# Check MongoDB logs
docker-compose -f docker-compose.prod.yml logs mongodb

# Restart MongoDB
docker-compose -f docker-compose.prod.yml restart mongodb

# Check credentials
docker exec -it victormer-mongodb-prod mongosh -u USER -p PASS --authenticationDatabase admin
```

### Container Won't Start

```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs <service-name>

# Rebuild service
docker-compose -f docker-compose.prod.yml up -d --no-deps --build <service-name>

# Check disk space
df -h

# Clean Docker
docker system prune -a
```

---

## 🚨 Emergency Response

### Nếu bị hack:

1. **Ngay lập tức stop services**
```bash
docker-compose -f docker-compose.prod.yml down
```

2. **Backup database**
```bash
make backup-db
```

3. **Đổi TẤT CẢ credentials**
- MongoDB password
- JWT secrets
- API keys (Stripe, Cloudinary)
- SSH keys

4. **Review logs**
```bash
docker-compose -f docker-compose.prod.yml logs > incident_$(date +%Y%m%d).log
tail -f nginx/logs/access.log > nginx_incident_$(date +%Y%m%d).log
```

5. **Update và restart**
```bash
# Update .env.prod với credentials mới
nano .env.prod

# Rebuild và restart
make prod-down
make prod-build
```

---

## 📝 Checklist Production

- [ ] VPS đã setup (Docker, Docker Compose, Firewall)
- [ ] Domain đã trỏ DNS về VPS
- [ ] File .env.prod đã cấu hình với credentials mạnh
- [ ] SSL certificate đã generate
- [ ] nginx.conf đã update với domain thật
- [ ] Services đã start và running
- [ ] HTTPS hoạt động (https://yourdomain.com)
- [ ] API hoạt động (https://api.yourdomain.com/health)
- [ ] Swagger accessible (https://api.yourdomain.com/api-docs)
- [ ] Auto backup đã setup (cron job)
- [ ] SSL auto-renew đã setup (cron job)
- [ ] Fail2Ban đã cài và cấu hình
- [ ] Monitoring đã setup
- [ ] Đã test tất cả tính năng

---

## 🎯 Ưu Điểm Cơ Chế Này

✅ **Production-ready**: Đầy đủ tính năng
✅ **Bảo mật cao**: SSL, firewall, authentication
✅ **Có domain**: yourdomain.com
✅ **Auto-restart**: Container tự động restart khi crash
✅ **Monitoring**: Logs và health checks
✅ **Backup tự động**: Cron jobs
✅ **Scalable**: Dễ scale khi cần

---

## ⚠️ Lưu Ý Quan Trọng

⚠️ **KHÔNG BAO GIỜ**:
- Dùng credentials development trong production
- Dùng Stripe test keys trong production
- Expose MongoDB port ra ngoài
- Commit .env.prod vào git
- Dùng password đơn giản

✅ **LUÔN LUÔN**:
- Dùng HTTPS cho tất cả
- Backup database định kỳ
- Monitor logs và resources
- Update security patches
- Rotate credentials định kỳ (3-6 tháng)

---

**Quay lại**: [← Tổng Quan](./DEPLOYMENT_GUIDE.md)
