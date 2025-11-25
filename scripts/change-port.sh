#!/bin/bash

# ============================================
# CHANGE PORT - Script thay đổi port nhanh
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
CONFIG_FILE="$PROJECT_ROOT/config.env"

cd "$PROJECT_ROOT"

# Hàm hiển thị usage
show_usage() {
    echo "Usage: bash scripts/change-port.sh [service] [port]"
    echo ""
    echo "Services:"
    echo "  landing      - Landing page"
    echo "  storefront   - Storefront (Next.js)"
    echo "  backend      - Backend API"
    echo "  mysql        - MySQL database"
    echo "  redis        - Redis cache"
    echo ""
    echo "Example:"
    echo "  bash scripts/change-port.sh storefront 3005"
    echo "  bash scripts/change-port.sh backend 9000"
}

# Kiểm tra tham số
if [ $# -ne 2 ]; then
    show_usage
    exit 1
fi

SERVICE=$1
NEW_PORT=$2

# Kiểm tra config.env tồn tại
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Không tìm thấy config.env"
    exit 1
fi

# Thay đổi port trong config.env
case $SERVICE in
    landing)
        sed -i "s/^LANDING_PORT=.*/LANDING_PORT=$NEW_PORT/" "$CONFIG_FILE"
        sed -i "s|^LANDING_URL=.*|LANDING_URL=http://localhost:$NEW_PORT|" "$CONFIG_FILE"
        echo "✓ Đã thay đổi LANDING_PORT thành $NEW_PORT"
        ;;
    storefront)
        sed -i "s/^STOREFRONT_PORT=.*/STOREFRONT_PORT=$NEW_PORT/" "$CONFIG_FILE"
        sed -i "s|^STOREFRONT_URL=.*|STOREFRONT_URL=http://localhost:$NEW_PORT|" "$CONFIG_FILE"
        echo "✓ Đã thay đổi STOREFRONT_PORT thành $NEW_PORT"
        ;;
    backend)
        sed -i "s/^BACKEND_PORT=.*/BACKEND_PORT=$NEW_PORT/" "$CONFIG_FILE"
        sed -i "s|^BACKEND_URL=.*|BACKEND_URL=http://localhost:$NEW_PORT|" "$CONFIG_FILE"
        echo "✓ Đã thay đổi BACKEND_PORT thành $NEW_PORT"
        ;;
    mysql)
        sed -i "s/^MYSQL_PORT=.*/MYSQL_PORT=$NEW_PORT/" "$CONFIG_FILE"
        echo "✓ Đã thay đổi MYSQL_PORT thành $NEW_PORT"
        ;;
    redis)
        sed -i "s/^REDIS_PORT=.*/REDIS_PORT=$NEW_PORT/" "$CONFIG_FILE"
        echo "✓ Đã thay đổi REDIS_PORT thành $NEW_PORT"
        ;;
    *)
        echo "❌ Service không hợp lệ: $SERVICE"
        show_usage
        exit 1
        ;;
esac

# Tạo lại file cấu hình
echo ""
echo "📝 Đang cập nhật file cấu hình..."
bash "$SCRIPT_DIR/generate-config.sh"

echo ""
echo "✅ Hoàn tất! Khởi động lại services để áp dụng thay đổi:"
echo "   docker-compose down && docker-compose up -d"
