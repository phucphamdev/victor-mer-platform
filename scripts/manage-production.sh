#!/bin/bash

# ============================================
# Production Environment Management Script
# Quản lý môi trường production
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to show menu
show_menu() {
    echo -e "${BLUE}============================================${NC}"
    echo -e "${BLUE}Production Environment Management${NC}"
    echo -e "${BLUE}============================================${NC}"
    echo ""
    echo "1. Start Production"
    echo "2. Stop Production"
    echo "3. Restart Production"
    echo "4. View Logs"
    echo "5. View Status"
    echo "6. Cleanup & Rebuild"
    echo "7. Backup Database"
    echo "8. Restore Database"
    echo "9. Update & Rebuild"
    echo "0. Exit"
    echo ""
}

# Function to start production
start_production() {
    echo -e "${BLUE}🚀 Starting production environment...${NC}"
    echo ""
    
    # Check if cleanup is needed
    read -p "Bạn có muốn cleanup Docker trước khi start? (yes/no, default: no): " cleanup
    if [ "$cleanup" = "yes" ]; then
        echo ""
        bash scripts/docker-cleanup.sh
        echo ""
    fi
    
    # Generate config
    echo -e "${YELLOW}📋 Generating configuration...${NC}"
    bash scripts/generate-config.sh
    echo ""
    
    docker-compose -f docker-compose.prod.yml up -d --build
    
    echo ""
    echo -e "${GREEN}✅ Production started!${NC}"
    echo ""
    
    # Wait for services
    echo -e "${YELLOW}⏳ Đợi services khởi động...${NC}"
    sleep 20
    
    # Show status
    docker-compose -f docker-compose.prod.yml ps
}

# Function to stop production
stop_production() {
    echo -e "${YELLOW}🛑 Stopping production environment...${NC}"
    docker-compose -f docker-compose.prod.yml down
    echo -e "${GREEN}✅ Production stopped!${NC}"
}

# Function to restart production
restart_production() {
    echo -e "${YELLOW}🔄 Restarting production environment...${NC}"
    docker-compose -f docker-compose.prod.yml restart
    echo -e "${GREEN}✅ Production restarted!${NC}"
}

# Function to view logs
view_logs() {
    echo -e "${BLUE}📋 Viewing logs (Ctrl+C to exit)...${NC}"
    echo ""
    docker-compose -f docker-compose.prod.yml logs -f
}

# Function to view status
view_status() {
    echo -e "${BLUE}📊 Container Status:${NC}"
    docker-compose -f docker-compose.prod.yml ps
    echo ""
    
    echo -e "${BLUE}💾 Disk Usage:${NC}"
    docker system df
    echo ""
    
    echo -e "${BLUE}🌐 Networks:${NC}"
    docker network ls | grep prod
    echo ""
    
    echo -e "${BLUE}📦 Volumes:${NC}"
    docker volume ls | grep prod
}

# Function to cleanup and rebuild
cleanup_rebuild() {
    echo -e "${YELLOW}🧹 Cleanup & Rebuild...${NC}"
    bash scripts/docker-reset.sh prod
}

# Function to backup database
backup_database() {
    echo -e "${BLUE}💾 Backing up database...${NC}"
    
    # Load environment variables
    if [ -f .env ]; then
        export $(cat .env | grep -v '^#' | xargs)
    fi
    
    BACKUP_DIR="./backups"
    mkdir -p $BACKUP_DIR
    
    BACKUP_FILE="$BACKUP_DIR/db_backup_$(date +%Y%m%d_%H%M%S).sql"
    
    docker exec ${PROJECT_NAME}-mysql-prod mysqldump \
        -u${DB_USERNAME} \
        -p${DB_PASSWORD} \
        ${DB_DATABASE} > $BACKUP_FILE
    
    echo -e "${GREEN}✅ Database backed up to: $BACKUP_FILE${NC}"
}

# Function to restore database
restore_database() {
    echo -e "${BLUE}📥 Restoring database...${NC}"
    
    BACKUP_DIR="./backups"
    
    if [ ! -d "$BACKUP_DIR" ]; then
        echo -e "${RED}❌ Backup directory not found!${NC}"
        return
    fi
    
    echo -e "${YELLOW}Available backups:${NC}"
    ls -lh $BACKUP_DIR/*.sql 2>/dev/null || echo "No backups found"
    echo ""
    
    read -p "Enter backup filename: " backup_file
    
    if [ ! -f "$BACKUP_DIR/$backup_file" ]; then
        echo -e "${RED}❌ Backup file not found!${NC}"
        return
    fi
    
    # Load environment variables
    if [ -f .env ]; then
        export $(cat .env | grep -v '^#' | xargs)
    fi
    
    docker exec -i ${PROJECT_NAME}-mysql-prod mysql \
        -u${DB_USERNAME} \
        -p${DB_PASSWORD} \
        ${DB_DATABASE} < "$BACKUP_DIR/$backup_file"
    
    echo -e "${GREEN}✅ Database restored from: $backup_file${NC}"
}

# Function to update and rebuild
update_rebuild() {
    echo -e "${BLUE}🔄 Updating and rebuilding...${NC}"
    
    # Pull latest code
    echo -e "${YELLOW}📥 Pulling latest code...${NC}"
    git pull
    
    # Rebuild
    echo -e "${YELLOW}🔨 Rebuilding containers...${NC}"
    docker-compose -f docker-compose.prod.yml up -d --build
    
    echo -e "${GREEN}✅ Update complete!${NC}"
}

# Main loop
while true; do
    show_menu
    read -p "Chọn option (0-9): " choice
    echo ""
    
    case $choice in
        1) start_production ;;
        2) stop_production ;;
        3) restart_production ;;
        4) view_logs ;;
        5) view_status ;;
        6) cleanup_rebuild ;;
        7) backup_database ;;
        8) restore_database ;;
        9) update_rebuild ;;
        0) 
            echo -e "${GREEN}👋 Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Invalid option!${NC}"
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    clear
done
