@echo off
REM Windows batch script to clean and restart Docker environment

echo ===================================================
echo Starting Fresh Docker Environment Setup
echo ===================================================
echo.

echo Step 1: Stopping all containers...
docker-compose down 2>nul
docker stop $(docker ps -aq) 2>nul
echo Done.
echo.

echo Step 2: Removing all containers...
docker rm -f $(docker ps -aq) 2>nul
echo Done.
echo.

echo Step 3: Removing all images...
docker rmi -f $(docker images -q) 2>nul
echo Done.
echo.

echo Step 4: Removing all volumes...
docker volume prune -f
echo Done.
echo.

echo Step 5: Removing all networks...
docker network prune -f
echo Done.
echo.

echo Step 6: Clearing build cache...
docker builder prune -af
echo Done.
echo.

echo Step 7: Building and starting containers...
echo This may take 5-10 minutes...
docker-compose up -d --build
echo Done.
echo.

echo Step 8: Waiting for services to start...
timeout /t 15 /nobreak >nul
echo Done.
echo.

echo Step 9: Seeding database...
docker-compose exec -T backend node seed.js
echo Done.
echo.

echo ===================================================
echo Setup Complete!
echo ===================================================
echo.
echo Service URLs:
echo   Frontend:     http://localhost:3000
echo   Admin Panel:  http://localhost:4000
echo   Backend API:  http://localhost:7000
echo   API Docs:     http://localhost:7000/api-docs
echo.
echo Admin Login:
echo   Email:    dorothy@gmail.com
echo   Password: 123456
echo.
echo Press any key to exit...
pause >nul
