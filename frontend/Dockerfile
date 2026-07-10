# Frontend (TanStack Start SSR) production image.
# Builds with the Nitro node-server preset so the app can run as a plain Node server
# (`.output/server/index.mjs`) inside Docker / docker-compose.

# ── Build stage ──
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# VITE_* values are inlined at build time. Default points at the backend published
# on the host (browser calls localhost:5000). Override with --build-arg if needed.
ARG VITE_API_BASE_URL=http://localhost:5000/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV NITRO_PRESET=node-server
RUN npm run build

# ── Runtime stage ──
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
