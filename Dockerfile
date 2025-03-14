# Stage 1: Build
FROM node:20-bookworm-slim AS build

WORKDIR /front

COPY package*.json ./
RUN npm install --quiet --no-optional --no-fund --loglevel=error

COPY . .
RUN npm run build

# Stage 2: Final image
FROM node:20-bookworm-slim

WORKDIR /front

COPY package*.json ./
RUN npm install --omit=dev --quiet --no-optional --no-fund --loglevel=error

COPY --from=build /front/.next .next
COPY --from=build /front/public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]