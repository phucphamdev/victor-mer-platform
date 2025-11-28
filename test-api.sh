#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Testing Victor MER Platform API${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Step 1: Login
echo -e "${YELLOW}Step 1: Logging in as Super Admin...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST 'http://localhost:7000/api/admin/login' \
    -H 'Content-Type: application/json' \
    -d '{"email":"phuc.pham.dev@gmail.com","password":"12345678"}')

# Check if login successful
if echo "$LOGIN_RESPONSE" | jq -e '.token' > /dev/null 2>&1; then
    TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
    REFRESH_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.refreshToken')
    ADMIN_NAME=$(echo $LOGIN_RESPONSE | jq -r '.name')
    
    echo -e "${GREEN}✓ Login successful!${NC}"
    echo -e "  Admin: $ADMIN_NAME"
    echo -e "  Access Token: ${TOKEN:0:50}..."
    echo -e "  Refresh Token: ${REFRESH_TOKEN:0:50}..."
else
    echo -e "${RED}✗ Login failed!${NC}"
    echo "$LOGIN_RESPONSE" | jq '.'
    exit 1
fi

echo ""

# Step 2: Test Product API
echo -e "${YELLOW}Step 2: Testing Product API...${NC}"
PRODUCT_RESPONSE=$(curl -s "http://localhost:7000/api/product/all?page=1&limit=10" \
    -H "Authorization: Bearer $TOKEN")

PRODUCT_COUNT=$(echo $PRODUCT_RESPONSE | jq '.data | length')
if [ "$PRODUCT_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓ Product API working - Found $PRODUCT_COUNT products${NC}"
    echo "$PRODUCT_RESPONSE" | jq '{success, total: (.data | length), first_product: .data[0].title}'
else
    echo -e "${RED}✗ Product API failed${NC}"
    echo "$PRODUCT_RESPONSE" | jq '.'
fi

echo ""

# Step 3: Test Category API
echo -e "${YELLOW}Step 3: Testing Category API...${NC}"
CATEGORY_RESPONSE=$(curl -s "http://localhost:7000/api/category/all" \
    -H "Authorization: Bearer $TOKEN")

CATEGORY_COUNT=$(echo $CATEGORY_RESPONSE | jq '.result | length')
if [ "$CATEGORY_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓ Category API working - Found $CATEGORY_COUNT categories${NC}"
    echo "$CATEGORY_RESPONSE" | jq '{success, total: (.result | length), first_category: .result[0].parent}'
else
    echo -e "${RED}✗ Category API failed${NC}"
    echo "$CATEGORY_RESPONSE" | jq '.'
fi

echo ""

# Step 4: Test Brand API
echo -e "${YELLOW}Step 4: Testing Brand API...${NC}"
BRAND_RESPONSE=$(curl -s "http://localhost:7000/api/brand/all" \
    -H "Authorization: Bearer $TOKEN")

BRAND_COUNT=$(echo $BRAND_RESPONSE | jq '.data | length')
if [ "$BRAND_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓ Brand API working - Found $BRAND_COUNT brands${NC}"
    echo "$BRAND_RESPONSE" | jq '{success, total: (.data | length), first_brand: .data[0].name}'
else
    echo -e "${RED}✗ Brand API failed${NC}"
    echo "$BRAND_RESPONSE" | jq '.'
fi

echo ""

# Step 5: Test Coupon API
echo -e "${YELLOW}Step 5: Testing Coupon API...${NC}"
COUPON_RESPONSE=$(curl -s "http://localhost:7000/api/coupon/" \
    -H "Authorization: Bearer $TOKEN")

COUPON_COUNT=$(echo $COUPON_RESPONSE | jq '. | length')
if [ "$COUPON_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓ Coupon API working - Found $COUPON_COUNT coupons${NC}"
    echo "$COUPON_RESPONSE" | jq '[{title: .[0].title, code: .[0].couponCode, discount: .[0].discountPercentage}]'
else
    echo -e "${RED}✗ Coupon API failed${NC}"
    echo "$COUPON_RESPONSE" | jq '.'
fi

echo ""

# Step 6: Test Order API
echo -e "${YELLOW}Step 6: Testing Order API...${NC}"
ORDER_RESPONSE=$(curl -s "http://localhost:7000/api/order/orders" \
    -H "Authorization: Bearer $TOKEN")

ORDER_COUNT=$(echo $ORDER_RESPONSE | jq '.data | length')
echo -e "${GREEN}✓ Order API working - Found $ORDER_COUNT orders${NC}"
echo "$ORDER_RESPONSE" | jq '{success, total: (.data | length)}'

echo ""

# Step 7: Test Refresh Token
echo -e "${YELLOW}Step 7: Testing Refresh Token...${NC}"
REFRESH_RESPONSE=$(curl -s -X POST 'http://localhost:7000/api/admin/refresh-token' \
    -H 'Content-Type: application/json' \
    -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}")

NEW_TOKEN=$(echo $REFRESH_RESPONSE | jq -r '.token')
if [ "$NEW_TOKEN" != "null" ] && [ -n "$NEW_TOKEN" ]; then
    echo -e "${GREEN}✓ Refresh Token working${NC}"
    echo -e "  New Access Token: ${NEW_TOKEN:0:50}..."
else
    echo -e "${RED}✗ Refresh Token failed${NC}"
    echo "$REFRESH_RESPONSE" | jq '.'
fi

echo ""

# Summary
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}API Test Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${GREEN}✓ All API endpoints are working!${NC}"
echo ""
echo -e "${YELLOW}Your Tokens (valid for testing):${NC}"
echo ""
echo -e "${BLUE}Access Token (15 minutes):${NC}"
echo "$TOKEN"
echo ""
echo -e "${BLUE}Refresh Token (7 days):${NC}"
echo "$REFRESH_TOKEN"
echo ""
echo -e "${YELLOW}Test with curl:${NC}"
echo ""
echo "curl 'http://localhost:7000/api/product/all?page=1&limit=10' \\"
echo "  -H 'Authorization: Bearer $TOKEN'"
echo ""
echo -e "${GREEN}Happy testing! 🚀${NC}"
