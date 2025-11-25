# Hướng dẫn cài đặt Victor Mer E-Commerce Platform

## Yêu cầu hệ thống

- Node.js 18+ 
- Docker & Docker Compose
- PHP 8.1+
- Composer

## Cài đặt nhanh

### 1. Cài đặt Storefront (Next.js)

```bash
# Cài đặt dependencies
bash scripts/install-storefront.sh

# Hoặc thủ công
cd apps/storefront
npm install
```

### 2. Cấu hình môi trường

```bash
# Copy file .env.example
cd apps/storefront
cp .env.example .env.local

# Chỉnh sửa .env.local nếu cần
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Khởi động Backend (Laravel)

```bash
cd backend
docker-compose up -d
```

### 4. Khởi động Storefront

```bash
cd apps/storefront
npm run dev
```

## Truy cập ứng dụng

- **Landing**: http://localhost:3008
- **Storefront**: http://localhost:3009
- **Backend API**: http://localhost:8080
- **Admin Panel**: http://localhost:8080/admin

## Tính năng chính

### Storefront
- ✅ Next.js 14 + TypeScript
- ✅ Auto-fallback sang JSON local khi API offline
- ✅ Responsive design
- ✅ Component-based architecture
- ✅ Custom hooks
- ✅ Error boundaries
- ✅ Loading states

### Backend
- ✅ Laravel Framework
- ✅ RESTful API
- ✅ Docker support

## Cấu trúc thư mục

```
ecommerce-platform/
├── apps/
│   ├── landing/             # Landing page (Next.js)
│   └── storefront/          # Storefront (Next.js)
│       ├── app/             # App Router pages
│       ├── components/      # React components
│       ├── lib/             # Core logic & API
│       ├── hooks/           # Custom hooks
│       ├── types/           # TypeScript types
│       └── data/            # Fallback JSON data
├── backend/                 # Laravel Application
├── scripts/                 # Utility scripts
└── docker-compose.yml       # Docker config
```

## Scripts hữu ích

```bash
# Cài đặt storefront
bas