# PSCMS — Poultry Supply Chain Management System

This repository is a monorepo managed with Turborepo. It contains a Next.js frontend and a NestJS backend that work together to provide a Poultry Supply Chain Management System (PSCMS).

This README gives an overview of the project structure, setup and development commands, deployment notes, and pointers for contributors.

## Repository layout

- apps/
  - backend/      — NestJS API server (Prisma, Swagger, JWT auth)
  - frontend/     — Next.js (App Router) frontend (React 19)
- packages/
  - eslint-config/ — shared ESLint configs
  - typescript-config/ — shared TypeScript configs
- ui/            — small shared UI components

Top-level scripts are provided via the root `package.json` which uses Turborepo to run tasks across packages.

## Quick start (development)

Prerequisites:

- Node.js >= 18 (project `engines` requires >=18)
- npm (the repository uses the `packageManager` field: npm@11.4.2 was used to create it)
- (Optional) PostgreSQL or another database supported by Prisma for local development

1. Install dependencies from the repository root:

```powershell
npm install
```

2. Create a `.env` file for the backend. See the "Environment variables" section below for recommended variables.

3. Run the development stack (uses turbo to run both apps):

```powershell
npm run dev
```

This runs Turborepo's `dev` task which starts the frontend Next.js server and the backend NestJS server (watch mode) concurrently according to each app's `package.json` scripts.

You can also start apps individually:

```powershell
# Frontend (Next.js)
cd apps/frontend; npm run dev

# Backend (NestJS)
cd apps/backend; npm run dev
```

## Scripts

From repository root (uses Turborepo):

- `npm run dev`   — Run development servers for all apps (turbo run dev)
- `npm run build` — Build all apps (turbo run build)
- `npm run lint`  — Run lint for all packages
- `npm run format` — Format codebase (Prettier)
- `npm run check-types` — Run TypeScript checks via turbo

App-level scripts (examples):

- `apps/frontend/package.json`
  - `dev` — next dev --turbopack
  - `build` — next build --turbopack
  - `start` — next start

- `apps/backend/package.json`
  - `dev` — nest start --watch
  - `build` — nest build
  - `start` — nest start (production)

## Backend (NestJS) details

- Framework: NestJS v11
- ORM: Prisma (client included in generated folder)
- Auth: JWT and role-based guards (see `src/auth`)

Prisma schema is in `apps/backend/prisma/schema.prisma`. Generated client is available under `apps/backend/generated/prisma` in the repository (committed). When you change the schema, run:

```powershell
cd apps/backend
npx prisma generate
# then migrate (development)
npx prisma migrate dev --name your_migration_name
```

Note: The repo contains a `migrations/` folder with existing migrations.

## Frontend (Next.js) details

- Framework: Next.js 15 (App Router)
- React 19
- Styling: Tailwind CSS

The frontend uses `app/` routes. To connect to the backend, update the API URL in `apps/frontend/lib/api.ts` or use environment variables.

## Environment variables

Create an `.env` file in `apps/backend/` (and an `.env.local` for Next.js if needed). Typical variables:

- `DATABASE_URL` — Prisma database connection string (e.g., postgres://...)
- `JWT_SECRET` — secret used by NestJS JWT module
- `PORT` — port for backend server (defaults used in code if unset)

Example `apps/backend/.env` (do NOT commit secrets):

```text
DATABASE_URL="postgresql://user:password@localhost:5432/pscms?schema=public"
JWT_SECRET="replace-with-a-secure-secret"
```

For the frontend, Next.js environment variables can be placed in `apps/frontend/.env.local` (public variables must be prefixed with NEXT_PUBLIC_). Example:

```text
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## Tests and linting

- Backend tests: `cd apps/backend && npm test` (Jest)
- End-to-end tests: `npm run test:e2e` from backend package (see backend `package.json`)
- Lint: `npm run lint` from repository root (turbo runs lint across packages)

## Docker and deployment

There are no Dockerfiles in the repo by default. For production deployment you can:

- Build the frontend: `cd apps/frontend && npm run build` then `npm run start` (or deploy to Vercel)
- Build the backend: `cd apps/backend && npm run build` then `npm run start:prod`
- Use a managed database and ensure `DATABASE_URL` points to it

If you want Docker setup, I can provide Dockerfiles and a docker-compose configuration in a follow-up.

## Developer notes & conventions

- TypeScript is used across the repo. Keep `tsconfig` settings consistent by using the shared configs in `packages/typescript-config`.
- ESLint rules are shared in `packages/eslint-config`.
- Turborepo is used as the task runner — use `turbo run <task>` filters when you need to target a subset of packages.

## Where to look next (important files)

- `apps/backend/src` — backend source code (controllers, services, prisma integration)
- `apps/backend/prisma/schema.prisma` — database schema and migrations
- `apps/frontend/app` — Next.js app routes and components
- `turbo.json` — turborepo configuration
- `package.json` — root scripts and workspaces

## Contributing

1. Fork or create a branch from `main`.
2. Follow existing linting and formatting rules.
3. Run tests locally (see Tests section).
4. Open a PR with a clear description and testing steps.

## Contact / Maintainers

If you have questions or need help running the project locally, open an issue in this repository with details about your OS, Node.js version, and the command you ran.

---

If you'd like, I can also add:

- Example `.env.example` files for frontend and backend
- Docker and docker-compose files for local development
- A small CONTRIBUTING.md with commit message conventions

Tell me which extras you'd like and I will add them.
