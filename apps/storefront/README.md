# Victor MER - Storefront Application

Ứng dụng frontend cho nền tảng Victor MER, được xây dựng với Next.js 14, TypeScript và CSS Modules.

## 🚀 Tính Năng

### Trang Chính
- **Trang chủ**: Hero section, dịch vụ, thống kê, sản phẩm nổi bật
- **Responsive**: Tối ưu cho mọi thiết bị (Desktop, Tablet, Mobile)
- **Performance**: Lazy loading, code splitting, optimized images

### Dịch Vụ
- **Thiết Kế Website**: `/services/website-design`
- **SEO Website**: `/services/seo`
- **Google Ads**: `/services/google-ads`
- **Digital Marketing**: `/services/digital-marketing`
- **Bảo Trì Website**: `/services/web-maintenance`
- **UI/UX & Branding**: `/services/ui-ux-branding`

### Dự Án
- **Dự Án Nổi Bật**: `/projects/featured`
- **Quy Trình Làm Việc**: `/projects/working-process`
- **Đánh Giá Khách Hàng**: `/projects/reviews`
- **Công Nghệ**: `/projects/technical`

### Khác
- **Giải Pháp**: `/solutions`
- **Tài Nguyên**: `/resources`
- **Blog**: `/blog`
- **Công Cụ Tính Giá**: `/price-calculator`
- **Tuyển Dụng**: `/careers`
- **Liên Hệ**: `/contact`

## 🛠️ Công Nghệ

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State Management**: React Context API
- **API**: RESTful API với fallback to local JSON

## 📦 Cài Đặt

```bash
# Clone repository
git clone <repository-url>

# Di chuyển vào thư mục storefront
cd apps/storefront

# Cài đặt dependencies
npm install

# Copy file .env.example
cp .env.example .env.local

# Chạy development server
npm run dev
```

## 🌐 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 968px
- **Tablet**: 768px - 968px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

### Mobile-First Approach
- Grid layout: 2 items per row on mobile
- Touch-friendly buttons (min 44x44px)
- Optimized font sizes
- Collapsible navigation menu

## 🎨 Design System

### Colors
- **Primary**: #667eea (Purple)
- **Secondary**: #764ba2 (Dark Purple)
- **Success**: #48bb78 (Green)
- **Error**: #f56565 (Red)
- **Text**: #2d3748 (Dark Gray)
- **Text Secondary**: #718096 (Gray)
- **Background**: #f9fafb (Light Gray)

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Base Size**: 16px (Desktop), 14px (Tablet), 13px (Mobile)
- **Line Height**: 1.6

### Spacing
- **Base Unit**: 4px
- **Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px

## 🔧 Components

### Reusable Components
- `Header`: Navigation với dropdown menu
- `Footer`: Footer với links và thông tin liên hệ
- `ServiceHero`: Hero section cho trang dịch vụ
- `ServiceFeatures`: Grid hiển thị tính năng
- `ServiceProcess`: Timeline quy trình làm việc
- `ServicePricing`: Bảng giá dịch vụ
- `ServiceCTA`: Call-to-action section

### Layout Components
- Responsive grid system
- Container với max-width
- Flexible spacing utilities

## 📊 Performance Optimization

### Implemented
- ✅ Code splitting với dynamic imports
- ✅ Image optimization với Next.js Image
- ✅ CSS Modules cho scoped styles
- ✅ Lazy loading cho components
- ✅ Memoization với React.memo
- ✅ Debouncing cho search inputs

### Best Practices
- Minimize bundle size
- Optimize images (WebP format)
- Use CDN for static assets
- Implement caching strategies
- Monitor Core Web Vitals

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Build for Production

```bash
# Build application
npm run build

# Start production server
npm start
```

### Docker Deployment

```bash
# Build Docker image
docker build -t victormer-storefront .

# Run container
docker run -p 3001:3001 victormer-storefront
```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Use CSS Modules for styling
- Keep components small and focused
- Write meaningful commit messages

### File Structure
```
app/
├── (routes)/
│   ├── services/
│   ├── projects/
│   ├── blog/
│   └── ...
├── globals.css
├── layout.tsx
└── page.tsx

components/
├── Header.tsx
├── Footer.tsx
└── services/
    ├── ServiceHero.tsx
    ├── ServiceFeatures.tsx
    └── ...
```

### Naming Conventions
- **Components**: PascalCase (e.g., `ServiceCard.tsx`)
- **Utilities**: camelCase (e.g., `formatPrice.ts`)
- **CSS Modules**: camelCase (e.g., `.heroSection`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_URL`)

## 🐛 Debugging

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 3001
   lsof -ti:3001 | xargs kill -9
   ```

2. **Module not found**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [CSS Modules Documentation](https://github.com/css-modules/css-modules)

## 👥 Team

**Victor MER Development Team**
- Email: phuc.pham.dev@gmail.com
- Phone: +84 938 788 091

## 📄 License

Copyright © 2024 Victor MER. All rights reserved.
