# 🎯 Cơ Chế 1: Chạy Trực Tiếp (Không Docker)

## 📋 Yêu Cầu Hệ Thống

- **Node.js**: 16.x hoặc cao hơn
- **MongoDB**: 7.0 hoặc cao hơn
- **Redis**: 7.x (optional, cho caching)
- **RAM**: Tối thiểu 2GB
- **Disk**: 5GB trống

---

## 🚀 Bước 1: Cài Đặt Dependencies

### Windows

```powershell
# Cài Node.js
# Download từ: https://nodejs.org/

# Cài MongoDB
# Download từ: https://www.mongodb.com/try/download/community

# Cài Redis (optional)
# Download từ: https://github.com/microsoftarchive/redis/releases
```

### macOS

```bash
# Cài Homebrew (nếu chưa có)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Cài Node.js
brew install node

# Cài MongoDB
brew tap mongodb/brew
brew install mongodb-community@7.0

# Cài Redis (optional)
brew install redis
```

### Linux (Ubuntu/Debian)

```bash
# Cài Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Cài MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Cài Redis (optional)
sudo apt-get install -y redis-server
```

---

## 🚀 Bước 2: Khởi Động Services

### Khởi động MongoDB

```bash
# macOS
brew services start mongodb-community@7.0

# Linux
sudo systemctl start mongod
sudo systemctl enable mongod

# Windows
# MongoDB sẽ tự động chạy như Windows Service
# Hoặc chạy: net start MongoDB
```

### Khởi động Redis (Optional)

```bash
# macOS
brew services start redis

# Linux
sudo systemctl start redis
sudo systemctl enable redis

# Windows
redis-server
```

### Verify Services

```bash
# Check MongoDB
mongosh --eval "db.adminCommand('ping')"

# Check Redis
redis-cli ping
```

---

## 🚀 Bước 3: Cấu Hình Environment

```bash
# Copy file mẫu
cp .env.example .env.local

# Chỉnh sửa
nano .env.local
```

**File .env.local cho chạy trực tiếp:**

```bash
# ============================================
# GENERAL SETTINGS
# ============================================
NODE_ENV=development

# ============================================
# PORT CONFIGURATION
# ============================================
BACKEND_PORT=7000
FRONTEND_PORT=3500
ADMIN_PORT=4000

# ============================================
# MONGODB CONFIGURATION (Local)
# ============================================
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=admin123
MONGO_DB_NAME=victormer_dev

# MongoDB URI cho local (không qua Docker)
MONGO_URI=mongodb://localhost:27017/victormer_dev

# ============================================
# REDIS CONFIGURATION (Optional)
# ============================================
REDIS_URL=redis://localhost:6379

# ============================================
# JWT & TOKEN SECRETS
# ============================================
TOKEN_SECRET=dev_token_secret_change_this_in_production
JWT_SECRET_FOR_VERIFY=dev_jwt_secret_change_this_in_production

# ============================================
# EMAIL CONFIGURATION
# ============================================
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465

# ============================================
# CLOUDINARY CONFIGURATION
# ============================================
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_preset

# ============================================
# STRIPE CONFIGURATION
# ============================================
STRIPE_KEY=sk_test_your_test_key
STRIPE_PUBLIC_KEY=pk_test_your_public_key

# ============================================
# GOOGLE OAUTH
# ============================================
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com

# ============================================
# URL CONFIGURATION (Local)
# ============================================
BACKEND_URL=http://localhost:7000
STORE_URL=http://localhost:3500
ADMIN_URL=http://localhost:4000
```

---

## 🚀 Bước 4: Cài Đặt Dependencies

```bash
# Backend
cd mer-backend
npm install

# Frontend
cd ../mer-front-end
npm install

# Admin Panel
cd ../mer-admin-panel
npm install
```

---

## 🚀 Bước 5: Khởi Động Ứng Dụng

### Cách 1: Dùng Makefile (Khuyến nghị)

```bash
# Từ thư mục root
make local
```

### Cách 2: Chạy thủ công từng service

**Terminal 1 - Backend:**
```bash
cd mer-backend
npm run start-dev
```

**Terminal 2 - Frontend:**
```bash
cd mer-front-end
npm run dev
```

**Terminal 3 - Admin Panel:**
```bash
cd mer-admin-panel
npm run dev
```

---

## 🚀 Bước 6: Import Dữ Liệu Mẫu

```bash
# Từ thư mục mer-backend
cd mer-backend
npm run data:import
```

---

## 🎉 Bước 7: Truy Cập Ứng Dụng

- **Frontend Store**: http://localhost:3500
- **Admin Panel**: http://localhost:4000
- **Backend API**: http://localhost:7000
- **API Docs (Swagger)**: http://localhost:7000/api-docs

---

## 🔧 Các Lệnh Thường Dùng

```bash
# Start tất cả services
make local

# Stop tất cả services
make local-stop

# Restart backend
cd mer-backend && npm run start-dev

# Restart frontend
cd mer-front-end && npm run dev

# Restart admin
cd mer-admin-panel && npm run dev

# Import seed data
cd mer-backend && npm run data:import

# Check MongoDB
mongosh victormer_dev

# Check Redis
redis-cli
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

# Windows
netstat -ano | findstr :7000
netstat -ano | findstr :3500
netstat -ano | findstr :4000

# Kill process
# macOS/Linux
kill -9 <PID>

# Windows
taskkill /PID <PID> /F
```

### MongoDB connection failed

```bash
# Kiểm tra MongoDB đang chạy
# macOS
brew services list | grep mongodb

# Linux
sudo systemctl status mongod

# Windows
sc query MongoDB

# Restart MongoDB
# macOS
brew services restart mongodb-community@7.0

# Linux
sudo systemctl restart mongod

# Windows
net stop MongoDB && net start MongoDB
```

### Module not found

```bash
# Xóa node_modules và cài lại
cd mer-backend
rm -rf node_modules package-lock.json
npm install

cd ../mer-front-end
rm -rf node_modules package-lock.json
npm install

cd ../mer-admin-panel
rm -rf node_modules package-lock.json
npm install
```

### Hot reload không hoạt động

```bash
# Đảm bảo đang dùng nodemon cho backend
cd mer-backend
npm install -D nodemon
npm run start-dev

# Frontend và Admin tự động có hot reload với Next.js
```

---

## ⚡ Performance Tips

### 1. Tăng tốc MongoDB

```bash
# Tạo indexes
mongosh victormer_dev

db.products.createIndex({ slug: 1 })
db.products.createIndex({ category: 1 })
db.users.createIndex({ email: 1 })
db.orders.createIndex({ userId: 1 })
```

### 2. Enable Redis Caching

```bash
# Cài Redis client trong backend
cd mer-backend
npm install redis

# Redis sẽ tự động được sử dụng nếu REDIS_URL được set
```

### 3. Tối ưu Next.js

```bash
# Disable telemetry
export NEXT_TELEMETRY_DISABLED=1

# Hoặc thêm vào .env.local
echo "NEXT_TELEMETRY_DISABLED=1" >> .env.local
```

---

## 🔄 Update Code

```bash
# Pull latest code
git pull origin main

# Update dependencies
cd mer-backend && npm install
cd ../mer-front-end && npm install
cd ../mer-admin-panel && npm install

# Restart services
make local-stop
make local
```

---

## 📊 Monitoring

### Xem Logs

```bash
# Backend logs
cd mer-backend
tail -f logs/app.log

# Frontend logs - xem trực tiếp trong terminal đang chạy

# MongoDB logs
# macOS
tail -f /usr/local/var/log/mongodb/mongo.log

# Linux
sudo tail -f /var/log/mongodb/mongod.log
```

### Check Resource Usage

```bash
# CPU và Memory
top

# Disk usage
df -h

# MongoDB stats
mongosh victormer_dev --eval "db.stats()"
```

---

## 🔒 Bảo Mật (Development)

**Lưu ý**: Đây là môi trường development, không cần bảo mật cao

- ✅ Dùng credentials đơn giản (admin/admin123)
- ✅ Dùng Stripe test keys
- ✅ Không cần SSL
- ⚠️ KHÔNG deploy lên internet với config này

---

## 📝 Checklist

- [ ] Node.js đã cài (check: `node -v`)
- [ ] MongoDB đã cài và đang chạy (check: `mongosh --eval "db.version()"`)
- [ ] Redis đã cài (optional) (check: `redis-cli ping`)
- [ ] File .env.local đã cấu hình
- [ ] Dependencies đã cài (`npm install` trong 3 thư mục)
- [ ] Seed data đã import
- [ ] Tất cả services đang chạy
- [ ] Có thể truy cập http://localhost:3500

---

## 🎯 Ưu Điểm Cơ Chế Này

✅ **Nhanh nhất**: Không có Docker overhead
✅ **Hot reload tức thì**: Code thay đổi → refresh ngay
✅ **Debug dễ**: Attach debugger trực tiếp
✅ **Ít RAM**: Chỉ cần 2GB
✅ **Phù hợp**: Development hàng ngày

---

## ⚠️ Nhược Điểm

❌ **Setup phức tạp**: Phải cài nhiều thứ
❌ **Phụ thuộc OS**: Khác nhau giữa Windows/Mac/Linux
❌ **Không giống production**: Môi trường khác biệt
❌ **Khó reset**: Phải xóa database thủ công

---

**Tiếp theo**: [Cơ Chế 2: Docker Compose Localhost →](./DEPLOYMENT_DOCKER_LOCAL.md)
