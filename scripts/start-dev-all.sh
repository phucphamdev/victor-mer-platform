#!/bin/bash

# Victor Mer Platform - Development Startup Script
# Khởi động tất cả services với watch mode (auto-reload)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0
    else
        return 1
    fi
}

# Function to kill process on port
kill_port() {
    local port=$1
    print_warning "Killing process on port $port..."
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
    sleep 1
}

# Function to wait for service
wait_for_service() {
    local name=$1
    local url=$2
    local max_attempts=30
    local attempt=0
    
    print_info "Waiting for $name to be ready..."
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            print_success "$name is ready!"
            return 0
        fi
        attempt=$((attempt + 1))
        sleep 1
    done
    
    print_error "$name failed to start after $max_attempts seconds"
    return 1
}

# Trap to cleanup on exit
cleanup() {
    print_warning "\nShutting down services..."
    jobs -p | xargs -r kill 2>/dev/null || true
    print_success "All services stopped"
    exit 0
}

trap cleanup SIGINT SIGTERM EXIT

# Main script
clear
echo "=========================================="
echo "  Victor Mer Platform - Dev Startup"
echo "=========================================="
echo ""

# Check if MongoDB is running
print_info "Checking MongoDB..."
if ! pgrep -x "mongod" > /dev/null; then
    print_warning "MongoDB is not running. Starting with Docker..."
    docker-compose -f docker-compose.yml --env-file .env.local up -d mongodb
    sleep 3
fi
print_success "MongoDB is running"

# Check and kill ports if needed
BACKEND_PORT=7000
ADMIN_PORT=3000
FRONTEND_PORT=3500

if check_port $BACKEND_PORT; then
    print_warning "Port $BACKEND_PORT is in use"
    kill_port $BACKEND_PORT
fi

if check_port $ADMIN_PORT; then
    print_warning "Port $ADMIN_PORT is in use"
    kill_port $ADMIN_PORT
fi

if check_port $FRONTEND_PORT; then
    print_warning "Port $FRONTEND_PORT is in use"
    kill_port $FRONTEND_PORT
fi

# Create logs directory
mkdir -p logs

# Start Backend (with nodemon for auto-reload)
print_info "Starting Backend API (Port $BACKEND_PORT)..."
cd mer-backend
npm run start-dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..
print_success "Backend started (PID: $BACKEND_PID)"

# Wait for backend to be ready
sleep 5
if wait_for_service "Backend API" "http://localhost:$BACKEND_PORT/health"; then
    print_success "Backend API: http://localhost:$BACKEND_PORT"
    print_success "API Docs: http://localhost:$BACKEND_PORT/api-docs"
fi

# Start Admin Panel (with Next.js fast refresh)
print_info "Starting Admin Panel (Port $ADMIN_PORT)..."
cd mer-admin-panel-new
npm run dev > ../logs/admin.log 2>&1 &
ADMIN_PID=$!
cd ..
print_success "Admin Panel started (PID: $ADMIN_PID)"

# Wait for admin panel
sleep 8
if wait_for_service "Admin Panel" "http://localhost:$ADMIN_PORT"; then
    print_success "Admin Panel: http://localhost:$ADMIN_PORT"
fi

# Start Frontend (optional)
if [ -d "mer-front-end" ]; then
    print_info "Starting Frontend (Port $FRONTEND_PORT)..."
    cd mer-front-end
    npm run dev > ../logs/frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
    print_success "Frontend started (PID: $FRONTEND_PID)"
    
    sleep 8
    if wait_for_service "Frontend" "http://localhost:$FRONTEND_PORT"; then
        print_success "Frontend: http://localhost:$FRONTEND_PORT"
    fi
fi

# Display summary
echo ""
echo "=========================================="
echo "  🚀 All Services Running!"
echo "=========================================="
echo ""
echo "📊 Services:"
echo "  • Backend API:    http://localhost:$BACKEND_PORT"
echo "  • API Docs:       http://localhost:$BACKEND_PORT/api-docs"
echo "  • Admin Panel:    http://localhost:$ADMIN_PORT"
if [ -d "mer-front-end" ]; then
    echo "  • Frontend:       http://localhost:$FRONTEND_PORT"
fi
echo ""
echo "📝 Logs:"
echo "  • Backend:        tail -f logs/backend.log"
echo "  • Admin Panel:    tail -f logs/admin.log"
if [ -d "mer-front-end" ]; then
    echo "  • Frontend:       tail -f logs/frontend.log"
fi
echo ""
echo "🔄 Watch Mode:"
echo "  • Backend:        nodemon (auto-reload on file changes)"
echo "  • Admin Panel:    Next.js Fast Refresh (instant updates)"
if [ -d "mer-front-end" ]; then
    echo "  • Frontend:       Next.js Fast Refresh (instant updates)"
fi
echo ""
echo "⚠️  Press Ctrl+C to stop all services"
echo "=========================================="
echo ""

# Keep script running and show live logs
print_info "Showing live logs (Ctrl+C to stop)..."
echo ""

# Tail all logs
tail -f logs/*.log 2>/dev/null || wait
