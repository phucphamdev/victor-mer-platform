#!/bin/bash

# Victor Mer Platform - Stop All Development Services

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_info() {
    echo -e "${YELLOW}ℹ ${NC}$1"
}

print_success() {
    echo -e "${GREEN}✓ ${NC}$1"
}

echo "=========================================="
echo "  Stopping Victor Mer Platform"
echo "=========================================="
echo ""

# Kill processes on specific ports
PORTS=(7000 3000 3500)

for port in "${PORTS[@]}"; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        print_info "Stopping service on port $port..."
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
        print_success "Port $port freed"
    fi
done

# Kill any remaining node processes from this project
print_info "Cleaning up remaining processes..."
pkill -f "mer-backend" 2>/dev/null || true
pkill -f "mer-admin-panel" 2>/dev/null || true
pkill -f "mer-front-end" 2>/dev/null || true

echo ""
print_success "All services stopped!"
echo ""
