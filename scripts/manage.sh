#!/bin/bash

################################################################################
# VICTOR MER PLATFORM - UNIFIED MANAGEMENT SCRIPT
# Centralized script to manage all deployment, testing, and maintenance tasks
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

# Script directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOYMENT_DIR="$SCRIPT_DIR/scripts/deployment"
TESTING_DIR="$SCRIPT_DIR/scripts/testing"
MAINTENANCE_DIR="$SCRIPT_DIR/scripts/maintenance"

# Logging functions
log_header() { echo -e "${CYAN}╔════════════════════════════════════════════════════╗${NC}"; }
log_footer() { echo -e "${CYAN}╚════════════════════════════════════════════════════╝${NC}"; }
log_title() { echo -e "${CYAN}║${NC} ${MAGENTA}$1${NC}"; }
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[✓]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[!]${NC} $1"; }
log_error() { echo -e "${RED}[✗]${NC} $1"; }

# Clear screen and show header
clear_screen() {
    clear
    log_header
    log_title "    VICTOR MER PLATFORM - MANAGEMENT CONSOLE"
    log_footer
    echo ""
}

################################################################################
# DEPLOYMENT MENU
################################################################################
show_deployment_menu() {
    clear_screen
    echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}  DEPLOYMENT OPTIONS${NC}"
    echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
    echo ""
    echo "  1) Start Docker Local (Development)"
    echo "  2) Start Docker Production (VPS)"
    echo "  3) Start Native Local (No Docker)"
    echo "  4) Stop Native Local"
    echo "  5) Start Fresh (Clean & Rebuild)"
    echo "  6) Generate Security Secrets"
    echo ""
    echo "  0) Back to Main Menu"
    echo ""
    echo -e "${CYAN}─────────────────────────────────────────────────────${NC}"
    read -p "Select option: " choice
    
    case $choice in
        1) bash "$DEPLOYMENT_DIR/run-docker-local.sh" ;;
        2) bash "$DEPLOYMENT_DIR/run-docker-production.sh" ;;
        3) bash "$DEPLOYMENT_DIR/run-local-native.sh" ;;
        4) bash "$DEPLOYMENT_DIR/stop-local-native.sh" ;;
        5) bash "$DEPLOYMENT_DIR/start-fresh.sh" ;;
        6) bash "$DEPLOYMENT_DIR/generate-secrets.sh" ;;
        0) return ;;
        *) log_error "Invalid option"; sleep 2; show_deployment_menu ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    show_deployment_menu
}

################################################################################
# TESTING MENU
################################################################################
show_testing_menu() {
    clear_screen
    echo -e "${YELLOW}═══════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}  TESTING OPTIONS${NC}"
    echo -e "${YELLOW}═══════════════════════════════════════════════════${NC}"
    echo ""
    echo "  1) Test All APIs"
    echo "  2) Test Shipment API"
    echo "  3) Test Collection API"
    echo "  4) Restart & Test"
    echo ""
    echo "  0) Back to Main Menu"
    echo ""
    echo -e "${CYAN}─────────────────────────────────────────────────────${NC}"
    read -p "Select option: " choice
    
    case $choice in
        1) bash "$TESTING_DIR/test-api.sh" ;;
        2) bash "$TESTING_DIR/test-shipment-api.sh" ;;
        3) bash "$TESTING_DIR/test-collection-api.sh" ;;
        4) bash "$TESTING_DIR/restart-and-test.sh" ;;
        0) return ;;
        *) log_error "Invalid option"; sleep 2; show_testing_menu ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    show_testing_menu
}

################################################################################
# MAINTENANCE MENU
################################################################################
show_maintenance_menu() {
    clear_screen
    echo -e "${MAGENTA}═══════════════════════════════════════════════════${NC}"
    echo -e "${MAGENTA}  MAINTENANCE OPTIONS${NC}"
    echo -e "${MAGENTA}═══════════════════════════════════════════════════${NC}"
    echo ""
    echo "  1) Backup Database"
    echo "  2) Restore Database"
    echo "  3) Health Check"
    echo "  4) Setup Auto Backup (Cron)"
    echo "  5) View Logs"
    echo "  6) Clean Docker Resources"
    echo ""
    echo "  0) Back to Main Menu"
    echo ""
    echo -e "${CYAN}─────────────────────────────────────────────────────${NC}"
    read -p "Select option: " choice
    
    case $choice in
        1) bash "$MAINTENANCE_DIR/backup.sh" ;;
        2) bash "$MAINTENANCE_DIR/restore.sh" ;;
        3) bash "$MAINTENANCE_DIR/health-check.sh" ;;
        4) bash "$MAINTENANCE_DIR/setup-cron-backup.sh" ;;
        5) show_logs_menu ;;
        6) clean_docker ;;
        0) return ;;
        *) log_error "Invalid option"; sleep 2; show_maintenance_menu ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    show_maintenance_menu
}

################################################################################
# LOGS MENU
################################################################################
show_logs_menu() {
    clear_screen
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  VIEW LOGS${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
    echo ""
    echo "  1) All Services"
    echo "  2) Backend Only"
    echo "  3) Frontend Only"
    echo "  4) Admin Panel Only"
    echo "  5) MongoDB Only"
    echo "  6) Nginx Only"
    echo ""
    echo "  0) Back"
    echo ""
    echo -e "${CYAN}─────────────────────────────────────────────────────${NC}"
    read -p "Select option: " choice
    
    case $choice in
        1) docker-compose logs -f --tail=100 ;;
        2) docker-compose logs -f --tail=100 backend ;;
        3) docker-compose logs -f --tail=100 frontend ;;
        4) docker-compose logs -f --tail=100 admin ;;
        5) docker-compose logs -f --tail=100 mongodb ;;
        6) docker-compose logs -f --tail=100 nginx ;;
        0) return ;;
        *) log_error "Invalid option"; sleep 2; show_logs_menu ;;
    esac
}

################################################################################
# DOCKER MANAGEMENT
################################################################################
clean_docker() {
    clear_screen
    log_warning "This will remove all Docker containers, images, and volumes!"
    read -p "Are you sure? (yes/no): " confirm
    
    if [ "$confirm" = "yes" ]; then
        log_info "Stopping containers..."
        docker-compose down -v 2>/dev/null || true
        
        log_info "Removing containers..."
        docker rm -f $(docker ps -aq) 2>/dev/null || true
        
        log_info "Removing images..."
        docker rmi -f $(docker images -q) 2>/dev/null || true
        
        log_info "Removing volumes..."
        docker volume prune -f
        
        log_info "Removing networks..."
        docker network prune -f
        
        log_info "Cleaning build cache..."
        docker builder prune -af
        
        log_success "Docker cleanup complete!"
    else
        log_info "Cleanup cancelled"
    fi
}

################################################################################
# MAKEFILE INTEGRATION
################################################################################
show_makefile_menu() {
    clear_screen
    echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}  MAKEFILE COMMANDS${NC}"
    echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
    echo ""
    echo "  Development:"
    echo "    1) make dev          - Start development environment"
    echo "    2) make dev-build    - Build and start development"
    echo "    3) make dev-logs     - Show development logs"
    echo "    4) make dev-down     - Stop development"
    echo ""
    echo "  Production:"
    echo "    5) make prod         - Start production environment"
    echo "    6) make prod-build   - Build and start production"
    echo "    7) make prod-logs    - Show production logs"
    echo "    8) make prod-down    - Stop production"
    echo ""
    echo "  Database:"
    echo "    9) make seed         - Import seed data (dev)"
    echo "   10) make seed-prod    - Import seed data (prod)"
    echo "   11) make backup-db    - Backup database"
    echo "   12) make restore-db   - Restore database"
    echo ""
    echo "  Utilities:"
    echo "   13) make health-check - Check service health"
    echo "   14) make clean        - Clean all Docker resources"
    echo "   15) make ps           - Show running containers"
    echo ""
    echo "  0) Back to Main Menu"
    echo ""
    echo -e "${CYAN}─────────────────────────────────────────────────────${NC}"
    read -p "Select option: " choice
    
    case $choice in
        1) make dev ;;
        2) make dev-build ;;
        3) make dev-logs ;;
        4) make dev-down ;;
        5) make prod ;;
        6) make prod-build ;;
        7) make prod-logs ;;
        8) make prod-down ;;
        9) make seed ;;
        10) make seed-prod ;;
        11) make backup-db ;;
        12) 
            read -p "Enter backup folder name (e.g., backup-20231201-120000): " backup_name
            make restore-db BACKUP="$backup_name"
            ;;
        13) make health-check ;;
        14) make clean ;;
        15) make ps ;;
        0) return ;;
        *) log_error "Invalid option"; sleep 2; show_makefile_menu ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    show_makefile_menu
}

################################################################################
# MAIN MENU
################################################################################
show_main_menu() {
    clear_screen
    echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}  MAIN MENU${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
    echo ""
    echo "  ${GREEN}1)${NC} Deployment Management"
    echo "  ${YELLOW}2)${NC} Testing & API Tests"
    echo "  ${MAGENTA}3)${NC} Maintenance & Backup"
    echo "  ${BLUE}4)${NC} Makefile Commands"
    echo "  ${CYAN}5)${NC} Quick Actions"
    echo ""
    echo "  ${RED}0)${NC} Exit"
    echo ""
    echo -e "${CYAN}─────────────────────────────────────────────────────${NC}"
    read -p "Select option: " choice
    
    case $choice in
        1) show_deployment_menu ;;
        2) show_testing_menu ;;
        3) show_maintenance_menu ;;
        4) show_makefile_menu ;;
        5) show_quick_actions ;;
        0) 
            clear_screen
            log_success "Thank you for using Victor Mer Platform!"
            echo ""
            exit 0
            ;;
        *) 
            log_error "Invalid option"
            sleep 1
            show_main_menu
            ;;
    esac
}

################################################################################
# QUICK ACTIONS
################################################################################
show_quick_actions() {
    clear_screen
    echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}  QUICK ACTIONS${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
    echo ""
    echo "  1) Start Dev + Test APIs"
    echo "  2) Backup + Health Check"
    echo "  3) Stop All Services"
    echo "  4) Restart All Services"
    echo "  5) View System Status"
    echo ""
    echo "  0) Back to Main Menu"
    echo ""
    echo -e "${CYAN}─────────────────────────────────────────────────────${NC}"
    read -p "Select option: " choice
    
    case $choice in
        1)
            log_info "Starting development environment..."
            make dev
            sleep 5
            log_info "Running API tests..."
            bash "$TESTING_DIR/test-api.sh"
            ;;
        2)
            log_info "Running backup..."
            bash "$MAINTENANCE_DIR/backup.sh"
            log_info "Running health check..."
            bash "$MAINTENANCE_DIR/health-check.sh"
            ;;
        3)
            log_info "Stopping all services..."
            make dev-down 2>/dev/null || true
            make prod-down 2>/dev/null || true
            bash "$DEPLOYMENT_DIR/stop-local-native.sh" 2>/dev/null || true
            log_success "All services stopped"
            ;;
        4)
            log_info "Restarting services..."
            docker-compose restart
            log_success "Services restarted"
            ;;
        5)
            log_info "System Status:"
            echo ""
            docker-compose ps 2>/dev/null || echo "No Docker services running"
            echo ""
            bash "$MAINTENANCE_DIR/health-check.sh"
            ;;
        0) return ;;
        *) log_error "Invalid option"; sleep 2; show_quick_actions ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    show_quick_actions
}

################################################################################
# ENTRY POINT
################################################################################
main() {
    # Check if running from correct directory
    if [ ! -f "Makefile" ]; then
        log_error "Please run this script from the project root directory"
        exit 1
    fi
    
    # Show main menu
    show_main_menu
}

# Run main function
main
