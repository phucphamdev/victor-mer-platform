#!/bin/bash

# ============================================
# GENERATE CONFIG - Tạo file cấu hình tự động
# Script này đọc config.env và tạo các file .env
# cho từng service trong dự án
# ============================================

set -e

CONFIG_FILE="config.env"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "🔧 Đang tạo file cấu hình từ $CONFIG_FILE..."
echo ""

# Kiểm tra file config.env tồn tại
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Không tìm thấy $CONFIG_FILE"
    echo "Vui lòng tạo file config.env từ config.env.example"
    exit 1
fi

# Load biến từ config.env (xử lý cả biến có dấu ngoặc kép)
set -a
source $CONFIG_FILE
set +a

# ============================================
# 1. ROOT .env (cho docker-compose)
# ============================================
echo "📝 Tạo .env (root)..."
cat > .env << EOF
# ============================================
# GLOBAL CONFIGURATION - Cấu hình chung
# Auto-generated from config.env
# ============================================

# Project Info
PROJECT_NAME=${PROJECT_NAME}
COMPOSE_PROJECT_NAME=${COMPOSE_PROJECT_NAME}

# Ports
LANDING_PORT=${LANDING_PORT}
STOREFRONT_PORT=${STOREFRONT_PORT}
BACKEND_PORT=${BACKEND_PORT}
MYSQL_PORT=${MYSQL_PORT}
REDIS_PORT=${REDIS_PORT}
ELASTICSEARCH_PORT=${ELASTICSEARCH_PORT}
ELASTICSEARCH_TRANSPORT_PORT=${ELASTICSEARCH_TRANSPORT_PORT}
KIBANA_PORT=${KIBANA_PORT}
MAILHOG_SMTP_PORT=${MAILHOG_SMTP_PORT}
MAILHOG_WEB_PORT=${MAILHOG_WEB_PORT}
VITE_PORT=${VITE_PORT}

# Database
DB_DATABASE=${DB_DATABASE}
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}
DB_ROOT_PASSWORD=${DB_ROOT_PASSWORD}

# URLs
LANDING_URL=${LANDING_URL}
STOREFRONT_URL=${STOREFRONT_URL}
BACKEND_URL=${BACKEND_URL}
DOCS_URL=${DOCS_URL}
DEMO_STORE_1_URL=${DEMO_STORE_1_URL}
DEMO_STORE_2_URL=${DEMO_STORE_2_URL}

# Internal URLs
BACKEND_INTERNAL_URL=${BACKEND_INTERNAL_URL}
MYSQL_INTERNAL_HOST=${MYSQL_INTERNAL_HOST}
REDIS_INTERNAL_HOST=${REDIS_INTERNAL_HOST}
ELASTICSEARCH_INTERNAL_HOST=${ELASTICSEARCH_INTERNAL_HOST}

# Application
APP_ENV=${APP_ENV}
APP_DEBUG=${APP_DEBUG}
NODE_ENV=${NODE_ENV}

# Memory
ELASTICSEARCH_MEMORY_MIN=${ELASTICSEARCH_MEMORY_MIN:-512m}
ELASTICSEARCH_MEMORY_MAX=${ELASTICSEARCH_MEMORY_MAX:-512m}

# Optional
GA_ID=${GA_ID}
ANALYTICS_ENDPOINT=${ANALYTICS_ENDPOINT}

# Docker
WWWGROUP=${WWWGROUP}
WWWUSER=${WWWUSER}
EOF

# ============================================
# 2. BACKEND .env (Laravel)
# ============================================
echo "📝 Tạo backend/.env..."
cat > backend/.env << EOF
# ============================================
# BACKEND CONFIGURATION (Laravel)
# Auto-generated from config.env
# ============================================

APP_NAME="${APP_NAME}"
APP_ENV=${APP_ENV}
APP_KEY=
APP_DEBUG=${APP_DEBUG}
APP_DEBUG_ALLOWED_IPS=
APP_URL=${BACKEND_URL}
APP_ADMIN_URL=${APP_ADMIN_URL}
APP_TIMEZONE=${APP_TIMEZONE}

APP_LOCALE=${APP_LOCALE}
APP_FALLBACK_LOCALE=${APP_FALLBACK_LOCALE}
APP_FAKER_LOCALE=${APP_FAKER_LOCALE}

APP_CURRENCY=${APP_CURRENCY}

APP_MAINTENANCE_DRIVER=file
BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

# Database
DB_CONNECTION=${DB_CONNECTION}
DB_HOST=${MYSQL_INTERNAL_HOST}
DB_PORT=3306
DB_DATABASE=${DB_DATABASE}
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}
DB_PREFIX=${DB_PREFIX}

# Session
SESSION_DRIVER=${SESSION_DRIVER}
SESSION_LIFETIME=${SESSION_LIFETIME}
SESSION_ENCRYPT=${SESSION_ENCRYPT}
SESSION_PATH=${SESSION_PATH}
SESSION_DOMAIN=${SESSION_DOMAIN}

# Cache
BROADCAST_CONNECTION=log
FILESYSTEM_DISK=public
QUEUE_CONNECTION=sync
CACHE_STORE=${CACHE_STORE}
CACHE_PREFIX=${CACHE_PREFIX}

# Redis
REDIS_CLIENT=${REDIS_CLIENT}
REDIS_HOST=${REDIS_INTERNAL_HOST}
REDIS_PASSWORD=${REDIS_PASSWORD}
REDIS_PORT=6379

RESPONSE_CACHE_ENABLED=true

# Mail
MAIL_MAILER=${MAIL_MAILER}
MAIL_HOST=${MAIL_HOST}
MAIL_PORT=${MAIL_PORT}
MAIL_USERNAME=${MAIL_USERNAME}
MAIL_PASSWORD=${MAIL_PASSWORD}
MAIL_ENCRYPTION=${MAIL_ENCRYPTION}
MAIL_FROM_ADDRESS=${MAIL_FROM_ADDRESS}
MAIL_FROM_NAME="${MAIL_FROM_NAME}"
ADMIN_MAIL_ADDRESS=${ADMIN_MAIL_ADDRESS}
ADMIN_MAIL_NAME="${ADMIN_MAIL_NAME}"

# AWS (optional)
AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}
AWS_BUCKET=${AWS_BUCKET}
AWS_USE_PATH_STYLE_ENDPOINT=${AWS_USE_PATH_STYLE_ENDPOINT}

# Vite
VITE_APP_NAME="\${APP_NAME}"
VITE_HOST=localhost
VITE_PORT=${VITE_PORT}

# Elasticsearch
SCOUT_DRIVER=elasticsearch
ELASTICSEARCH_HOST=${ELASTICSEARCH_INTERNAL_HOST}
ELASTICSEARCH_PORT=9200
EOF

# ============================================
# 3. STOREFRONT .env.local (Next.js)
# ============================================
echo "📝 Tạo apps/storefront/.env.local..."
cat > apps/storefront/.env.local << EOF
# ============================================
# STOREFRONT CONFIGURATION (Next.js)
# Auto-generated from config.env
# ============================================

# API Configuration
NEXT_PUBLIC_API_URL=${BACKEND_URL}/api
BACKEND_API_URL=${BACKEND_INTERNAL_URL}

# App Configuration
NEXT_PUBLIC_APP_NAME=${APP_NAME} Storefront
NEXT_PUBLIC_APP_URL=${STOREFRONT_URL}

# Environment
NODE_ENV=${NODE_ENV}
PORT=${STOREFRONT_PORT}
EOF

# ============================================
# 4. LANDING .env.local (Next.js)
# ============================================
echo "📝 Tạo apps/landing/.env.local..."
cat > apps/landing/.env.local << EOF
# ============================================
# LANDING PAGE CONFIGURATION (Next.js)
# Auto-generated from config.env
# ============================================

# API Configuration
NEXT_PUBLIC_API_BASE_URL=${BACKEND_URL}
NEXT_PUBLIC_BACKEND_URL=${BACKEND_URL}

# Documentation & Demo Sites
NEXT_PUBLIC_DOCS_URL=${DOCS_URL}
NEXT_PUBLIC_DEMO_STORE_1_URL=${DEMO_STORE_1_URL}
NEXT_PUBLIC_DEMO_STORE_2_URL=${DEMO_STORE_2_URL}

# Analytics (optional)
NEXT_PUBLIC_GA_ID=${GA_ID}
NEXT_PUBLIC_ANALYTICS_ENDPOINT=${ANALYTICS_ENDPOINT}

# Environment
NODE_ENV=${NODE_ENV}
PORT=${LANDING_PORT}
EOF

# ============================================
# 5. CONFIG.JSON (cho scripts khác)
# ============================================
echo "📝 Tạo config.json..."
cat > config.json << EOF
{
  "project": {
    "name": "${PROJECT_NAME}",
    "environment": "${APP_ENV}"
  },
  "ports": {
    "landing": ${LANDING_PORT},
    "storefront": ${STOREFRONT_PORT},
    "backend": ${BACKEND_PORT},
    "mysql": ${MYSQL_PORT},
    "redis": ${REDIS_PORT},
    "elasticsearch": ${ELASTICSEARCH_PORT},
    "kibana": ${KIBANA_PORT},
    "mailhog_smtp": ${MAILHOG_SMTP_PORT},
    "mailhog_web": ${MAILHOG_WEB_PORT}
  },
  "urls": {
    "landing": "${LANDING_URL}",
    "storefront": "${STOREFRONT_URL}",
    "backend": "${BACKEND_URL}",
    "admin": "${BACKEND_URL}/admin",
    "mailhog": "http://localhost:${MAILHOG_WEB_PORT}",
    "kibana": "http://localhost:${KIBANA_PORT}"
  },
  "database": {
    "host": "${MYSQL_INTERNAL_HOST}",
    "port": 3306,
    "database": "${DB_DATABASE}",
    "username": "${DB_USERNAME}"
  }
}
EOF

echo ""
echo "✅ Hoàn tất tạo file cấu hình!"
echo ""
echo "📁 Các file đã tạo:"
echo "  ✓ .env"
echo "  ✓ backend/.env"
echo "  ✓ apps/storefront/.env.local"
echo "  ✓ apps/landing/.env.local"
echo "  ✓ config.json"
echo ""
echo "💡 Lưu ý: Chỉnh sửa config.env và chạy lại script này để cập nhật tất cả file cấu hình"
