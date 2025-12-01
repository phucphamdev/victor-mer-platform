# 🐳 Cơ Chế 2: Docker Compose Localhost

## 📋 Yêu Cầu Hệ Thống

- **Docker Desktop**: 20.10+ (Windows/Mac) hoặc Docker Engine (Linux)
- **Docker Compose**: 2.0+
- **RAM**: Tối thiểu 4GB
- **Disk**: 10GB trống

---

## 🚀 Bước 1: Cài Đặt Docker

### Windows

1. Download Docker Desktop: https://www.docker.com/products/docker-desktop
2. Cài đặt và khởi động lại máy
3. Mở Docker Desktop và đợi khởi động
4. Verify:
```powershell
docker --version
docker-compose --version
```

### macOS

```bash
# Cách 1: Download Docker Desktop
# https://www.docker.com/products/docker-desktop

# Cách 2: Dùng Homebrew
brew install --cask docker

# Verify
docker --version
docker-compose --version
```

### Linux (Ubuntu/Debian)

```bash
# Cài Docker
curl -fsSL https://get.docker.com | sh

# Thêm user vào docker group
sudo usermod -aG docker $USER
newgrp docker

# Cài Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker --version
docker-compose --version
```

---

## 🚀 Bước 2: Clone Project

```bash
git clone <your-repo>
cd victor-mer-platform
```

---

## 🚀 Bước 3: Cấu Hình Environment

```bash
# Copy file mẫu
cp .env.example .env.local

# Chỉnh sửa
nano .env.local
```

**File .env.local cho Docker localhost:**

```bash
# ============================================
# GENERAL SETTINGS
# ============================================
NODE_ENV=development
COMPOSE_PROJECT_NAME=victormer

# ============================================
# PORT CONFIGURATION
# ============================================
MONGO_PORT=27017
BACKEND_PORT=7000
FRONTEND_PORT=3500
ADMIN_PORT=4000

# ============================================
# MONGODB CONFIGURATION
# ============================================
MONGO_ROOT_USER=victormer_admin
MONGO_ROOT_PASSWORD=V1ct0r_D3v_M0ng0_P@ssw0rd
MONGO_DB_NAME=victormer_ecommerce

# ============================================
# JWT & TOKEN SECRETS
# ============================================
TOKEN_SECRET=dev_token_secret_for_docker_localhost_change_in_production
JWT_SECRET_FOR_VERIFY=dev_jwt_verify_secret_for_docker_localhost_change_in_production

# ============================================
# EMAIL CONFIGURATION
# ============================================
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465

# ============================================
# CLOUDINARY CONFIGURATION
# ============================================
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# ============================================
# STRIPE CONFIGURATION (Test Keys)
# ============================================
STRIPE_KEY=sk_test_your_stripe_test_secret_key
STRIPE_PUBLIC_KEY=pk_test_your_stripe_test_public_key

# ============================================
# GOOGLE OAUTH CONFIGURATION
# ============================================
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# ============================================
# URL CONFIGURATION (Localhost)
# ============================================
BACKEND_URL=http://localhost:7000
STORE_URL=http://localhost:3500
ADMIN_URL=http://localhost:4000
```

---

## 🚀 Bước 4: Khởi Động Ứng Dụng

### Cách 1: Dùng Makefile (Khuyến nghị)

```bash
# Start tất cả services
make dev

# Hoặc build lại từ đầu
make dev-build
```

### Cách 2: Dùng Docker Compose trực tiếp

```bash
# Start services
docker-compose --env-file .env.local up -d

# Build và start
docker-compose --env-file .env.local up -d --build

# Xem logs
docker-compose --env-file .env.local logs -f
```

---

## 🚀 Bước 5: Import Dữ Liệu Mẫu

```bash
# Đợi services khởi động (khoảng 30 giây)
sleep 30

# Import seed data
make seed

# Hoặc dùng docker-compose
docker-compose --env-file .env.local exec backend npm run data:import
```

---

## 🎉 Bước 6: Truy Cập Ứng Dụng

- **Frontend Store**: http://localhost:3500
- **Admin Panel**: http://localhost:4000
- **Backend API**: http://localhost:7000
- **API Docs (Swagger)**: http://localhost:7000/api-docs
- **MongoDB**: mongodb://localhost:27017

---

## 🔧 Các Lệnh Thường Dùng

### Quản Lý Services

```bash
# Start tất cả
make dev

# Stop tất cả
make dev-down

# Restart tất cả
docker-compose restart

# Restart service cụ thể
docker-compose restart backend
docker-compose restart frontend
docker-compose restart admin

# Xem logs
make dev-logs

# Xem logs của service cụ thể
docker-compose logs -f backend
docker-compose logs -f mongodb

# Xem status
docker-compose ps
```

### Quản Lý Containers

```bash
# Vào container backend
docker exec -it victormer-backend-dev sh

# Vào MongoDB shell
docker exec -it victormer-mongodb-dev mongosh -u victormer_admin -p V1ct0r_D3v_M0ng0_P@ssw0rd --authenticationDatabase admin

# Xem resource usage
docker stats

# Xóa tất cả và làm lại
make clean
make dev-build
```

### Database Operations

```bash
# Import seed data
make seed

# Backup database
docker exec victormer-mongodb-dev mongodump --uri="mongodb://victormer_admin:V1ct0r_D3v_M0ng0_P@ssw0rd@localhost:27017/victormer_ecommerce?authSource=admin" --out=/tmp/backup

# Copy backup ra ngoài
docker cp victormer-mongodb-dev:/tmp/backup ./backups/

# Restore database
docker cp ./backups/backup victormer-mongodb-dev:/tmp/restore
docker exec victormer-mongodb-dev mongorestore --uri="mongodb://victormer_admin:V1ct0r_D3v_M0ng0_P@ssw0rd@localhost:27017/victormer_ecommerce?authSource=admin" /tmp/restore
```

---

## 🧪 Test API

### Cách 1: Dùng Test Script

```bash
# Test tất cả endpoints
make test-api

# Hoặc
chmod +x test-api.sh
./test-api.sh dev
```

### Cách 2: Test thủ công

```bash
# Health check
curl http://localhost:7000/health

# Get products
curl http://localhost:7000/api/product/all | jq

# Get categories
curl http://localhost:7000/api/category/all | jq

# Swagger UI
open http://localhost:7000/api-docs
```

---

## 🐛 Troubleshooting

### Port đã được sử dụng

```bash
# Kiểm tra port đang dùng
# macOS/Linux
lsof -i :7000
lsof -i :3500
lsof -i :4000
lsof -i :27017

# Windows
netstat -ano | findstr :7000

# Thay đổi port trong .env.local
BACKEND_PORT=7001
FRONTEND_PORT=3501
ADMIN_PORT=4001
MONGO_PORT=27018

# Restart
make dev-down
make dev
```

### Container không start

```bash
# Xem logs để biết lỗi
docker-compose logs backend
docker-compose logs mongodb

# Restart service
docker-compose restart backend

# Rebuild service
docker-compose up -d --no-deps --build backend

# Xóa và làm lại
make clean
make dev-build
```

### MongoDB connection failed

```bash
# Check MongoDB logs
docker-compose logs mongodb

# Vào MongoDB shell để test
docker exec -it victormer-mongodb-dev mongosh

# Kiểm tra credentials trong .env.local
# Đảm bảo MONGO_ROOT_USER và MONGO_ROOT_PASSWORD đúng

# Restart MongoDB
docker-compose restart mongodb
```

### Out of memory

```bash
# Kiểm tra memory usage
docker stats

# Tăng memory cho Docker Desktop
# Windows/Mac: Docker Desktop → Settings → Resources → Memory

# Linux: Tăng swap
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Giảm resource usage: Stop services không cần
docker-compose stop frontend  # Nếu chỉ test backend
docker-compose stop admin     # Nếu chỉ test frontend
```

### Build failed

```bash
# Xóa cache và rebuild
docker system prune -a
make dev-build

# Rebuild từng service
docker-compose build --no-cache backend
docker-compose build --no-cache frontend
docker-compose build --no-cache admin
```

### Hot reload không hoạt động

```bash
# Đảm bảo volumes được mount đúng trong docker-compose.yml
# Kiểm tra:
volumes:
  - ./mer-backend:/app
  - /app/node_modules

# Restart service
docker-compose restart backend
```

### Cannot connect to Docker daemon

```bash
# macOS/Windows: Mở Docker Desktop

# Linux: Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Kiểm tra Docker đang chạy
docker ps
```

---

## ⚡ Performance Tips

### 1. Tăng tốc build

```bash
# Sử dụng BuildKit
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Thêm vào ~/.bashrc hoặc ~/.zshrc
echo 'export DOCKER_BUILDKIT=1' >> ~/.bashrc
echo 'export COMPOSE_DOCKER_CLI_BUILD=1' >> ~/.bashrc
```

### 2. Giảm thời gian khởi động

```bash
# Không rebuild nếu không cần
docker-compose up -d  # Thay vì up -d --build

# Start chỉ services cần thiết
docker-compose up -d mongodb backend  # Không start frontend/admin
```

### 3. Tối ưu Docker Desktop

**Windows/Mac:**
- Docker Desktop → Settings → Resources
- CPU: 4 cores
- Memory: 4GB (hoặc 6GB nếu có)
- Swap: 2GB
- Disk: 60GB

### 4. Clean up định kỳ

```bash
# Xóa containers không dùng
docker container prune

# Xóa images không dùng
docker image prune -a

# Xóa volumes không dùng
docker volume prune

# Xóa tất cả (cẩn thận!)
docker system prune -a --volumes
```

---

## 🔄 Update Code

```bash
# Pull latest code
git pull origin main

# Rebuild và restart
make dev-down
make dev-build

# Hoặc rebuild từng service
docker-compose up -d --no-deps --build backend
docker-compose up -d --no-deps --build frontend
docker-compose up -d --no-deps --build admin
```

---

## 📊 Monitoring

### Xem Logs

```bash
# Tất cả services
make dev-logs

# Service cụ thể
docker-compose logs -f backend
docker-compose logs -f mongodb

# Logs với timestamp
docker-compose logs -f --timestamps

# Chỉ xem 100 dòng cuối
docker-compose logs --tail=100 backend
```

### Check Health

```bash
# Health check tất cả services
make health-check

# Hoặc thủ công
curl http://localhost:7000/health
curl http://localhost:3500
curl http://localhost:4000

# MongoDB health
docker exec victormer-mongodb-dev mongosh --eval "db.adminCommand('ping')"
```

### Resource Usage

```bash
# Real-time stats
docker stats

# Disk usage
docker system df

# Container details
docker inspect victormer-backend-dev
```

---

## 🔒 Bảo Mật (Development)

**Lưu ý**: Đây là môi trường development localhost

✅ **Được phép**:
- Dùng credentials đơn giản
- Dùng Stripe test keys
- Không cần SSL
- Expose ports ra localhost

⚠️ **KHÔNG được**:
- Deploy lên internet với config này
- Dùng production credentials
- Share .env.local file

---

## 📝 Checklist

- [ ] Docker Desktop đã cài và đang chạy
- [ ] File .env.local đã cấu hình
- [ ] Đã chạy `make dev` hoặc `docker-compose up -d`
- [ ] Tất cả containers đang chạy (`docker-compose ps`)
- [ ] Seed data đã import
- [ ] Có thể truy cập http://localhost:3500
- [ ] API hoạt động http://localhost:7000/health

---

## 🎯 Ưu Điểm Cơ Chế Này

✅ **Dễ setup**: 1 lệnh là chạy
✅ **Môi trường đồng nhất**: Giống production
✅ **Dễ reset**: Xóa và làm lại nhanh
✅ **Không cần cài MongoDB**: Tất cả trong Docker
✅ **Phù hợp**: Test tính năng, demo

---

## ⚠️ Nhược Điểm

❌ **Chậm hơn**: Docker overhead
❌ **Tốn RAM**: Cần 4GB+
❌ **Build lâu**: Lần đầu mất 5-10 phút
❌ **Hot reload chậm**: Không nhanh bằng chạy trực tiếp

---

## 🔄 So Sánh Với Cơ Chế Khác

| Tiêu chí | Trực Tiếp | Docker Local | Docker Production |
|----------|-----------|--------------|-------------------|
| Tốc độ | ⚡⚡⚡ | ⚡⚡ | ⚡ |
| Setup | Phức tạp | Đơn giản | Trung bình |
| RAM | 2GB | 4GB | 8GB+ |
| SSL | ❌ | ❌ | ✅ |
| Giống Production | ❌ | ⚠️ | ✅ |

---

**Tiếp theo**: [Cơ Chế 3: Docker Production →](./DEPLOYMENT_DOCKER_PRODUCTION.md)

**Quay lại**: [← Tổng Quan](./DEPLOYMENT_GUIDE.md)
