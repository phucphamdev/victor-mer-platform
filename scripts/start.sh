#!/bin/bash

# ============================================
# START SCRIPT - Khởi động production environment
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
fi

# Kiểm tra nếu đã setup chưa
if [ ! -f ".env" ] || [ ! -f "backend/.env" ]; then
    echo "⚠️  Chưa có file cấu hình. Đang tạo..."
    bash scripts/generate-config.sh
    echo ""
fi

echo "✓ Đã có cấu hình"
echo ""
echo "Khởi động containers..."
docker-compose up -d

echo ""
echo "✓ Hoàn tất!"
echo ""
echo "📍 Truy cập:"
echo "  Landing:    ${LANDING_URL:-http://localhost:3000}"
echo "  Storefront: ${STOREFRONT_URL:-http://localhost:3001}"
echo "  Backend:    ${BACKEND_URL:-http://localhost:8000}"
echo "  Admin:      ${BACKEND_URL:-http://localhost:8000}/admin"
echo ""
