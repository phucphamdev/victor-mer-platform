#!/bin/bash

# Helper script to restart backend and test the API fix

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "========================================="
echo "  Backend Restart & Test Helper"
echo "========================================="
echo ""

echo -e "${YELLOW}This script will help you restart the backend and test the fix.${NC}"
echo ""
echo "Please choose an option:"
echo "1. Restart backend with Docker Compose"
echo "2. Restart backend with npm (if running locally)"
echo "3. Just run the API test (backend already restarted)"
echo "4. Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
  1)
    echo -e "${YELLOW}Restarting backend with Docker Compose...${NC}"
    docker-compose restart mer-backend
    echo -e "${GREEN}✓ Backend restarted!${NC}"
    echo ""
    echo "Waiting 5 seconds for backend to be ready..."
    sleep 5
    echo ""
    echo -e "${YELLOW}Running API tests...${NC}"
    ./test-shipment-api.sh
    ;;
  2)
    echo -e "${YELLOW}Please restart your backend manually with:${NC}"
    echo "  cd mer-backend && npm restart"
    echo ""
    read -p "Press Enter after you've restarted the backend..."
    echo ""
    echo -e "${YELLOW}Running API tests...${NC}"
    ./test-shipment-api.sh
    ;;
  3)
    echo -e "${YELLOW}Running API tests...${NC}"
    ./test-shipment-api.sh
    ;;
  4)
    echo "Exiting..."
    exit 0
    ;;
  *)
    echo "Invalid choice. Exiting..."
    exit 1
    ;;
esac
