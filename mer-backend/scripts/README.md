# Collection Seeder

## Mô tả
Script này tạo dữ liệu mẫu cho Collections trong database.

## Dữ liệu mẫu bao gồm:

### Custom Collections (4 items)
- 🎁 Gift Ideas - Ý tưởng quà tặng
- 💎 Premium Collection - Bộ sưu tập cao cấp
- 💝 Budget Friendly - Giá cả phải chăng
- 👑 Limited Edition - Phiên bản giới hạn

### Seasonal Collections (2 items)
- 🌸 Summer Essentials - Thiết yếu mùa hè
- 🎉 Holiday Special - Đặc biệt ngày lễ

### Trending Collections (2 items)
- 🔥 Hot Right Now - Đang hot
- ⭐ Staff Picks - Lựa chọn của nhân viên

### New Arrival Collections (2 items)
- 🚀 Just Arrived - Vừa về
- ✨ New This Week - Mới tuần này

### Best Seller Collections (2 items)
- 🏆 Customer Favorites - Yêu thích của khách hàng
- 🌟 Top Rated - Đánh giá cao nhất

## Cách sử dụng

### 1. Chạy từ thư mục backend:
```bash
cd mer-backend
npm run seed:collections
```

### 2. Hoặc chạy trực tiếp:
```bash
node mer-backend/scripts/seedCollections.js
```

## Lưu ý
- Script sẽ **xóa tất cả collections hiện có** trước khi tạo dữ liệu mới
- Đảm bảo biến môi trường `MONGO_URI` đã được cấu hình trong file `.env`
- Mỗi collection có đầy đủ thông tin: name, slug, description, icon, type, priority, featured, và SEO metadata

## Kết quả
Sau khi chạy thành công, bạn sẽ thấy:
- ✅ Số lượng collections đã tạo
- 📊 Thống kê theo từng loại collection
- ✨ Thông báo hoàn thành
