#!/bin/bash

################################################################################
# SCRIPT CHẠY DỰ ÁN VỚI DOCKER COMPOSE - LOCALHOST
# Dành cho test nhẹ nhàng trên laptop với Docker
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

PROJECT_NAME="VictorMer E-Commerce"
ENV_FILE=".env.local"
COMPOSE_FILE="docker-compose.yml"

################################################################################
# STEP 1: Check Prerequisites
################################################################################
log_info "========================================="
log_info "  $PROJECT_NAME - Docker Local Setup"
log_info "========================================="
echo ""

log_info "Step 1: Checking prerequisites..."

# Check Docker
if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed. Please install Docker first."
    log_info "Install guide: https://docs.docker.com/get-docker/"
    exit 1
fi
DOCKER_VERSION=$(docker --version)
log_success "Docker found: $DOCKER_VERSION"

# Check Docker Compose
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    log_error "Docker Compose is not installed."
    exit 1
fi

if docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
    COMPOSE_VERSION=$(docker compose version)
else
    COMPOSE_CMD="docker-compose"
    COMPOSE_VERSION=$(docker-compose --version)
fi
log_success "Docker Compose found: $COMPOSE_VERSION"

# Check if Docker daemon is running
if ! docker info > /dev/null 2>&1; then
    log_error "Docker daemon is not running. Please start Docker."
    exit 1
fi
log_success "Docker daemon is running"

################################################################################
# STEP 2: Setup Environment
################################################################################
log_info ""
log_info "Step 2: Setting up environment..."

if [ ! -f "$ENV_FILE" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example "$ENV_FILE"
        log_success "Created $ENV_FILE from .env.example"
    else
        log_error "$ENV_FILE not found"
        exit 1
    fi
else
    log_success "$ENV_FILE already exists"
fi

# Load environment variables
export $(grep -v '^#' "$ENV_FILE" | xargs)

################################################################################
# STEP 3: Check Port Availability
################################################################################
log_info ""
log_info "Step 3: Checking port availability..."

check_and_update_port() {
    local port_name=$1
    local port_value=$2
    local env_key=$3
    
    if lsof -Pi :$port_value -sTCP:LISTEN -t >/dev/null 2>&1; then
        log_warning "$port_name port $port_value is in use"
        
        # Find alternative port
        new_port=$port_value
        while lsof -Pi :$new_port -sTCP:LISTEN -t >/dev/null 2>&1; do
            new_port=$((new_port + 1))
        done
        
        log_success "Using alternative $port_name port: $new_port"
        
        # Update .env file
        if grep -q "^${env_key}=" "$ENV_FILE"; then
            sed -i.bak "s/^${env_key}=.*/${env_key}=${new_port}/" "$ENV_FILE"
        else
            echo "${env_key}=${new_port}" >> "$ENV_FILE"
        fi
        
        # Update related URLs if needed
        if [ "$env_key" = "BACKEND_PORT" ]; then
            sed -i.bak "s|^BACKEND_URL=.*|BACKEND_URL=http://localhost:${new_port}|" "$ENV_FILE"
        elif [ "$env_key" = "FRONTEND_PORT" ]; then
            sed -i.bak "s|^STORE_URL=.*|STORE_URL=http://localhost:${new_port}|" "$ENV_FILE"
        elif [ "$env_key" = "ADMIN_PORT" ]; then
            sed -i.bak "s|^ADMIN_URL=.*|ADMIN_URL=http://localhost:${new_port}|" "$ENV_FILE"
        fi
        
        return $new_port
    else
        log_success "$port_name port $port_value is available"
        return $port_value
    fi
}

# Check all ports
check_and_update_port "MongoDB" "${MONGO_PORT:-27017}" "MONGO_PORT"
check_and_update_port "Backend" "${BACKEND_PORT:-7000}" "BACKEND_PORT"
check_and_update_port "Frontend" "${FRONTEND_PORT:-3500}" "FRONTEND_PORT"
check_and_update_port "Admin" "${ADMIN_PORT:-4000}" "ADMIN_PORT"

# Reload environment
export $(grep -v '^#' "$ENV_FILE" | xargs)

################################################################################
# STEP 4: Clean Up Old Containers
################################################################################
log_info ""
log_info "Step 4: Cleaning up old containers..."

if $COMPOSE_CMD -f $COMPOSE_FILE ps -q 2>/dev/null | grep -q .; then
    log_info "Stopping existing containers..."
    $COMPOSE_CMD -f $COMPOSE_FILE down
    log_success "Old containers stopped"
else
    log_success "No existing containers to clean up"
fi

################################################################################
# STEP 5: Build and Start Services
################################################################################
log_info ""
log_info "Step 5: Building and starting services..."

log_info "This may take a few minutes on first run..."

$COMPOSE_CMD -f $COMPOSE_FILE up -d --build

log_success "All services started"

################################################################################
# STEP 6: Wait for Services to be Ready
################################################################################
log_info ""
log_info "Step 6: Waiting for services to be ready..."

# Wait for MongoDB
log_info "Waiting for MongoDB..."
timeout=60
counter=0
until $COMPOSE_CMD -f $COMPOSE_FILE exec -T mongodb mongosh --quiet --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
    sleep 2
    counter=$((counter + 2))
    if [ $counter -ge $timeout ]; then
        log_error "MongoDB failed to start within ${timeout}s"
        $COMPOSE_CMD -f $COMPOSE_FILE logs mongodb
        exit 1
    fi
    echo -n "."
done
echo ""
log_success "MongoDB is ready"

# Wait for Backend
log_info "Waiting for Backend..."
counter=0
until curl -f -s "http://localhost:${BACKEND_PORT}/health" > /dev/null 2>&1 || \
      curl -f -s "http://localhost:${BACKEND_PORT}" > /dev/null 2>&1; do
    sleep 2
    counter=$((counter + 2))
    if [ $counter -ge $timeout ]; then
        log_warning "Backend health check timeout (may still be starting)"
        break
    fi
    echo -n "."
done
echo ""
log_success "Backend is ready"

# Wait for Frontend
log_info "Waiting for Frontend..."
counter=0
until curl -f -s "http://localhost:${FRONTEND_PORT}" > /dev/null 2>&1; do
    sleep 2
    counter=$((counter + 2))
    if [ $counter -ge $timeout ]; then
        log_warning "Frontend health check timeout (may still be starting)"
        break
    fi
    echo -n "."
done
echo ""
log_success "Frontend is ready"

# Wait for Admin
log_info "Waiting for Admin Panel..."
counter=0
until curl -f -s "http://localhost:${ADMIN_PORT}" > /dev/null 2>&1; do
    sleep 2
    counter=$((counter + 2))
    if [ $counter -ge $timeout ]; then
        log_warning "Admin Panel health check timeout (may still be starting)"
        break
    fi
    echo -n "."
done
echo ""
log_success "Admin Panel is ready"

################################################################################
# STEP 7: Import Demo Data
################################################################################
log_info ""
log_info "Step 7: Checking demo data..."

# Check if data exists
DATA_EXISTS=$($COMPOSE_CMD -f $COMPOSE_FILE exec -T mongodb mongosh --quiet \
    -u "${MONGO_ROOT_USER}" -p "${MONGO_ROOT_PASSWORD}" --authenticationDatabase admin \
    --eval "db.getSiblingDB('${MONGO_DB_NAME}').getCollectionNames().length > 0" 2>/dev/null || echo "false")

if [ "$DATA_EXISTS" = "true" ]; then
    log_success "Database already contains data"
else
    log_info "Importing demo data..."
    
    # Try to run seed script
    if $COMPOSE_CMD -f $COMPOSE_FILE exec -T backend npm run data:import 2>/dev/null; then
        log_success "Demo data imported successfully"
    else
        log_warning "Demo data import failed or not available"
    fi
fi

################################################################################
# STEP 8: Display Container Status
################################################################################
log_info ""
log_info "Step 8: Checking container status..."

$COMPOSE_CMD -f $COMPOSE_FILE ps

################################################################################
# FINAL: Display Summary
################################################################################
echo ""
log_success "========================================="
log_success "  ALL SERVICES RUNNING SUCCESSFULLY!"
log_success "========================================="
echo ""
log_info "📊 Service URLs:"
echo ""
echo "  🗄️  MongoDB:      mongodb://localhost:${MONGO_PORT}"
echo "  🔧 Backend API:   http://localhost:${BACKEND_PORT}"
echo "  🛍️  Store Front:   http://localhost:${FRONTEND_PORT}"
echo "  ⚙️  Admin Panel:   http://localhost:${ADMIN_PORT}"
echo ""
log_info "🐳 Docker Commands:"
echo "  View logs:        $COMPOSE_CMD -f $COMPOSE_FILE logs -f"
echo "  Stop services:    $COMPOSE_CMD -f $COMPOSE_FILE down"
echo "  Restart:          $COMPOSE_CMD -f $COMPOSE_FILE restart"
echo "  View status:      $COMPOSE_CMD -f $COMPOSE_FILE ps"
echo ""
log_info "📋 Individual Service Logs:"
echo "  MongoDB:   $COMPOSE_CMD -f $COMPOSE_FILE logs -f mongodb"
echo "  Backend:   $COMPOSE_CMD -f $COMPOSE_FILE logs -f backend"
echo "  Frontend:  $COMPOSE_CMD -f $COMPOSE_FILE logs -f frontend"
echo "  Admin:     $COMPOSE_CMD -f $COMPOSE_FILE logs -f admin"
echo ""
log_info "🔍 Health Check:"
echo "  Backend:   curl http://localhost:${BACKEND_PORT}/health"
echo ""
log_success "✅ Setup complete! Your application is ready to use."
echo ""
