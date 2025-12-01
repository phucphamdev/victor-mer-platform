#!/bin/bash

# Victor Mer Platform - Unified Manager
# One script to rule them all!

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

print_header() {
    clear
    echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║     Victor Mer Platform Manager       ║${NC}"
    echo -e "${CYAN}║     One Command For Everything        ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
    echo ""
}

print_main_menu() {
    echo -e "${GREEN}📋 Main Menu:${NC}"
    echo ""
    echo -e "${YELLOW}🚀 Deployment Methods:${NC}"
    echo "  1. Native Development (⚡ Fastest - No Docker)"
    echo "  2. Docker Local (🐳 Lightweight Testing)"
    echo "  3. Docker Production (🌐 Full Stack + SSL)"
    echo ""
    echo -e "${YELLOW}🛠️  Development Tools:${NC}"
    echo "  4. Dev Manager (Interactive service management)"
    echo "  5. Start All Services (Native)"
    echo "  6. Stop All Services"
    echo ""
    echo -e "${YELLOW}📊 Monitoring:${NC}"
    echo "  7. View Logs (All)"
    echo "  8. View Backend Logs"
    echo "  9. View Admin Logs"
    echo "  10. Service Status"
    echo "  11. Health Check"
    echo ""
    echo -e "${YELLOW}🗄️  Database:${NC}"
    echo "  12. Start MongoDB"
    echo "  13. Stop MongoDB"
    echo "  14. MongoDB Shell"
    echo "  15. Backup Database"
    echo ""
    echo -e "${YELLOW}🧪 Testing:${NC}"
    echo "  16. Test All APIs"
    echo "  17. Test Specific API"
    echo ""
    echo -e "${YELLOW}🧹 Utilities:${NC}"
    echo "  18. Clean Install (All Dependencies)"
    echo "  19. Clean Logs"
    echo "  20. Clean Docker (Containers + Images)"
    echo "  21. Update Project (Git Pull)"
    echo ""
    echo "  0. Exit"
    echo ""
    echo -e "${CYAN}════════════════════════════════════════${NC}"
}

check_port() {
    lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1
}

kill_port() {
    local port=$1
    if check_port $port; then
        echo -e "${YELLOW}⚠ Killing process on port $port...${NC}"
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
        sleep 1
    fi
}

show_status() {
    echo -e "${BLUE}📊 Service Status:${NC}"
    echo ""
    
    # Backend
    if check_port 7000; then
        echo -e "  Backend API:     ${GREEN}● Running${NC} (http://localhost:7000)"
    else
        echo -e "  Backend API:     ${RED}○ Stopped${NC}"
    fi
    
    # Admin Panel
    if check_port 3000; then
        echo -e "  Admin Panel:     ${GREEN}● Running${NC} (http://localhost:3000)"
    elif check_port 4000; then
        echo -e "  Admin Panel:     ${GREEN}● Running${NC} (http://localhost:4000)"
    else
        echo -e "  Admin Panel:     ${RED}○ Stopped${NC}"
    fi
    
    # Frontend
    if check_port 3500; then
        echo -e "  Frontend:        ${GREEN}● Running${NC} (http://localhost:3500)"
    else
        echo -e "  Frontend:        ${RED}○ Stopped${NC}"
    fi
    
    # MongoDB
    if pgrep -x "mongod" > /dev/null || docker ps | grep -q mongodb; then
        echo -e "  MongoDB:         ${GREEN}● Running${NC}"
    else
        echo -e "  MongoDB:         ${RED}○ Stopped${NC}"
    fi
    
    echo ""
}

start_all_native() {
    echo -e "${BLUE}🚀 Starting all services (Native)...${NC}"
    
    # Start MongoDB
    if ! pgrep -x "mongod" > /dev/null; then
        echo "Starting MongoDB..."
        mongod --dbpath ~/data/db --fork --logpath ~/data/mongodb.log 2>/dev/null || {
            mkdir -p ~/data/db
            mongod --dbpath ~/data/db --fork --logpath ~/data/mongodb.log
        }
        sleep 2
    fi
    
    # Clean ports
    kill_port 7000
    kill_port 3000
    kill_port 3500
    
    # Create logs
    mkdir -p logs
    
    # Start Backend
    echo "Starting Backend..."
    cd mer-backend
    npm run start-dev > ../logs/backend.log 2>&1 &
    cd ..
    sleep 3
    
    # Start Admin
    echo "Starting Admin Panel..."
    cd mer-admin-panel-new
    npm run dev > ../logs/admin.log 2>&1 &
    cd ..
    sleep 5
    
    # Start Frontend
    if [ -d "mer-front-end" ]; then
        echo "Starting Frontend..."
        cd mer-front-end
        npm run dev > ../logs/frontend.log 2>&1 &
        cd ..
    fi
    
    echo -e "${GREEN}✓ All services started!${NC}"
    echo ""
    show_status
}

stop_all() {
    echo -e "${BLUE}🛑 Stopping all services...${NC}"
    kill_port 7000
    kill_port 3000
    kill_port 4000
    kill_port 3500
    pkill -f "nodemon" 2>/dev/null || true
    pkill -f "next dev" 2>/dev/null || true
    docker-compose down 2>/dev/null || true
    echo -e "${GREEN}✓ All services stopped${NC}"
}

view_logs() {
    local service=$1
    if [ "$service" == "all" ]; then
        tail -f logs/*.log 2>/dev/null || echo "No logs found"
    else
        tail -f logs/$service.log 2>/dev/null || echo "Log file not found"
    fi
}

health_check() {
    echo -e "${BLUE}🏥 Running health check...${NC}"
    echo ""
    
    if curl -s http://localhost:7000/health > /dev/null 2>&1; then
        echo -e "  Backend API:     ${GREEN}✓ Healthy${NC}"
    else
        echo -e "  Backend API:     ${RED}✗ Unhealthy${NC}"
    fi
    
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo -e "  Admin Panel:     ${GREEN}✓ Healthy${NC}"
    elif curl -s http://localhost:4000 > /dev/null 2>&1; then
        echo -e "  Admin Panel:     ${GREEN}✓ Healthy${NC}"
    else
        echo -e "  Admin Panel:     ${RED}✗ Unhealthy${NC}"
    fi
    
    if curl -s http://localhost:3500 > /dev/null 2>&1; then
        echo -e "  Frontend:        ${GREEN}✓ Healthy${NC}"
    else
        echo -e "  Frontend:        ${RED}✗ Unhealthy${NC}"
    fi
    
    echo ""
}

clean_install() {
    echo -e "${BLUE}🧹 Clean install all dependencies...${NC}"
    
    # Backend
    echo "  Cleaning backend..."
    cd mer-backend
    rm -rf node_modules package-lock.json
    npm install
    cd ..
    
    # Admin Panel
    echo "  Cleaning admin panel..."
    cd mer-admin-panel-new
    rm -rf node_modules package-lock.json .next
    npm install
    cd ..
    
    # Frontend
    if [ -d "mer-front-end" ]; then
        echo "  Cleaning frontend..."
        cd mer-front-end
        rm -rf node_modules package-lock.json .next
        npm install
        cd ..
    fi
    
    echo -e "${GREEN}✓ Clean install completed${NC}"
}

clean_docker() {
    echo -e "${BLUE}🧹 Cleaning Docker...${NC}"
    docker-compose down -v 2>/dev/null || true
    docker system prune -af --volumes
    echo -e "${GREEN}✓ Docker cleaned${NC}"
}

# Main loop
while true; do
    print_header
    show_status
    print_main_menu
    
    echo -n "Select option: "
    read choice
    
    case $choice in
        1)
            print_header
            echo -e "${GREEN}Starting Native Development...${NC}"
            echo ""
            bash "$SCRIPT_DIR/scripts/deployment/run-native.sh"
            ;;
        2)
            print_header
            echo -e "${GREEN}Starting Docker Local...${NC}"
            echo ""
            bash "$SCRIPT_DIR/scripts/deployment/run-docker-local.sh"
            ;;
        3)
            print_header
            echo -e "${GREEN}Starting Docker Production...${NC}"
            echo ""
            sudo bash "$SCRIPT_DIR/scripts/deployment/run-docker-production.sh"
            ;;
        4)
            print_header
            bash "$SCRIPT_DIR/scripts/dev.sh"
            ;;
        5)
            print_header
            start_all_native
            echo ""
            read -p "Press Enter to continue..."
            ;;
        6)
            print_header
            stop_all
            echo ""
            read -p "Press Enter to continue..."
            ;;
        7)
            print_header
            echo -e "${BLUE}📝 Viewing all logs (Ctrl+C to exit)...${NC}"
            echo ""
            view_logs "all"
            ;;
        8)
            print_header
            echo -e "${BLUE}📝 Viewing backend logs (Ctrl+C to exit)...${NC}"
            echo ""
            view_logs "backend"
            ;;
        9)
            print_header
            echo -e "${BLUE}📝 Viewing admin logs (Ctrl+C to exit)...${NC}"
            echo ""
            view_logs "admin"
            ;;
        10)
            print_header
            show_status
            read -p "Press Enter to continue..."
            ;;
        11)
            print_header
            health_check
            read -p "Press Enter to continue..."
            ;;
        12)
            print_header
            echo -e "${BLUE}🗄️  Starting MongoDB...${NC}"
            if ! pgrep -x "mongod" > /dev/null; then
                mkdir -p ~/data/db
                mongod --dbpath ~/data/db --fork --logpath ~/data/mongodb.log
                echo -e "${GREEN}✓ MongoDB started${NC}"
            else
                echo -e "${YELLOW}MongoDB already running${NC}"
            fi
            echo ""
            read -p "Press Enter to continue..."
            ;;
        13)
            print_header
            echo -e "${BLUE}🗄️  Stopping MongoDB...${NC}"
            pkill -f "mongod" 2>/dev/null || true
            echo -e "${GREEN}✓ MongoDB stopped${NC}"
            echo ""
            read -p "Press Enter to continue..."
            ;;
        14)
            print_header
            echo -e "${BLUE}🗄️  Opening MongoDB shell...${NC}"
            mongosh || mongo
            ;;
        15)
            print_header
            echo -e "${BLUE}💾 Backing up database...${NC}"
            BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
            mkdir -p $BACKUP_DIR
            mongodump --out $BACKUP_DIR
            echo -e "${GREEN}✓ Backup saved to: $BACKUP_DIR${NC}"
            echo ""
            read -p "Press Enter to continue..."
            ;;
        16)
            print_header
            echo -e "${BLUE}🧪 Testing all APIs...${NC}"
            if [ -f "scripts/test-api.sh" ]; then
                bash scripts/test-api.sh
            else
                echo -e "${YELLOW}Test script not found${NC}"
            fi
            echo ""
            read -p "Press Enter to continue..."
            ;;
        17)
            print_header
            echo -e "${BLUE}🧪 Test specific API${NC}"
            echo ""
            echo "Available tests:"
            echo "  1. Products API"
            echo "  2. Orders API"
            echo "  3. Users API"
            echo "  4. Admin API"
            echo ""
            read -p "Select test: " test_choice
            echo ""
            echo -e "${YELLOW}Feature coming soon${NC}"
            echo ""
            read -p "Press Enter to continue..."
            ;;
        18)
            print_header
            clean_install
            echo ""
            read -p "Press Enter to continue..."
            ;;
        19)
            print_header
            echo -e "${BLUE}🧹 Cleaning logs...${NC}"
            rm -rf logs/*.log
            echo -e "${GREEN}✓ Logs cleaned${NC}"
            echo ""
            read -p "Press Enter to continue..."
            ;;
        20)
            print_header
            clean_docker
            echo ""
            read -p "Press Enter to continue..."
            ;;
        21)
            print_header
            echo -e "${BLUE}📥 Updating project...${NC}"
            git pull
            echo -e "${GREEN}✓ Project updated${NC}"
            echo ""
            read -p "Press Enter to continue..."
            ;;
        0)
            print_header
            echo -e "${GREEN}👋 Goodbye!${NC}"
            echo ""
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option${NC}"
            sleep 1
            ;;
    esac
done
