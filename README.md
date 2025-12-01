# 🚀 Victor Mer E-Commerce Platform

Modern E-commerce Platform with Dual Admin Panels - Built with Next.js, Node.js, MongoDB, and Docker.

## ⚡ Quick Start

```bash
# Start all services (fastest)
./start-dev.sh

# Stop all services
./stop-dev.sh

# Interactive manager
./run.sh
```

## 📋 Service URLs

### Development (Localhost)
- **Backend API**: http://localhost:7000
- **Admin Panel V1**: http://localhost:4000 (Legacy - Stable)
- **Admin Panel V2**: http://localhost:4100 (Modern UI)
- **Frontend Store**: http://localhost:3500

### Production
- **Backend API**: https://api.yourdomain.com
- **Admin Panel V1**: https://yourdomain.com/admin/v1
- **Admin Panel V2**: https://yourdomain.com/admin/v2
- **Frontend Store**: https://yourdomain.com

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Admin V1   │────▶│  Backend    │────▶│  MongoDB    │
│  Port 4000  │     │  Port 7000  │     │  Port 27017 │
└─────────────┘     └─────────────┘     └─────────────┘
                           ▲
┌─────────────┐            │
│  Admin V2   │────────────┘
│  Port 4100  │
└─────────────┘

Production: Nginx (443) → Services → Backend → MongoDB
```

## 🔐 Security Features

- **Port Obfuscation**: Using "unusual" ports (4000, 4100, 7000) for better security
- **Path-based Routing**: Admin panels hidden behind `/admin/v1` and `/admin/v2` on production
- **SSL/TLS**: HTTPS for all connections
- **Rate Limiting**: Protection against DDoS and brute-force
- **Security Headers**: X-Frame-Options, CSP, XSS Protection
- **Network Isolation**: Docker network isolation

## 📦 Project Structure

```
victor-mer-platform/
├── mer-backend/              # Backend API (Node.js + Express)
├── mer-front-end/           # Customer Store (Next.js)
├── mer-admin-panel-v1/      # Admin Panel V1 (Legacy - Stable)
├── mer-admin-panel-v2/      # Admin Panel V2 (Modern UI)
├── nginx/                   # Nginx config for production
├── scripts/                 # Deployment scripts
├── docs/                    # Documentation
├── start-dev.sh            # Quick start script
├── stop-dev.sh             # Quick stop script
└── run.sh                  # Interactive manager
```

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (Image storage)
- Stripe (Payments)

### Admin Panel V1 (Legacy)
- Next.js 13
- Material Tailwind
- Redux Toolkit
- Production-tested

### Admin Panel V2 (Modern)
- Next.js 16
- Shadcn UI
- Zustand
- Clerk Authentication

### Frontend Store
- Next.js
- Tailwind CSS
- Stripe Integration

## 📖 Documentation

- [API Documentation](docs/API_DOCUMENTATION.md) - Complete API reference (80+ endpoints)
- [Features](docs/FEATURES.md) - Platform features and capabilities
- [Testing Guide](docs/TESTING.md) - Testing guidelines and scripts
- [Changelog](docs/CHANGELOG.md) - Version history and updates

## 🚀 Deployment Methods

### 1. Native Development (Recommended)
```bash
./start-dev.sh
```
- ⚡ Fastest
- 🔥 Hot reload
- 💻 No Docker needed

### 2. Docker Development
```bash
docker-compose up -d
```
- 🐳 Isolated environment
- 🔄 Similar to production

### 3. Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```
- 🌐 Full production stack
- 🔒 Nginx + SSL
- 📊 Resource limits

## 🔧 Configuration

```bash
# Copy example file
cp .env.example .env

# Edit configuration
nano .env
```

### Required Variables
- `MONGO_URI` - MongoDB connection string
- `TOKEN_SECRET` - JWT secret
- `CLOUDINARY_*` - Cloudinary credentials
- `STRIPE_KEY` - Stripe API key
- `EMAIL_*` - Email service config

## 📊 Features

### Admin Panel V1 (Legacy)
✅ Product management
✅ Order management
✅ User management
✅ Dashboard analytics
✅ Stable & tested

### Admin Panel V2 (Modern)
✨ Modern UI with Shadcn
✨ Enhanced UX
✨ Better performance
✨ Advanced features
✨ Clerk authentication

### Both Panels
🔄 Use same Backend API
🔄 Data synchronized
🔄 Run simultaneously
🔄 Demo data auto-seeded

## 📝 Logs

```bash
# All logs
tail -f logs/*.log

# Specific service
tail -f logs/backend.log
tail -f logs/admin-v1.log
tail -f logs/admin-v2.log
```

## 🔍 Health Check

```bash
# Backend
curl http://localhost:7000/health

# Admin V1
curl http://localhost:4000

# Admin V2
curl http://localhost:4100
```

## 🛑 Stop Services

```bash
# Quick stop
./stop-dev.sh

# Docker stop
docker-compose down
```

## 🔄 Updates

```bash
# Pull latest code
git pull

# Update dependencies
cd mer-backend && npm install
cd mer-admin-panel-v1 && npm install
cd mer-admin-panel-v2 && npm install

# Restart services
./stop-dev.sh
./start-dev.sh
```

## 🆘 Troubleshooting

### Port Already in Use
```bash
lsof -i :4000
kill -9 <PID>
```

### Docker Issues
```bash
docker-compose down -v
docker system prune -af
```

## 🔐 Production Security Checklist

- [ ] Change all secrets in `.env.prod`
- [ ] Setup SSL certificates
- [ ] Configure firewall
- [ ] Enable IP whitelist for admin (optional)
- [ ] Setup backup automation
- [ ] Configure monitoring
- [ ] Test all endpoints
- [ ] Review nginx config

## 📞 Support

For issues or questions:
1. Check logs: `tail -f logs/*.log`
2. Check service status: `./run.sh` → option 10
3. Review documentation in `docs/`

## 📄 License

Private project - All rights reserved

## 🎯 Best Practices

1. **Development**: Use `start-dev.sh` for speed
2. **Testing**: Use Docker for isolation
3. **Production**: Always use Docker with SSL
4. **Security**: Change all secrets
5. **Backup**: Regular database backups
6. **Monitoring**: Check logs regularly

---

Made with ❤️ by Victor Mer Team
