# Multi-stage Dockerfile for Admin Panel V2
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 4100
CMD ["npm", "run", "dev", "--", "-p", "4100"]

# Builder stage
FROM base AS builder
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 4100
ENV PORT=4100
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
