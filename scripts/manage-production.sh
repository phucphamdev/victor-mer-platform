#!/bin/bash

# ============================================
# PRODUCTION MANAGEMENT SCRIPT
# Script quản lý production environment
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Load environment
if [ -f "config.env.prod" ]; then
    export $(cat config.env.prod | grep -v '^#' | xargs)
fi

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

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Show menu
show_menu() {
    print_header "PRODUCTION MANAGEMENT"
    echo "1.  Xem trạng thái services"
    echo "2.  Xem logs"
    echo "3.  Restart services"
    echo "4.  Stop services"
    echo "5.  Start services"
    echo "6.  Backup database"
    echo "7.  Restore database"
    echo "8.  Clear cache"
    echo "9.  Run migrations"
    echo "10. Update code và rebuild"
    echo "11. Xem resource usage"
    echo "12. Health check"
    echo "0.  Thoát"
    echo ""
}

# Status
show_status() {
    print_header "TRẠNG THÁI SERVICES"
    docker-compose -f docker-compose.prod.yml ps
}

# Logs
show_logs() {
    echo "Chọn service để xem logs:"
    echo "1. All services"
    echo "2. Backend"
    echo "3. Frontend"
    echo "4. Landing"
    echo "5. MySQL"
    echo "6. Redis"
    echo "7. Elasticsearch"
    echo "8. Nginx"
    read -p "Lựa chọn: " choice
    
    case $choice in
        1) docker-compose -f docker-compose.prod.yml logs -f ;;
        2) docker-compose -f docker-compose.prod.yml logs -f backend ;;
        3) docker-compose -f docker-compose.prod.yml logs -f frontend ;;
        4) docker-compose -f docker-compose.prod.yml logs -f landing ;;
        5) docker-compose -f docker-compose.prod.yml logs -f mysql ;;
        6) docker-compose -f docker-compose.prod.yml logs -f redis ;;
        7) docker-compose -f docker-compose.prod.yml logs -f elasticsearch ;;
        8) docker-compose -f docker-compose.prod.yml logs -f nginx-proxy ;;
        *) print_error "Lựa chọn không hợp lệ" ;;
    esac
}

# Restart
restart_services() {
    echo "Chọn service để restart:"
    echo "1. All services"
    echo "2. Backend"
    echo "3. Frontend"
    echo "4. Landing"
    echo "5. Nginx"
    read -p "Lựa chọn: " choice
    
    case $choice in
        1) docker-compose -f docker-compose.prod.yml restart ;;
        2) docker-compose -f docker-compose.prod.yml restart backend ;;
        3) docker-compose -f docker-compose.prod.yml restart frontend ;;
        4) docker-compose -f docker-compose.prod.yml restart landing ;;
        5) docker-compose -f docker-compose.prod.yml restart nginx-proxy ;;
        *) print_error "Lựa chọn không hợp lệ" ;;
    esac
    
    print_success "Đã restart services"
}

# Stop
stop_services() {
    read -p "Bạn có chắc muốn stop tất cả services? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker-compose -f docker-compose.prod.yml down
        print_success "Đã stop tất cả services"
    fi
}

# Start
start_services() {
    docker-compose -f docker-compose.prod.yml up -d
    print_success "Đã start tất cả services"
}

# Backup database
backup_database() {
    print_info "Đang backup database..."
    
    BACKUP_DIR="backups"
    mkdir -p "$BACKUP_DIR"
    
    BACKUP_FILE="$BACKUP_DIR/db_backup_$(date +%Y%m%d_%H%M%S).sql"
    
    docker exec ${PROJECT_NAME}-mysql-prod mysqldump \
        -u root -p${DB_ROOT_PASSWORD} ${DB_DATABASE} \
        > "$BACKUP_FILE"
    
    print_success "Đã backup database tại: $BACKUP_FILE"
    
    # Compress backup
    gzip "$BACKUP_FILE"
    print_success "Đã nén backup: ${BACKUP_FILE}.gz"
}

# Restore database
restore_database() {
    print_info "Danh sách backup có sẵn:"
    ls -lh backups/*.sql* 2>/dev/null || echo "Không có backup nào"
    
    read -p "Nhập tên file backup (ví dụ: backups/db_backup_20240101_120000.sql.gz): " backup_file
    
    if [ ! -f "$backup_file" ]; then
        print_error "File không tồn tại!"
        return
    fi
    
    read -p "CẢNH BÁO: Thao tác này sẽ ghi đè database hiện tại. Tiếp tục? (yes/no) " -r
    echo
    if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
        print_info "Đã hủy restore"
        return
    fi
    
    # Decompress if needed
    if [[ $backup_file == *.gz ]]; then
        gunzip -c "$backup_file" | docker exec -i ${PROJECT_NAME}-mysql-prod mysql \
            -u root -p${DB_ROOT_PASSWORD} ${DB_DATABASE}
    else
        docker exec -i ${PROJECT_NAME}-mysql-prod mysql \
            -u root -p${DB_ROOT_PASSWORD} ${DB_DATABASE} \
            < "$backup_file"
    fi
    
    print_success "Đã restore database"
}

# Clear cache
clear_cache() {
    print_info "Đang clear cache..."
    docker exec ${PROJECT_NAME}-backend-prod php artisan cache:clear
    docker exec ${PROJECT_NAME}-backend-prod php artisan config:clear
    docker exec ${PROJECT_NAME}-backend-prod php artisan route:clear
    docker exec ${PROJECT_NAME}-backend-prod php artisan view:clear
    print_success "Đã clear cache"
    
    print_info "Đang optimize lại..."
    docker exec ${PROJECT_NAME}-backend-prod php artisan config:cache
    docker exec ${PROJECT_NAME}-backend-prod php artisan route:cache
    docker exec ${PROJECT_NAME}-backend-prod php artisan view:cache
    print_success "Đã optimize"
}

# Run migrations
run_migrations() {
    read -p "Bạn có chắc muốn chạy migrations? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker exec ${PROJECT_NAME}-backend-prod php artisan migrate --force
        print_success "Đã chạy migrations"
    fi
}

# Update and rebuild
update_rebuild() {
    print_info "Đang pull code mới..."
    git pull origin main || git pull origin master
    
    print_info "Đang rebuild images..."
    docker-compose -f docker-compose.prod.yml build
    
    print_info "Đang restart services..."
    docker-compose -f docker-compose.prod.yml up -d
    
    print_info "Đang chạy migrations..."
    docker exec ${PROJECT_NAME}-backend-prod php artisan migrate --force
    
    print_info "Đang clear cache..."
    docker exec ${PROJECT_NAME}-backend-prod php artisan optimize:clear
    docker exec ${PROJECT_NAME}-backend-prod php artisan optimize
    
    print_success "Đã update và rebuild"
}

# Resource usage
show_resources() {
    print_header "RESOURCE USAGE"
    docker stats --no-stream
}

# Health check
health_check() {
    print_header "HEALTH CHECK"
    
    # Check MySQL
    print_info "Checking MySQL..."
    if docker exec ${PROJECT_NAME}-mysql-prod mysqladmin ping -h localhost -u root -p${DB_ROOT_PASSWORD} &> /dev/null; then
        print_success "MySQL: OK"
    else
        print_error "MySQL: FAILED"
    fi
    
    # Check Redis
    print_info "Checking Redis..."
    if docker exec ${PROJECT_NAME}-redis-prod redis-cli -a ${REDIS_PASSWORD} ping &> /dev/null; then
        print_success "Redis: OK"
    else
        print_error "Redis: FAILED"
    fi
    
    # Check Elasticsearch
    print_info "Checking Elasticsearch..."
    if docker exec ${PROJECT_NAME}-elasticsearch-prod curl -s http://localhost:9200/_cluster/health &> /dev/null; then
        print_success "Elasticsearch: OK"
    else
        print_error "Elasticsearch: FAILED"
    fi
    
    # Check Backend
    print_info "Checking Backend..."
    if curl -s -o /dev/null -w "%{http_code}" ${BACKEND_URL} | grep -q "200\|302"; then
        print_success "Backend: OK"
    else
        print_error "Backend: FAILED"
    fi
    
    # Check Frontend
    print_info "Checking Frontend..."
    if curl -s -o /dev/null -w "%{http_code}" ${STOREFRONT_URL} | grep -q "200\|302"; then
        print_success "Frontend: OK"
    else
        print_error "Frontend: FAILED"
    fi
    
    # Check Landing
    print_info "Checking Landing..."
    if curl -s -o /dev/null -w "%{http_code}" ${LANDING_URL} | grep -q "200\|302"; then
        print_success "Landing: OK"
    else
        print_error "Landing: FAILED"
    fi
}

# Main loop
main() {
    while true; do
        show_menu
        read -p "Lựa chọn của bạn: " choice
        
        case $choice in
            1) show_status ;;
            2) show_logs ;;
            3) restart_services ;;
            4) stop_services ;;
            5) start_services ;;
            6) backup_database ;;
            7) restore_database ;;
            8) clear_cache ;;
            9) run_migrations ;;
            10) update_rebuild ;;
            11) show_resources ;;
            12) health_check ;;
            0) print_info "Tạm biệt!"; exit 0 ;;
            *) print_error "Lựa chọn không hợp lệ" ;;
        esac
        
        echo ""
        read -p "Nhấn Enter để tiếp tục..."
    done
}

# Run
main
