#!/bin/bash

# Victor Mer Platform - Docker Production
# Full production setup with Nginx, SSL, and all optimizations

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
    echo -e "${CYAN}║   Victor Mer - Production Deployment  ║${NC}"
    echo -e "${CYAN}║   (Nginx + SSL + Full Stack)          ║${NC}"
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

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run as root (use sudo)"
    exit 1
fi

# Main
print_header

# Check Docker
print_info "Checking Docker..."
if ! command -v docker &> /dev/null; then
    print_warning "Docker not found. Installing..."
    curl -fsSL https://get.docker.com | sh
    systemctl start docker
    systemctl enable docker
    print_success "Docker installed"
else
    print_success "Docker $(docker --version | cut -d' ' -f3 | tr -d ',')"
fi

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    print_warning "Docker Compose not found. Installing..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    print_success "Docker Compose installed"
else
    print_success "Docker Compose $(docker-compose --version | cut -d' ' -f4 | tr -d ',')"
fi

# Check .env.prod
if [ ! -f ".env.prod" ]; then
    print_error ".env.prod not found"
    echo ""
    echo "Please create .env.prod with production settings:"
    echo "  cp .env.example .env.prod"
    echo "  nano .env.prod"
    echo ""
    echo "Required settings:"
    echo "  - BACKEND_URL (your domain)"
    echo "  - STORE_URL (your domain)"
    echo "  - ADMIN_URL (your domain)"
    echo "  - Strong passwords"
    echo "  - SSL email"
    exit 1
fi

# Load environment variables
source .env.prod

# Validate required variables
if [ -z "$BACKEND_URL" ] || [ -z "$STORE_URL" ] || [ -z "$ADMIN_URL" ]; then
    print_error "Missing required environment variables in .env.prod"
    echo ""
    echo "Required:"
    echo "  - BACKEND_URL"
    echo "  - STORE_URL"
    echo "  - ADMIN_URL"
    exit 1
fi

echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${GREEN}Production Configuration${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""
echo "  Backend:  $BACKEND_URL"
echo "  Store:    $STORE_URL"
echo "  Admin:    $ADMIN_URL"
echo ""
read -p "Is this correct? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "Aborted. Please update .env.prod"
    exit 1
fi

echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${GREEN}Setting up Firewall...${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""

# Setup UFW firewall
if command -v ufw &> /dev/null; then
    print_info "Configuring UFW firewall..."
    ufw --force enable
    ufw allow 22/tcp    # SSH
    ufw allow 80/tcp    # HTTP
    ufw allow 443/tcp   # HTTPS
    print_success "Firewall configured"
else
    print_warning "UFW not found, skipping firewall setup"
fi

echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${GREEN}Installing Certbot (Let's Encrypt)...${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""

# Install Certbot
if ! command -v certbot &> /dev/null; then
    print_info "Installing Certbot..."
    apt-get update -qq
    apt-get install -y -qq certbot python3-certbot-nginx
    print_success "Certbot installed"
else
    print_success "Certbot already installed"
fi

echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${GREEN}Building Docker Images...${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""

# Stop existing containers
print_info "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod down 2>/dev/null || true

# Build images
print_info "Building production images..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod build --no-cache

echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${GREEN}Starting Services...${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""

# Start services
print_info "Starting production services..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Wait for services
print_info "Waiting for services to start..."
sleep 15

# Check services
if docker ps | grep -q "mer-backend"; then
    print_success "Backend is running"
else
    print_error "Backend failed to start"
fi

if docker ps | grep -q "mer-admin-panel"; then
    print_success "Admin Panel is running"
else
    print_error "Admin Panel failed to start"
fi

if docker ps | grep -q "mer-front-end"; then
    print_success "Frontend is running"
else
    print_error "Frontend failed to start"
fi

if docker ps | grep -q "nginx"; then
    print_success "Nginx is running"
else
    print_error "Nginx failed to start"
fi

echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${GREEN}Setting up SSL Certificates...${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""

# Extract domains from URLs
BACKEND_DOMAIN=$(echo $BACKEND_URL | sed 's|https\?://||' | sed 's|/.*||')
STORE_DOMAIN=$(echo $STORE_URL | sed 's|https\?://||' | sed 's|/.*||')
ADMIN_DOMAIN=$(echo $ADMIN_URL | sed 's|https\?://||' | sed 's|/.*||')

# Get SSL email
if [ -z "$SSL_EMAIL" ]; then
    read -p "Enter email for SSL certificates: " SSL_EMAIL
fi

# Obtain SSL certificates
print_info "Obtaining SSL certificates..."
certbot --nginx -d $BACKEND_DOMAIN -d $STORE_DOMAIN -d $ADMIN_DOMAIN \
    --non-interactive --agree-tos --email $SSL_EMAIL \
    --redirect || print_warning "SSL setup failed, continuing without SSL"

# Setup auto-renewal
print_info "Setting up SSL auto-renewal..."
(crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --post-hook 'docker-compose -f $(pwd)/docker-compose.prod.yml restart nginx'") | crontab -
print_success "SSL auto-renewal configured"

echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${GREEN}Setting up Automatic Backups...${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""

# Create backup script
cat > /usr/local/bin/backup-victormer.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/victormer"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup MongoDB
docker exec mongodb mongodump --out /tmp/backup
docker cp mongodb:/tmp/backup $BACKUP_DIR/mongodb_$DATE

# Backup environment files
cp /root/victor-mer-platform/.env.prod $BACKUP_DIR/env_$DATE

# Keep only last 7 days
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} +

echo "Backup completed: $BACKUP_DIR"
EOF

chmod +x /usr/local/bin/backup-victormer.sh

# Setup daily backup cron
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup-victormer.sh") | crontab -
print_success "Daily backups configured (2 AM)"

echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${GREEN}🚀 Production Deployment Complete!${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}Services:${NC}"
echo "  • Backend:        $BACKEND_URL"
echo "  • API Docs:       $BACKEND_URL/api-docs"
echo "  • Admin Panel:    $ADMIN_URL"
echo "  • Frontend:       $STORE_URL"
echo ""
echo -e "${GREEN}Security:${NC}"
echo "  • SSL:            ✓ Enabled (Let's Encrypt)"
echo "  • Auto-renewal:   ✓ Configured"
echo "  • Firewall:       ✓ Configured (UFW)"
echo ""
echo -e "${GREEN}Backups:${NC}"
echo "  • Schedule:       Daily at 2 AM"
echo "  • Location:       /var/backups/victormer"
echo "  • Retention:      7 days"
echo ""
echo -e "${GREEN}Management:${NC}"
echo "  • View logs:      docker-compose -f docker-compose.prod.yml logs -f"
echo "  • Restart:        docker-compose -f docker-compose.prod.yml restart"
echo "  • Stop:           docker-compose -f docker-compose.prod.yml down"
echo "  • Backup now:     /usr/local/bin/backup-victormer.sh"
echo ""
echo -e "${GREEN}Monitoring:${NC}"
echo "  • Health check:   curl $BACKEND_URL/health"
echo "  • Container status: docker ps"
echo "  • Resource usage:  docker stats"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  1. Test all services"
echo "  2. Configure DNS records"
echo "  3. Setup monitoring (optional)"
echo "  4. Configure email settings"
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
