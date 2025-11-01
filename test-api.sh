#!/bin/bash

# Customer Care API Test Script
# This script tests all API endpoints

echo "🧪 Customer Care API Test Suite"
echo "================================"
echo ""

API_URL="http://localhost:3001"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to test endpoint
test_endpoint() {
    local name=$1
    local method=$2
    local endpoint=$3
    local data=$4
    
    echo -n "Testing $name... "
    
    if [ "$method" = "POST" ]; then
        response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    else
        response=$(curl -s -w "\n%{http_code}" "$API_URL$endpoint")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
        echo -e "${GREEN}✓ PASSED${NC} (HTTP $http_code)"
        echo "   Response: $(echo $body | jq -c '.' 2>/dev/null || echo $body)"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAILED${NC} (HTTP $http_code)"
        echo "   Response: $body"
        ((FAILED++))
    fi
    echo ""
}

# Check if server is running
echo "Checking if API server is running..."
if ! curl -s "$API_URL/health" > /dev/null 2>&1; then
    echo -e "${RED}✗ API server is not running!${NC}"
    echo ""
    echo "Please start the server first:"
    echo "  npm run server"
    echo ""
    exit 1
fi
echo -e "${GREEN}✓ API server is running${NC}"
echo ""

# Run tests
echo "Running API tests..."
echo ""

# Test 1: Health Check
test_endpoint "Health Check" "GET" "/health"

# Test 2: Greeting Intent
test_endpoint "Greeting Intent" "POST" "/api/chat" \
    '{"message": "Hello, how are you?"}'

# Test 3: Billing Intent
test_endpoint "Billing Intent" "POST" "/api/chat" \
    '{"message": "I have a question about my invoice", "conversationId": "test-billing-123"}'

# Test 4: Technical Intent
test_endpoint "Technical Intent" "POST" "/api/chat" \
    '{"message": "The app is not working and keeps crashing", "conversationId": "test-tech-456"}'

# Test 5: Support Intent
test_endpoint "Support Intent" "POST" "/api/chat" \
    '{"message": "I need help with my account", "conversationId": "test-support-789"}'

# Test 6: Conversation History
test_endpoint "Conversation History" "GET" "/api/chat/history/test-billing-123"

# Test 7: All Conversations
test_endpoint "All Conversations" "GET" "/api/chat/conversations"

# Summary
echo "================================"
echo "Test Summary"
echo "================================"
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo "Total:  $((PASSED + FAILED))"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed${NC}"
    exit 1
fi
