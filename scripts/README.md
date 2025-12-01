# Scripts Directory

Automation scripts organized by category for Victor Mer Platform.

## 📁 Structure

```
scripts/
├── deployment/     # Deployment scripts
├── testing/        # API testing scripts
└── maintenance/    # Backup & monitoring
```

## 🚀 Quick Start

### Use Management Console (Recommended)
```bash
./manage.sh
```

### Direct Execution
```bash
./scripts/deployment/run-docker-local.sh
./scripts/testing/test-api.sh
./scripts/maintenance/backup.sh
```

### Via Makefile
```bash
make dev
make test-api
make backup-db
```

## 📚 Full Documentation

See [docs/DEPLOYMENT_SCRIPTS.md](../docs/DEPLOYMENT_SCRIPTS.md) for complete documentation.
