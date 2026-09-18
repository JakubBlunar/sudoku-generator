# syntax=docker/dockerfile:1
#
# Multi-stage build for the sudoku generator.
# Uses Next.js "standalone" output (.next.config.js -> output: 'standalone')
# so the runtime image is a single node server + its own node_modules, no npm
# install needed at run time and no public ports (Traefik routes on the web net).

# ---- Stage 1: install dependencies -----------------------------------------
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- Stage 2: build the app ------------------------------------------------
FROM node:24-alpine AS build
WORKDIR /app
# Public origin used for og:/twitter: meta tags, baked in at build time.
# Passed from docker-compose.yml (build.args), which derives it from SUDOKU_HOST.
ARG NEXT_PUBLIC_SITE_URL=https://sudoku.jablu.sk
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Stage 3: slim runtime -------------------------------------------------
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
# Run as an unprivileged user.
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# standalone/ = server.js + pruned node_modules + minimal app files.
# static/ and public/ are not part of standalone and must be copied over.
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
