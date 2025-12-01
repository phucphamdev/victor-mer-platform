# Victor Mer Admin Panel - Next.js + Shadcn UI

Modern admin dashboard for Victor Mer E-commerce Platform.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: Shadcn UI (Radix UI)
- **Language**: TypeScript
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Styling**: Tailwind CSS v4

## 📁 Structure

```
src/
├── app/              # Next.js App Router
├── components/       # Shared components
│   └── ui/          # Shadcn UI components
├── features/        # Feature modules
├── lib/
│   └── api/        # API integration
├── hooks/          # Custom hooks
├── stores/         # Zustand stores
└── types/          # TypeScript types
```

## 🔧 Setup

```bash
# Install dependencies
npm install

# Copy environment
cp .env.local.example .env.local

# Start development
npm run dev
```

## 🌐 Access

- Development: http://localhost:3000
- Backend API: http://localhost:7000/api

## 📚 API Integration

```typescript
import { authApi, productsApi } from '@/lib/api';

// Login
const result = await authApi.login({ email, password });

// Get products
const products = await productsApi.getAll({}, token);
```

## 🎨 UI Components

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

<Button>Click me</Button>
<Input placeholder="Enter text" />
```

## 📄 Available Pages

- `/dashboard` - Dashboard overview
- `/dashboard/product` - Products management
- `/dashboard/orders` - Orders management
- `/dashboard/settings` - Settings & configuration ✨
- `/dashboard/profile` - User profile
- `/dashboard/kanban` - Kanban board

## 🔐 Authentication

Custom JWT authentication with backend API:

```typescript
// Login
const result = await authApi.login({ email, password });
localStorage.setItem('token', result.token);

// Use token
const products = await productsApi.getAll({}, result.token);
```

## 🧪 Testing

```bash
npm run lint
npm run format
```

## 📦 Deployment

```bash
# Build
npm run build

# Start
npm start
```

## 🔄 Migration from Old Admin

See [docs/ADMIN_PANEL_MIGRATION.md](../docs/ADMIN_PANEL_MIGRATION.md) for migration guide.

**Key Changes:**
- Material Tailwind → Shadcn UI
- Redux → Zustand
- Yup → Zod
- Next.js 13 → Next.js 16

## 📚 Documentation

- [API Documentation](../docs/API_DOCUMENTATION.md)
- [Features](../docs/FEATURES.md)
- [Testing](../docs/TESTING.md)
- [Migration Guide](../docs/ADMIN_PANEL_MIGRATION.md)

## 🔗 Resources

- [Next.js](https://nextjs.org/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Zustand](https://zustand-demo.pmnd.rs)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

## 📝 License

MIT License
