#!/bin/bash

################################################################################
# SCRIPT KIỂM TRA HEALTH CỦA TẤT CẢ SERVICES
################################################################################

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[✓]${NC} $1"; }
log_error() { echo -e "${RED}[✗]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[!]${NC} $1"; }

# Load environment
ENV_FILE=".env.prod"
if [ ! -f "$ENV_FILE" ]; then
    ENV_FILE=".env.local"
fi

if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

echo ""
log_info "========================================="
log_info "  HEALTH CHECK - VictorMer E-Commerce"
log_info "========================================="
echo ""

################################################################################
# Check MongoDB
################################################################################
log_info "Checking MongoDB..."

if docker ps | grep -q "victormer-mongodb"; then
    CONTAINER_NAME=$(docker ps --filter "name=victormer-mongodb" --format "{{.Names}}" | head -n 1)
    if docker exec $CONTAINER_NAME mongosh --quiet --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
        log_success "MongoDB is running (Docker)"
    else
        log_error "MongoDB is not responding (Docker)"
    fi
elif pgrep -x "mongod" > /dev/null; then
    if mongosh --quiet --eval "db.adminCommand('ping')" "mongodb://localhost:${MONGO_PORT:-27017}" > /dev/null 2>&1; then
        log_success "MongoDB is running (Native)"
    else
        log_error "MongoDB is not responding (Native)"
    fi
else
    log_error "MongoDB is not running"
fi

################################################################################
# Check Backend
################################################################################
log_info "Checking Backend API..."

BACKEND_URL="${BACKEND_URL:-http://localhost:7000}"

if curl -f -s "$BACKEND_URL/health" > /dev/null 2>&1; then
    log_success "Backend API is healthy"
    RESPONSE=$(curl -s "$BACKEND_URL/health")
    echo "  Response: $RESPONSE"
elif curl -f -s "$BACKEND_URL" > /dev/null 2>&1; then
    log_success "Backend API is running"
else
    log_error "Backend API is not responding"
fi

################################################################################
# Check Frontend
################################################################################
log_info "Checking Frontend..."

FRONTEND_URL="${STORE_URL:-http://localhost:3500}"

if curl -f -s "$FRONTEND_URL" > /dev/null 2>&1; then
    log_success "Frontend is running"
else
    log_error "Frontend is not responding"
fi

################################################################################
# Check Admin Panel
################################################################################
log_info "Checking Admin Panel..."

ADMIN_URL="${ADMIN_URL:-http://localhost:4000}"

if curl -f -s "$ADMIN_URL" > /dev/null 2>&1; then
    log_success "Admin Panel is running"
else
    log_error "Admin Panel is not responding"
fi

################################################################################
# Check Nginx (Production)
################################################################################
if docker ps | grep -q "victormer-nginx"; then
    log_info "Checking Nginx..."
    
    if docker exec victormer-nginx-prod nginx -t > /dev/null 2>&1; then
        log_success "Nginx configuration is valid"
    else
        log_error "Nginx configuration has errors"
    fi
fi

################################################################################
# Check SSL Certificates (Production)
################################################################################
if [ -d "nginx/ssl" ]; then
    log_info "Checking SSL Certificates..."
    
    for domain_dir in nginx/ssl/*/; do
        if [ -d "$domain_dir" ]; then
            domain=$(basename "$domain_dir")
            cert_file="$domain_dir/fullchain.pem"
            
            if [ -f "$cert_file" ]; then
                expiry=$(openssl x509 -enddate -noout -in "$cert_file" | cut -d= -f2)
                expiry_epoch=$(date -d "$expiry" +%s)
                now_epoch=$(date +%s)
                days_left=$(( ($expiry_epoch - $now_epoch) / 86400 ))
                
                if [ $days_left -gt 30 ]; then
                    log_success "SSL for $domain: Valid ($days_left days left)"
                elif [ $days_left -gt 0 ]; then
                    log_warning "SSL for $domain: Expiring soon ($days_left days left)"
                else
                    log_error "SSL for $domain: EXPIRED"
                fi
            else
                log_warning "SSL certificate not found for $domain"
            fi
        fi
    done
fi

################################################################################
# Check Docker Containers
################################################################################
if command -v docker &> /dev/null; then
    log_info "Checking Docker Containers..."
    
    if docker ps | grep -q "victormer"; then
        echo ""
        docker ps --filter "name=victormer" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        echo ""
    fi
fi

################################################################################
# Check System Resources
################################################################################
log_info "Checking System Resources..."

# CPU
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')
echo "  CPU Usage: ${CPU_USAGE}%"

# Memory
MEM_USAGE=$(free | grep Mem | awk '{printf("%.1f"), $3/$2 * 100.0}')
echo "  Memory Usage: ${MEM_USAGE}%"

# Disk
DISK_USAGE=$(df -h / | tail -1 | awk '{print $5}')
echo "  Disk Usage: ${DISK_USAGE}"

################################################################################
# Check Ports
################################################################################
log_info "Checking Port Usage..."

check_port() {
    local port=$1
    local name=$2
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        log_success "$name (Port $port) is in use"
    else
        log_warning "$name (Port $port) is not in use"
    fi
}

check_port "${MONGO_PORT:-27017}" "MongoDB"
check_port "${BACKEND_PORT:-7000}" "Backend"
check_port "${FRONTEND_PORT:-3500}" "Frontend"
check_port "${ADMIN_PORT:-4000}" "Admin"

if [ -d "nginx" ]; then
    check_port 80 "HTTP"
    check_port 443 "HTTPS"
fi

################################################################################
# Summary
################################################################################
echo ""
log_info "========================================="
log_info "  Health Check Complete"
log_info "========================================="
echo ""
