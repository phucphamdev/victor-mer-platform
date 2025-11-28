# 🚀 Victor MER Platform - Quick Setup

## One Command Setup

```bash
./start-fresh.sh
```

**Thời gian**: 5-10 phút

---

## 🔐 Super Admin Login

```
Email:    phuc.pham.dev@gmail.com
Password: 12345678
Role:     Super Admin
```

---

## 🌐 Service URLs

- **Admin Panel**: http://localhost:4000
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:7000
- **API Docs**: http://localhost:7000/api-docs

---

## ✨ Tính năng tự động

✅ **Auto-seed database** - Database tự động được seed khi container khởi động lần đầu
✅ **No manual steps** - Không cần chạy seed.js thủ công
✅ **Always has data** - Luôn có dữ liệu sau khi docker-compose up

---

## 📊 Database sau khi seed

- 37 Products
- 15 Categories
- 10 Brands
- 4 Coupons
- 6 Admin accounts (1 Super Admin + 5 others)

---

## 🔑 Tất cả Admin Accounts

| Email | Password | Role |
|-------|----------|------|
| phuc.pham.dev@gmail.com | 12345678 | **Super Admin** ⭐ |
| dorothy@gmail.com | 123456 | Admin |
| porter@gmail.com | 123456 | Admin |
| corrie@gmail.com | 123456 | Admin |
| palmer@gmail.com | 123456 | CEO |
| meikle@gmail.com | 123456 | Manager |

---

## 🛠️ Useful Commands

```bash
# View logs
docker-compose logs -f backend

# Restart services
docker-compose restart

# Stop all
docker-compose down

# Rebuild
docker-compose up -d --build
```

---

## 🧪 Test API

```bash
# Run test script
chmod +x test-api.sh
./test-api.sh
```

Hoặc test thủ công:

```bash
# Login
curl -X POST http://localhost:7000/api/admin/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"phuc.pham.dev@gmail.com","password":"12345678"}'

# Get products (replace TOKEN)
curl http://localhost:7000/api/product/all \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔒 Security Features

✅ **Refresh Token System**
- Access token: 15 phút
- Refresh token: 7 ngày
- Auto-refresh trong frontend

✅ **Rate Limiting**
- Login: 5 attempts / 15 phút
- Password reset: 3 attempts / 1 giờ
- Refresh token: 10 attempts / 15 phút

✅ **Audit Logging**
- Track authentication events
- Log security events
- Logs trong `mer-backend/logs/`

---

## ❓ Troubleshooting

### Port đã được sử dụng
```bash
sudo lsof -i :7000
sudo kill -9 <PID>
```

### Container không start
```bash
docker-compose logs backend
docker-compose restart backend
```

### Database rỗng
Không thể xảy ra! Database tự động seed khi container start.

### Chạy lại từ đầu
```bash
./start-fresh.sh
```

---

## 📝 Notes

- Database tự động seed nếu rỗng (kiểm tra số lượng admins)
- Không cần chạy `node seed.js` thủ công
- Super Admin có quyền cao nhất trong hệ thống
- Tokens được tự động refresh trong frontend

---

Happy coding! 🎉
