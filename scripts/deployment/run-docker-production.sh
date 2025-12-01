#!/bin/bash

################################################################################
# SCRIPT CHẠY DỰ ÁN PRODUCTION VỚI DOCKER COMPOSE TRÊN VPS
# Bao gồm: SSL tự động (Let's Encrypt), Nginx Router, Health Checks
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_step() { echo -e "${CYAN}[STEP]${NC} $1"; }

PROJECT_NAME="VictorMer E-Commerce Production"
ENV_FILE=".env.prod"
COMPOSE_FILE="docker-compose.prod.yml"

################################################################################
# STEP 1: Check Prerequisites
################################################################################
log_step "========================================="
log_step "  $PROJECT_NAME Setup"
log_step "========================================="
echo ""

log_info "Step 1: Checking prerequisites..."

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
    log_warning "This script should be run as root or with sudo for production setup"
    log_info "Some features like port 80/443 binding may fail without root privileges"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check Docker
if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed."
    log_info "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    log_success "Docker installed"
fi
DOCKER_VERSION=$(docker --version)
log_success "Docker: $DOCKER_VERSION"

# Check Docker Compose
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    log_error "Docker Compose is not installed."
    log_info "Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    log_success "Docker Compose installed"
fi

if docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi
log_success "Docker Compose: $($COMPOSE_CMD version)"

# Check if Docker daemon is running
if ! docker info > /dev/null 2>&1; then
    log_error "Docker daemon is not running"
    systemctl start docker
    log_success "Docker daemon started"
fi

################################################################################
# STEP 2: Domain Configuration
################################################################################
log_info ""
log_step "Step 2: Domain configuration..."

# Ask for domain names
read -p "Enter your main domain (e.g., yourdomain.com): " MAIN_DOMAIN
read -p "Enter your API subdomain (e.g., api.yourdomain.com): " API_DOMAIN
read -p "Enter your admin subdomain (e.g., admin.yourdomain.com): " ADMIN_DOMAIN
read -p "Enter your email for SSL certificates: " SSL_EMAIL

if [ -z "$MAIN_DOMAIN" ] || [ -z "$API_DOMAIN" ] || [ -z "$ADMIN_DOMAIN" ] || [ -z "$SSL_EMAIL" ]; then
    log_error "All domain fields are required"
    exit 1
fi

log_success "Domains configured:"
echo "  Main:  $MAIN_DOMAIN"
echo "  API:   $API_DOMAIN"
echo "  Admin: $ADMIN_DOMAIN"

################################################################################
# STEP 3: Setup Environment
################################################################################
log_info ""
log_step "Step 3: Setting up environment..."

if [ ! -f "$ENV_FILE" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example "$ENV_FILE"
        log_success "Created $ENV_FILE from .env.example"
    else
        log_error "$ENV_FILE not found"
        exit 1
    fi
fi

# Update environment file with production values
sed -i.bak "s|^NODE_ENV=.*|NODE_ENV=production|" "$ENV_FILE"
sed -i.bak "s|^BACKEND_URL=.*|BACKEND_URL=https://${API_DOMAIN}|" "$ENV_FILE"
sed -i.bak "s|^STORE_URL=.*|STORE_URL=https://${MAIN_DOMAIN}|" "$ENV_FILE"
sed -i.bak "s|^ADMIN_URL=.*|ADMIN_URL=https://${ADMIN_DOMAIN}|" "$ENV_FILE"

log_success "Environment configured for production"

# Load environment variables
export $(grep -v '^#' "$ENV_FILE" | xargs)

################################################################################
# STEP 4: Check Port Availability
################################################################################
log_info ""
log_step "Step 4: Checking port availability..."

check_and_handle_port() {
    local port=$1
    local service=$2
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        log_warning "Port $port is in use by another service"
        
        # Get process info
        PROCESS_INFO=$(lsof -Pi :$port -sTCP:LISTEN | tail -n 1)
        log_info "Process: $PROCESS_INFO"
        
        read -p "Stop the process using port $port? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            PID=$(lsof -ti:$port)
            kill -9 $PID
            log_success "Process stopped"
        else
            log_error "Cannot proceed with port $port in use"
            exit 1
        fi
    else
        log_success "$service port $port is available"
    fi
}

check_and_handle_port 80 "HTTP"
check_and_handle_port 443 "HTTPS"

################################################################################
# STEP 5: Setup Nginx Configuration
################################################################################
log_info ""
log_step "Step 5: Setting up Nginx configuration..."

mkdir -p nginx/ssl nginx/logs

# Create Nginx configuration
cat > nginx/nginx.conf << 'NGINX_EOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 2048;
    use epoll;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 20M;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss 
               application/rss+xml font/truetype font/opentype 
               application/vnd.ms-fontobject image/svg+xml;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=general_limit:10m rate=30r/s;

    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Upstream definitions
    upstream backend {
        server backend:7000;
        keepalive 32;
    }

    upstream frontend {
        server frontend:3000;
        keepalive 32;
    }

    upstream admin {
        server admin:4000;
        keepalive 32;
    }

    # HTTP to HTTPS redirect
    server {
        listen 80;
        server_name MAIN_DOMAIN_PLACEHOLDER API_DOMAIN_PLACEHOLDER ADMIN_DOMAIN_PLACEHOLDER;
        
        # Allow Let's Encrypt challenges
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        location / {
            return 301 https://$host$request_uri;
        }
    }

    # API Server (Backend)
    server {
        listen 443 ssl http2;
        server_name API_DOMAIN_PLACEHOLDER;

        ssl_certificate /etc/nginx/ssl/API_DOMAIN_PLACEHOLDER/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/API_DOMAIN_PLACEHOLDER/privkey.pem;

        location / {
            limit_req zone=api_limit burst=20 nodelay;
            
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 300s;
            proxy_connect_timeout 75s;
        }
    }

    # Main Store Frontend
    server {
        listen 443 ssl http2;
        server_name MAIN_DOMAIN_PLACEHOLDER;

        ssl_certificate /etc/nginx/ssl/MAIN_DOMAIN_PLACEHOLDER/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/MAIN_DOMAIN_PLACEHOLDER/privkey.pem;

        location / {
            limit_req zone=general_limit burst=50 nodelay;
            
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }

    # Admin Panel
    server {
        listen 443 ssl http2;
        server_name ADMIN_DOMAIN_PLACEHOLDER;

        ssl_certificate /etc/nginx/ssl/ADMIN_DOMAIN_PLACEHOLDER/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/ADMIN_DOMAIN_PLACEHOLDER/privkey.pem;

        location / {
            limit_req zone=general_limit burst=50 nodelay;
            
            proxy_pass http://admin;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
NGINX_EOF

# Replace placeholders
sed -i "s/MAIN_DOMAIN_PLACEHOLDER/$MAIN_DOMAIN/g" nginx/nginx.conf
sed -i "s/API_DOMAIN_PLACEHOLDER/$API_DOMAIN/g" nginx/nginx.conf
sed -i "s/ADMIN_DOMAIN_PLACEHOLDER/$ADMIN_DOMAIN/g" nginx/nginx.conf

log_success "Nginx configuration created"

################################################################################
# STEP 6: Setup SSL Certificates
################################################################################
log_info ""
log_step "Step 6: Setting up SSL certificates..."

# Check if certbot is installed
if ! command -v certbot &> /dev/null; then
    log_info "Installing Certbot..."
    if command -v apt-get &> /dev/null; then
        apt-get update
        apt-get install -y certbot
    elif command -v yum &> /dev/null; then
        yum install -y certbot
    else
        log_error "Cannot install certbot automatically. Please install manually."
        exit 1
    fi
    log_success "Certbot installed"
fi

# Function to obtain SSL certificate
obtain_ssl_cert() {
    local domain=$1
    local email=$2
    
    log_info "Obtaining SSL certificate for $domain..."
    
    mkdir -p "nginx/ssl/$domain"
    
    # Check if certificate already exists
    if [ -f "nginx/ssl/$domain/fullchain.pem" ] && [ -f "nginx/ssl/$domain/privkey.pem" ]; then
        log_success "SSL certificate for $domain already exists"
        return 0
    fi
    
    # Try to obtain certificate
    if certbot certonly --standalone --non-interactive --agree-tos \
        --email "$email" -d "$domain" \
        --cert-path "nginx/ssl/$domain/cert.pem" \
        --key-path "nginx/ssl/$domain/privkey.pem" \
        --fullchain-path "nginx/ssl/$domain/fullchain.pem" 2>/dev/null; then
        log_success "SSL certificate obtained for $domain"
    else
        log_warning "Failed to obtain SSL certificate for $domain"
        log_info "Creating self-signed certificate for development..."
        
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout "nginx/ssl/$domain/privkey.pem" \
            -out "nginx/ssl/$domain/fullchain.pem" \
            -subj "/C=US/ST=State/L=City/O=Organization/CN=$domain" 2>/dev/null
        
        log_success "Self-signed certificate created for $domain"
    fi
}

# Obtain certificates for all domains
obtain_ssl_cert "$MAIN_DOMAIN" "$SSL_EMAIL"
obtain_ssl_cert "$API_DOMAIN" "$SSL_EMAIL"
obtain_ssl_cert "$ADMIN_DOMAIN" "$SSL_EMAIL"

################################################################################
# STEP 7: Setup SSL Auto-Renewal
################################################################################
log_info ""
log_step "Step 7: Setting up SSL auto-renewal..."

# Create renewal script
cat > /etc/cron.daily/renew-ssl << 'EOF'
#!/bin/bash
certbot renew --quiet --deploy-hook "docker exec victormer-nginx-prod nginx -s reload"
EOF

chmod +x /etc/cron.daily/renew-ssl
log_success "SSL auto-renewal configured"

################################################################################
# STEP 8: Clean Up Old Containers
################################################################################
log_info ""
log_step "Step 8: Cleaning up old containers..."

if $COMPOSE_CMD -f $COMPOSE_FILE ps -q 2>/dev/null | grep -q .; then
    log_info "Stopping existing containers..."
    $COMPOSE_CMD -f $COMPOSE_FILE down
    log_success "Old containers stopped"
fi

################################################################################
# STEP 9: Build and Start Services
################################################################################
log_info ""
log_step "Step 9: Building and starting services..."

log_info "This may take several minutes..."

$COMPOSE_CMD -f $COMPOSE_FILE up -d --build

log_success "All services started"

################################################################################
# STEP 10: Wait for Services
################################################################################
log_info ""
log_step "Step 10: Waiting for services to be ready..."

# Wait for MongoDB
log_info "Waiting for MongoDB..."
timeout=60
counter=0
until $COMPOSE_CMD -f $COMPOSE_FILE exec -T mongodb mongosh --quiet \
    -u "${MONGO_ROOT_USER}" -p "${MONGO_ROOT_PASSWORD}" --authenticationDatabase admin \
    --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
    sleep 2
    counter=$((counter + 2))
    if [ $counter -ge $timeout ]; then
        log_error "MongoDB failed to start"
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
until $COMPOSE_CMD -f $COMPOSE_FILE exec -T backend curl -f -s http://localhost:7000/health > /dev/null 2>&1 || \
      $COMPOSE_CMD -f $COMPOSE_FILE exec -T backend curl -f -s http://localhost:7000 > /dev/null 2>&1; do
    sleep 2
    counter=$((counter + 2))
    if [ $counter -ge $timeout ]; then
        log_warning "Backend health check timeout"
        break
    fi
    echo -n "."
done
echo ""
log_success "Backend is ready"

# Wait for Frontend
log_info "Waiting for Frontend..."
counter=0
until $COMPOSE_CMD -f $COMPOSE_FILE exec -T frontend curl -f -s http://localhost:3000 > /dev/null 2>&1; do
    sleep 2
    counter=$((counter + 2))
    if [ $counter -ge $timeout ]; then
        log_warning "Frontend health check timeout"
        break
    fi
    echo -n "."
done
echo ""
log_success "Frontend is ready"

# Wait for Admin
log_info "Waiting for Admin Panel..."
counter=0
until $COMPOSE_CMD -f $COMPOSE_FILE exec -T admin curl -f -s http://localhost:4000 > /dev/null 2>&1; do
    sleep 2
    counter=$((counter + 2))
    if [ $counter -ge $timeout ]; then
        log_warning "Admin Panel health check timeout"
        break
    fi
    echo -n "."
done
echo ""
log_success "Admin Panel is ready"

################################################################################
# STEP 11: Import Demo Data
################################################################################
log_info ""
log_step "Step 11: Checking demo data..."

DATA_EXISTS=$($COMPOSE_CMD -f $COMPOSE_FILE exec -T mongodb mongosh --quiet \
    -u "${MONGO_ROOT_USER}" -p "${MONGO_ROOT_PASSWORD}" --authenticationDatabase admin \
    --eval "db.getSiblingDB('${MONGO_DB_NAME}').getCollectionNames().length > 0" 2>/dev/null || echo "false")

if [ "$DATA_EXISTS" = "true" ]; then
    log_success "Database already contains data"
else
    log_info "Importing demo data..."
    if $COMPOSE_CMD -f $COMPOSE_FILE exec -T backend npm run data:import 2>/dev/null; then
        log_success "Demo data imported"
    else
        log_warning "Demo data import failed (optional)"
    fi
fi

################################################################################
# STEP 12: Setup Firewall
################################################################################
log_info ""
log_step "Step 12: Configuring firewall..."

if command -v ufw &> /dev/null; then
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 22/tcp
    log_success "Firewall configured (UFW)"
elif command -v firewall-cmd &> /dev/null; then
    firewall-cmd --permanent --add-service=http
    firewall-cmd --permanent --add-service=https
    firewall-cmd --permanent --add-service=ssh
    firewall-cmd --reload
    log_success "Firewall configured (firewalld)"
else
    log_warning "No firewall detected. Please configure manually."
fi

################################################################################
# STEP 13: Health Checks
################################################################################
log_info ""
log_step "Step 13: Running final health checks..."

sleep 5

# Check HTTPS endpoints
check_https() {
    local url=$1
    local name=$2
    
    if curl -f -s -k "$url" > /dev/null 2>&1; then
        log_success "$name is accessible"
        return 0
    else
        log_warning "$name is not accessible yet"
        return 1
    fi
}

check_https "https://$MAIN_DOMAIN" "Main Store"
check_https "https://$API_DOMAIN" "API Backend"
check_https "https://$ADMIN_DOMAIN" "Admin Panel"

################################################################################
# STEP 14: Display Container Status
################################################################################
log_info ""
log_step "Step 14: Container status..."

$COMPOSE_CMD -f $COMPOSE_FILE ps

################################################################################
# FINAL: Display Summary
################################################################################
echo ""
log_success "========================================="
log_success "  PRODUCTION DEPLOYMENT COMPLETE!"
log_success "========================================="
echo ""
log_info "🌐 Your Application URLs:"
echo ""
echo "  🛍️  Store Front:   https://$MAIN_DOMAIN"
echo "  🔧 Backend API:   https://$API_DOMAIN"
echo "  ⚙️  Admin Panel:   https://$ADMIN_DOMAIN"
echo ""
log_info "🔒 SSL Certificates:"
echo "  Main:  nginx/ssl/$MAIN_DOMAIN/"
echo "  API:   nginx/ssl/$API_DOMAIN/"
echo "  Admin: nginx/ssl/$ADMIN_DOMAIN/"
echo "  Auto-renewal: Configured (daily check)"
echo ""
log_info "🐳 Docker Commands:"
echo "  View logs:     $COMPOSE_CMD -f $COMPOSE_FILE logs -f"
echo "  Stop:          $COMPOSE_CMD -f $COMPOSE_FILE down"
echo "  Restart:       $COMPOSE_CMD -f $COMPOSE_FILE restart"
echo "  Status:        $COMPOSE_CMD -f $COMPOSE_FILE ps"
echo ""
log_info "📊 System Resources:"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
echo ""
log_info "🔍 Health Monitoring:"
echo "  Backend:  curl https://$API_DOMAIN/health"
echo "  Nginx:    docker logs victormer-nginx-prod"
echo ""
log_success "✅ Your production environment is ready!"
echo ""
log_warning "⚠️  Important Security Notes:"
echo "  1. Change default passwords in $ENV_FILE"
echo "  2. Configure your DNS to point to this server"
echo "  3. Review nginx/nginx.conf for security settings"
echo "  4. Setup monitoring and backups"
echo "  5. Keep Docker and system packages updated"
echo ""
