# Multi-stage Dockerfile for Frontend
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development stage (lightweight for laptop)
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Builder stage
FROM base AS builder
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build

# Production stage (optimized)
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
