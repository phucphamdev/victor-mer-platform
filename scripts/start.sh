#!/bin/bash

# ============================================
# Default Environment Startup Script
# Khởi động môi trường mặc định (balanced)
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}Default Environment Startup${NC}"
echo -e "${BLUE}============================================${NC}"
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

# Check if .env files exist
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ File .env không tồn tại!${NC}"
    echo -e "${YELLOW}Chạy: bash scripts/generate-config.sh${NC}"
    exit 1
fi

# Start services
echo -e "${BLUE}🚀 Starting default services...${NC}"
echo ""

docker-compose up -d --build

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}✅ Default environment started!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""

# Wait for services to be ready
echo -e "${YELLOW}⏳ Đợi services khởi động...${NC}"
sleep 15

# Show status
echo -e "${BLUE}📦 Container status:${NC}"
docker-compose ps
echo ""

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Show access URLs
echo -e "${BLUE}🌐 Access URLs:${NC}"
echo -e "   Landing Page:  ${GREEN}http://localhost:${LANDING_PORT:-3000}${NC}"
echo -e "   Storefront:    ${GREEN}http://localhost:${STOREFRONT_PORT:-3001}${NC}"
echo -e "   Backend API:   ${GREEN}http://localhost:${BACKEND_PORT:-8000}${NC}"
echo -e "   Backend Admin: ${GREEN}http://localhost:${BACKEND_PORT:-8000}/admin${NC}"
echo -e "   Kibana:        ${GREEN}http://localhost:${KIBANA_PORT:-5601}${NC}"
echo -e "   MailHog:       ${GREEN}http://localhost:${MAILHOG_WEB_PORT:-8025}${NC}"
echo ""

# Show useful commands
echo -e "${BLUE}💡 Useful commands:${NC}"
echo -e "   View logs:     ${YELLOW}docker-compose logs -f${NC}"
echo -e "   Stop:          ${YELLOW}docker-compose down${NC}"
echo -e "   Restart:       ${YELLOW}docker-compose restart${NC}"
echo -e "   Cleanup:       ${YELLOW}bash scripts/docker-cleanup.sh${NC}"
echo -e "   Reset & Rebuild: ${YELLOW}bash scripts/docker-reset.sh default${NC}"
echo ""

# Ask to view logs
read -p "Bạn có muốn xem logs? (yes/no): " view_logs
if [ "$view_logs" = "yes" ]; then
    docker-compose logs -f
fi
