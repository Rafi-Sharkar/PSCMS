
# PSCMS — Poultry Supply Chain Management System (Backend-first)

This repository is a Turborepo monorepo. The primary focus of this project is the NestJS backend API which implements the core domain and business logic for a Poultry Supply Chain Management System (PSCMS). The frontend is a Next.js application that consumes the backend API — short note about Next.js is included below.

The backend is implemented with NestJS following domain-driven modular structure: controllers, services, modules, DTOs, and Prisma for persistence. Authentication uses JWT and simple role-based authorization guards.

This README focuses on the NestJS concepts used in the project, how to run and extend the backend, and where core domain logic lives.

## High level project concept

- Purpose: manage poultry farm stock, collections, orders, owner orders and business entities.
- Backend-first: all core logic, validation, and persistence live in the NestJS API.
- Frontend: a Next.js app (in `apps/frontend`) provides the UI; it expects the API to be available at an address configured by environment variables.

## Repository layout (backend-focused)

- apps/backend/ — NestJS API server
  - src/
    - auth/ — authentication, JWT, guards
    - users/ — users controller, services, DTOs
    - business/ — business lifecycle and owner interactions
    - farm_stock/ — farm stock CRUD (farmer-owned)
    - collection/ — collection flows (employee/owner)
    - orders/ — customer orders
    - owner_order/ — owner-initiated orders
    - prisma/ — Prisma client & schema
    - generated/ — committed Prisma client artifacts
- apps/frontend/ — Next.js UI (short note below)
- packages/ — shared configs (eslint, tsconfig)

## Key NestJS concepts used and how they map to this project

- Modules — logical feature grouping. For example, `BusinessModule` imports services and controllers related to business operations.
- Controllers — HTTP layer. Each controller (e.g., `BusinessController`) defines routes with decorators like `@Controller`, `@Get()`, `@Post()`. Controllers should stay thin and delegate to services.
- Services — application/business logic. Services contain the core operations (create, update, search) and use Prisma for persistence.
- DTOs (Data Transfer Objects) — request/response shapes and validation. DTOs are declared in each feature's `dto/` folder and used with Nest's validation pipe.
- Guards — authentication/authorization. This project uses `JwtAuthGuard` for authentication and `RoleAuthGuard([...])` for role-based authorization.
- Prisma — ORM for database access. Schema in `apps/backend/prisma/schema.prisma`. Generated client is committed under `generated/` for convenience in some deployments.
- Swagger decorators — used for API documentation (`@ApiOperation`, `@ApiResponse`) in some controllers.

## Backend quick start (detailed)

Prerequisites:

- Node.js >= 18
- npm
- A database compatible with Prisma (e.g., PostgreSQL) and a connection URL

Steps:

1. From repository root, install dependencies:

```powershell
npm install
```

2. Setup backend environment variables. Create `apps/backend/.env` and add at minimum:

```text
DATABASE_URL="postgresql://user:password@localhost:5432/pscms?schema=public"
JWT_SECRET="replace-with-a-secure-secret"
```

3. Generate Prisma client (if you modify schema) and run migrations in dev:

```powershell
cd apps/backend
npx prisma generate
npx prisma migrate dev --name init
```

4. Start the backend in watch mode:

```powershell
cd apps/backend
npm run dev
```

The server will start (by default Nest uses port configured in code or `PORT` env var). API routes are defined in controllers under `src/*/*.controller.ts`.

## How to extend the backend (common tasks)

- Add a new feature module:
  1. Create a new folder under `src/` (e.g., `src/reports`).
  2. Add `reports.module.ts`, `reports.controller.ts`, `reports.service.ts`, and DTOs.
  3. Register the module in `src/app.module.ts` or import where needed.

- Add a new Prisma model:
  1. Edit `apps/backend/prisma/schema.prisma`.
  2. Run `npx prisma migrate dev --name add_reports`.
  3. Run `npx prisma generate`.

- Protect routes with roles:
  - Use `@UseGuards(JwtAuthGuard, new RoleAuthGuard(["ROLE_NAME"]))` on controller methods or at controller-level.

## Testing and linting (backend)

- Run unit tests (Jest):

```powershell
cd apps/backend
npm test
```

- Run e2e tests:

```powershell
cd apps/backend
npm run test:e2e
```

- Lint and format:

```powershell
npm run lint
npm run format
```

## Short note about the frontend (Next.js)

- The frontend is implemented in `apps/frontend` using Next.js App Router. It's primarily a consumer of the backend API. Configure `NEXT_PUBLIC_API_BASE_URL` (or similar env variable) to point to the backend server during development.

## Where to look for domain logic

- Controllers: `apps/backend/src/*/*.controller.ts`
- Services: `apps/backend/src/*/*.service.ts` — main business rules
- DTOs: `apps/backend/src/*/dto/*.ts` — request validation shapes
- Prisma schema and generated client: `apps/backend/prisma` and `apps/backend/generated/prisma`

## Next steps I can help with

- Add an `apps/backend/ENDPOINTS.md` (already created) or export OpenAPI JSON.
- Add example `.env.example` files.
- Generate curl examples or Postman collection for the API.
- Add Dockerfile and docker-compose for local dev.

Tell me which one you'd like next and I'll implement it.
