# Multi-stage Dockerfile for Backend
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development stage (lightweight for laptop)
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .

# Install netcat for health checks
RUN apk add --no-cache netcat-openbsd

# Copy and set permissions for entrypoint script
COPY scripts/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 7000
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# Production stage (optimized)
FROM base AS production
ENV NODE_ENV=production
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app
USER nodejs
EXPOSE 7000
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:7000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"
CMD ["node", "index.js"]
