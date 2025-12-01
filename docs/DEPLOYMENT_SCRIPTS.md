# Deployment Scripts Documentation

## 📜 Available Scripts

The platform provides **8 automated scripts** for deployment, monitoring, and maintenance:

### 🚀 Deployment Scripts

#### 1. `run-local-native.sh` - Native Deployment (No Docker)
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
./run-local-native.sh
```

**Stop**:
```bash
./stop-local-native.sh
```

---

#### 2. `run-docker-local.sh` - Docker Compose Local
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
./run-docker-local.sh
```

---

#### 3. `run-docker-production.sh` - Production VPS Deployment
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
sudo ./run-docker-production.sh
```

**Requirements**:
- VPS with Ubuntu/CentOS
- Domain pointing to VPS
- Root access

---

### 🛠️ Utility Scripts

#### 4. `health-check.sh` - Health Monitoring
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
./health-check.sh
```

---

#### 5. `backup.sh` - Database Backup
Backup MongoDB and configuration files.

**Backups**:
- ✅ MongoDB database (compressed .gz)
- ✅ Environment files (.env*)
- ✅ Nginx configuration
- ✅ Auto-cleanup old backups (7 days)
- ✅ Display backup size

**Usage**:
```bash
./backup.sh
```

**Output**: `backups/backup-YYYYMMDD_HHMMSS.gz`

---

#### 6. `restore.sh` - Database Restore
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
./restore.sh
```

---

#### 7. `setup-cron-backup.sh` - Auto Backup Setup
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
./setup-cron-backup.sh
```

**Options**:
1. Daily at 2:00 AM
2. Daily at 3:00 AM
3. Every 12 hours
4. Every 6 hours
5. Custom

---

#### 8. `stop-local-native.sh` - Stop Native Services
Stop all native services.

**Features**:
- ✅ Read PIDs from log files
- ✅ Gracefully kill processes
- ✅ Cleanup PID files
- ✅ Optional MongoDB stop

**Usage**:
```bash
./stop-local-native.sh
```

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
# Start
./run-local-native.sh

# Code changes (auto reload)

# Check health
./health-check.sh

# Stop
./stop-local-native.sh
```

### Testing Workflow
```bash
# Start
./run-docker-local.sh

# Test features

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Production Workflow
```bash
# Initial deploy
sudo ./run-docker-production.sh

# Setup auto backup
./setup-cron-backup.sh

# Monitor
./health-check.sh

# Update code
git pull
docker-compose -f docker-compose.prod.yml up -d --build

# Backup before changes
./backup.sh
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
