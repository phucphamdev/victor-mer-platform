# 🚀 Victor Mer Platform - Chạy Trực Tiếp (Không Docker)

## ✅ Đã Khởi Động Thành Công!

Tất cả services đang chạy trực tiếp trên máy bạn với **hot reload** enabled.

---

## 🌐 Truy Cập Ứng Dụng

- **Frontend Store**: http://localhost:3000
- **Admin Panel**: http://localhost:3001
- **Backend API**: http://localhost:7000
- **API Docs (Swagger)**: http://localhost:7000/api-docs

---

## 📊 Trạng Thái Services

✅ **Backend** (Port 7000) - Running với nodemon (hot reload)
✅ **Frontend** (Port 3000) - Running với Next.js dev server
✅ **Admin Panel** (Port 3001) - Running với Next.js dev server
✅ **MongoDB** (Port 27017) - Running
✅ **Redis** (Port 6379) - Running

---

## 🔥 Hot Reload

Khi bạn thay đổi code, ứng dụng sẽ tự động reload:

- **Backend**: Nodemon tự động restart khi file `.js` thay đổi
- **Frontend**: Next.js hot reload tức thì
- **Admin**: Next.js hot reload tức thì

---

## 📝 Xem Logs

Để xem logs của từng service:

```bash
# Backend logs
tail -f mer-backend/logs/app.log

# Hoặc xem trực tiếp trong terminal đang chạy
```

---

## 🛑 Dừng Services

```bash
# Dừng tất cả services
pkill -f "npm run start-dev"
pkill -f "npm run dev"

# Hoặc dùng Ctrl+C trong terminal đang chạy
```

---

## 🔄 Restart Services

Nếu cần restart:

```bash
# Restart backend
cd mer-backend && npm run start-dev

# Restart frontend
cd mer-front-end && npm run dev

# Restart admin
cd mer-admin-panel && npm run dev
```

---

## 🐛 Troubleshooting

### Port đã được sử dụng

```bash
# Kiểm tra port đang dùng
lsof -i :7000
lsof -i :3000
lsof -i :3001

# Kill process
kill -9 <PID>
```

### MongoDB không kết nối

```bash
# Kiểm tra MongoDB
systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Enable auto-start
sudo systemctl enable mongod
```

### Redis không chạy

```bash
# Start Redis
redis-server &

# Hoặc dùng systemctl
sudo systemctl start redis
```

---

## 📦 Import Seed Data

```bash
cd mer-backend
npm run data:import
```

---

## 🎯 Ưu Điểm Chạy Trực Tiếp

✅ **Nhanh nhất**: Không có Docker overhead
✅ **Hot reload tức thì**: Code thay đổi → refresh ngay
✅ **Debug dễ**: Attach debugger trực tiếp
✅ **Ít RAM**: Chỉ cần ~2GB
✅ **Phù hợp**: Development hàng ngày

---

## 💾 Dung Lượng Đã Tiết Kiệm

Đã xóa Docker và tiết kiệm được **~25GB**:
- ✅ Containers: Đã xóa
- ✅ Images: Đã xóa (~834MB)
- ✅ Volumes: Đã xóa (~17GB)
- ✅ Build cache: Đã xóa (~8GB)

---

## 📚 Tài Liệu

- [Tổng Quan 3 Cơ Chế](docs/DEPLOYMENT_GUIDE.md)
- [Chi Tiết Chạy Local](docs/DEPLOYMENT_LOCAL.md)
- [Docker Localhost](docs/DEPLOYMENT_DOCKER_LOCAL.md)
- [Docker Production](docs/DEPLOYMENT_DOCKER_PRODUCTION.md)

---

**Happy Coding! 🎉**
