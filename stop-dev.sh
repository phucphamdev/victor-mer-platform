#!/bin/bash

# Quick Stop Script for Development
# Dừng tất cả services

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Stopping All Services...             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Kill processes on ports
echo -e "${YELLOW}Stopping Backend (Port 7000)...${NC}"
lsof -ti:7000 | xargs kill -9 2>/dev/null || true

echo -e "${YELLOW}Stopping Admin V1 (Port 4000)...${NC}"
lsof -ti:4000 | xargs kill -9 2>/dev/null || true

echo -e "${YELLOW}Stopping Admin V2 (Port 4100)...${NC}"
lsof -ti:4100 | xargs kill -9 2>/dev/null || true

echo -e "${YELLOW}Stopping Frontend (Port 3500)...${NC}"
lsof -ti:3500 | xargs kill -9 2>/dev/null || true

# Kill any remaining node processes
pkill -f "nodemon" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true

# Stop Docker containers if running
docker-compose down 2>/dev/null || true

echo ""
echo -e "${GREEN}✓ All services stopped${NC}"
echo ""
