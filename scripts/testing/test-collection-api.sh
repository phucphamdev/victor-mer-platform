#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

API_URL="http://localhost:4000/api"

echo -e "${BLUE}=== Testing Collection Category & Collection APIs ===${NC}\n"

# Test 1: Get all collection categories
echo -e "${GREEN}1. Getting all collection categories...${NC}"
curl -s "${API_URL}/collection-category" | jq '.'
echo -e "\n"

# Test 2: Get all collections
echo -e "${GREEN}2. Getting all collections...${NC}"
curl -s "${API_URL}/collection" | jq '.'
echo -e "\n"

# Test 3: Get a specific collection with categories populated
echo -e "${GREEN}3. Getting a specific collection (first one)...${NC}"
COLLECTION_ID=$(curl -s "${API_URL}/collection" | jq -r '.data[0]._id')
if [ ! -z "$COLLECTION_ID" ] && [ "$COLLECTION_ID" != "null" ]; then
  curl -s "${API_URL}/collection/${COLLECTION_ID}" | jq '.'
else
  echo -e "${RED}No collections found${NC}"
fi
echo -e "\n"

# Test 4: Get a specific collection category with collection count
echo -e "${GREEN}4. Getting a specific collection category (first one)...${NC}"
CATEGORY_ID=$(curl -s "${API_URL}/collection-category" | jq -r '.data[0]._id')
if [ ! -z "$CATEGORY_ID" ] && [ "$CATEGORY_ID" != "null" ]; then
  curl -s "${API_URL}/collection-category/${CATEGORY_ID}" | jq '.'
else
  echo -e "${RED}No categories found${NC}"
fi
echo -e "\n"

echo -e "${BLUE}=== Testing Complete ===${NC}"
