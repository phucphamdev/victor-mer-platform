#!/bin/bash

################################################################################
# SCRIPT RESTORE DATABASE TỪ BACKUP
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
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }

# Configuration
BACKUP_DIR="./backups"
ENV_FILE=".env.prod"

# Load environment
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | xargs)
else
    ENV_FILE=".env.local"
    export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

log_info "========================================="
log_info "  DATABASE RESTORE UTILITY"
log_info "========================================="
echo ""

################################################################################
# List Available Backups
################################################################################
log_info "Available backups:"
echo ""

if [ ! -d "$BACKUP_DIR" ] || [ -z "$(ls -A $BACKUP_DIR/backup-*.gz 2>/dev/null)" ]; then
    log_error "No backups found in $BACKUP_DIR"
    exit 1
fi

# List backups with numbers
i=1
declare -a backups
for backup in $(ls -t $BACKUP_DIR/backup-*.gz); do
    backups[$i]=$backup
    size=$(du -h "$backup" | cut -f1)
    date=$(basename "$backup" | sed 's/backup-\(.*\)\.gz/\1/')
    echo "  [$i] $date ($size)"
    i=$((i + 1))
done

echo ""
read -p "Select backup number to restore (or 'q' to quit): " selection

if [ "$selection" = "q" ]; then
    log_info "Restore cancelled"
    exit 0
fi

if [ -z "${backups[$selection]}" ]; then
    log_error "Invalid selection"
    exit 1
fi

BACKUP_FILE="${backups[$selection]}"

log_info "Selected backup: $BACKUP_FILE"

################################################################################
# Confirmation
################################################################################
log_warning "⚠️  WARNING: This will replace all current data!"
read -p "Are you sure you want to restore? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    log_info "Restore cancelled"
    exit 0
fi

################################################################################
# Restore MongoDB
################################################################################
log_info "Restoring MongoDB from backup..."

# Check if running in Docker
if docker ps | grep -q "victormer-mongodb"; then
    CONTAINER_NAME=$(docker ps --filter "name=victormer-mongodb" --format "{{.Names}}" | head -n 1)
    
    # Copy backup to container
    docker cp "$BACKUP_FILE" $CONTAINER_NAME:/data/restore.gz
    
    # Restore
    docker exec $CONTAINER_NAME mongorestore \
        -u "${MONGO_ROOT_USER}" \
        -p "${MONGO_ROOT_PASSWORD}" \
        --authenticationDatabase admin \
        --gzip \
        --archive=/data/restore.gz \
        --drop
    
    # Cleanup
    docker exec $CONTAINER_NAME rm /data/restore.gz
    
    log_success "MongoDB restored successfully from Docker"
else
    # Native MongoDB
    mongorestore \
        --uri="mongodb://${MONGO_ROOT_USER}:${MONGO_ROOT_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin" \
        --gzip \
        --archive="$BACKUP_FILE" \
        --drop
    
    log_success "MongoDB restored successfully"
fi

################################################################################
# Verify Restore
################################################################################
log_info "Verifying restore..."

if docker ps | grep -q "victormer-mongodb"; then
    CONTAINER_NAME=$(docker ps --filter "name=victormer-mongodb" --format "{{.Names}}" | head -n 1)
    COLLECTIONS=$(docker exec $CONTAINER_NAME mongosh --quiet \
        -u "${MONGO_ROOT_USER}" -p "${MONGO_ROOT_PASSWORD}" \
        --authenticationDatabase admin \
        --eval "db.getSiblingDB('${MONGO_DB_NAME}').getCollectionNames().length")
else
    COLLECTIONS=$(mongosh --quiet \
        --eval "db.getSiblingDB('${MONGO_DB_NAME}').getCollectionNames().length" \
        "mongodb://${MONGO_ROOT_USER}:${MONGO_ROOT_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin")
fi

if [ "$COLLECTIONS" -gt 0 ]; then
    log_success "Restore verified: $COLLECTIONS collections found"
else
    log_error "Restore verification failed: No collections found"
    exit 1
fi

################################################################################
# Summary
################################################################################
echo ""
log_success "========================================="
log_success "  RESTORE COMPLETED SUCCESSFULLY"
log_success "========================================="
echo ""
log_info "Restored from: $BACKUP_FILE"
log_info "Collections: $COLLECTIONS"
echo ""
log_warning "Please restart your application services"
echo ""
