#!/bin/bash

# Script khởi động môi trường development
echo "🚀 Starting Development Environment..."

# Load config
if [ ! -f config.env ]; then
    echo "❌ File config.env không tồn tại!"
    echo "📝 Tạo file config.env từ config.env.example"
    cp config.env.example config.env
    echo "✅ Đã tạo config.env, vui lòng chỉnh sửa và chạy lại script"
    exit 1
fi

# Generate .env files
echo "📝 Generating .env files..."
bash scripts/generate-config.sh

# Start docker compose
echo "🐳 Starting Docker containers..."
docker-compose -f docker-compose.dev.yml up -d

# Wait for services
echo "⏳ Waiting for services to be ready..."
sleep 10

# Show status
echo ""
echo "✅ Development environment is ready!"
echo ""
echo "📍 Access URLs:"
echo "   Landing Page:  http://localhost:${LANDING_PORT:-3008}"
echo "   Storefront:    http://localhost:${STOREFRONT_PORT:-3009}"
echo "   Backend API:   http://localhost:${BACKEND_PORT:-8080}"
echo "   MailHog UI:    http://localhost:${MAILHOG_WEB_PORT:-8025}"
echo ""
echo "📊 View logs:"
echo "   docker-compose -f docker-compose.dev.yml logs -f"
echo ""
echo "🛑 Stop services:"
echo "   docker-compose -f docker-compose.dev.yml down"
