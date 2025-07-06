# Build stage
FROM node:20-slim AS base

WORKDIR /usr/src/app

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package.json and pnpm-lock.yaml for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the NestJS application
RUN pnpm run build

# Production stage
FROM node:20-slim

WORKDIR /usr/src/app

# Enable pnpm in the final stage
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package.json and pnpm-lock.yaml for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy the compiled dist folder from the build stage
COPY --from=base /usr/src/app/dist ./dist

# Expose the port (adjust if needed)
EXPOSE 3000

# Start the NestJS application
CMD ["node", "dist/main.js"]
