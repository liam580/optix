FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps

FROM deps AS build
COPY . .
RUN --mount=type=cache,target=/app/node_modules/.cache \
    npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --legacy-peer-deps
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
