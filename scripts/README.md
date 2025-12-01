# Scripts Directory

This directory contains all automation scripts organized by category.

## 📁 Directory Structure

```
scripts/
├── deployment/          # Deployment and startup scripts
├── testing/            # API testing scripts
└── maintenance/        # Backup, restore, and monitoring scripts
```

## 🚀 Usage

### Recommended: Use the Unified Management Console

```bash
# From project root
./manage.sh
```

The management console provides an interactive menu to access all scripts.

### Direct Script Execution

All scripts can also be run directly:

```bash
# Deployment
./scripts/deployment/run-docker-local.sh
./scripts/deployment/run-docker-production.sh
./scripts/deployment/run-local-native.sh

# Testing
./scripts/testing/test-api.sh
./scripts/testing/test-shipment-api.sh

# Maintenance
./scripts/maintenance/backup.sh
./scripts/maintenance/health-check.sh
```

### Via Makefile

Many operations are also available through the Makefile:

```bash
make dev              # Start development
make prod             # Start production
make backup-db        # Backup database
make health-check     # Check service health
```

## 📚 Documentation

For detailed documentation, see:
- [DEPLOYMENT_SCRIPTS.md](../docs/DEPLOYMENT_SCRIPTS.md) - Complete script documentation
- [DEPLOYMENT_GUIDE.md](../docs/DEPLOYMENT_GUIDE.md) - Deployment guide
- [Makefile](../Makefile) - Available make targets

## 🔧 Script Categories

### Deployment Scripts
- **run-docker-local.sh** - Start development with Docker
- **run-docker-production.sh** - Deploy to production VPS with SSL
- **run-local-native.sh** - Run natively without Docker
- **stop-local-native.sh** - Stop native services
- **start-fresh.sh** - Clean rebuild from scratch
- **generate-secrets.sh** - Generate secure credentials

### Testing Scripts
- **test-api.sh** - Test all API endpoints
- **test-shipment-api.sh** - Test shipment endpoints
- **test-collection-api.sh** - Test collection endpoints
- **restart-and-test.sh** - Restart and run tests

### Maintenance Scripts
- **backup.sh** - Backup database and configs
- **restore.sh** - Restore from backup
- **health-check.sh** - Check all services
- **setup-cron-backup.sh** - Setup automatic backups

## 🎯 Quick Examples

### Start Development
```bash
./manage.sh
# Select: 1 → 1 (Start Docker Local)
```

### Run Tests
```bash
./manage.sh
# Select: 2 → 1 (Test All APIs)
```

### Backup Database
```bash
./manage.sh
# Select: 3 → 1 (Backup Database)
```

### Check System Health
```bash
./manage.sh
# Select: 3 → 3 (Health Check)
```

## 🔐 Permissions

All scripts are executable. If you encounter permission issues:

```bash
chmod +x scripts/**/*.sh
```

## 📝 Notes

- All scripts include colored output and progress indicators
- Error handling and validation built-in
- Automatic port conflict resolution
- Support for both Docker and native deployments
- Production scripts include SSL and security features
