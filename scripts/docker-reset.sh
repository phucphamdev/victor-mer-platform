#!/bin/bash

# ============================================
# Docker Reset & Rebuild Script
# Cleanup + Rebuild từ đầu
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}Docker Reset & Rebuild Script${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# Get environment type
ENV_TYPE=${1:-dev}

if [ "$ENV_TYPE" != "dev" ] && [ "$ENV_TYPE" != "prod" ] && [ "$ENV_TYPE" != "default" ]; then
    echo -e "${RED}❌ Environment không hợp lệ!${NC}"
    echo -e "${YELLOW}Usage: bash scripts/docker-reset.sh [dev|prod|default]${NC}"
    exit 1
fi

echo -e "${BLUE}🔄 Environment: ${ENV_TYPE}${NC}"
echo ""

# Step 1: Cleanup
echo -e "${YELLOW}📋 Bước 1: Cleanup Docker...${NC}"
bash scripts/docker-cleanup.sh

# Step 2: Generate config
echo -e "${YELLOW}📋 Bước 2: Generate config...${NC}"
bash scripts/generate-config.sh
echo ""

# Step 3: Build and start
echo -e "${YELLOW}📋 Bước 3: Build và start services...${NC}"
echo ""

case $ENV_TYPE in
    dev)
        echo -e "${BLUE}🚀 Starting Development environment...${NC}"
        docker-compose -f docker-compose.dev.yml up -d --build
        ;;
    prod)
        echo -e "${BLUE}🚀 Starting Production environment...${NC}"
        docker-compose -f docker-compose.prod.yml up -d --build
        ;;
    default)
        echo -e "${BLUE}🚀 Starting Default environment...${NC}"
        docker-compose up -d --build
        ;;
esac

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}✅ Reset & Rebuild hoàn tất!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""

# Show running containers
echo -e "${BLUE}📦 Containers đang chạy:${NC}"
docker-compose ps
echo ""

# Show logs command
echo -e "${BLUE}💡 Xem logs:${NC}"
case $ENV_TYPE in
    dev)
        echo -e "   ${YELLOW}docker-compose -f docker-compose.dev.yml logs -f${NC}"
        ;;
    prod)
        echo -e "   ${YELLOW}docker-compose -f docker-compose.prod.yml logs -f${NC}"
        ;;
    default)
        echo -e "   ${YELLOW}docker-compose logs -f${NC}"
        ;;
esac
echo ""
