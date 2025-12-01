# Hướng Dẫn Sử Dụng 2 Admin Panels

## Tổng Quan

Dự án hiện có 2 phiên bản Admin Panel chạy song song:

- **Admin Panel V1** (`mer-admin-panel-v1`): Phiên bản cũ, ổn định
- **Admin Panel V2** (`mer-admin-panel-v2`): Phiên bản mới với UI hiện đại

Cả 2 panels đều sử dụng cùng Backend API để đảm bảo dữ liệu đồng bộ.

## Cấu Hình Ports

### Development (Localhost)
- Backend API: `http://localhost:7000`
- Admin Panel V1: `http://localhost:4000`
- Admin Panel V2: `http://localhost:4100`
- Frontend Store: `http://localhost:3500`

### Production (VPS)
- Backend API: `https://api.yourdomain.com`
- Admin Panel V1: `https://yourdomain.com/admin/v1`
- Admin Panel V2: `https://yourdomain.com/admin/v2`
- Frontend Store: `https://yourdomain.com`

## Bảo Mật

### Ports "Lạ" Tăng Cường Bảo Mật
- Port 4000 và 4100 không phải là ports phổ biến (80, 443, 3000, 8080)
- Khó bị dò quét tự động bởi bots
- Giảm nguy cơ bị tấn công brute-force

### Production Security
- Trên production, admin panels được ẩn sau path `/admin/v1` và `/admin/v2`
- Không expose ports trực tiếp ra ngoài
- Có thể thêm IP whitelist trong nginx config
- SSL/TLS encryption cho tất cả connections

## Chạy Development

### Cách 1: Sử dụng Script Tự Động
```bash
./run.sh
# Chọn option 5: Start All Services (Native)
```

### Cách 2: Chạy Thủ Công

#### Backend
```bash
cd mer-backend
npm install
npm run start-dev
```

#### Admin Panel V1
```bash
cd mer-admin-panel-v1
npm install
PORT=4000 npm run dev
```

#### Admin Panel V2
```bash
cd mer-admin-panel-v2
npm install
PORT=4100 npm run dev
```

#### Frontend
```bash
cd mer-front-end
npm install
npm run dev
```

### Cách 3: Docker Development
```bash
docker-compose up -d
```

## Chạy Production

### Bước 1: Cấu Hình Environment
```bash
# Copy và chỉnh sửa file .env.prod
cp .env.example .env.prod
nano .env.prod
```

Cập nhật các giá trị:
- `BACKEND_URL=https://api.yourdomain.com`
- `STORE_URL=https://yourdomain.com`
- `ADMIN_V1_URL=https://yourdomain.com/admin/v1`
- `ADMIN_V2_URL=https://yourdomain.com/admin/v2`

### Bước 2: Cấu Hình Nginx
```bash
# Chỉnh sửa nginx config
nano nginx/nginx.conf
```

Thay đổi `yourdomain.com` thành domain thực của bạn.

### Bước 3: Setup SSL Certificate
```bash
# Sử dụng Let's Encrypt
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# Copy certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/
```

### Bước 4: Deploy
```bash
# Sử dụng script tự động
sudo ./run.sh
# Chọn option 3: Docker Production

# Hoặc chạy thủ công
docker-compose -f docker-compose.prod.yml up -d --build
```

## Kiểm Tra Health

### Development
```bash
# Backend
curl http://localhost:7000/health

# Admin V1
curl http://localhost:4000

# Admin V2
curl http://localhost:4100
```

### Production
```bash
# Backend
curl https://api.yourdomain.com/health

# Admin V1
curl https://yourdomain.com/admin/v1

# Admin V2
curl https://yourdomain.com/admin/v2
```

## Xem Logs

### Development
```bash
# Tất cả logs
tail -f logs/*.log

# Backend only
tail -f logs/backend.log

# Admin V1 only
tail -f logs/admin-v1.log

# Admin V2 only
tail -f logs/admin-v2.log
```

### Production (Docker)
```bash
# Tất cả services
docker-compose -f docker-compose.prod.yml logs -f

# Backend only
docker logs -f victormer-backend-prod

# Admin V1 only
docker logs -f victormer-admin-v1-prod

# Admin V2 only
docker logs -f victormer-admin-v2-prod
```

## Troubleshooting

### Port đã được sử dụng
```bash
# Kiểm tra port
lsof -i :4000
lsof -i :4100

# Kill process
kill -9 <PID>

# Hoặc dùng script
./run.sh
# Chọn option 6: Stop All Services
```

### Docker không start
```bash
# Clean và rebuild
docker-compose down -v
docker system prune -af
docker-compose up -d --build
```

### Nginx không route đúng
```bash
# Test nginx config
docker exec victormer-nginx-prod nginx -t

# Reload nginx
docker exec victormer-nginx-prod nginx -s reload
```

## Tính Năng Bảo Mật Nâng Cao

### 1. IP Whitelist (Optional)
Uncomment trong `nginx/nginx.conf`:
```nginx
location /admin/v1 {
    allow 1.2.3.4;      # Your office IP
    allow 5.6.7.8;      # Your home IP
    deny all;
    ...
}
```

### 2. Rate Limiting
Đã được cấu hình sẵn:
- API: 10 requests/second
- General: 30 requests/second

### 3. Security Headers
Tự động thêm:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

## Demo Data & Seeding

Backend tự động tạo demo data khi khởi động lần đầu. Không cần tạo file .md riêng.

### Kiểm tra demo data
```bash
# Login vào MongoDB
mongosh

# Chọn database
use victormer_ecommerce_dev_db

# Xem users
db.users.find()

# Xem products
db.products.find()
```

## Backup & Restore

### Backup
```bash
# Tự động backup
./run.sh
# Chọn option 15: Backup Database

# Thủ công
mongodump --out backups/$(date +%Y%m%d_%H%M%S)
```

### Restore
```bash
mongorestore backups/20241201_120000/
```

## Monitoring

### Service Status
```bash
./run.sh
# Chọn option 10: Service Status
```

### Health Check
```bash
./run.sh
# Chọn option 11: Health Check
```

## Cập Nhật Project

```bash
./run.sh
# Chọn option 21: Update Project (Git Pull)
```

## Liên Hệ & Support

Nếu gặp vấn đề, kiểm tra:
1. Logs của service bị lỗi
2. Docker container status: `docker ps -a`
3. Port conflicts: `lsof -i :<port>`
4. Environment variables: `cat .env`
