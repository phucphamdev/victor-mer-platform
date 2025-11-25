#!/bin/bash

echo "=========================================="
echo "  Bagisto SaaS Platform Setup Script"
echo "=========================================="
echo ""

# Màu sắc cho output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Generate config từ .env chung
echo -e "${YELLOW}[1/8] Tạo config từ file .env chung...${NC}"
./generate-config.sh
echo -e "${GREEN}✓ Config đã được tạo${NC}"
echo ""

# Kiểm tra Docker
echo -e "${YELLOW}[2/8] Kiểm tra Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker chưa được cài đặt. Vui lòng cài Docker trước.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker đã sẵn sàng${NC}"
echo ""

# Kiểm tra Docker Compose
echo -e "${YELLOW}[3/8] Kiểm tra Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose chưa được cài đặt. Vui lòng cài Docker Compose trước.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker Compose đã sẵn sàng${NC}"
echo ""

# Dừng các container cũ nếu có
echo -e "${YELLOW}[4/8] Dừng các container cũ (nếu có)...${NC}"
docker-compose down 2>/dev/null
echo -e "${GREEN}✓ Đã dừng các container cũ${NC}"
echo ""

# Build và khởi động containers
echo -e "${YELLOW}[5/8] Build và khởi động Docker containers...${NC}"
docker-compose up -d --build
if [ $? -ne 0 ]; then
    echo -e "${RED}Lỗi khi build containers. Vui lòng kiểm tra lại.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Containers đã được khởi động${NC}"
echo ""

# Đợi MySQL sẵn sàng
echo -e "${YELLOW}[6/8] Đợi MySQL khởi động...${NC}"
sleep 15
echo -e "${GREEN}✓ MySQL đã sẵn sàng${NC}"
echo ""

# Cài đặt dependencies và setup
echo -e "${YELLOW}[7/8] Cài đặt Backend và Frontend...${NC}"

echo "Cài đặt Frontend (Next.js)..."
docker-compose exec -T frontend npm install 2>/dev/null || echo "Frontend đang build..."

echo "Cài đặt Backend (Bagisto)..."
docker-compose exec -T backend composer install --no-interaction --prefer-dist --optimize-autoloader

echo "Tạo APP_KEY..."
docker-compose exec -T backend php artisan key:generate

echo "Chạy migrations và seeders..."
docker-compose exec -T backend php artisan migrate:fresh --seed

echo "Tạo storage link..."
docker-compose exec -T backend php artisan storage:link

echo "Optimize cache..."
docker-compose exec -T backend php artisan optimize:clear

echo "Cấu hình quyền..."
docker-compose exec -T backend chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
docker-compose exec -T backend chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

echo -e "${GREEN}✓ Backend và Frontend đã được cài đặt${NC}"
echo ""

# Hoàn thành
echo -e "${YELLOW}[8/8] Hoàn thành!${NC}"
echo ""
echo "=========================================="
echo -e "${GREEN}  Setup hoàn tất!${NC}"
echo "=========================================="
echo ""
echo "Các dịch vụ đang chạy:"
echo "  - Frontend (Next.js):   http://localhost:3000"
echo "  - Backend (Bagisto):    http://localhost:8000"
echo "  - Admin Panel:          http://localhost:8000/admin"
echo "  - MySQL:                localhost:3306"
echo "  - Redis:                localhost:6379"
echo "  - Elasticsearch:        http://localhost:9200"
echo "  - Kibana:               http://localhost:5601"
echo "  - MailHog (Email):      http://localhost:8025"
echo ""
echo "Thông tin đăng nhập mặc định:"
echo "  Email:    admin@example.com"
echo "  Password: admin123"
echo ""
echo "Các lệnh hữu ích:"
echo "  - Xem logs:             docker-compose logs -f"
echo "  - Dừng containers:      docker-compose down"
echo "  - Khởi động lại:        docker-compose restart"
echo "  - Vào backend shell:    docker-compose exec backend bash"
echo ""
