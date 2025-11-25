#!/bin/bash

# Script khởi động môi trường production
echo "🏭 Starting Production Environment..."

# Check config
if [ ! -f config.env.prod ]; then
    echo "❌ File config.env.prod không tồn tại!"
    echo "📝 Tạo file config.env.prod từ config.env.prod.example"
    cp config.env.prod.example config.env.prod
    echo "✅ Đã tạo config.env.prod, vui lòng chỉnh sửa và chạy lại script"
    exit 1
fi

# Check SSL certificates
if [ ! -f nginx/ssl/cert.pem ] || [ ! -f nginx/ssl/key.pem ]; then
    echo "❌ SSL certificates không tồn tại!"
    echo "📝 Tạo SSL certificates:"
    echo ""
    echo "   mkdir -p nginx/ssl"
    echo "   openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\"
    echo "     -keyout nginx/ssl/key.pem \\"
    echo "     -out nginx/ssl/cert.pem"
    echo ""
    exit 1
fi

# Load config
export $(cat config.env.prod | xargs)

# Confirm production deployment
echo ""
echo "⚠️  BẠN ĐANG KHỞI ĐỘNG MÔI TRƯỜNG PRODUCTION!"
echo ""
read -p "Bạn có chắc chắn muốn tiếp tục? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Đã hủy"
    exit 0
fi

# Start docker compose
echo "🐳 Starting Docker containers..."
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for services
echo "⏳ Waiting for services to be ready..."
sleep 15

# Show status
echo ""
echo "✅ Production environment is ready!"
echo ""
echo "📍 Access URLs:"
echo "   Landing Page:  ${LANDING_URL}"
echo "   Storefront:    ${STOREFRONT_URL}"
echo "   Backend API:   ${BACKEND_URL}"
echo ""
echo "📊 View logs:"
echo "   docker-compose -f docker-compose.prod.yml logs -f"
echo ""
echo "🛑 Stop services:"
echo "   docker-compose -f docker-compose.prod.yml down"
