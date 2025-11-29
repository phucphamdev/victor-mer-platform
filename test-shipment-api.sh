#!/bin/bash

# Test script for Shipment API endpoints
# This script tests both authenticated and public endpoints

BASE_URL="http://localhost:7000"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================="
echo "  Shipment API Test Script"
echo "========================================="
echo ""

# Step 1: Login to get token
echo -e "${YELLOW}Step 1: Logging in to get access token...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"dorothy@gmail.com","password":"123456"}')

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
  echo -e "${RED}❌ Login failed!${NC}"
  echo "Response: $LOGIN_RESPONSE"
  exit 1
fi

echo -e "${GREEN}✓ Login successful!${NC}"
echo "Token: ${TOKEN:0:50}..."
echo ""

# Step 2: Test public tracking endpoint (no auth required)
echo -e "${YELLOW}Step 2: Testing public tracking endpoint (no auth)...${NC}"
TRACK_RESPONSE=$(curl -s -X GET "$BASE_URL/api/shipment/track/TEST123")
echo "Response: $TRACK_RESPONSE" | jq .
echo ""

# Step 3: Test authenticated endpoint - Get all shipments
echo -e "${YELLOW}Step 3: Testing authenticated endpoint - Get all shipments...${NC}"
ALL_RESPONSE=$(curl -s -X GET "$BASE_URL/api/shipment/all" \
  -H "Authorization: Bearer $TOKEN")

STATUS=$(echo $ALL_RESPONSE | jq -r '.status')

if [ "$STATUS" == "success" ]; then
  echo -e "${GREEN}✓ Successfully retrieved shipments!${NC}"
  echo "Response: $ALL_RESPONSE" | jq .
elif [ "$STATUS" == "fail" ]; then
  echo -e "${RED}❌ Authorization failed!${NC}"
  echo "Response: $ALL_RESPONSE" | jq .
  echo ""
  echo -e "${YELLOW}Note: Make sure the backend server has been restarted after the fix.${NC}"
else
  echo -e "${RED}❌ Unexpected response!${NC}"
  echo "Response: $ALL_RESPONSE" | jq .
fi
echo ""

# Step 4: Test creating a shipment (requires admin role)
echo -e "${YELLOW}Step 4: Testing create shipment endpoint...${NC}"
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/api/shipment/add" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "order": "507f1f77bcf86cd799439011",
    "trackingNumber": "TEST-'$(date +%s)'",
    "carrier": "DHL",
    "shippingAddress": {
      "street": "123 Test St",
      "city": "Test City",
      "country": "Test Country"
    },
    "estimatedDelivery": "'$(date -d "+7 days" -I)'T00:00:00.000Z"
  }')

CREATE_STATUS=$(echo $CREATE_RESPONSE | jq -r '.status')

if [ "$CREATE_STATUS" == "success" ]; then
  echo -e "${GREEN}✓ Shipment created successfully!${NC}"
  echo "Response: $CREATE_RESPONSE" | jq .
else
  echo -e "${RED}❌ Failed to create shipment${NC}"
  echo "Response: $CREATE_RESPONSE" | jq .
fi
echo ""

echo "========================================="
echo "  Test Complete"
echo "========================================="
