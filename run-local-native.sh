#!/bin/bash

################################################################################
# SCRIPT CHẠY DỰ ÁN TRỰC TIẾP TRÊN LAPTOP (KHÔNG DÙNG DOCKER)
# Chạy tất cả services natively: MongoDB, Backend, Frontend, Admin Panel
################################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Log functions
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Configuration
PROJECT_NAME="VictorMer E-Commerce"
ENV_FILE=".env.local"
MONGO_PORT=27017
BACKEND_PORT=7000
FRONTEND_PORT=3500
ADMIN_PORT=4000

################################################################################
# FUNCTION: Check if port is available
################################################################################
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 1  # Port is in use
    else
        return 0  # Port is available
    fi
}

################################################################################
# FUNCTION: Find available port
################################################################################
find_available_port() {
    local start_port=$1
    local port=$start_port
    
    while ! check_port $port; do
        log_warning "Port $port is in use, trying next port..."
        port=$((port + 1))
        if [ $port -gt $((start_port + 100)) ]; then
            log_error "Could not find available port in range $start_port-$((start_port + 100))"
            exit 1
        fi
    done
    
    echo $port
}

################################################################################
# FUNCTION: Update .env file with new port
################################################################################
update_env_port() {
    local key=$1
    local value=$2
    
    if grep -q "^${key}=" "$ENV_FILE"; then
        sed -i.bak "s/^${key}=.*/${key}=${value}/" "$ENV_FILE"
    else
        echo "${key}=${value}" >> "$ENV_FILE"
    fi
}

################################################################################
# STEP 1: Check Prerequisites
################################################################################
log_info "========================================="
log_info "  $PROJECT_NAME - Native Setup"
log_info "========================================="
echo ""

log_info "Step 1: Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    log_error "Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi
NODE_VERSION=$(node -v)
log_success "Node.js found: $NODE_VERSION"

# Check npm
if ! command -v npm &> /dev/null; then
    log_error "npm is not installed."
    exit 1
fi
NPM_VERSION=$(npm -v)
log_success "npm found: v$NPM_VERSION"

# Check MongoDB
if ! command -v mongod &> /dev/null; then
    log_error "MongoDB is not installed. Please install MongoDB 7.0+ first."
    log_info "Install guide: https://www.mongodb.com/docs/manual/installation/"
    exit 1
fi
MONGO_VERSION=$(mongod --version | head -n 1)
log_success "MongoDB found: $MONGO_VERSION"

################################################################################
# STEP 2: Setup Environment File
################################################################################
log_info ""
log_info "Step 2: Setting up environment configuration..."

if [ ! -f "$ENV_FILE" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example "$ENV_FILE"
        log_success "Created $ENV_FILE from .env.example"
    else
        log_error "$ENV_FILE not found and .env.example doesn't exist"
        exit 1
    fi
else
    log_success "$ENV_FILE already exists"
fi

# Load environment variables
export $(grep -v '^#' "$ENV_FILE" | xargs)

################################################################################
# STEP 3: Check and Adjust Ports
################################################################################
log_info ""
log_info "Step 3: Checking port availability..."

# Check MongoDB port
if ! check_port $MONGO_PORT; then
    log_warning "MongoDB port $MONGO_PORT is in use"
    NEW_MONGO_PORT=$(find_available_port $MONGO_PORT)
    log_success "Using alternative MongoDB port: $NEW_MONGO_PORT"
    MONGO_PORT=$NEW_MONGO_PORT
    update_env_port "MONGO_PORT" "$MONGO_PORT"
else
    log_success "MongoDB port $MONGO_PORT is available"
fi

# Check Backend port
if ! check_port $BACKEND_PORT; then
    log_warning "Backend port $BACKEND_PORT is in use"
    NEW_BACKEND_PORT=$(find_available_port $BACKEND_PORT)
    log_success "Using alternative Backend port: $NEW_BACKEND_PORT"
    BACKEND_PORT=$NEW_BACKEND_PORT
    update_env_port "BACKEND_PORT" "$BACKEND_PORT"
    update_env_port "BACKEND_URL" "http://localhost:$BACKEND_PORT"
else
    log_success "Backend port $BACKEND_PORT is available"
fi

# Check Frontend port
if ! check_port $FRONTEND_PORT; then
    log_warning "Frontend port $FRONTEND_PORT is in use"
    NEW_FRONTEND_PORT=$(find_available_port $FRONTEND_PORT)
    log_success "Using alternative Frontend port: $NEW_FRONTEND_PORT"
    FRONTEND_PORT=$NEW_FRONTEND_PORT
    update_env_port "FRONTEND_PORT" "$FRONTEND_PORT"
    update_env_port "STORE_URL" "http://localhost:$FRONTEND_PORT"
else
    log_success "Frontend port $FRONTEND_PORT is available"
fi

# Check Admin port
if ! check_port $ADMIN_PORT; then
    log_warning "Admin port $ADMIN_PORT is in use"
    NEW_ADMIN_PORT=$(find_available_port $ADMIN_PORT)
    log_success "Using alternative Admin port: $NEW_ADMIN_PORT"
    ADMIN_PORT=$NEW_ADMIN_PORT
    update_env_port "ADMIN_PORT" "$ADMIN_PORT"
    update_env_port "ADMIN_URL" "http://localhost:$ADMIN_PORT"
else
    log_success "Admin port $ADMIN_PORT is available"
fi

# Reload environment variables after port updates
export $(grep -v '^#' "$ENV_FILE" | xargs)

################################################################################
# STEP 4: Start MongoDB
################################################################################
log_info ""
log_info "Step 4: Starting MongoDB..."

# Check if MongoDB is already running
if pgrep -x "mongod" > /dev/null; then
    log_success "MongoDB is already running"
else
    # Create data directory
    mkdir -p ./data/db
    
    # Start MongoDB in background
    mongod --dbpath ./data/db --port $MONGO_PORT --fork --logpath ./logs/mongodb.log
    
    # Wait for MongoDB to start
    sleep 3
    
    if pgrep -x "mongod" > /dev/null; then
        log_success "MongoDB started successfully on port $MONGO_PORT"
    else
        log_error "Failed to start MongoDB"
        exit 1
    fi
fi

################################################################################
# STEP 5: Check MongoDB Connection
################################################################################
log_info ""
log_info "Step 5: Verifying MongoDB connection..."

MONGO_URI="mongodb://${MONGO_ROOT_USER}:${MONGO_ROOT_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin"

# Try to connect to MongoDB
if mongosh --quiet --eval "db.adminCommand('ping')" "mongodb://localhost:$MONGO_PORT" > /dev/null 2>&1; then
    log_success "MongoDB connection successful"
else
    log_error "Cannot connect to MongoDB"
    exit 1
fi

################################################################################
# STEP 6: Import Demo Data
################################################################################
log_info ""
log_info "Step 6: Checking and importing demo data..."

# Check if database already has data
DB_EXISTS=$(mongosh --quiet --eval "db.getMongo().getDBNames().includes('${MONGO_DB_NAME}')" "mongodb://localhost:$MONGO_PORT" 2>/dev/null || echo "false")

if [ "$DB_EXISTS" = "true" ]; then
    log_success "Database '${MONGO_DB_NAME}' already exists"
else
    log_info "Importing demo data..."
    
    # Run seed script if exists
    if [ -f "mer-backend/seed.js" ]; then
        cd mer-backend
        npm run data:import || log_warning "Demo data import failed (may not be critical)"
        cd ..
        log_success "Demo data imported successfully"
    else
        log_warning "No seed file found, skipping demo data import"
    fi
fi

################################################################################
# STEP 7: Install Dependencies
################################################################################
log_info ""
log_info "Step 7: Installing dependencies..."

# Backend dependencies
if [ ! -d "mer-backend/node_modules" ]; then
    log_info "Installing backend dependencies..."
    cd mer-backend && npm install && cd ..
    log_success "Backend dependencies installed"
else
    log_success "Backend dependencies already installed"
fi

# Frontend dependencies
if [ ! -d "mer-front-end/node_modules" ]; then
    log_info "Installing frontend dependencies..."
    cd mer-front-end && npm install && cd ..
    log_success "Frontend dependencies installed"
else
    log_success "Frontend dependencies already installed"
fi

# Admin dependencies
if [ ! -d "mer-admin-panel/node_modules" ]; then
    log_info "Installing admin panel dependencies..."
    cd mer-admin-panel && npm install && cd ..
    log_success "Admin panel dependencies installed"
else
    log_success "Admin panel dependencies already installed"
fi

################################################################################
# STEP 8: Start Services
################################################################################
log_info ""
log_info "Step 8: Starting all services..."

# Create logs directory
mkdir -p logs

# Start Backend
log_info "Starting Backend on port $BACKEND_PORT..."
cd mer-backend
PORT=$BACKEND_PORT npm run start-dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..
echo $BACKEND_PID > logs/backend.pid
sleep 3

# Check if backend started
if kill -0 $BACKEND_PID 2>/dev/null; then
    log_success "Backend started (PID: $BACKEND_PID)"
else
    log_error "Backend failed to start. Check logs/backend.log"
    exit 1
fi

# Start Frontend
log_info "Starting Frontend on port $FRONTEND_PORT..."
cd mer-front-end
PORT=$FRONTEND_PORT npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..
echo $FRONTEND_PID > logs/frontend.pid
sleep 3

if kill -0 $FRONTEND_PID 2>/dev/null; then
    log_success "Frontend started (PID: $FRONTEND_PID)"
else
    log_error "Frontend failed to start. Check logs/frontend.log"
fi

# Start Admin Panel
log_info "Starting Admin Panel on port $ADMIN_PORT..."
cd mer-admin-panel
PORT=$ADMIN_PORT npm run dev > ../logs/admin.log 2>&1 &
ADMIN_PID=$!
cd ..
echo $ADMIN_PID > logs/admin.pid
sleep 3

if kill -0 $ADMIN_PID 2>/dev/null; then
    log_success "Admin Panel started (PID: $ADMIN_PID)"
else
    log_error "Admin Panel failed to start. Check logs/admin.log"
fi

################################################################################
# STEP 9: Health Checks
################################################################################
log_info ""
log_info "Step 9: Running health checks..."

# Wait for services to be ready
sleep 5

# Check Backend health
if curl -f -s "http://localhost:$BACKEND_PORT/health" > /dev/null 2>&1 || \
   curl -f -s "http://localhost:$BACKEND_PORT" > /dev/null 2>&1; then
    log_success "Backend is healthy"
else
    log_warning "Backend health check failed (may still be starting)"
fi

# Check Frontend
if curl -f -s "http://localhost:$FRONTEND_PORT" > /dev/null 2>&1; then
    log_success "Frontend is healthy"
else
    log_warning "Frontend health check failed (may still be starting)"
fi

# Check Admin
if curl -f -s "http://localhost:$ADMIN_PORT" > /dev/null 2>&1; then
    log_success "Admin Panel is healthy"
else
    log_warning "Admin Panel health check failed (may still be starting)"
fi

################################################################################
# FINAL: Display Summary
################################################################################
echo ""
log_success "========================================="
log_success "  ALL SERVICES STARTED SUCCESSFULLY!"
log_success "========================================="
echo ""
log_info "📊 Service Information:"
echo ""
echo "  🗄️  MongoDB:      mongodb://localhost:$MONGO_PORT"
echo "  🔧 Backend API:   http://localhost:$BACKEND_PORT"
echo "  🛍️  Store Front:   http://localhost:$FRONTEND_PORT"
echo "  ⚙️  Admin Panel:   http://localhost:$ADMIN_PORT"
echo ""
log_info "📝 Process IDs:"
echo "  Backend:  $BACKEND_PID"
echo "  Frontend: $FRONTEND_PID"
echo "  Admin:    $ADMIN_PID"
echo ""
log_info "📋 Log Files:"
echo "  MongoDB:  logs/mongodb.log"
echo "  Backend:  logs/backend.log"
echo "  Frontend: logs/frontend.log"
echo "  Admin:    logs/admin.log"
echo ""
log_info "🛑 To stop all services, run:"
echo "  ./stop-local-native.sh"
echo ""
log_warning "⚠️  Keep this terminal open or services will stop!"
echo ""

# Keep script running
wait
