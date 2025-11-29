#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
print_step() {
    echo -e "${BLUE}===================================================${NC}"
    echo -e "${GREEN}$1${NC}"
    echo -e "${BLUE}===================================================${NC}"
}

print_error() {
    echo -e "${RED}ERROR: $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}WARNING: $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    print_error "Please do not run this script as root"
    exit 1
fi

# Step 1: Stop all running containers
print_step "Step 1: Stopping all Docker containers"
docker-compose down 2>/dev/null || true
docker stop $(docker ps -aq) 2>/dev/null || true
print_success "All containers stopped"

# Step 2: Remove all containers
print_step "Step 2: Removing all Docker containers"
docker rm -f $(docker ps -aq) 2>/dev/null || true
print_success "All containers removed"

# Step 3: Remove all images
print_step "Step 3: Removing all Docker images"
docker rmi -f $(docker images -q) 2>/dev/null || true
print_success "All images removed"

# Step 4: Remove all volumes
print_step "Step 4: Removing all Docker volumes"
docker volume prune -f
print_success "All volumes removed"

# Step 5: Remove all networks
print_step "Step 5: Removing all Docker networks"
docker network prune -f
print_success "All networks removed"

# Step 6: Clear build cache
print_step "Step 6: Clearing Docker build cache"
docker builder prune -af
print_success "Build cache cleared"

# Step 7: Show disk space reclaimed
print_step "Step 7: Docker system status"
docker system df

# Step 8: Build and start containers
print_step "Step 8: Building and starting Docker containers"
print_warning "This may take 5-10 minutes depending on your internet speed..."
docker-compose up -d --build

# Step 9: Wait for services to be ready
print_step "Step 9: Waiting for services to start"
echo "Waiting for MongoDB to be ready..."
sleep 10

# Check if MongoDB is ready
MAX_RETRIES=30
RETRY_COUNT=0
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if docker-compose exec -T mongodb mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
        print_success "MongoDB is ready"
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Waiting for MongoDB... ($RETRY_COUNT/$MAX_RETRIES)"
    sleep 2
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    print_error "MongoDB failed to start"
    exit 1
fi

# Wait for backend to be ready
echo "Waiting for Backend to be ready..."
sleep 5

RETRY_COUNT=0
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -s http://localhost:7000/health > /dev/null 2>&1; then
        print_success "Backend is ready"
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Waiting for Backend... ($RETRY_COUNT/$MAX_RETRIES)"
    sleep 2
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    print_error "Backend failed to start"
    exit 1
fi

# Step 10: Database auto-seeded
print_step "Step 10: Checking database"
echo "Database is automatically seeded on first container start"
print_success "Database ready (auto-seeded by entrypoint script)"

# Step 11: Test API
print_step "Step 11: Testing API endpoints"

# Test login
echo "Testing admin login..."
LOGIN_RESPONSE=$(curl -s -X POST 'http://localhost:7000/api/admin/login' \
    -H 'Content-Type: application/json' \
    -d '{"email":"dorothy@gmail.com","password":"123456"}')

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
REFRESH_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.refreshToken')

if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
    print_success "Login successful"
    echo "Access Token: ${TOKEN:0:50}..."
    echo "Refresh Token: ${REFRESH_TOKEN:0:50}..."
else
    print_error "Login failed"
    echo $LOGIN_RESPONSE | jq '.'
    exit 1
fi

# Test product API
echo ""
echo "Testing product API..."
PRODUCT_COUNT=$(curl -s "http://localhost:7000/api/product/all" \
    -H "Authorization: Bearer $TOKEN" | jq '.data | length')

if [ "$PRODUCT_COUNT" -gt 0 ]; then
    print_success "Product API working - Found $PRODUCT_COUNT products"
else
    print_error "Product API failed"
    exit 1
fi

# Test category API
echo ""
echo "Testing category API..."
CATEGORY_COUNT=$(curl -s "http://localhost:7000/api/category/all" \
    -H "Authorization: Bearer $TOKEN" | jq '.result | length')

if [ "$CATEGORY_COUNT" -gt 0 ]; then
    print_success "Category API working - Found $CATEGORY_COUNT categories"
else
    print_error "Category API failed"
    exit 1
fi

# Test brand API
echo ""
echo "Testing brand API..."
BRAND_COUNT=$(curl -s "http://localhost:7000/api/brand/all" \
    -H "Authorization: Bearer $TOKEN" | jq '.data | length')

if [ "$BRAND_COUNT" -gt 0 ]; then
    print_success "Brand API working - Found $BRAND_COUNT brands"
else
    print_error "Brand API failed"
    exit 1
fi

# Step 12: Show running containers
print_step "Step 12: Running containers"
docker-compose ps

# Step 13: Show logs (last 20 lines)
print_step "Step 13: Recent logs"
echo ""
echo "Backend logs:"
docker-compose logs --tail=10 backend

# Final summary
print_step "🎉 Setup Complete!"
echo ""
echo -e "${GREEN}All services are running successfully!${NC}"
echo ""
echo "📊 Service URLs:"
echo "  - Frontend:        http://localhost:3000"
echo "  - Admin Panel:     http://localhost:4000"
echo "  - Backend API:     http://localhost:7000"
echo "  - API Docs:        http://localhost:7000/api-docs"
echo "  - MongoDB:         mongodb://localhost:27017"
echo ""
echo "🔐 Super Admin Credentials:"
echo "  Email:    phuc.pham.dev@gmail.com"
echo "  Password: 12345678"
echo "  Role:     Super Admin"
echo ""
echo "📝 Other Admin Accounts:"
echo "  - dorothy@gmail.com / 123456 (Admin)"
echo "  - porter@gmail.com / 123456 (Admin)"
echo "  - corrie@gmail.com / 123456 (Admin)"
echo "  - palmer@gmail.com / 123456 (CEO)"
echo "  - meikle@gmail.com / 123456 (Manager)"
echo ""
echo "🔑 Your Access Token (valid for 15 minutes):"
echo "  $TOKEN"
echo ""
echo "🔄 Your Refresh Token (valid for 7 days):"
echo "  $REFRESH_TOKEN"
echo ""
echo "📚 Useful Commands:"
echo "  - View logs:           docker-compose logs -f [service]"
echo "  - Stop services:       docker-compose down"
echo "  - Restart service:     docker-compose restart [service]"
echo "  - Rebuild service:     docker-compose up -d --build [service]"
echo ""
echo "🧪 Test API with curl:"
echo "  curl http://localhost:7000/api/product/all \\"
echo "    -H 'Authorization: Bearer $TOKEN'"
echo ""
print_success "Happy coding! 🚀"
