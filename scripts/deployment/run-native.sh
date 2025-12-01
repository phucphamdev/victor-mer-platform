#!/bin/bash

# Victor Mer Platform - Native Development (No Docker)
# Fastest performance, runs directly on your laptop

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

print_header() {
    clear
    echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║   Victor Mer - Native Development     ║${NC}"
    echo -e "${CYAN}║   (No Docker - Fastest Performance)    ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
    echo ""
}

print_info() {
    echo -e "${BLUE}ℹ ${NC}$1"
}

print_success() {
    echo -e "${GREEN}✓ ${NC}$1"
}

print_warning() {
    echo -e "${YELLOW}⚠ ${NC}$1"
}

print_error() {
    echo -e "${RED}✗ ${NC}$1"
}

check_port() {
    lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1
}

kill_port() {
    local port=$1
    if check_port $port; then
        print_warning "Killing process on port $port..."
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
        sleep 1
    fi
}

wait_for_service() {
    local name=$1
    local url=$2
    local max_attempts=30
    local attempt=0
    
    print_info "Waiting for $name..."
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            print_success "$name is ready!"
            return 0
        fi
        attempt=$((attempt + 1))
        sleep 1
    done
    
    print_error "$name failed to start"
    return 1
}

# Trap to cleanup on exit
cleanup() {
    print_warning "\nShutting down services..."
    kill_port 7000
    kill_port 3000
    kill_port 3500
    kill_port 27017
    pkill -f "nodemon" 2>/dev/null || true
    pkill -f "next dev" 2>/dev/null || true
    pkill -f "mongod" 2>/dev/null || true
    print_success "All services stopped"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Main
print_header

# Check Node.js
print_info "Checking Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js not found. Please install Node.js 18+"
    exit 1
fi
NODE_VERSION=$(node -v)
print_success "Node.js $NODE_VERSION"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm not found"
    exit 1
fi
print_success "npm $(npm -v)"

# Check MongoDB
print_info "Checking MongoDB..."
if ! command -v mongod &> /dev/null; then
    print_error "MongoDB not found. Please install MongoDB"
    echo ""
    echo "Install MongoDB:"
    echo "  Ubuntu/Debian: sudo apt install mongodb"
    echo "  macOS: brew install mongodb-community"
    echo "  Or use Docker: docker run -d -p 27017:27017 mongo:latest"
    exit 1
fi
print_success "MongoDB installed"

# Start MongoDB if not running
if ! pgrep -x "mongod" > /dev/null; then
    print_info "Starting MongoDB..."
    mongod --dbpath ~/data/db --fork --logpath ~/data/mongodb.log 2>/dev/null || {
        mkdir -p ~/data/db
        mongod --dbpath ~/data/db --fork --logpath ~/data/mongodb.log
    }
    sleep 2
    print_success "MongoDB started"
else
    print_success "MongoDB already running"
fi

# Clean ports
kill_port 7000
kill_port 3000
kill_port 3500

# Create logs directory
mkdir -p logs

echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${GREEN}Installing Dependencies...${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""

# Install Backend dependencies
if [ ! -d "mer-backend/node_modules" ]; then
    print_info "Installing backend dependencies..."
    cd mer-backend
    npm install --silent
    cd ..
    print_success "Backend dependencies installed"
else
    print_success "Backend dependencies already installed"
fi

# Install Admin Panel dependencies
if [ ! -d "mer-admin-panel-new/node_modules" ]; then
    print_info "Installing admin panel dependencies..."
    cd mer-admin-panel-new
    npm install --silent
    cd ..
    print_success "Admin panel dependencies installed"
else
    print_success "Admin panel dependencies already installed"
fi

# Install Frontend dependencies (optional)
if [ -d "mer-front-end" ] && [ ! -d "mer-front-end/node_modules" ]; then
    print_info "Installing frontend dependencies..."
    cd mer-front-end
    npm install --silent
    cd ..
    print_success "Frontend dependencies installed"
fi

echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${GREEN}Starting Services...${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""

# Start Backend
print_info "Starting Backend API..."
cd mer-backend
npm run start-dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..
sleep 3

if wait_for_service "Backend API" "http://localhost:7000/health"; then
    print_success "Backend API: http://localhost:7000"
    print_success "API Docs: http://localhost:7000/api-docs"
else
    print_error "Backend failed to start. Check logs/backend.log"
    exit 1
fi

# Start Admin Panel
print_info "Starting Admin Panel (New)..."
cd mer-admin-panel-new
npm run dev > ../logs/admin.log 2>&1 &
ADMIN_PID=$!
cd ..
sleep 8

if wait_for_service "Admin Panel" "http://localhost:3000"; then
    print_success "Admin Panel: http://localhost:3000"
else
    print_error "Admin Panel failed to start. Check logs/admin.log"
fi

# Start Frontend (optional)
if [ -d "mer-front-end" ]; then
    print_info "Starting Frontend..."
    cd mer-front-end
    npm run dev > ../logs/frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
    sleep 8
    
    if wait_for_service "Frontend" "http://localhost:3500"; then
        print_success "Frontend: http://localhost:3500"
    fi
fi

echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${GREEN}🚀 All Services Running!${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}Services:${NC}"
echo "  • Backend API:    http://localhost:7000"
echo "  • API Docs:       http://localhost:7000/api-docs"
echo "  • Admin Panel:    http://localhost:3000"
if [ -d "mer-front-end" ]; then
    echo "  • Frontend:       http://localhost:3500"
fi
echo ""
echo -e "${GREEN}Database:${NC}"
echo "  • MongoDB:        mongodb://localhost:27017"
echo ""
echo -e "${GREEN}Logs:${NC}"
echo "  • Backend:        tail -f logs/backend.log"
echo "  • Admin Panel:    tail -f logs/admin.log"
if [ -d "mer-front-end" ]; then
    echo "  • Frontend:       tail -f logs/frontend.log"
fi
echo ""
echo -e "${YELLOW}Features:${NC}"
echo "  • Auto-reload:    ✓ (nodemon + Next.js Fast Refresh)"
echo "  • Hot Module:     ✓ (instant updates)"
echo "  • Performance:    ⚡ Fastest (no Docker overhead)"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""

# Show live logs
print_info "Showing live logs (Ctrl+C to stop)..."
echo ""
tail -f logs/*.log 2>/dev/null || wait
