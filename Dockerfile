# Build the (static) client
FROM node:24 AS client-build
WORKDIR /app/client
COPY front-end/ ./
RUN npm install
RUN npm run build

# Build the server
FROM node:24 AS server-build
WORKDIR /app/server
COPY back-end/ ./
RUN npm install
RUN npm run build

# Production image
FROM node:24
WORKDIR /app

# Install server dependencies
COPY back-end/package.json back-end/package-lock.json* ./
RUN npm install --omit=dev

# Copy the built server
COPY --from=server-build /app/server/dist ./dist
COPY --from=server-build /app/server/public ./public

# Copy built client into the folder where static files are served from
COPY --from=client-build /app/client/dist ./public/client

EXPOSE 4000

CMD ["node", "dist/index.js"]
