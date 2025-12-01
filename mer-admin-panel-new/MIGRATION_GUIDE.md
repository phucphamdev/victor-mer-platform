# Migration Guide: mer-admin-panel → next-shadcn-admin-dashboard

## Tổng quan

Hướng dẫn này giúp bạn migrate từ admin panel cũ (mer-admin-panel) sang admin panel mới (next-shadcn-admin-dashboard) với shadcn/ui components.

## So sánh Tech Stack

### Admin Panel Cũ (mer-admin-panel)
- Next.js 13.4.4
- React 18.2.0
- Material Tailwind
- Redux Toolkit
- React Hook Form + Yup

### Admin Panel Mới (next-shadcn-admin-dashboard)
- Next.js 16 (App Router)
- React 19
- Shadcn UI (Radix UI)
- Zustand
- React Hook Form + Zod
- Clerk Authentication (optional)

## Lợi ích của Migration

1. **Modern Stack**: Next.js 16 + React 19 với App Router
2. **Better UI**: Shadcn UI components (accessible, customizable)
3. **Type Safety**: Full TypeScript support với Zod validation
4. **Performance**: Faster với React 19 và modern optimizations
5. **Developer Experience**: Better DX với feature-based structure
6. **Maintainability**: Cleaner code structure

## Cấu trúc thư mục

### Cũ (mer-admin-panel)
```
mer-admin-panel/
├── src/
│   ├── app/
│   ├── components/
│   ├── redux/
│   ├── hooks/
│   └── types/
```

### Mới (mer-admin-panel-new)
```
mer-admin-panel-new/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Shared components
│   │   ├── ui/          # Shadcn UI components
│   │   └── layout/      # Layout components
│   ├── features/        # Feature-based modules
│   ├── lib/
│   │   └── api/         # API integration
│   ├── hooks/           # Custom hooks
│   ├── stores/          # Zustand stores
│   └── types/           # TypeScript types
```

## API Integration

### 1. API Client Setup

File mới: `src/lib/api/client.ts`

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000/api';
```

### 2. Authentication API

File mới: `src/lib/api/auth.ts`

**Endpoints:**
- `POST /admin/login` - Admin login
- `POST /admin/register` - Admin register
- `POST /admin/refresh-token` - Refresh token
- `POST /admin/logout` - Logout
- `PATCH /admin/password` - Change password

### 3. Products API

File mới: `src/lib/api/products.ts`

**Endpoints:**
- `GET /product` - Get all products (with filters)
- `GET /product/:id` - Get single product
- `POST /product` - Create product
- `PATCH /product/:id` - Update product
- `DELETE /product/:id` - Delete product
- `GET /product/stock-out` - Get stock out products

### 4. Orders API

File mới: `src/lib/api/orders.ts`

**Endpoints:**
- `GET /order` - Get all orders (with filters)
- `GET /order/:id` - Get single order
- `PATCH /order/:id` - Update order status

### 5. Users API

File mới: `src/lib/api/users.ts`

**Endpoints:**
- `GET /user/:id` - Get user by ID
- `PATCH /user/:id` - Update user

## Migration Steps

### Bước 1: Setup môi trường

```bash
# Clone hoặc copy thư mục mới
cd mer-admin-panel-new

# Install dependencies
npm install
# hoặc
bun install

# Copy environment variables
cp .env.local.example .env.local
```

### Bước 2: Cấu hình .env.local

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:7000/api

# Clerk Authentication (Optional)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Sentry Error Tracking (Optional)
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```

### Bước 3: Migrate Authentication

#### Cũ (Redux + js-cookie)
```typescript
// mer-admin-panel
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

const handleLogin = async (data) => {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  const result = await response.json();
  Cookies.set('token', result.token);
  dispatch(setUser(result));
};
```

#### Mới (API Client + Zustand)
```typescript
// mer-admin-panel-new
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/stores/auth-store';

const handleLogin = async (data) => {
  const result = await authApi.login(data);
  useAuthStore.getState().setAuth(result);
};
```

### Bước 4: Migrate Components

#### Cũ (Material Tailwind)
```tsx
import { Button, Input } from '@material-tailwind/react';

<Button color="blue">Submit</Button>
<Input label="Email" />
```

#### Mới (Shadcn UI)
```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

<Button>Submit</Button>
<Input placeholder="Email" />
```

### Bước 5: Migrate Forms

#### Cũ (React Hook Form + Yup)
```tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
});

const { register, handleSubmit } = useForm({
  resolver: yupResolver(schema)
});
```

#### Mới (React Hook Form + Zod)
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

const form = useForm({
  resolver: zodResolver(schema)
});
```

### Bước 6: Migrate State Management

#### Cũ (Redux Toolkit)
```tsx
// store/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
});
```

#### Mới (Zustand)
```tsx
// stores/auth-store.ts
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

## Sample Pages

### 1. Dashboard Page

```tsx
// src/app/(dashboard)/dashboard/page.tsx
import { Card } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,234</p>
          </CardContent>
        </Card>
        {/* More cards */}
      </div>
    </div>
  );
}
```

### 2. Products List Page

```tsx
// src/app/(dashboard)/dashboard/products/page.tsx
import { productsApi } from '@/lib/api';
import { DataTable } from '@/components/ui/data-table';

export default async function ProductsPage() {
  const products = await productsApi.getAll();
  
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Products</h1>
      <DataTable data={products.data} columns={columns} />
    </div>
  );
}
```

### 3. Orders List Page

```tsx
// src/app/(dashboard)/dashboard/orders/page.tsx
import { ordersApi } from '@/lib/api';

export default async function OrdersPage() {
  const orders = await ordersApi.getAll({}, token);
  
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Orders</h1>
      {/* Orders table */}
    </div>
  );
}
```

## Testing Migration

### 1. Test Authentication
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"123456"}'
```

### 2. Test API Integration
```bash
# Get products
curl http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Test UI Components
- Navigate to `/dashboard`
- Test all menu items
- Test forms and validation
- Test data tables

## Deployment

### Development
```bash
npm run dev
# hoặc
bun dev
```

### Production Build
```bash
npm run build
npm start
# hoặc
bun build
bun start
```

### Docker
```bash
# Build image
docker build -t mer-admin-panel-new .

# Run container
docker run -p 4000:3000 mer-admin-panel-new
```

## Troubleshooting

### Issue: API Connection Failed
**Solution:** Check `NEXT_PUBLIC_API_URL` in `.env.local`

### Issue: Authentication Not Working
**Solution:** Verify backend is running on port 7000

### Issue: Components Not Styled
**Solution:** Run `npm install` to ensure all dependencies are installed

### Issue: TypeScript Errors
**Solution:** Run `npm run lint` to check for errors

## Checklist Migration

- [ ] Setup môi trường mới
- [ ] Cấu hình .env.local
- [ ] Test API connection
- [ ] Migrate authentication
- [ ] Migrate dashboard page
- [ ] Migrate products page
- [ ] Migrate orders page
- [ ] Migrate users page
- [ ] Test all features
- [ ] Deploy to staging
- [ ] Deploy to production

## Hỗ trợ

Nếu gặp vấn đề trong quá trình migration:
1. Check documentation trong `docs/`
2. Check API documentation tại `http://localhost:7000/api-docs`
3. Check console logs và network tab
4. Contact development team

## Kết luận

Migration sang next-shadcn-admin-dashboard mang lại nhiều lợi ích về performance, developer experience và maintainability. Follow guide này để đảm bảo migration suôn sẻ.
