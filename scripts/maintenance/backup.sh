#!/bin/bash

################################################################################
# SCRIPT BACKUP DATABASE VÀ FILES
################################################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Configuration
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
ENV_FILE=".env.prod"

# Load environment
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | xargs)
else
    ENV_FILE=".env.local"
    export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

log_info "Starting backup process..."

# Create backup directory
mkdir -p "$BACKUP_DIR"

################################################################################
# Backup MongoDB
################################################################################
log_info "Backing up MongoDB..."

# Check if running in Docker
if docker ps | grep -q "victormer-mongodb"; then
    CONTAINER_NAME=$(docker ps --filter "name=victormer-mongodb" --format "{{.Names}}" | head -n 1)
    
    docker exec $CONTAINER_NAME mongodump \
        -u "${MONGO_ROOT_USER}" \
        -p "${MONGO_ROOT_PASSWORD}" \
        --authenticationDatabase admin \
        --gzip \
        --archive=/data/backup/backup-${DATE}.gz
    
    # Copy from container to host
    docker cp $CONTAINER_NAME:/data/backup/backup-${DATE}.gz "$BACKUP_DIR/"
    
    log_success "MongoDB backup completed: $BACKUP_DIR/backup-${DATE}.gz"
else
    # Native MongoDB
    mongodump \
        --uri="mongodb://${MONGO_ROOT_USER}:${MONGO_ROOT_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin" \
        --gzip \
        --archive="$BACKUP_DIR/backup-${DATE}.gz"
    
    log_success "MongoDB backup completed: $BACKUP_DIR/backup-${DATE}.gz"
fi

################################################################################
# Backup Environment Files
################################################################################
log_info "Backing up environment files..."

tar -czf "$BACKUP_DIR/env-${DATE}.tar.gz" .env* 2>/dev/null || true

log_success "Environment files backed up"

################################################################################
# Backup Nginx Configuration
################################################################################
if [ -d "nginx" ]; then
    log_info "Backing up Nginx configuration..."
    tar -czf "$BACKUP_DIR/nginx-${DATE}.tar.gz" nginx/
    log_success "Nginx configuration backed up"
fi

################################################################################
# Cleanup Old Backups (keep last 7 days)
################################################################################
log_info "Cleaning up old backups..."

find "$BACKUP_DIR" -name "backup-*.gz" -mtime +7 -delete
find "$BACKUP_DIR" -name "env-*.tar.gz" -mtime +7 -delete
find "$BACKUP_DIR" -name "nginx-*.tar.gz" -mtime +7 -delete

log_success "Old backups cleaned up"

################################################################################
# Summary
################################################################################
echo ""
log_success "========================================="
log_success "  BACKUP COMPLETED SUCCESSFULLY"
log_success "========================================="
echo ""
log_info "Backup files:"
ls -lh "$BACKUP_DIR" | grep "$DATE"
echo ""
log_info "Total backup size:"
du -sh "$BACKUP_DIR"
echo ""
