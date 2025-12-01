#!/bin/bash

# Victor Mer Platform - Docker Compose Local
# Lightweight testing with Docker, easy cleanup

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
    echo -e "${CYAN}║   Victor Mer - Docker Local Testing   ║${NC}"
    echo -e "${CYAN}║   (Lightweight & Easy Cleanup)         ║${NC}"
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

wait_for_service() {
    local name=$1
    local url=$2
    local max_attempts=60
    local attempt=0
    
    print_info "Waiting for $name..."
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            print_success "$name is ready!"
            return 0
        fi
        attempt=$((attempt + 1))
        sleep 2
    done
    
    print_error "$name failed to start"
    return 1
}

# Trap to cleanup on exit
cleanup() {
    echo ""
    print_warning "Stopping services..."
    docker-compose -f docker-compose.yml --env-file .env.local down
    print_success "All services stopped"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Main
print_header

# Check Docker
print_info "Checking Docker..."
if ! command -v docker &> /dev/null; then
    print_error "Docker not found"
    echo ""
    echo "Install Docker:"
    echo "  Ubuntu: curl -fsSL https://get.docker.com | sh"
    echo "  macOS: brew install --cask docker"
    echo "  Or visit: https://docs.docker.com/get-docker/"
    exit 1
fi
print_success "Docker $(docker --version | cut -d' ' -f3 | tr -d ',')"

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose not found"
    exit 1
fi
print_success "Docker Compose $(docker-compose --version | cut -d' ' -f4 | tr -d ',')"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker daemon is not running"
    echo ""
    echo "Start Docker:"
    echo "  Ubuntu: sudo systemctl start docker"
    echo "  macOS: Open Docker Desktop"
    exit 1
fi
print_success "Docker daemon is running"

# Check .env.local
if [ ! -f ".env.local" ]; then
    print_warning ".env.local not found, copying from .env.example"
    cp .env.example .env.local
    print_success ".env.local created"
fi

echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${GREEN}Starting Docker Services...${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""

# Stop any existing containers
print_info "Cleaning up old containers..."
docker-compose -f docker-compose.yml --env-file .env.local down 2>/dev/null || true

# Build and start services
print_info "Building and starting services..."
docker-compose -f docker-compose.yml --env-file .env.local up -d --build

echo ""
print_info "Waiting for services to be ready..."
sleep 10

# Wait for MongoDB
if wait_for_service "MongoDB" "http://localhost:27017"; then
    print_success "MongoDB: mongodb://localhost:27017"
fi

# Wait for Backend
if wait_for_service "Backend API" "http://localhost:7000/health"; then
    print_success "Backend API: http://localhost:7000"
    print_success "API Docs: http://localhost:7000/api-docs"
fi

# Wait for Admin Panel
if wait_for_service "Admin Panel" "http://localhost:4000"; then
    print_success "Admin Panel: http://localhost:4000"
fi

# Wait for Frontend
if wait_for_service "Frontend" "http://localhost:3500"; then
    print_success "Frontend: http://localhost:3500"
fi

echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${GREEN}🚀 All Services Running!${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}Services:${NC}"
echo "  • Backend API:    http://localhost:7000"
echo "  • API Docs:       http://localhost:7000/api-docs"
echo "  • Admin Panel:    http://localhost:4000"
echo "  • Frontend:       http://localhost:3500"
echo ""
echo -e "${GREEN}Database:${NC}"
echo "  • MongoDB:        mongodb://localhost:27017"
echo ""
echo -e "${GREEN}Docker Commands:${NC}"
echo "  • View logs:      docker-compose -f docker-compose.yml logs -f"
echo "  • Stop:           docker-compose -f docker-compose.yml down"
echo "  • Restart:        docker-compose -f docker-compose.yml restart"
echo "  • Clean all:      docker-compose -f docker-compose.yml down -v"
echo ""
echo -e "${YELLOW}Features:${NC}"
echo "  • Isolated:       ✓ (runs in containers)"
echo "  • Easy cleanup:   ✓ (docker-compose down)"
echo "  • Lightweight:    ✓ (optimized for local testing)"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""

# Show live logs
print_info "Showing live logs (Ctrl+C to stop)..."
echo ""
docker-compose -f docker-compose.yml --env-file .env.local logs -f
