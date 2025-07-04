# X-Clone API Gateway

This is the API Gateway for the X-Clone application, built with Express Gateway. It acts as a single entry point for all microservices.

## 🏗️ Architecture Overview

The API Gateway serves as the central hub that:

- Routes requests to appropriate microservices
- Handles cross-cutting concerns (CORS, rate limiting, logging)
- Provides a unified API interface for frontend applications
- Manages service discovery and load balancing


## 🚀 Features

- **Request Routing**: Smart routing to microservices based on path patterns
- **CORS Support**: Configurable cross-origin resource sharing
- **Rate Limiting**: Protect services from abuse with configurable limits
- **Request Logging**: Comprehensive logging for monitoring and debugging
- **Health Checks**: Built-in health check endpoints
- **Environment-based Configuration**: Flexible configuration via environment variables
- **Redis Integration**: Session management and rate limiting storage

## 📁 Project Structure

```
api-gateway/
├── config/
│   ├── gateway.config.yml      # Main gateway configuration
│   ├── system.config.yml       # System-level settings
│   └── models/                 # Data models for users, apps, credentials
├── logs/                       # Application logs
├── server.js                   # Main application entry point
├── package.json                # Dependencies and scripts
├── Dockerfile                  # Container configuration
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 22+
- Redis server

### Local Development Setup

1. **Clone and Navigate**

   ```bash
   cd app-monorepo/services/api-gateway
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Configuration**

   ```bash
   cp .env.example .env
   ```

4. **Start Redis** (if running locally)

   ```bash
   redis-server
   ```

5. **Run the Gateway**

   ```bash
   # Development mode with auto-reload
   pnpm run dev

   # Production mode
   pnpm start
   ```


## 🔧 Configuration

### Gateway Configuration (`config/gateway.config.yml`)

The gateway configuration defines:

- **API Endpoints**: Path patterns and host configurations
- **Service Endpoints**: Backend service URLs
- **Pipelines**: Request processing chains with policies
- **Policies**: CORS, rate limiting, logging, and proxying rules

### System Configuration (`config/system.config.yml`)

System-level settings including:

- Redis connection settings
- Logging configuration
- CORS global settings
- Rate limiting defaults



## 🔍 Monitoring & Logging

### Application Logs

Logs are written to `./logs/gateway.log` and include:

- Request/response details
- Error information
- Performance metrics
- Rate limiting events

### Admin Interface

Access the admin interface at `http://localhost:9876` for:

- Runtime configuration updates
- Monitoring and metrics
- User and application management

### Health Monitoring

Monitor gateway health via:

```bash
curl http://localhost:8080/health
```

## 🚦 Rate Limiting

The gateway implements intelligent rate limiting:

- **Default Limit**: 100 requests per 15 minutes per IP
- **Strict Limit**: 10 requests per 15 minutes for sensitive endpoints
- **Storage**: Redis-backed for distributed rate limiting
- **Headers**: Rate limit info included in response headers

## 🔒 Security Features

- **CORS Protection**: Configurable origin whitelist
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **Request Validation**: Input sanitization and validation
- **Secure Headers**: Security-focused HTTP headers
- **Environment Isolation**: Separate configs for dev/staging/prod
