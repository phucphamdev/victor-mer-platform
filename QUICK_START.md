# 🚀 Quick Start Guide

## Khởi động toàn bộ hệ thống từ đầu

### Linux/Mac

Chỉ cần chạy 1 lệnh:

```bash
./start-fresh.sh
```

### Windows

Chạy file batch:

```cmd
start-fresh.bat
```

Hoặc dùng Git Bash:

```bash
bash start-fresh.sh
```

---

## Script sẽ tự động làm gì?

1. ✅ Dừng tất cả containers
2. ✅ Xóa tất cả containers
3. ✅ Xóa tất cả images
4. ✅ Xóa tất cả volumes
5. ✅ Xóa tất cả networks
6. ✅ Xóa build cache
7. ✅ Build và start containers mới
8. ✅ Đợi services khởi động
9. ✅ Seed database với dữ liệu mẫu
10. ✅ Test tất cả API endpoints
11. ✅ Hiển thị thông tin đăng nhập

---

## Sau khi chạy xong

### 🌐 Service URLs

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:4000
- **Backend API**: http://localhost:7000
- **API Documentation**: http://localhost:7000/api-docs
- **MongoDB**: mongodb://localhost:27017

### 🔐 Admin Accounts

| Email | Password | Role |
|-------|----------|------|
| dorothy@gmail.com | 123456 | Admin |
| porter@gmail.com | 123456 | Admin |
| corrie@gmail.com | 123456 | Admin |
| palmer@gmail.com | 123456 | CEO |
| meikle@gmail.com | 123456 | Manager |

### 📊 Database Stats

Sau khi seed:
- 37 Products
- 15 Categories
- 10 Brands
- 4 Coupons
- 1 Order
- 5 Admins

---

## Các lệnh hữu ích

### Xem logs

```bash
# Xem tất cả logs
docker-compose logs -f

# Xem logs của service cụ thể
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f admin
docker-compose logs -f mongodb
```

### Restart services

```bash
# Restart tất cả
docker-compose restart

# Restart service cụ thể
docker-compose restart backend
```

### Stop services

```bash
docker-compose down
```

### Rebuild service cụ thể

```bash
docker-compose up -d --build backend
```

### Vào container để debug

```bash
# Backend
docker-compose exec backend sh

# MongoDB
docker-compose exec mongodb mongosh
```

---

## Test API với curl

### Login

```bash
curl -X POST http://localhost:7000/api/admin/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"dorothy@gmail.com","password":"123456"}'
```

### Get Products (cần token)

```bash
TOKEN="your_access_token_here"

curl http://localhost:7000/api/product/all \
  -H "Authorization: Bearer $TOKEN"
```

### Refresh Token

```bash
REFRESH_TOKEN="your_refresh_token_here"

curl -X POST http://localhost:7000/api/admin/refresh-token \
  -H 'Content-Type: application/json' \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}"
```

### Logout

```bash
curl -X POST http://localhost:7000/api/admin/logout \
  -H 'Content-Type: application/json' \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}"
```

---

## Troubleshooting

### Port đã được sử dụng

Nếu gặp lỗi port conflict:

```bash
# Kiểm tra process đang dùng port
sudo lsof -i :3000
sudo lsof -i :4000
sudo lsof -i :7000
sudo lsof -i :27017

# Kill process
sudo kill -9 <PID>
```

### Container không start

```bash
# Xem logs chi tiết
docker-compose logs backend

# Rebuild từ đầu
docker-compose down
docker-compose up -d --build
```

### Database connection failed

```bash
# Kiểm tra MongoDB
docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"

# Restart MongoDB
docker-compose restart mongodb
```

### Permission denied

```bash
# Thêm quyền execute cho script
chmod +x start-fresh.sh

# Hoặc chạy với bash
bash start-fresh.sh
```

---

## Cấu trúc Project

```
victor-mer-platform/
├── mer-backend/          # Node.js Backend API
├── mer-admin-panel/      # Next.js Admin Panel
├── mer-front-end/        # Next.js Frontend
├── docker-compose.yml    # Docker configuration
├── start-fresh.sh        # Linux/Mac startup script
├── start-fresh.bat       # Windows startup script
└── QUICK_START.md        # This file
```

---

## Security Features

✅ **Refresh Token System**
- Access token: 15 phút
- Refresh token: 7 ngày
- Có thể revoke tokens

✅ **Rate Limiting**
- Login: 5 attempts / 15 phút
- Password reset: 3 attempts / 1 giờ
- Refresh token: 10 attempts / 15 phút

✅ **Audit Logging**
- Tất cả authentication events
- Admin actions
- Security events
- Logs lưu trong `mer-backend/logs/`

---

## Next Steps

1. Đăng nhập vào Admin Panel: http://localhost:4000
2. Xem API Documentation: http://localhost:7000/api-docs
3. Test các API endpoints
4. Customize theo nhu cầu của bạn

---

## Support

Nếu gặp vấn đề:
1. Kiểm tra logs: `docker-compose logs -f`
2. Restart services: `docker-compose restart`
3. Chạy lại script: `./start-fresh.sh`

Happy coding! 🎉
