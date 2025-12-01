# Victor Mer Admin Panel - Next.js + Shadcn UI

Modern admin dashboard for Victor Mer E-commerce Platform built with Next.js 16, Shadcn UI, and TypeScript.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** Shadcn UI (Radix UI)
- **Language:** TypeScript
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **Styling:** Tailwind CSS v4
- **Authentication:** Custom JWT (Backend integration)
- **Error Tracking:** Sentry (Optional)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group
│   └── (dashboard)/       # Dashboard route group
├── components/            # Shared components
│   ├── ui/               # Shadcn UI components
│   └── layout/           # Layout components
├── features/             # Feature-based modules
├── lib/
│   └── api/             # API integration layer
│       ├── client.ts    # Base API client
│       ├── auth.ts      # Authentication API
│       ├── products.ts  # Products API
│       ├── orders.ts    # Orders API
│       └── users.ts     # Users API
├── hooks/               # Custom hooks
├── stores/              # Zustand stores
└── types/               # TypeScript types
```

## 🔧 Setup

### Prerequisites

- Node.js 22+ or Bun
- Backend API running on port 7000

### Installation

```bash
# Install dependencies
npm install
# or
bun install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your configuration
```

### Environment Variables

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:7000/api

# Clerk Authentication (Optional - can be replaced)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Sentry Error Tracking (Optional)
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```

### Development

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
# or
bun build
bun start
```

## 📚 API Integration

### Using the API Client

```typescript
import { authApi, productsApi, ordersApi } from '@/lib/api';

// Authentication
const loginResult = await authApi.login({
  email: 'admin@example.com',
  password: '123456'
});

// Get products with filters
const products = await productsApi.getAll({
  page: 1,
  limit: 10,
  search: 'iPhone'
}, token);

// Create product
const newProduct = await productsApi.create({
  title: 'iPhone 15 Pro',
  price: 29990000,
  category: 'categoryId',
  stock: 100
}, token);

// Get orders
const orders = await ordersApi.getAll({
  page: 1,
  limit: 10,
  status: 'pending'
}, token);
```

### API Modules

- **auth.ts** - Authentication (login, register, refresh token, logout)
- **products.ts** - Products management (CRUD, filters, stock)
- **orders.ts** - Orders management (list, details, status update)
- **users.ts** - Users management (get, update)

## 🎨 UI Components

### Shadcn UI Components

All UI components are from Shadcn UI library:

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';

<Button>Click me</Button>
<Input placeholder="Enter text" />
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Adding New Components

```bash
# Add a new Shadcn component
npx shadcn-ui@latest add [component-name]

# Example: Add dialog component
npx shadcn-ui@latest add dialog
```

## 📄 Pages

### Available Pages

- `/dashboard` - Dashboard overview with analytics
- `/dashboard/product` - Products list with table
- `/dashboard/product/new` - Create new product
- `/dashboard/orders` - Orders management
- `/dashboard/profile` - User profile
- `/dashboard/kanban` - Kanban board

### Creating New Pages

```tsx
// src/app/(dashboard)/dashboard/my-page/page.tsx
export default function MyPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">My Page</h1>
      {/* Your content */}
    </div>
  );
}
```

## 🔐 Authentication

### Custom JWT Authentication

This admin panel uses custom JWT authentication with the backend API.

```typescript
// Login
const result = await authApi.login({ email, password });
// Store token in localStorage or cookie
localStorage.setItem('token', result.token);

// Use token in API calls
const products = await productsApi.getAll({}, result.token);

// Refresh token
const newToken = await authApi.refreshToken(refreshToken);

// Logout
await authApi.logout(refreshToken);
```

### Optional: Clerk Authentication

If you want to use Clerk instead:

1. Sign up at [clerk.com](https://clerk.com)
2. Get your API keys
3. Add to `.env.local`
4. Follow Clerk documentation

## 🧪 Testing

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build image
docker build -t mer-admin-panel .

# Run container
docker run -p 3000:3000 mer-admin-panel
```

### Manual Deployment

```bash
# Build
npm run build

# Start
npm start
```

## 🔄 Migration from Old Admin Panel

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for complete migration guide from the old admin panel.

**Key Changes:**
- Material Tailwind → Shadcn UI
- Redux Toolkit → Zustand
- Yup → Zod
- Next.js 13 → Next.js 16
- React 18 → React 19

## 📖 Documentation

- [Migration Guide](./MIGRATION_GUIDE.md) - Complete migration guide
- [API Documentation](../docs/API_DOCUMENTATION.md) - Backend API reference
- [Features](../docs/FEATURES.md) - Platform features
- [Testing](../docs/TESTING.md) - Testing guide

## 🐛 Troubleshooting

### API Connection Failed

Check if backend is running:
```bash
curl http://localhost:7000/api/health
```

### Authentication Not Working

1. Check `NEXT_PUBLIC_API_URL` in `.env.local`
2. Verify backend is running
3. Check browser console for errors
4. Verify token is being sent in requests

### Components Not Styled

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### TypeScript Errors

```bash
# Check for errors
npm run lint

# Fix auto-fixable errors
npm run lint:fix
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 License

MIT License

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://zustand-demo.pmnd.rs)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

## 📧 Support

For issues or questions:
- Check documentation in `docs/`
- Check API docs at `http://localhost:7000/api-docs`
- Contact development team
