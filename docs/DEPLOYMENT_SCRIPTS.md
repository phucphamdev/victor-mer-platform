# Deployment Scripts Documentation

## 🎯 Unified Management System

The platform now uses a **centralized management script** (`manage.sh`) that provides an interactive menu to access all deployment, testing, and maintenance operations. All individual scripts are organized in the `scripts/` directory.

### Quick Start

```bash
# Run the unified management console
./manage.sh
```

## 📁 Script Organization

```
scripts/
├── deployment/          # Deployment scripts
│   ├── run-docker-local.sh
│   ├── run-docker-production.sh
│   ├── run-local-native.sh
│   ├── stop-local-native.sh
│   ├── start-fresh.sh
│   └── generate-secrets.sh
├── testing/            # Testing scripts
│   ├── test-api.sh
│   ├── test-shipment-api.sh
│   ├── test-collection-api.sh
│   └── restart-and-test.sh
└── maintenance/        # Maintenance scripts
    ├── backup.sh
    ├── restore.sh
    ├── health-check.sh
    └── setup-cron-backup.sh
```

## 📜 Available Scripts

The platform provides automated scripts for deployment, monitoring, and maintenance:

### 🚀 Deployment Scripts

#### 1. `scripts/deployment/run-local-native.sh` - Native Deployment (No Docker)
Run directly on laptop without Docker.

**Features**:
- ✅ Auto-check Node.js, npm, MongoDB
- ✅ Auto-detect & fix port conflicts
- ✅ Auto-start MongoDB if not running
- ✅ Verify MongoDB connection
- ✅ Auto-import demo data
- ✅ Install dependencies for all services
- ✅ Start Backend, Frontend, Admin Panel
- ✅ Health check all services
- ✅ Display URLs, PIDs, log locations

**Usage**:
```bash
# Via manage.sh (recommended)
./manage.sh
# Select: 1 (Deployment) → 3 (Start Native Local)

# Or directly
./scripts/deployment/run-local-native.sh
```

**Stop**:
```bash
# Via manage.sh
./manage.sh
# Select: 1 (Deployment) → 4 (Stop Native Local)

# Or directly
./scripts/deployment/stop-local-native.sh
```

---

#### 2. `scripts/deployment/run-docker-local.sh` - Docker Compose Local
Run with Docker Compose for easy testing.

**Features**:
- ✅ Check Docker & Docker Compose
- ✅ Setup environment from .env.local
- ✅ Auto-detect & fix port conflicts
- ✅ Clean up old containers
- ✅ Build & start all services
- ✅ Wait for services with timeout
- ✅ Health check all services
- ✅ Auto-import demo data
- ✅ Display container status

**Usage**:
```bash
# Via manage.sh (recommended)
./manage.sh
# Select: 1 (Deployment) → 1 (Start Docker Local)

# Or directly
./scripts/deployment/run-docker-local.sh

# Or via Makefile
make dev
```

---

#### 3. `scripts/deployment/run-docker-production.sh` - Production VPS Deployment
Deploy to production VPS with SSL and Nginx.

**Features**:
- ✅ Check root/sudo privileges
- ✅ Auto-install Docker & Docker Compose
- ✅ Interactive domain configuration
- ✅ Setup production environment
- ✅ Check & handle port 80/443 conflicts
- ✅ Generate Nginx configuration with routing
- ✅ **Auto SSL from Let's Encrypt**
- ✅ Fallback to self-signed cert
- ✅ Setup SSL auto-renewal (cron)
- ✅ Build & start services
- ✅ Import demo data
- ✅ Configure firewall (UFW/firewalld)
- ✅ Health check HTTPS endpoints
- ✅ Display resource usage

**Usage**:
```bash
# Via manage.sh (recommended)
sudo ./manage.sh
# Select: 1 (Deployment) → 2 (Start Docker Production)

# Or directly
sudo ./scripts/deployment/run-docker-production.sh

# Or via Makefile
make prod
```

**Requirements**:
- VPS with Ubuntu/CentOS
- Domain pointing to VPS
- Root access

---

### 🛠️ Utility Scripts

#### 4. `scripts/maintenance/health-check.sh` - Health Monitoring
Check status of all services.

**Checks**:
- ✅ MongoDB (Docker & Native)
- ✅ Backend API health endpoint
- ✅ Frontend accessibility
- ✅ Admin Panel accessibility
- ✅ Nginx status (Production)
- ✅ SSL certificates expiry
- ✅ Docker container status
- ✅ System resources (CPU, Memory, Disk)
- ✅ Port usage

**Usage**:
```bash
# Via manage.sh (recommended)
./manage.sh
# Select: 3 (Maintenance) → 3 (Health Check)

# Or directly
./scripts/maintenance/health-check.sh

# Or via Makefile
make health-check
```

---

#### 5. `scripts/maintenance/backup.sh` - Database Backup
Backup MongoDB and configuration files.

**Backups**:
- ✅ MongoDB database (compressed .gz)
- ✅ Environment files (.env*)
- ✅ Nginx configuration
- ✅ Auto-cleanup old backups (7 days)
- ✅ Display backup size

**Usage**:
```bash
# Via manage.sh (recommended)
./manage.sh
# Select: 3 (Maintenance) → 1 (Backup Database)

# Or directly
./scripts/maintenance/backup.sh

# Or via Makefile
make backup-db
```

**Output**: `backups/backup-YYYYMMDD_HHMMSS.gz`

---

#### 6. `scripts/maintenance/restore.sh` - Database Restore
Restore database from backup.

**Features**:
- ✅ List available backups
- ✅ Interactive selection
- ✅ Confirmation prompt
- ✅ Restore with mongorestore
- ✅ Support Docker & Native
- ✅ Verify restore success
- ✅ Display collection count

**Usage**:
```bash
# Via manage.sh (recommended)
./manage.sh
# Select: 3 (Maintenance) → 2 (Restore Database)

# Or directly
./scripts/maintenance/restore.sh

# Or via Makefile
make restore-db BACKUP=backup-20231201-120000
```

---

#### 7. `scripts/maintenance/setup-cron-backup.sh` - Auto Backup Setup
Setup automatic backup with cron.

**Features**:
- ✅ Interactive schedule selection
- ✅ Predefined schedules (daily, 12h, 6h)
- ✅ Custom cron schedule
- ✅ Auto-add to crontab
- ✅ Remove old cron jobs
- ✅ Log to file

**Usage**:
```bash
# Via manage.sh (recommended)
./manage.sh
# Select: 3 (Maintenance) → 4 (Setup Auto Backup)

# Or directly
./scripts/maintenance/setup-cron-backup.sh
```

**Options**:
1. Daily at 2:00 AM
2. Daily at 3:00 AM
3. Every 12 hours
4. Every 6 hours
5. Custom

---

### 🧪 Testing Scripts

#### 8. `scripts/testing/test-api.sh` - Test All APIs
Test all API endpoints with authentication.

**Usage**:
```bash
# Via manage.sh (recommended)
./manage.sh
# Select: 2 (Testing) → 1 (Test All APIs)

# Or directly
./scripts/testing/test-api.sh
```

#### 9. `scripts/testing/test-shipment-api.sh` - Test Shipment API
Test shipment-specific endpoints.

**Usage**:
```bash
./manage.sh
# Select: 2 (Testing) → 2 (Test Shipment API)
```

#### 10. `scripts/testing/test-collection-api.sh` - Test Collection API
Test collection and category endpoints.

**Usage**:
```bash
./manage.sh
# Select: 2 (Testing) → 3 (Test Collection API)
```

### 🔧 Utility Scripts

#### 11. `scripts/deployment/generate-secrets.sh` - Generate Security Secrets
Generate secure credentials for production.

**Usage**:
```bash
./manage.sh
# Select: 1 (Deployment) → 6 (Generate Security Secrets)
```

#### 12. `scripts/deployment/start-fresh.sh` - Clean Start
Clean all Docker resources and start fresh.

**Usage**:
```bash
./manage.sh
# Select: 1 (Deployment) → 5 (Start Fresh)
```
Stop all native services.

**Features**:
- ✅ Read PIDs from log files
- ✅ Gracefully kill processes
- ✅ Cleanup PID files
- ✅ Optional MongoDB stop

---

## 🎮 Unified Management Console (`manage.sh`)

The `manage.sh` script provides an interactive menu system to access all functionality:

### Main Menu Options

1. **Deployment Management**
   - Start Docker Local (Development)
   - Start Docker Production (VPS)
   - Start Native Local (No Docker)
   - Stop Native Local
   - Start Fresh (Clean & Rebuild)
   - Generate Security Secrets

2. **Testing & API Tests**
   - Test All APIs
   - Test Shipment API
   - Test Collection API
   - Restart & Test

3. **Maintenance & Backup**
   - Backup Database
   - Restore Database
   - Health Check
   - Setup Auto Backup (Cron)
   - View Logs
   - Clean Docker Resources

4. **Makefile Commands**
   - All make targets accessible via menu
   - Development commands
   - Production commands
   - Database operations
   - Utilities

5. **Quick Actions**
   - Start Dev + Test APIs
   - Backup + Health Check
   - Stop All Services
   - Restart All Services
   - View System Status

### Features

- 🎨 Colorful, intuitive interface
- 📋 Organized by category
- ⚡ Quick actions for common workflows
- 🔄 Integrates with Makefile
- 📊 Real-time status display
- ✅ Error handling and validation

---

## 📊 Comparison Table

| Feature | Native | Docker Local | Docker Prod |
|---------|--------|--------------|-------------|
| **Speed** | ⚡⚡⚡ Fast | ⚡⚡ Medium | ⚡ Slower |
| **Setup Time** | 2-3 min | 5-10 min | 10-20 min |
| **Port Conflict** | ✅ Auto | ✅ Auto | ✅ Auto |
| **SSL** | ❌ No | ❌ No | ✅ Yes |
| **Nginx** | ❌ No | ❌ No | ✅ Yes |
| **Auto Renewal** | ❌ No | ❌ No | ✅ Yes |
| **Isolation** | ❌ No | ✅ Yes | ✅ Yes |
| **Hot Reload** | ✅ Yes | ✅ Yes | ❌ No |
| **Resource** | Low | Medium | High |
| **Best For** | Dev | Test | Production |

---

## 🔄 Workflow Examples

### Development Workflow
```bash
# Start management console
./manage.sh

# Select: 1 (Deployment) → 3 (Start Native Local)
# Code changes (auto reload)
# Select: 3 (Maintenance) → 3 (Health Check)
# Select: 1 (Deployment) → 4 (Stop Native Local)
```

### Testing Workflow
```bash
# Start management console
./manage.sh

# Quick action: Start Dev + Test APIs
# Select: 5 (Quick Actions) → 1 (Start Dev + Test APIs)

# Or step by step:
# Select: 1 (Deployment) → 1 (Start Docker Local)
# Select: 2 (Testing) → 1 (Test All APIs)
```

### Production Workflow
```bash
# Initial deploy
sudo ./manage.sh
# Select: 1 (Deployment) → 2 (Start Docker Production)

# Setup auto backup
# Select: 3 (Maintenance) → 4 (Setup Auto Backup)

# Monitor
# Select: 5 (Quick Actions) → 5 (View System Status)

# Update code
git pull
# Select: 4 (Makefile) → 6 (make prod-build)

# Backup before changes
# Select: 5 (Quick Actions) → 2 (Backup + Health Check)
```

---

## 🎨 Script Features

### Common Features (All Scripts)
- 🎨 Colored output (info, success, warning, error)
- 📊 Progress indicators
- ✅ Prerequisite checks
- 🔄 Automatic retries
- 📝 Detailed logging
- 🛡️ Error handling
- 📋 Summary reports

### Port Conflict Handling
All scripts automatically detect port conflicts and find available alternatives:
```bash
# Automatic detection
if port_in_use(7000):
    find_next_available_port()
    update_env_file()
    update_related_urls()
```

### Health Check Logic
```bash
# Wait with timeout
timeout=60
until service_ready() or timeout:
    wait(2)
    show_progress()
```

### SSL Certificate Flow (Production)
```bash
# Try Let's Encrypt
if certbot_success():
    use_letsencrypt_cert()
else:
    create_self_signed_cert()
    
# Setup auto-renewal
add_cron_job()
```

---

## 🔐 Security Features

### Production Script Includes:
- ✅ SSL/TLS encryption
- ✅ Nginx security headers
- ✅ Rate limiting
- ✅ Firewall configuration
- ✅ Container resource limits
- ✅ MongoDB authentication
- ✅ Strong password requirements
- ✅ JWT secrets generation

---

## 🆘 Troubleshooting

### Script Won't Run
```bash
# Make executable
chmod +x script-name.sh

# Check syntax
bash -n script-name.sh

# Run with debug
bash -x script-name.sh
```

### Port Issues
```bash
# Find process using port
lsof -i :7000

# Kill process
kill -9 <PID>

# Or let script handle it automatically
```

### Docker Issues
```bash
# Restart Docker
sudo systemctl restart docker

# Clean up
docker system prune -a

# Or use the script
./run-docker-local.sh
```

### SSL Issues
```bash
# Check certificate
openssl x509 -in cert.pem -text -noout

# Renew manually
sudo certbot renew
```

---

## 🎯 Best Practices

1. **Always backup before updates**
   ```bash
   ./backup.sh
   git pull
   ./run-docker-production.sh
   ```

2. **Monitor regularly**
   ```bash
   ./health-check.sh
   docker stats
   ```

3. **Keep logs clean**
   ```bash
   # Rotate logs
   find logs/ -name "*.log" -mtime +7 -delete
   ```

4. **Update regularly**
   ```bash
   git pull
   docker-compose pull
   docker-compose up -d --build
   ```

---

## 📞 Support

- 📖 Check logs: `tail -f logs/*.log`
- 🏥 Run health check: `./health-check.sh`
- 🐛 Check GitHub issues
- 📧 Contact support

---

**All scripts are production-ready and battle-tested! 🚀**
