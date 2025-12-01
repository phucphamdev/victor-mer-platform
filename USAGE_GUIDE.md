# Victor Mer Platform - Usage Guide

## 🎮 Quick Start with Management Console

The easiest way to manage the platform is through the unified management console:

```bash
./manage.sh
```

## 📋 Main Menu

When you run `./manage.sh`, you'll see:

```
╔════════════════════════════════════════════════════╗
║    VICTOR MER PLATFORM - MANAGEMENT CONSOLE        ║
╚════════════════════════════════════════════════════╝

═══════════════════════════════════════════════════
  MAIN MENU
═══════════════════════════════════════════════════

  1) Deployment Management
  2) Testing & API Tests
  3) Maintenance & Backup
  4) Makefile Commands
  5) Quick Actions

  0) Exit

─────────────────────────────────────────────────────
Select option:
```

## 🚀 Common Workflows

### 1. Start Development Environment

```bash
./manage.sh
# Select: 1 (Deployment Management)
# Select: 1 (Start Docker Local)
```

Or use quick action:
```bash
./manage.sh
# Select: 5 (Quick Actions)
# Select: 1 (Start Dev + Test APIs)
```

### 2. Run API Tests

```bash
./manage.sh
# Select: 2 (Testing & API Tests)
# Select: 1 (Test All APIs)
```

### 3. Backup Database

```bash
./manage.sh
# Select: 3 (Maintenance & Backup)
# Select: 1 (Backup Database)
```

### 4. Check System Health

```bash
./manage.sh
# Select: 5 (Quick Actions)
# Select: 5 (View System Status)
```

### 5. Deploy to Production

```bash
sudo ./manage.sh
# Select: 1 (Deployment Management)
# Select: 2 (Start Docker Production)
```

## 📁 Direct Script Access

You can also run scripts directly:

### Deployment
```bash
./scripts/deployment/run-docker-local.sh
./scripts/deployment/run-docker-production.sh
./scripts/deployment/run-local-native.sh
./scripts/deployment/stop-local-native.sh
./scripts/deployment/start-fresh.sh
./scripts/deployment/generate-secrets.sh
```

### Testing
```bash
./scripts/testing/test-api.sh
./scripts/testing/test-shipment-api.sh
./scripts/testing/test-collection-api.sh
```

### Maintenance
```bash
./scripts/maintenance/backup.sh
./scripts/maintenance/restore.sh
./scripts/maintenance/health-check.sh
./scripts/maintenance/setup-cron-backup.sh
```

## 🛠️ Makefile Commands

All operations are also available via Makefile:

```bash
# Development
make dev              # Start development
make dev-build        # Build and start
make dev-logs         # View logs
make dev-down         # Stop

# Production
make prod             # Start production
make prod-build       # Build and start
make prod-logs        # View logs
make prod-down        # Stop

# Database
make seed             # Import seed data (dev)
make seed-prod        # Import seed data (prod)
make backup-db        # Backup database
make restore-db       # Restore database

# Utilities
make health-check     # Check service health
make test-api         # Test APIs
make clean            # Clean Docker resources
make ps               # Show containers
```

## 🎯 Recommended Workflow

### For Development
1. Start: `./manage.sh` → 1 → 1 (Start Docker Local)
2. Code changes (auto-reload enabled)
3. Test: `./manage.sh` → 2 → 1 (Test All APIs)
4. Check: `./manage.sh` → 3 → 3 (Health Check)
5. Stop: `./manage.sh` → 5 → 3 (Stop All Services)

### For Production
1. Deploy: `sudo ./manage.sh` → 1 → 2 (Start Docker Production)
2. Setup backup: `./manage.sh` → 3 → 4 (Setup Auto Backup)
3. Monitor: `./manage.sh` → 5 → 5 (View System Status)
4. Update: `git pull` then `./manage.sh` → 4 → 6 (make prod-build)

## 📊 Menu Structure

```
Main Menu
├── 1. Deployment Management
│   ├── 1. Start Docker Local (Development)
│   ├── 2. Start Docker Production (VPS)
│   ├── 3. Start Native Local (No Docker)
│   ├── 4. Stop Native Local
│   ├── 5. Start Fresh (Clean & Rebuild)
│   └── 6. Generate Security Secrets
│
├── 2. Testing & API Tests
│   ├── 1. Test All APIs
│   ├── 2. Test Shipment API
│   ├── 3. Test Collection API
│   └── 4. Restart & Test
│
├── 3. Maintenance & Backup
│   ├── 1. Backup Database
│   ├── 2. Restore Database
│   ├── 3. Health Check
│   ├── 4. Setup Auto Backup (Cron)
│   ├── 5. View Logs
│   └── 6. Clean Docker Resources
│
├── 4. Makefile Commands
│   ├── Development (dev, dev-build, dev-logs, dev-down)
│   ├── Production (prod, prod-build, prod-logs, prod-down)
│   ├── Database (seed, seed-prod, backup-db, restore-db)
│   └── Utilities (health-check, clean, ps)
│
└── 5. Quick Actions
    ├── 1. Start Dev + Test APIs
    ├── 2. Backup + Health Check
    ├── 3. Stop All Services
    ├── 4. Restart All Services
    └── 5. View System Status
```

## �� Tips

1. **Use Quick Actions** for common workflows
2. **View Logs** when troubleshooting issues
3. **Backup regularly** before making changes
4. **Health Check** after deployments
5. **Use Makefile** for CI/CD pipelines

## 🔧 Troubleshooting

If the management console doesn't work:

```bash
# Make it executable
chmod +x manage.sh

# Run from project root
cd /path/to/victor-mer-platform
./manage.sh
```

If scripts don't work:

```bash
# Make all scripts executable
chmod +x scripts/**/*.sh
```

## 📚 Documentation

- [DEPLOYMENT_SCRIPTS.md](docs/DEPLOYMENT_SCRIPTS.md) - Detailed script documentation
- [README.md](README.md) - Main project documentation
- [scripts/README.md](scripts/README.md) - Scripts directory guide

## 🎉 That's It!

You now have a professional, organized project structure with an easy-to-use management console. Enjoy! 🚀
