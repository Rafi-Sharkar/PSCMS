# Backend API Endpoints — PSCMS

This file documents the HTTP endpoints defined in `apps/backend/src` controllers.

Notes:
- Controller prefixes are applied to each route path.
- Guards list shows route protection (JwtAuthGuard, RoleAuthGuard([...])).

---

## Auth (`/auth`) — `apps/backend/src/auth/auth.controller.ts`

- POST /auth/register
  - Description: Register a new user
  - Guards: none

- POST /auth/login
  - Description: User login
  - Guards: none

- GET /auth/me
  - Description: Get user profile
  - Guards: JwtAuthGuard

- PATCH /auth/me/edit
  - Description: Edit user profile
  - Guards: JwtAuthGuard

---

## Business (`/business`) — `apps/backend/src/business/business.controller.ts`

- POST /business
  - Description: Create business
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

- GET /business/mybusiness
  - Description: Get businesses owned by the authenticated owner
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

- DELETE /business/:id
  - Description: Delete business by id
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

- PATCH /business/mybusiness
  - Description: Update the authenticated owner's business
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

- POST /business/users/add
  - Description: Add user to business
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

- GET /business/users
  - Description: Get users in business
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

- DELETE /business/users/:userId
  - Description: Remove user from business
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

- POST /business/farmstock
  - Description: Add farm stock to business
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

- GET /business/farmstock
  - Description: List farm stock for business
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

---

## Collection (`/collection`) — `apps/backend/src/collection/collection.controller.ts`

- POST /collection
  - Description: Create a collection
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

- GET /collection
  - Description: Get collections for employee (authenticated employee)
  - Guards: JwtAuthGuard, RoleAuthGuard(["EMPLOYEE"])

- GET /collection/owner
  - Description: Get collections for owner
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

- GET /collection/:id
  - Description: Get collection by id
  - Guards: JwtAuthGuard, RoleAuthGuard(["EMPLOYEE", "OWNER"])

- PATCH /collection/:id
  - Description: Update a collection
  - Guards: JwtAuthGuard, RoleAuthGuard(["EMPLOYEE"])

---

## Dashboard (`/dashboard`) — `apps/backend/src/dashboard/dashboard.controller.ts`

- (No routes defined in controller)

---

## FarmStock (`/farmstock`) — `apps/backend/src/farm_stock/farm_stock.controller.ts`

- POST /farmstock
  - Description: Create farm stock
  - Guards: JwtAuthGuard, RoleAuthGuard(["FARMER"])

- GET /farmstock
  - Description: Get all farm stocks (public)
  - Guards: none

- GET /farmstock/myfarmstock
  - Description: Get farm stocks for authenticated farmer
  - Guards: JwtAuthGuard, RoleAuthGuard(["FARMER"])

- PATCH /farmstock/myfarmstock/:id
  - Description: Update a farmer's farmstock entry
  - Guards: JwtAuthGuard, RoleAuthGuard(["FARMER"])

- DELETE /farmstock/myfarmstock/:id
  - Description: Delete a farmer's farmstock entry
  - Guards: (not guarded in code — guard commented out)

---

## OwnerOrder (`/ownerorder`) — `apps/backend/src/owner_order/owner_order.controller.ts`

- POST /ownerorder
  - Description: Create owner order
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

- GET /ownerorder
  - Description: Get owner orders for authenticated owner
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

- GET /ownerorder/:id
  - Description: Get owner order by id
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

- PATCH /ownerorder/:id
  - Description: Update owner order by id
  - Guards: none

---

## Orders (`/orders`) — `apps/backend/src/orders/orders.controller.ts`

- POST /orders
  - Description: Create an order (customer)
  - Guards: JwtAuthGuard, RoleAuthGuard(["CUSTOMER"])

- GET /orders/my
  - Description: Get orders for authenticated customer
  - Guards: JwtAuthGuard, RoleAuthGuard(["CUSTOMER"])

- GET /orders/:id
  - Description: Get order by id
  - Guards: JwtAuthGuard, RoleAuthGuard(["CUSTOMER"])

- PATCH /orders/:id
  - Description: Update order by id
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

---

## Users (`/users`) — `apps/backend/src/users/users.controller.ts`

- GET /users
  - Description: Get all users (optionally filter by role via query param `?role=...`)
  - Guards: JwtAuthGuard, RoleAuthGuard(["OWNER"])

- GET /users/:id
  - Description: Get user by id
  - Guards: none

---

If you want this exported as JSON, OpenAPI, or want example curl commands / sample request bodies for routes that accept DTOs, tell me which format and I will generate them next.