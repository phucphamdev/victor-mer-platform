#!/bin/bash

# ============================================
# INFO - Hiển thị thông tin cấu hình hiện tại
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
CONFIG_FILE="$PROJECT_ROOT/config.env"

cd "$PROJECT_ROOT"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║      VICTOR MER E-COMMERCE - CONFIGURATION INFO          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Kiểm tra config.env
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Không tìm thấy config.env"
    exit 1
fi

# Load config
set -a
source $CONFIG_FILE
set +a

echo "📦 PROJECT INFORMATION"
echo "  Name:        $PROJECT_NAME"
echo "  Environment: $APP_ENV"
echo "  Debug:       $APP_DEBUG"
echo ""

echo "🌐 URLS & PORTS"
echo "  Landing:     $LANDING_URL (Port: $LANDING_PORT)"
echo "  Storefront:  $STOREFRONT_URL (Port: $STOREFRONT_PORT)"
echo "  Backend:     $BACKEND_URL (Port: $BACKEND_PORT)"
echo "  Admin:       $BACKEND_URL/admin"
echo ""

echo "🗄️  DATABASE"
echo "  Host:        $MYSQL_INTERNAL_HOST (External Port: $MYSQL_PORT)"
echo "  Database:    $DB_DATABASE"
echo "  Username:    $DB_USERNAME"
echo ""

echo "🔧 SERVICES"
echo "  Redis:           localhost:$REDIS_PORT"
echo "  Elasticsearch:   localhost:$ELASTICSEARCH_PORT"
echo "  Kibana:          localhost:$KIBANA_PORT"
echo "  MailHog Web:     localhost:$MAILHOG_WEB_PORT"
echo "  MailHog SMTP:    localhost:$MAILHOG_SMTP_PORT"
echo ""

echo "🐳 DOCKER STATUS"
docker-compose ps 2>/dev/null || echo "  Docker services chưa khởi động"
echo ""

echo "💡 USEFUL COMMANDS"
echo "  Thay đổi port:     bash scripts/change-port.sh [service] [port]"
echo "  Tạo lại config:    bash scripts/generate-config.sh"
echo "  Khởi động:         bash scripts/start.sh"
echo "  Development:       bash scripts/dev.sh"
echo ""
