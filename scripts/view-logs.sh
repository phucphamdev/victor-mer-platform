#!/bin/bash

# Victor Mer Platform - View Logs

# Colors
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m'

clear
echo "=========================================="
echo "  Victor Mer Platform - Live Logs"
echo "=========================================="
echo ""
echo -e "${GREEN}Available logs:${NC}"
echo "  1. Backend API"
echo "  2. Admin Panel"
echo "  3. Frontend"
echo "  4. All logs"
echo ""
echo -n "Select log to view (1-4): "
read choice

case $choice in
    1)
        echo -e "\n${BLUE}Showing Backend logs...${NC}\n"
        tail -f logs/backend.log
        ;;
    2)
        echo -e "\n${BLUE}Showing Admin Panel logs...${NC}\n"
        tail -f logs/admin.log
        ;;
    3)
        echo -e "\n${BLUE}Showing Frontend logs...${NC}\n"
        tail -f logs/frontend.log
        ;;
    4)
        echo -e "\n${BLUE}Showing all logs...${NC}\n"
        tail -f logs/*.log
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac
