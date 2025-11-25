# Changelog

## [2024-11-23] - Cấu hình tập trung & Rebranding

### ✨ Tính năng mới

- **Hệ thống cấu hình tập trung**: Tất cả cấu hình được quản lý trong file `config.env` duy nhất
- **Scripts tự động**:
  - `generate-config.sh` - Tạo tất cả file .env từ config.env
  - `change-port.sh` - Thay đổi port nhanh chóng
  - `info.sh` - Hiển thị thông tin cấu hình hiện tại
- **config.json** - File JSON chứa cấu hình cho scripts và tools

### 🔄 Thay đổi

- **Rebranding**: Đổi tên từ "Bagisto SaaS" sang "Victor Mer E-Commerce Platform"
- **Ports mới**:
  - Landing: 3000 → 3008
  - Storefront: 3001 → 3009
  - Backend: 8000 → 8080
- **Database credentials**: Đổi từ "bagisto" sang "ecommerce_*"
- **Docker network**: Đổi từ "bagisto-network" sang "ecommerce-network"
- **Cache prefix**: Đổi từ "bagisto" sang "ecommerce"

### 📧 Thông tin liên hệ

- Email: phuc.pham.dev@gmail.com
- Phone: +84 938 788 091
- Address: 1180 Street, Ward 8, Go Vap District, Ho Chi Minh City, 700000
- Company: Victor Mer
- Slogan: Built with ❤️ by Victor Mer

### 📝 Tài liệu

- Thêm `CONFIGURATION.md` - Hướng dẫn chi tiết về cấu hình
- Cập nhật `README.md` với thông tin mới
- Cập nhật `SETUP.md` với ports và URLs mới

### 🔧 Cải tiến kỹ thuật

- Loại bỏ tất cả hard-coded values trong:
  - docker-compose.yml
  - next.config.js
  - package.json
  - Scripts
- Tất cả biến môi trường được load từ config.env
- Hỗ trợ biến có dấu ngoặc kép và ký tự đặc biệt

### 🎯 Workflow mới

```bash
# 1. Chỉnh sửa cấu hình
nano config.env

# 2. Tạo lại file .env
bash scripts/generate-config.sh

# 3. Khởi động
bash scripts/start.sh
```

### 🚀 Migration từ phiên bản cũ

Nếu bạn đang sử dụng phiên bản cũ:

```bash
# 1. Backup cấu hình cũ
cp .env .env.backup
cp backend/.env backend/.env.backup

# 2. Tạo config.env từ template
cp config.env.example config.env

# 3. Chỉnh sửa config.env theo nhu cầu
nano config.env

# 4. Tạo lại tất cả file cấu hình
bash scripts/generate-config.sh

# 5. Khởi động lại
docker-compose down
docker-compose up -d
```
