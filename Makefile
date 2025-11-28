.PHONY: help dev prod up down logs clean restart seed

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development commands
dev: ## Start development environment
	docker-compose --env-file .env.local up -d
	@echo "Development environment started!"
	@echo "Frontend: http://localhost:3500"
	@echo "Admin: http://localhost:4000"
	@echo "Backend: http://localhost:7000"

dev-build: ## Build and start development environment
	docker-compose --env-file .env.local up -d --build

dev-logs: ## Show development logs
	docker-compose --env-file .env.local logs -f

dev-down: ## Stop development environment
	docker-compose --env-file .env.local down

# Production commands
prod: ## Start production environment
	docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
	@echo "Production environment started!"

prod-build: ## Build and start production environment
	docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

prod-logs: ## Show production logs
	docker-compose -f docker-compose.prod.yml --env-file .env.prod logs -f

prod-down: ## Stop production environment
	docker-compose -f docker-compose.prod.yml --env-file .env.prod down

# Database commands
seed: ## Import seed data to database (development)
	docker-compose --env-file .env.local exec backend npm run data:import

seed-prod: ## Import seed data to database (production)
	docker-compose -f docker-compose.prod.yml --env-file .env.prod exec backend npm run data:import

# Utility commands
logs: ## Show all logs
	docker-compose logs -f

restart: ## Restart all services
	docker-compose restart

clean: ## Remove all containers, volumes, and images
	docker-compose down -v --rmi all
	docker-compose -f docker-compose.prod.yml down -v --rmi all

ps: ## Show running containers
	docker-compose ps

# SSL certificate (Let's Encrypt)
ssl-cert: ## Generate SSL certificate with certbot
	@echo "Make sure to update nginx.conf with your domain first!"
	docker run -it --rm -v $(PWD)/nginx/ssl:/etc/letsencrypt \
		certbot/certbot certonly --standalone \
		-d yourdomain.com -d www.yourdomain.com \
		-d api.yourdomain.com -d admin.yourdomain.com

# Backup commands
backup-db: ## Backup MongoDB database
	@mkdir -p backups
	docker-compose exec -T mongodb mongodump --uri="mongodb://$(MONGO_ROOT_USER):$(MONGO_ROOT_PASSWORD)@localhost:27017/$(MONGO_DB_NAME)?authSource=admin" --out=/tmp/backup
	docker cp victormer-mongodb-prod:/tmp/backup ./backups/backup-$(shell date +%Y%m%d-%H%M%S)
	@echo "Database backup completed!"

restore-db: ## Restore MongoDB database (usage: make restore-db BACKUP=backup-20231201-120000)
	docker cp ./backups/$(BACKUP) victormer-mongodb-prod:/tmp/restore
	docker-compose exec mongodb mongorestore --uri="mongodb://$(MONGO_ROOT_USER):$(MONGO_ROOT_PASSWORD)@localhost:27017/$(MONGO_DB_NAME)?authSource=admin" /tmp/restore
	@echo "Database restore completed!"

# API Testing commands
test-api: ## Test API endpoints (development)
	@echo "Testing API endpoints..."
	@chmod +x test-api.sh
	@./test-api.sh dev

test-api-prod: ## Test API endpoints (production)
	@echo "Testing production API endpoints..."
	@chmod +x test-api.sh
	@./test-api.sh prod

health-check: ## Check health of all services
	@echo "Checking service health..."
	@echo "\n=== Backend Health ==="
	@curl -s http://localhost:7000/health | jq '.' || echo "Backend not responding"
	@echo "\n=== Frontend Health ==="
	@curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3500 || echo "Frontend not responding"
	@echo "\n=== Admin Health ==="
	@curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:4000 || echo "Admin not responding"
	@echo "\n=== MongoDB Health ==="
	@docker-compose exec -T mongodb mongosh --eval "db.adminCommand('ping')" --quiet || echo "MongoDB not responding"

swagger: ## Open Swagger API documentation
	@echo "Opening Swagger UI..."
	@echo "URL: http://localhost:7000/api-docs"
	@command -v xdg-open > /dev/null && xdg-open http://localhost:7000/api-docs || \
	 command -v open > /dev/null && open http://localhost:7000/api-docs || \
	 echo "Please open http://localhost:7000/api-docs in your browser"
