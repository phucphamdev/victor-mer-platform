#!/bin/bash

# ============================================
# PRODUCTION DEPLOYMENT SCRIPT
# Script tự động deploy production
# ============================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Check if config file exists
check_config() {
    if [ ! -f "config.env.prod" ]; then
        print_error "File config.env.prod không tồn tại!"
        print_info "Vui lòng copy từ config.env.prod.example và chỉnh sửa:"
        echo "  cp config.env.prod.example config.env.prod"
        echo "  nano config.env.prod"
        exit 1
    fi
    print_success "File config.env.prod đã tồn tại"
}

# Load environment variables
load_env() {
    print_info "Đang load environment variables..."
    export $(cat config.env.prod | grep -v '^#' | xargs)
    print_success "Đã load environment variables"
}

# Check Docker
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker chưa được cài đặt!"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose chưa được cài đặt!"
        exit 1
    fi
    
    print_success "Docker và Docker Compose đã sẵn sàng"
}

# Check SSL certificates
check_ssl() {
    if [ ! -d "nginx/ssl" ]; then
        print_warning "Thư mục nginx/ssl chưa tồn tại. Đang tạo..."
        mkdir -p nginx/ssl
    fi
    
    if [ ! -f "nginx/ssl/fullchain.pem" ] || [ ! -f "nginx/ssl/privkey.pem" ]; then
        print_warning "SSL certificates chưa được cấu hình!"
        print_info "Bạn có thể:"
        echo "  1. Sử dụng Let's Encrypt (khuyến nghị)"
        echo "  2. Tạo self-signed certificate (chỉ dùng test)"
        echo ""
        read -p "Bạn có muốn tạo self-signed certificate không? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            create_self_signed_cert
        else
            print_info "Vui lòng cấu hình SSL certificate trước khi tiếp tục"
            exit 1
        fi
    else
        print_success "SSL certificates đã được cấu hình"
    fi
}

# Create self-signed certificate
create_self_signed_cert() {
    print_info "Đang tạo self-signed certificate..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout nginx/ssl/privkey.pem \
        -out nginx/ssl/fullchain.pem \
        -subj "/C=VN/ST=HCM/L=HoChiMinh/O=VictorMer/CN=localhost"
    print_success "Đã tạo self-signed certificate"
}

# Backup current data
backup_data() {
    print_info "Đang backup dữ liệu hiện tại..."
    
    BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # Backup database if container is running
    if docker ps | grep -q "${PROJECT_NAME}-mysql-prod"; then
        print_info "Đang backup MySQL database..."
        docker exec ${PROJECT_NAME}-mysql-prod mysqldump \
            -u root -p${DB_ROOT_PASSWORD} ${DB_DATABASE} \
            > "$BACKUP_DIR/database.sql" 2>/dev/null || true
        print_success "Đã backup database"
    fi
    
    print_success "Backup hoàn tất tại: $BACKUP_DIR"
}

# Pull latest code
pull_code() {
    if [ -d ".git" ]; then
        print_info "Đang pull code mới nhất..."
        git pull origin main || git pull origin master
        print_success "Đã pull code mới nhất"
    else
        print_warning "Không phải Git repository, bỏ qua pull code"
    fi
}

# Build Docker images
build_images() {
    print_info "Đang build Docker images..."
    docker-compose -f docker-compose.prod.yml build --no-cache
    print_success "Đã build Docker images"
}

# Start services
start_services() {
    print_info "Đang khởi động services..."
    docker-compose -f docker-compose.prod.yml up -d
    print_success "Đã khởi động services"
}

# Wait for services to be ready
wait_for_services() {
    print_info "Đang chờ services khởi động..."
    sleep 10
    
    # Wait for MySQL
    print_info "Đang chờ MySQL..."
    for i in {1..30}; do
        if docker exec ${PROJECT_NAME}-mysql-prod mysqladmin ping -h localhost -u root -p${DB_ROOT_PASSWORD} &> /dev/null; then
            print_success "MySQL đã sẵn sàng"
            break
        fi
        sleep 2
    done
    
    # Wait for Redis
    print_info "Đang chờ Redis..."
    for i in {1..30}; do
        if docker exec ${PROJECT_NAME}-redis-prod redis-cli -a ${REDIS_PASSWORD} ping &> /dev/null; then
            print_success "Redis đã sẵn sàng"
            break
        fi
        sleep 2
    done
}

# Run migrations
run_migrations() {
    print_info "Đang chạy database migrations..."
    docker exec ${PROJECT_NAME}-backend-prod php artisan migrate --force
    print_success "Đã chạy migrations"
}

# Optimize Laravel
optimize_laravel() {
    print_info "Đang optimize Laravel..."
    docker exec ${PROJECT_NAME}-backend-prod php artisan config:cache
    docker exec ${PROJECT_NAME}-backend-prod php artisan route:cache
    docker exec ${PROJECT_NAME}-backend-prod php artisan view:cache
    print_success "Đã optimize Laravel"
}

# Show status
show_status() {
    print_header "TRẠNG THÁI HỆ THỐNG"
    docker-compose -f docker-compose.prod.yml ps
}

# Show URLs
show_urls() {
    print_header "CÁC ĐƯỜNG DẪN TRUY CẬP"
    echo -e "Landing Page:    ${GREEN}${LANDING_URL}${NC}"
    echo -e "Storefront:      ${GREEN}${STOREFRONT_URL}${NC}"
    echo -e "Backend API:     ${GREEN}${BACKEND_URL}${NC}"
    echo -e "Kibana:          ${GREEN}${BACKEND_URL}:5601${NC}"
}

# Main deployment flow
main() {
    print_header "BẮT ĐẦU DEPLOY PRODUCTION"
    
    # Pre-deployment checks
    check_config
    load_env
    check_docker
    check_ssl
    
    # Confirm deployment
    print_warning "Bạn sắp deploy lên PRODUCTION!"
    read -p "Bạn có chắc chắn muốn tiếp tục? (yes/no) " -r
    echo
    if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
        print_info "Đã hủy deployment"
        exit 0
    fi
    
    # Deployment steps
    backup_data
    pull_code
    build_images
    start_services
    wait_for_services
    run_migrations
    optimize_laravel
    
    # Show results
    show_status
    show_urls
    
    print_header "DEPLOY HOÀN TẤT!"
    print_success "Hệ thống đã sẵn sàng sử dụng"
    
    print_info "Để xem logs:"
    echo "  docker-compose -f docker-compose.prod.yml logs -f"
    
    print_info "Để stop services:"
    echo "  docker-compose -f docker-compose.prod.yml down"
}

# Run main function
main
