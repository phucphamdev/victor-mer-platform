#!/bin/bash

# Victor Mer Platform - Unified Development Manager
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

# Functions
print_header() {
    clear
    echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║   Victor Mer Platform - Dev Manager   ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
    echo ""
}

print_menu() {
    echo -e "${GREEN}📋 Main Menu:${NC}"
    echo ""
    echo "  ${YELLOW}Development:${NC}"
    echo "    1. Start All Services (Backend + Admin + Frontend)"
    echo "    2. Start Backend Only"
    echo "    3. Start Admin Panel Only"
    echo "    4. Start Frontend Only"
    echo "    5. Stop All Services"
    echo ""
    echo "  ${YELLOW}Monitoring:${NC}"
    echo "    6. View Live Logs (All)"
    echo "    7. View Backend Logs"
    echo "    8. View Admin Panel Logs"
    echo "    9. View Frontend Logs"
    echo ""
    echo "  ${YELLOW}Database:${NC}"
    echo "    10. Start MongoDB"
    echo "    11. Stop MongoDB"
    echo "    12. MongoDB Shell"
    echo "    13. Backup Database"
    echo "    14. Restore Database"
    echo ""
    echo "  ${YELLOW}Testing:${NC}"
    echo "    15. Test All APIs"
    echo "    16. Health Check"
    echo ""
    echo "  ${YELLOW}Utilities:${NC}"
    echo "    17. Clean Install (All)"
    echo "    18. Clean Logs"
    echo "    19. Show Service Status"
    echo ""
    echo "    0. Exit"
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

start_mongodb() {
    echo -e "${BLUE}🗄️  Starting MongoDB...${NC}"
    if docker ps | grep -q mongodb; then
        echo -e "${GREEN}✓ MongoDB already running${NC}"
    else
        docker-compose -f docker-compose.yml --env-file .env.local up -d mongodb
        sleep 3
        echo -e "${GREEN}✓ MongoDB started${NC}"
    fi
}

stop_mongodb() {
    echo -e "${BLUE}🗄️  Stopping MongoDB...${NC}"
    docker-compose -f docker-compose.yml --env-file .env.local stop mongodb
    echo -e "${GREEN}✓ MongoDB stopped${NC}"
}

start_backend() {
    echo -e "${BLUE}🚀 Starting Backend API...${NC}"
    kill_port 7000
    mkdir -p logs
    cd mer-backend
    npm run start-dev > ../logs/backend.log 2>&1 &
    cd ..
    sleep 3
    echo -e "${GREEN}✓ Backend started on http://localhost:7000${NC}"
    echo -e "${GREEN}  API Docs: http://localhost:7000/api-docs${NC}"
}

start_admin() {
    echo -e "${BLUE}🎨 Starting Admin Panel...${NC}"
    kill_port 3000
    mkdir -p logs
    cd mer-admin-panel-new
    npm run dev > ../logs/admin.log 2>&1 &
    cd ..
    sleep 5
    echo -e "${GREEN}✓ Admin Panel started on http://localhost:3000${NC}"
}

start_frontend() {
    echo -e "${BLUE}🌐 Starting Frontend...${NC}"
    kill_port 3500
    mkdir -p logs
    if [ -d "mer-front-end" ]; then
        cd mer-front-end
        npm run dev > ../logs/frontend.log 2>&1 &
        cd ..
        sleep 5
        echo -e "${GREEN}✓ Frontend started on http://localhost:3500${NC}"
    else
        echo -e "${YELLOW}⚠ Frontend directory not found${NC}"
    fi
}

stop_all() {
    echo -e "${BLUE}🛑 Stopping all services...${NC}"
    kill_port 7000
    kill_port 3000
    kill_port 3500
    pkill -f "nodemon" 2>/dev/null || true
    pkill -f "next dev" 2>/dev/null || true
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
    if docker ps | grep -q mongodb; then
        echo -e "  MongoDB:         ${GREEN}● Running${NC}"
    else
        echo -e "  MongoDB:         ${RED}○ Stopped${NC}"
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

health_check() {
    echo -e "${BLUE}🏥 Running health check...${NC}"
    echo ""
    
    # Backend
    if curl -s http://localhost:7000/health > /dev/null 2>&1; then
        echo -e "  Backend API:     ${GREEN}✓ Healthy${NC}"
    else
        echo -e "  Backend API:     ${RED}✗ Unhealthy${NC}"
    fi
    
    # Admin Panel
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo -e "  Admin Panel:     ${GREEN}✓ Healthy${NC}"
    else
        echo -e "  Admin Panel:     ${RED}✗ Unhealthy${NC}"
    fi
    
    # Frontend
    if curl -s http://localhost:3500 > /dev/null 2>&1; then
        echo -e "  Frontend:        ${GREEN}✓ Healthy${NC}"
    else
        echo -e "  Frontend:        ${RED}✗ Unhealthy${NC}"
    fi
    
    echo ""
}

backup_database() {
    echo -e "${BLUE}💾 Backing up database...${NC}"
    BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p $BACKUP_DIR
    docker exec mongodb mongodump --out /tmp/backup
    docker cp mongodb:/tmp/backup $BACKUP_DIR/
    echo -e "${GREEN}✓ Backup saved to: $BACKUP_DIR${NC}"
}

# Main loop
while true; do
    print_header
    show_status
    print_menu
    
    echo -n "Select option: "
    read choice
    
    case $choice in
        1)
            print_header
            start_mongodb
            start_backend
            start_admin
            start_frontend
            echo ""
            echo -e "${GREEN}✓ All services started!${NC}"
            echo ""
            read -p "Press Enter to continue..."
            ;;
        2)
            print_header
            start_mongodb
            start_backend
            echo ""
            read -p "Press Enter to continue..."
            ;;
        3)
            print_header
            start_admin
            echo ""
            read -p "Press Enter to continue..."
            ;;
        4)
            print_header
            start_frontend
            echo ""
            read -p "Press Enter to continue..."
            ;;
        5)
            print_header
            stop_all
            echo ""
            read -p "Press Enter to continue..."
            ;;
        6)
            print_header
            echo -e "${BLUE}📝 Viewing all logs (Ctrl+C to exit)...${NC}"
            echo ""
            view_logs "all"
            ;;
        7)
            print_header
            echo -e "${BLUE}📝 Viewing backend logs (Ctrl+C to exit)...${NC}"
            echo ""
            view_logs "backend"
            ;;
        8)
            print_header
            echo -e "${BLUE}📝 Viewing admin logs (Ctrl+C to exit)...${NC}"
            echo ""
            view_logs "admin"
            ;;
        9)
            print_header
            echo -e "${BLUE}📝 Viewing frontend logs (Ctrl+C to exit)...${NC}"
            echo ""
            view_logs "frontend"
            ;;
        10)
            print_header
            start_mongodb
            echo ""
            read -p "Press Enter to continue..."
            ;;
        11)
            print_header
            stop_mongodb
            echo ""
            read -p "Press Enter to continue..."
            ;;
        12)
            print_header
            echo -e "${BLUE}🗄️  Opening MongoDB shell...${NC}"
            docker exec -it mongodb mongosh
            ;;
        13)
            print_header
            backup_database
            echo ""
            read -p "Press Enter to continue..."
            ;;
        14)
            print_header
            echo -e "${YELLOW}⚠ Restore feature coming soon${NC}"
            echo ""
            read -p "Press Enter to continue..."
            ;;
        15)
            print_header
            echo -e "${BLUE}🧪 Testing APIs...${NC}"
            if [ -f "scripts/test-api.sh" ]; then
                bash scripts/test-api.sh
            else
                echo -e "${YELLOW}⚠ Test script not found${NC}"
            fi
            echo ""
            read -p "Press Enter to continue..."
            ;;
        16)
            print_header
            health_check
            read -p "Press Enter to continue..."
            ;;
        17)
            print_header
            clean_install
            echo ""
            read -p "Press Enter to continue..."
            ;;
        18)
            print_header
            echo -e "${BLUE}🧹 Cleaning logs...${NC}"
            rm -rf logs/*.log
            echo -e "${GREEN}✓ Logs cleaned${NC}"
            echo ""
            read -p "Press Enter to continue..."
            ;;
        19)
            # Status already shown at top
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
