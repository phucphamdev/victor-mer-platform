#!/bin/bash

# ============================================
# DEV SCRIPT - Khởi động development environment
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "🚀 Khởi động Victor Mer E-Commerce Platform..."
echo ""

# Load config
if [ -f "config.env" ]; then
    set -a
    source config.env
    set +a
else
    echo "⚠️  Không tìm thấy config.env, sử dụng giá trị mặc định"
fi

# Kiểm tra Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker chưa được cài đặt"
    exit 1
fi

# Tạo file cấu hình nếu chưa có
if [ ! -f ".env" ] || [ ! -f "backend/.env" ]; then
    echo "📝 Tạo file cấu hình..."
    bash scripts/generate-config.sh
    echo ""
fi

# Khởi động Docker services
echo "📦 Khởi động Docker services..."
docker-compose up -d

echo ""
echo "✅ Hoàn tất!"
echo ""
echo "📍 Truy cập:"
echo "  Landing:    ${LANDING_URL:-http://localhost:3000}"
echo "  Storefront: ${STOREFRONT_URL:-http://localhost:3001}"
echo "  Backend:    ${BACKEND_URL:-http://localhost:8000}"
echo "  Admin:      ${BACKEND_URL:-http://localhost:8000}/admin"
echo "  Kibana:     http://localhost:${KIBANA_PORT:-5601}"
echo "  MailHog:    http://localhost:${MAILHOG_WEB_PORT:-8025}"
echo ""
echo "💡 Để thay đổi cấu hình, chỉnh sửa file config.env và chạy:"
echo "   bash scripts/generate-config.sh"
