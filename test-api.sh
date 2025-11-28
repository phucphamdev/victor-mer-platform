#!/bin/bash

# API Testing Script for Victor Mer Platform
# Usage: ./test-api.sh [dev|prod]

ENV=${1:-dev}

if [ "$ENV" = "prod" ]; then
    BASE_URL="https://api.yourdomain.com"
else
    BASE_URL="http://localhost:7000"
fi

echo "🚀 Testing Victor Mer API - Environment: $ENV"
echo "📍 Base URL: $BASE_URL"
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test function
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local data=$4
    
    echo -e "\n${YELLOW}Testing:${NC} $description"
    echo "Endpoint: $method $endpoint"
    
    if [ -z "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo -e "${GREEN}✓ Success${NC} (HTTP $http_code)"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
    else
        echo -e "${RED}✗ Failed${NC} (HTTP $http_code)"
        echo "$body"
    fi
}

# 1. Health Check
test_endpoint "GET" "/health" "Health Check"

# 2. Get all categories
test_endpoint "GET" "/api/category/all" "Get All Categories"

# 3. Get all brands
test_endpoint "GET" "/api/brand/all" "Get All Brands"

# 4. Get all products
test_endpoint "GET" "/api/product/all" "Get All Products"

# 5. Get top rated products
test_endpoint "GET" "/api/product/top-rated" "Get Top Rated Products"

# 6. Get all coupons
test_endpoint "GET" "/api/coupon" "Get All Coupons"

# 7. User Signup (if not exists)
echo -e "\n${YELLOW}Testing:${NC} User Registration"
SIGNUP_DATA='{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "Test123456"
}'
test_endpoint "POST" "/api/user/signup" "User Signup" "$SIGNUP_DATA"

# 8. User Login
echo -e "\n${YELLOW}Testing:${NC} User Login"
LOGIN_DATA='{
  "email": "testuser@example.com",
  "password": "Test123456"
}'
login_response=$(curl -s -X POST "$BASE_URL/api/user/login" \
    -H "Content-Type: application/json" \
    -d "$LOGIN_DATA")

TOKEN=$(echo "$login_response" | jq -r '.token' 2>/dev/null)

if [ "$TOKEN" != "null" ] && [ ! -z "$TOKEN" ]; then
    echo -e "${GREEN}✓ Login Success${NC}"
    echo "Token: ${TOKEN:0:20}..."
    
    # 9. Test authenticated endpoint
    echo -e "\n${YELLOW}Testing:${NC} Get User Orders (Authenticated)"
    curl -s -X GET "$BASE_URL/api/user-order" \
        -H "Authorization: Bearer $TOKEN" \
        -H "Content-Type: application/json" | jq '.' 2>/dev/null || echo "No orders found"
else
    echo -e "${RED}✗ Login Failed${NC}"
fi

# 10. Swagger Documentation
echo -e "\n${YELLOW}Testing:${NC} Swagger Documentation"
swagger_response=$(curl -s -w "\n%{http_code}" "$BASE_URL/api-docs")
swagger_code=$(echo "$swagger_response" | tail -n1)

if [ "$swagger_code" = "200" ]; then
    echo -e "${GREEN}✓ Swagger UI Available${NC}"
    echo "Access at: $BASE_URL/api-docs"
else
    echo -e "${RED}✗ Swagger UI Not Available${NC}"
fi

echo -e "\n=================================="
echo -e "${GREEN}✓ API Testing Complete${NC}"
echo ""
echo "📚 Full API Documentation: $BASE_URL/api-docs"
echo ""
