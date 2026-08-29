# Bambral 3D Studio - Backend API

A Node.js/Express backend with Prisma ORM and PostgreSQL for the Bambral 3D Studio full-stack application.

## Features

- **Full CRUD Operations** for Projects, Journal Posts, Inquiries, Configurations, Products, Materials, Gemstones
- **Authentication & Authorization** with JWT tokens
- **Rate Limiting** and security middleware (Helmet, CORS)
- **PostgreSQL** with Prisma ORM
- **Input Validation** with Zod
- **Comprehensive Error Handling**
- **Docker Support** for local development
- **GitHub Actions CI/CD** with security scanning

## Tech Stack

- Node.js 22 + Express
- TypeScript
- Prisma ORM
- PostgreSQL 16
- JWT Authentication
- Zod Validation
- Vitest for testing

## Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL 16+
- pnpm (recommended) or npm

### Local Development

1. **Install dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Set up environment**

   ```bash
   cp .env.example .env
   # Edit .env with your database URL and secrets
   ```

3. **Start PostgreSQL** (using Docker Compose from root)

   ```bash
   docker-compose up -d postgres
   ```

4. **Run database migrations**

   ```bash
   npm run prisma:migrate
   ```

5. **Seed the database**

   ```bash
   npm run prisma:seed
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:4000/api`

### Using Docker Compose (Full Stack)

From the project root:

```bash
docker-compose up -d
```

This starts:

- PostgreSQL on port 5432
- Backend API on port 4000
- Frontend on port 5173

## API Endpoints

### Public Endpoints

| Method | Endpoint                         | Description                    |
| ------ | -------------------------------- | ------------------------------ |
| GET    | `/api/health`                    | Health check                   |
| GET    | `/api/projects`                  | List projects (with filters)   |
| GET    | `/api/projects/featured`         | Get featured projects          |
| GET    | `/api/projects/:slug`            | Get project by slug            |
| GET    | `/api/projects/:slug/related`    | Get related projects           |
| GET    | `/api/journal`                   | List journal posts             |
| GET    | `/api/journal/categories`        | Get journal categories         |
| GET    | `/api/journal/:slug`             | Get journal post by slug       |
| POST   | `/api/inquiries`                 | Submit inquiry                 |
| POST   | `/api/configurations`            | Save configuration             |
| GET    | `/api/configurations`            | List configurations            |
| GET    | `/api/configurations/:reference` | Get configuration by reference |
| GET    | `/api/configurations/cuts`       | Get available cuts             |
| GET    | `/api/configurations/finishes`   | Get available finishes         |
| GET    | `/api/products`                  | List products                  |
| GET    | `/api/products/:slug`            | Get product by slug            |
| GET    | `/api/materials`                 | List materials                 |
| GET    | `/api/materials/:id`             | Get material by ID             |
| GET    | `/api/gemstones`                 | List gemstones                 |
| GET    | `/api/gemstones/:id`             | Get gemstone by ID             |

### Authentication

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| POST   | `/api/auth/login`    | Login            |
| POST   | `/api/auth/register` | Register         |
| GET    | `/api/auth/me`       | Get current user |
| POST   | `/api/auth/refresh`  | Refresh token    |

### Admin Endpoints (Requires JWT)

| Method | Endpoint                        | Description           |
| ------ | ------------------------------- | --------------------- |
| POST   | `/api/admin/projects`           | Create project        |
| PATCH  | `/api/admin/projects/:id`       | Update project        |
| DELETE | `/api/admin/projects/:id`       | Delete project        |
| POST   | `/api/admin/journal`            | Create journal post   |
| PATCH  | `/api/admin/journal/:id`        | Update journal post   |
| DELETE | `/api/admin/journal/:id`        | Delete journal post   |
| GET    | `/api/admin/inquiries`          | List inquiries        |
| GET    | `/api/admin/inquiries/:id`      | Get inquiry           |
| PATCH  | `/api/admin/inquiries/:id`      | Update inquiry status |
| DELETE | `/api/admin/inquiries/:id`      | Delete inquiry        |
| DELETE | `/api/admin/configurations/:id` | Delete configuration  |
| POST   | `/api/admin/products`           | Create product        |
| PATCH  | `/api/admin/products/:id`       | Update product        |
| DELETE | `/api/admin/products/:id`       | Delete product        |
| POST   | `/api/admin/materials`          | Create material       |
| PATCH  | `/api/admin/materials/:id`      | Update material       |
| DELETE | `/api/admin/materials/:id`      | Delete material       |
| POST   | `/api/admin/gemstones`          | Create gemstone       |
| PATCH  | `/api/admin/gemstones/:id`      | Update gemstone       |
| DELETE | `/api/admin/gemstones/:id`      | Delete gemstone       |

## Environment Variables

| Variable                  | Description                  | Default               |
| ------------------------- | ---------------------------- | --------------------- |
| `DATABASE_URL`            | PostgreSQL connection string | Required              |
| `PORT`                    | Server port                  | 4000                  |
| `NODE_ENV`                | Environment                  | development           |
| `FRONTEND_URL`            | Frontend URL for CORS        | http://localhost:5173 |
| `JWT_SECRET`              | JWT signing secret           | Required              |
| `RATE_LIMIT_WINDOW_MS`    | Rate limit window            | 900000                |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window      | 100                   |

## Database Schema

### Models

- **User** - Admin users with authentication
- **Project** - Portfolio projects with categories
- **JournalPost** - Blog/journal articles
- **Inquiry** - Contact form submissions
- **Configuration** - Saved jewelry configurations
- **Product** - Jewelry products for configurator
- **Material** - Precious metals and materials
- **Gemstone** - Available gemstones

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Linting & Formatting

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## Deployment

The project includes GitHub Actions workflows for:

- Continuous Integration (lint, typecheck, tests)
- Security scanning (Trivy, npm audit, TruffleHog)
- Docker image building and pushing to GHCR
- Automated dependency updates

## License

MIT
