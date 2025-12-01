#!/bin/bash

################################################################################
# SCRIPT CÀI ĐẶT BACKUP TỰ ĐỘNG (CRON JOB)
################################################################################

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }

log_info "Setting up automatic backup..."

# Get current directory
CURRENT_DIR=$(pwd)
BACKUP_SCRIPT="$CURRENT_DIR/backup.sh"

# Check if backup script exists
if [ ! -f "$BACKUP_SCRIPT" ]; then
    log_error "backup.sh not found in current directory"
    exit 1
fi

# Make sure backup script is executable
chmod +x "$BACKUP_SCRIPT"

# Ask for backup schedule
echo ""
log_info "Select backup schedule:"
echo "  1) Daily at 2:00 AM"
echo "  2) Daily at 3:00 AM"
echo "  3) Every 12 hours"
echo "  4) Every 6 hours"
echo "  5) Custom"
echo ""
read -p "Enter choice (1-5): " choice

case $choice in
    1)
        CRON_SCHEDULE="0 2 * * *"
        DESCRIPTION="Daily at 2:00 AM"
        ;;
    2)
        CRON_SCHEDULE="0 3 * * *"
        DESCRIPTION="Daily at 3:00 AM"
        ;;
    3)
        CRON_SCHEDULE="0 */12 * * *"
        DESCRIPTION="Every 12 hours"
        ;;
    4)
        CRON_SCHEDULE="0 */6 * * *"
        DESCRIPTION="Every 6 hours"
        ;;
    5)
        read -p "Enter cron schedule (e.g., '0 2 * * *'): " CRON_SCHEDULE
        DESCRIPTION="Custom schedule"
        ;;
    *)
        log_error "Invalid choice"
        exit 1
        ;;
esac

# Create cron job
CRON_JOB="$CRON_SCHEDULE cd $CURRENT_DIR && $BACKUP_SCRIPT >> $CURRENT_DIR/logs/backup-cron.log 2>&1"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "$BACKUP_SCRIPT"; then
    log_warning "Backup cron job already exists. Removing old one..."
    crontab -l 2>/dev/null | grep -v "$BACKUP_SCRIPT" | crontab -
fi

# Add new cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

log_success "Automatic backup configured!"
echo ""
log_info "Schedule: $DESCRIPTION"
log_info "Cron: $CRON_SCHEDULE"
log_info "Script: $BACKUP_SCRIPT"
log_info "Logs: $CURRENT_DIR/logs/backup-cron.log"
echo ""
log_info "Current cron jobs:"
crontab -l
echo ""
log_success "Setup complete!"
