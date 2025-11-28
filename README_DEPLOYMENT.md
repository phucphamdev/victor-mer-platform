# 🚀 Deployment Guide - Victor MER Platform

## Quick Start (1 Command)

### Linux/Mac
```bash
./start-fresh.sh
```

### Windows
```cmd
start-fresh.bat
```

**Thời gian**: 5-10 phút (tùy tốc độ internet)

---

## Sau khi chạy xong

### 🌐 URLs
- Frontend: http://localhost:3000
- Admin: http://localhost:4000  
- API: http://localhost:7000
- Docs: http://localhost:7000/api-docs

### 🔐 Login
```
Email: dorothy@gmail.com
Password: 123456
```

### 📊 Data
- 37 Products
- 15 Categories
- 10 Brands
- 4 Coupons

---

## Các lệnh thường dùng

```bash
# Xem logs
docker-compose logs -f backend

# Restart
docker-compose restart

# Stop
docker-compose down

# Rebuild
docker-compose up -d --build
```

---

## Tính năng bảo mật đã implement

✅ **Refresh Token System**
- Access token: 15 phút
- Refresh token: 7 ngày
- Auto-refresh trong frontend

✅ **Rate Limiting**
- Login: 5 lần / 15 phút
- Password reset: 3 lần / 1 giờ

✅ **Audit Logging**
- Track tất cả authentication events
- Logs trong `mer-backend/logs/`

---

## Troubleshooting

### Port bị chiếm
```bash
sudo lsof -i :7000
sudo kill -9 <PID>
```

### Container không start
```bash
docker-compose logs backend
docker-compose restart backend
```

### Chạy lại từ đầu
```bash
./start-fresh.sh
```

---

Xem chi tiết: [QUICK_START.md](QUICK_START.md)
