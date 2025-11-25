#!/bin/bash

# Script cài đặt dependencies cho storefront

echo "📦 Cài đặt dependencies cho Storefront..."

cd apps/storefront

# Kiểm tra Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js chưa được cài đặt"
    exit 1
fi

# Cài đặt dependencies
npm install

echo "✅ Hoàn tất cài đặt!"
echo ""
echo "Chạy development server:"
echo "  cd apps/storefront"
echo "  npm run dev"
