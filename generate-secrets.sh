#!/bin/bash

# Script tự động generate credentials bảo mật cao
# Usage: ./generate-secrets.sh

echo "🔐 Victor Mer Platform - Security Credentials Generator"
echo "=================================================="
echo ""

# Check if openssl is available
if ! command -v openssl &> /dev/null; then
    echo "❌ Error: openssl is not installed"
    exit 1
fi

echo "📝 Generating secure credentials..."
echo ""

# Generate MongoDB credentials
MONGO_USER="victormer_prod_db_master_2024_$(openssl rand -hex 4)"
MONGO_PASS=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-32)
MONGO_DB="victormer_ecommerce_production_$(date +%Y)"

# Generate JWT secrets
TOKEN_SECRET=$(openssl rand -hex 64)
JWT_SECRET=$(openssl rand -hex 64)

# Generate random port offset (to avoid conflicts)
PORT_OFFSET=$((RANDOM % 100))
FRONTEND_PORT=$((3500 + PORT_OFFSET))

echo "✅ Credentials generated successfully!"
echo ""
echo "=================================================="
echo "MONGODB CONFIGURATION"
echo "=================================================="
echo "MONGO_ROOT_USER=$MONGO_USER"
echo "MONGO_ROOT_PASSWORD=$MONGO_PASS"
echo "MONGO_DB_NAME=$MONGO_DB"
echo ""
echo "=================================================="
echo "JWT & TOKEN SECRETS"
echo "=================================================="
echo "TOKEN_SECRET=$TOKEN_SECRET"
echo "JWT_SECRET_FOR_VERIFY=$JWT_SECRET"
echo ""
echo "=================================================="
echo "PORT CONFIGURATION"
echo "=================================================="
echo "FRONTEND_PORT=$FRONTEND_PORT"
echo "BACKEND_PORT=7000"
echo "ADMIN_PORT=4000"
echo ""
echo "=================================================="
echo ""
echo "💡 Copy these values to your .env.prod file"
echo ""
echo "⚠️  IMPORTANT:"
echo "   - Save these credentials in a secure password manager"
echo "   - Never commit .env.prod to git"
echo "   - Change other API keys (Stripe, Cloudinary, etc.) manually"
echo ""

# Option to save to file
read -p "📁 Save to file? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    OUTPUT_FILE="credentials-$(date +%Y%m%d-%H%M%S).txt"
    cat > "$OUTPUT_FILE" << EOF
# Victor Mer Platform - Generated Credentials
# Generated at: $(date)
# ================================================

# MONGODB CONFIGURATION
MONGO_ROOT_USER=$MONGO_USER
MONGO_ROOT_PASSWORD=$MONGO_PASS
MONGO_DB_NAME=$MONGO_DB

# JWT & TOKEN SECRETS
TOKEN_SECRET=$TOKEN_SECRET
JWT_SECRET_FOR_VERIFY=$JWT_SECRET

# PORT CONFIGURATION
FRONTEND_PORT=$FRONTEND_PORT
BACKEND_PORT=7000
ADMIN_PORT=4000

# ================================================
# IMPORTANT: Delete this file after copying to .env.prod
# ================================================
EOF
    echo "✅ Saved to: $OUTPUT_FILE"
    echo "⚠️  Remember to delete this file after use!"
    chmod 600 "$OUTPUT_FILE"
fi

echo ""
echo "🎉 Done!"
