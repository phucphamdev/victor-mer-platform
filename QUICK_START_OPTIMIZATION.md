# 🚀 HƯỚNG DẪN TRIỂN KHAI TỐI ƯU NHANH

## ✅ ĐÃ HOÀN THÀNH

### 1. Đổi tên thư mục
- ✅ `shofy-backend` → `mer-backend`
- ✅ `shofy-front-end` → `mer-front-end`
- ✅ `shofy-admin-panel` → `mer-admin-panel`
- ✅ Cập nhật tất cả file cấu hình

### 2. Tạo file tối ưu
- ✅ `mer-backend/config/redis.js` - Redis configuration
- ✅ `mer-backend/middleware/cacheMiddleware.js` - Cache middleware
- ✅ `mer-backend/middleware/compression.js` - Response compression
- ✅ `mer-backend/middleware/rateLimiter.js` - Rate limiting
- ✅ `docker-compose.optimized.yml` - Docker config với Redis

---

## 📋 BƯỚC TIẾP THEO (Ưu tiên cao)

### BƯỚC 1: Cài đặt Redis dependencies

```bash
cd mer-backend
npm install redis compression express-rate-limit
```

### BƯỚC 2: Cập nhật mer-backend/index.js

Thêm vào đầu file:
```javascript
const compressionMiddleware = require('./middleware/compression');
const { apiLimiter, authLimiter } = require('./middleware/rateLimiter');
const { cache } = require('./config/redis');

// Apply compression
app.use(compressionMiddleware);

// Apply rate limiting
app.use('/api/', apiLimiter);
app.use('/api/auth/', authLimiter);
```

### BƯỚC 3: Áp dụng cache cho API endpoints

Ví dụ cho Products API:
```javascript
const { cacheMiddleware } = require('./middleware/cacheMiddleware');
const { CACHE_TTL } = require('./config/redis');

// Get all products - cache 5 phút
router.get('/products', 
  cacheMiddleware(CACHE_TTL.PRODUCTS_LIST),
  async (req, res) => {
    // Your existing code
  }
);

// Get product by slug - cache 10 phút
router.get('/products/:slug', 
  cacheMiddleware(CACHE_TTL.PRODUCT_DETAIL),
  async (req, res) => {
    // Your existing code
  }
);
```

### BƯỚC 4: Invalidate cache khi update data

```javascript
const { invalidateCache } = require('./middleware/cacheMiddleware');

// Khi tạo/update/delete product
router.post('/products', async (req, res) => {
  // Create product
  await Product.create(req.body);
  
  // Invalidate cache
  await invalidateCache('cache:/api/products*');
  
  res.json({ success: true });
});
```

### BƯỚC 5: Tối ưu MongoDB queries

Thêm `.lean()` vào tất cả queries:
```javascript
// BAD ❌
const products = await Product.find();

// GOOD ✅
const products = await Product.find().lean();
```

Thêm `.select()` để chỉ lấy fields cần thiết:
```javascript
// BAD ❌
const products = await Product.find();

// GOOD ✅
const products = await Product.find()
  .select('title price images slug status')
  .lean();
```

### BƯỚC 6: Chạy với Redis

```bash
# Sử dụng docker-compose.optimized.yml
docker-compose -f docker-compose.optimized.yml --env-file .env.local up -d

# Hoặc thêm Redis vào docker-compose.yml hiện tại
# Copy phần redis từ docker-compose.optimized.yml
```

---

## 🎯 QUICK WINS (30 phút)

### 1. Enable compression (5 phút)
```bash
cd mer-backend
npm install compression
```

Thêm vào `index.js`:
```javascript
const compression = require('compression');
app.use(compression());
```

**Kết quả**: Giảm 60-70% response size

---

### 2. Add .lean() to queries (10 phút)

Tìm tất cả queries:
```bash
cd mer-backend
grep -r "\.find(" controller/
grep -r "\.findOne(" controller/
```

Thêm `.lean()` vào cuối mỗi query:
```javascript
.find().lean()
.findOne().lean()
```

**Kết quả**: Nhanh hơn 5x

---

### 3. Add rate limiting (5 phút)
```bash
npm install express-rate-limit
```

Thêm vào `index.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

**Kết quả**: Bảo vệ khỏi DDoS

---

### 4. Optimize Docker images (10 phút)

Cập nhật `mer-backend/Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
CMD ["node", "index.js"]
```

Rebuild:
```bash
docker-compose build backend
```

**Kết quả**: Image size -60%

---

## 📊 KIỂM TRA KẾT QUẢ

### Test API performance

```bash
# Trước tối ưu
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:7000/api/products

# Sau tối ưu (với cache)
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:7000/api/products
```

File `curl-format.txt`:
```
time_namelookup:  %{time_namelookup}\n
time_connect:  %{time_connect}\n
time_starttransfer:  %{time_starttransfer}\n
time_total:  %{time_total}\n
size_download:  %{size_download}\n
```

### Check Redis cache

```bash
# Vào Redis container
docker exec -it victormer-redis-dev redis-cli

# Xem tất cả keys
KEYS *

# Xem cache hit/miss stats
INFO stats

# Xem memory usage
INFO memory
```

### Monitor performance

```bash
# Docker stats
docker stats

# Backend logs
docker logs -f victormer-backend-dev

# Redis logs
docker logs -f victormer-redis-dev
```

---

## 🔥 TỐI ƯU NÂNG CAO (Tuần 2-3)

### 1. Implement Bull Queue cho background jobs

```bash
npm install bull
```

```javascript
// mer-backend/config/queue.js
const Queue = require('bull');

const emailQueue = new Queue('email', {
  redis: { host: 'redis', port: 6379 }
});

emailQueue.process(async (job) => {
  await sendEmail(job.data);
});

module.exports = { emailQueue };
```

Sử dụng:
```javascript
// Thay vì
await sendEmail(data); // Block 2-3s

// Dùng
await emailQueue.add(data); // Return ngay lập tức
```

---

### 2. Next.js ISR (Incremental Static Regeneration)

```javascript
// mer-front-end/pages/products/[slug].js
export async function getStaticProps({ params }) {
  const product = await fetchProduct(params.slug);
  
  return {
    props: { product },
    revalidate: 300 // Regenerate mỗi 5 phút
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}
```

---

### 3. Image Optimization

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  }
}
```

Sử dụng:
```jsx
import Image from 'next/image';

<Image 
  src={product.image} 
  width={500} 
  height={500}
  alt={product.title}
  loading="lazy"
/>
```

---

## 📈 KẾT QUẢ DỰ KIẾN

### Sau Quick Wins (30 phút):
- Response size: -60%
- Query speed: +400%
- Security: +100%
- Image size: -60%

### Sau tuần 1-2:
- API response: -60%
- Page load: -50%
- Database load: -70%
- Memory usage: -25%

### Sau tuần 3-4:
- Overall performance: +200%
- User experience: Excellent
- SEO score: 90+
- Server cost: -30%

---

## 🚨 LƯU Ý QUAN TRỌNG

### 1. Backup trước khi deploy
```bash
make backup-db
```

### 2. Test trên staging trước
```bash
# Tạo staging environment
cp .env.local .env.staging
# Update MONGO_DB_NAME=victormer_staging
docker-compose -f docker-compose.yml --env-file .env.staging up -d
```

### 3. Monitor sau khi deploy
- Check error logs
- Monitor memory usage
- Check Redis hit rate
- Verify cache invalidation

### 4. Rollback plan
```bash
# Nếu có vấn đề, rollback ngay
docker-compose down
git checkout <previous-commit>
docker-compose up -d
```

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:
1. Check logs: `docker-compose logs -f`
2. Check Redis: `docker exec -it victormer-redis-dev redis-cli`
3. Check MongoDB: `docker exec -it victormer-mongodb-dev mongosh`
4. Review OPTIMIZATION_PLAN.md

---

**Chúc bạn tối ưu thành công! 🚀**
