#!/bin/bash

# Quick Start Script for Development
# Khởi động nhanh tất cả services cho development

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Victor Mer - Quick Start Dev        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null && ! docker ps | grep -q mongodb; then
    echo -e "${YELLOW}⚠ MongoDB not running. Starting MongoDB...${NC}"
    if command -v mongod &> /dev/null; then
        mkdir -p ~/data/db
        mongod --dbpath ~/data/db --fork --logpath ~/data/mongodb.log
        echo -e "${GREEN}✓ MongoDB started${NC}"
    else
        echo -e "${RED}✗ MongoDB not installed. Please install MongoDB first.${NC}"
        exit 1
    fi
fi

# Kill existing processes on ports
echo -e "${BLUE}🧹 Cleaning up existing processes...${NC}"
lsof -ti:7000 | xargs kill -9 2>/dev/null || true
lsof -ti:4000 | xargs kill -9 2>/dev/null || true
lsof -ti:4100 | xargs kill -9 2>/dev/null || true
lsof -ti:3500 | xargs kill -9 2>/dev/null || true

# Create logs directory
mkdir -p logs

# Start Backend
echo -e "${BLUE}🚀 Starting Backend API (Port 7000)...${NC}"
cd mer-backend
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    npm install
fi
npm run start-dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..
sleep 3

# Check if backend started
if curl -s http://localhost:7000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend API running${NC}"
else
    echo -e "${YELLOW}⚠ Backend starting... (may take a moment)${NC}"
fi

# Start Admin Panel V1
echo -e "${BLUE}🚀 Starting Admin Panel V1 (Port 4000)...${NC}"
cd mer-admin-panel-v1
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing admin v1 dependencies...${NC}"
    npm install
fi
PORT=4000 npm run dev > ../logs/admin-v1.log 2>&1 &
ADMIN_V1_PID=$!
cd ..
sleep 3

# Start Admin Panel V2
echo -e "${BLUE}🚀 Starting Admin Panel V2 (Port 4100)...${NC}"
cd mer-admin-panel-v2
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing admin v2 dependencies...${NC}"
    npm install
fi
PORT=4100 npm run dev > ../logs/admin-v2.log 2>&1 &
ADMIN_V2_PID=$!
cd ..
sleep 5

# Start Frontend (if exists)
if [ -d "mer-front-end" ]; then
    echo -e "${BLUE}🚀 Starting Frontend Store (Port 3500)...${NC}"
    cd mer-front-end
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}Installing frontend dependencies...${NC}"
        npm install
    fi
    npm run dev > ../logs/frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
    sleep 3
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     All Services Started! 🎉           ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📋 Service URLs:${NC}"
echo -e "  Backend API:      ${GREEN}http://localhost:7000${NC}"
echo -e "  Admin Panel V1:   ${GREEN}http://localhost:4000${NC}"
echo -e "  Admin Panel V2:   ${GREEN}http://localhost:4100${NC}"
if [ -d "mer-front-end" ]; then
    echo -e "  Frontend Store:   ${GREEN}http://localhost:3500${NC}"
fi
echo ""
echo -e "${BLUE}📝 View Logs:${NC}"
echo -e "  All logs:         ${YELLOW}tail -f logs/*.log${NC}"
echo -e "  Backend:          ${YELLOW}tail -f logs/backend.log${NC}"
echo -e "  Admin V1:         ${YELLOW}tail -f logs/admin-v1.log${NC}"
echo -e "  Admin V2:         ${YELLOW}tail -f logs/admin-v2.log${NC}"
echo ""
echo -e "${BLUE}🛑 Stop All Services:${NC}"
echo -e "  ${YELLOW}./stop-dev.sh${NC}"
echo ""
echo -e "${GREEN}Happy coding! 💻${NC}"
