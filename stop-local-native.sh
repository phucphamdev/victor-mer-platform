#!/bin/bash

################################################################################
# SCRIPT DỪNG TẤT CẢ SERVICES CHẠY NATIVE
################################################################################

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${YELLOW}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }

log_info "Stopping all services..."

# Stop Backend
if [ -f "logs/backend.pid" ]; then
    PID=$(cat logs/backend.pid)
    if kill -0 $PID 2>/dev/null; then
        kill $PID
        log_success "Backend stopped (PID: $PID)"
    fi
    rm logs/backend.pid
fi

# Stop Frontend
if [ -f "logs/frontend.pid" ]; then
    PID=$(cat logs/frontend.pid)
    if kill -0 $PID 2>/dev/null; then
        kill $PID
        log_success "Frontend stopped (PID: $PID)"
    fi
    rm logs/frontend.pid
fi

# Stop Admin
if [ -f "logs/admin.pid" ]; then
    PID=$(cat logs/admin.pid)
    if kill -0 $PID 2>/dev/null; then
        kill $PID
        log_success "Admin Panel stopped (PID: $PID)"
    fi
    rm logs/admin.pid
fi

# Stop MongoDB (optional - comment out if you want to keep it running)
# pkill -f "mongod --dbpath"
# log_success "MongoDB stopped"

log_success "All services stopped successfully!"
