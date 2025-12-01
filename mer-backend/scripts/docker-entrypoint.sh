#!/bin/sh

# Docker entrypoint script for backend
# This script runs when the container starts

echo "🚀 Starting backend container..."

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
until nc -z mongodb 27017; do
  echo "   MongoDB is unavailable - sleeping"
  sleep 2
done

echo "✅ MongoDB is ready!"

# Check if database is empty (no admins collection or empty)
echo "🔍 Checking if database needs seeding..."

# Try to connect and check if admins collection exists and has data
ADMIN_COUNT=$(node -e "
const mongoose = require('mongoose');
const { secret } = require('./config/secret');

mongoose.connect(secret.db_url, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(async () => {
  const Admin = require('./model/Admin');
  const count = await Admin.countDocuments();
  console.log(count);
  process.exit(0);
})
.catch(err => {
  console.log('0');
  process.exit(0);
});
" 2>/dev/null || echo "0")

echo "   Found $ADMIN_COUNT admins in database"

# If no admins found, run seed
if [ "$ADMIN_COUNT" -eq "0" ]; then
  echo "📦 Database is empty. Running seed script..."
  node seed.js
  
  if [ $? -eq 0 ]; then
    echo "✅ Database seeded successfully!"
  else
    echo "❌ Failed to seed database"
  fi
else
  echo "✅ Database already has data. Skipping seed."
fi

# Start the application
echo "🎯 Starting Node.js application..."
exec node index.js
