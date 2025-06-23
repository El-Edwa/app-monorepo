# Use a slim Node.js image for smaller size
FROM node:20-slim AS base

# Set working directory
WORKDIR /app

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the app for production
RUN pnpm build

# Serve the built app with a lightweight server
FROM node:20-slim
WORKDIR /app
RUN npm install -g serve

COPY --from=base /app/dist ./dist
EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
