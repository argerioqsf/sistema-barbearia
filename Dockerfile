ARG API_BASE_URL=http://localhost:3333
ARG BASE_URL=http://localhost:3000
ARG NEXT_INTL_TIMEZONE=America/Sao_Paulo

FROM node:20-bullseye-slim AS deps
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:20-bullseye-slim AS builder
ARG API_BASE_URL
ARG BASE_URL
ARG NEXT_INTL_TIMEZONE
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV API_BASE_URL=$API_BASE_URL
ENV BASE_URL=$BASE_URL
ENV NEXT_INTL_TIMEZONE=$NEXT_INTL_TIMEZONE
RUN npm run build

FROM node:20-bullseye-slim AS runner
ARG API_BASE_URL
ARG BASE_URL
ARG NEXT_INTL_TIMEZONE
WORKDIR /app
ENV NODE_ENV=production
ENV API_BASE_URL=$API_BASE_URL
ENV BASE_URL=$BASE_URL
ENV NEXT_INTL_TIMEZONE=$NEXT_INTL_TIMEZONE
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
ENV PORT=3000
EXPOSE 3000
CMD ["node","server.js"]
