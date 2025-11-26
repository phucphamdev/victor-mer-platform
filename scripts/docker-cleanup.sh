#!/bin/bash

# ============================================
# Docker Cleanup Script
# Xóa sạch tất cả Docker resources
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}Docker Cleanup Script${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# Warning
echo -e "${YELLOW}⚠️  CẢNH BÁO: Script này sẽ xóa TẤT CẢ:${NC}"
echo -e "${YELLOW}   - Containers (đang chạy và đã dừng)${NC}"
echo -e "${YELLOW}   - Images${NC}"
echo -e "${YELLOW}   - Volumes${NC}"
echo -e "${YELLOW}   - Networks${NC}"
echo -e "${YELLOW}   - Build cache${NC}"
echo ""

# Confirm
read -p "Bạn có chắc chắn muốn tiếp tục? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo -e "${RED}❌ Đã hủy cleanup${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}🧹 Bắt đầu cleanup...${NC}"
echo ""

# Stop all running containers
echo -e "${YELLOW}1. Dừng tất cả containers...${NC}"
if [ "$(docker ps -q)" ]; then
    docker stop $(docker ps -q)
    echo -e "${GREEN}✓ Đã dừng containers${NC}"
else
    echo -e "${GREEN}✓ Không có container nào đang chạy${NC}"
fi
echo ""

# Remove all containers
echo -e "${YELLOW}2. Xóa tất cả containers...${NC}"
if [ "$(docker ps -aq)" ]; then
    docker rm -f $(docker ps -aq)
    echo -e "${GREEN}✓ Đã xóa containers${NC}"
else
    echo -e "${GREEN}✓ Không có container nào${NC}"
fi
echo ""

# Remove all images
echo -e "${YELLOW}3. Xóa tất cả images...${NC}"
if [ "$(docker images -q)" ]; then
    docker rmi -f $(docker images -q)
    echo -e "${GREEN}✓ Đã xóa images${NC}"
else
    echo -e "${GREEN}✓ Không có image nào${NC}"
fi
echo ""

# Remove all volumes
echo -e "${YELLOW}4. Xóa tất cả volumes...${NC}"
if [ "$(docker volume ls -q)" ]; then
    docker volume rm -f $(docker volume ls -q) 2>/dev/null || true
    echo -e "${GREEN}✓ Đã xóa volumes${NC}"
else
    echo -e "${GREEN}✓ Không có volume nào${NC}"
fi
echo ""

# Remove all networks (except default ones)
echo -e "${YELLOW}5. Xóa tất cả networks...${NC}"
if [ "$(docker network ls -q -f type=custom)" ]; then
    docker network rm $(docker network ls -q -f type=custom) 2>/dev/null || true
    echo -e "${GREEN}✓ Đã xóa networks${NC}"
else
    echo -e "${GREEN}✓ Không có network nào${NC}"
fi
echo ""

# Prune system
echo -e "${YELLOW}6. Dọn dẹp system (build cache, dangling resources)...${NC}"
docker system prune -af --volumes
echo -e "${GREEN}✓ Đã dọn dẹp system${NC}"
echo ""

# Show disk usage
echo -e "${BLUE}📊 Disk usage sau khi cleanup:${NC}"
docker system df
echo ""

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}✅ Cleanup hoàn tất!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "${BLUE}💡 Bạn có thể chạy lại dự án với:${NC}"
echo -e "   ${YELLOW}bash scripts/dev.sh${NC}        # Development"
echo -e "   ${YELLOW}bash scripts/start.sh${NC}      # Default"
echo -e "   ${YELLOW}bash scripts/prod-start.sh${NC} # Production"
echo ""
