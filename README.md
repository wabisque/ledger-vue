# Ledger — A Multi-Stack Accounting Application

> A portfolio project built across multiple frontend and backend stacks to demonstrate breadth of technical skill.
> The same core product, rebuilt from scratch in each technology.

---

## Philosophy

- **Frontend first.** Each implementation begins with a fully working UI before any backend is touched. A mock data layer stands in until the API is ready.
- **Simple and efficient.** No over-engineering. The simplest implementation that works correctly is the right one.
- **Test-driven.** Tests are written before or alongside features, not as an afterthought.
- **Black and white UI.** No time spent on color theory. Clarity and structure over decoration.
- **One stack at a time.** Complete a full vertical slice (frontend → backend) before moving to the next stack.

---

## Technical Conventions

These apply across every implementation:

- **IDs** — All resource IDs are ULIDs
- **Monetary amounts** — Stored as integers in the smallest currency unit (e.g. pesewas, cents). Never floats.
- **Multi-currency** — Every monetary field carries a `currency_code` (ISO 4217). Conversion happens at read time using historical exchange rates, never at write time.
- **Database schema** — All backends must implement schemas in Third Normal Form (3NF). No redundant storage of derivable data.
- **HTTP status codes** — `201` for creation, `200` for reads/updates/deletes, `422` for validation errors
- **Error shape** — All errors return `{ code, message, errors? }`. See the Auth Module document for the full error code list.

---

## Feature Scope

| Module | Description |
|---|---|
| Authentication | Register, login, logout, protected routes |
| Dashboard | Summary of income, expenses, net balance |
| Chart of Accounts | Manage account categories (Asset, Liability, Equity, Income, Expense) |
| Transactions | Journal entries with debit/credit lines |
| Invoices | Create and track client invoices |
| Expenses | Log and categorize business expenses |
| Reports | Profit & Loss, Balance Sheet |

---

## Data Models

```
User
 ├── Accounts
 ├── Transactions
 │    └── TransactionLines → each line references an Account
 ├── Invoices
 │    └── InvoiceItems
 └── Expenses → references an Account
```

Reports are derived — they are queries over TransactionLines grouped by Account type. No dedicated model required.

---

## Stack Plan

### Frontend
| # | Stack | Status |
|---|---|---|
| 1 | Vue.js | 🔲 Not started |
| 2 | Nuxt.js | 🔲 Not started |
| 3 | React | 🔲 Not started |
| 4 | Next.js | 🔲 Not started |
| 5 | Angular | 🔲 Not started |
| 6 | Kotlin (Compose / KMP) | 🔲 Not started |
| 7 | Swift (SwiftUI) | 🔲 Not started |
| 8 | Flutter | 🔲 Not started |

### Backend
| # | Stack | Status |
|---|---|---|
| 1 | Express (Node.js) | 🔲 Not started |
| 2 | Fastify (Node.js) | 🔲 Not started |
| 3 | Laravel (PHP) | 🔲 Not started |
| 4 | Django (Python) | 🔲 Not started |
| 5 | Spring Boot (Java) | 🔲 Not started |
| 6 | ASP.NET Core (C#) | 🔲 Not started |

---

## Roadmap

### Phase 0 — Foundation (Stack-agnostic)
> Do this once. Every implementation inherits from it.

- [ ] Finalize and document all data models
- [ ] Define API contract (routes, request/response shapes) — this becomes the mock data spec
- [ ] Define shared UI component list (forms, tables, cards, nav)
- [ ] Set up GitHub repository with a clear folder structure per stack

---

### Phase 1 — Vue.js Frontend + Express Backend
> The reference implementation. Every future stack is ported from this one.

#### 1A — Vue.js Frontend

**Setup**
- [ ] Scaffold project with Vite + Vue 3
- [ ] Configure Vue Router for navigation
- [ ] Configure Pinia for state management
- [ ] Set up Vitest for unit testing
- [ ] Set up a mock data layer (static JSON or a simple mock store) to stand in for the API

**Authentication (TDD)**
- [ ] Write tests for login form validation
- [ ] Build login page
- [ ] Write tests for registration form validation
- [ ] Build registration page
- [ ] Write tests for forgot-password form
- [ ] Build forgot-password page
- [ ] Write tests for reset-password form (token + new password)
- [ ] Build reset-password page
- [ ] Implement auth state in Pinia (isLoggedIn, currentUser)
- [ ] Implement protected route guards

**Dashboard (TDD)**
- [ ] Write tests for summary calculation logic
- [ ] Build dashboard layout with summary cards
- [ ] Wire up to mock data

**Chart of Accounts (TDD)**
- [ ] Write tests for account list rendering
- [ ] Write tests for add/edit/delete account logic
- [ ] Build accounts list page
- [ ] Build add/edit account form

**Transactions (TDD)**
- [ ] Write tests for transaction form (debit/credit balance validation)
- [ ] Build transactions list page
- [ ] Build journal entry form with dynamic debit/credit lines
- [ ] Enforce that debits must equal credits before submission

**Invoices (TDD)**
- [ ] Write tests for invoice total calculation (quantity × unit price)
- [ ] Build invoice list page
- [ ] Build create/edit invoice form with line items
- [ ] Build invoice detail/view page

**Expenses (TDD)**
- [ ] Write tests for expense form validation
- [ ] Build expenses list page
- [ ] Build add/edit expense form

**Reports (TDD)**
- [ ] Write tests for P&L calculation logic
- [ ] Write tests for Balance Sheet calculation logic
- [ ] Build Profit & Loss report page
- [ ] Build Balance Sheet report page

---

#### 1B — Express Backend

**Setup**
- [ ] Scaffold Express project
- [ ] Set up PostgreSQL (or SQLite for simplicity) with an ORM (Sequelize or Prisma)
- [ ] Run migrations for all data models
- [ ] Configure Jest + Supertest for API testing
- [ ] Set up environment config (.env)

**Authentication (TDD)**
- [ ] Write tests for POST /auth/register
- [ ] Write tests for POST /auth/login
- [ ] Write tests for POST /auth/forgot-password
- [ ] Write tests for POST /auth/reset-password
- [ ] Implement JWT-based auth middleware
- [ ] Implement all auth routes

**Accounts (TDD)**
- [ ] Write tests for CRUD routes
- [ ] Implement GET /accounts
- [ ] Implement POST /accounts
- [ ] Implement PUT /accounts/:id
- [ ] Implement DELETE /accounts/:id

**Transactions (TDD)**
- [ ] Write tests for transaction creation with line validation
- [ ] Implement GET /transactions
- [ ] Implement POST /transactions (validate debit = credit)
- [ ] Implement GET /transactions/:id
- [ ] Implement DELETE /transactions/:id

**Invoices (TDD)**
- [ ] Write tests for invoice CRUD
- [ ] Implement full invoice CRUD routes
- [ ] Implement PATCH /invoices/:id/status

**Expenses (TDD)**
- [ ] Write tests for expense CRUD
- [ ] Implement full expense CRUD routes

**Reports (TDD)**
- [ ] Write tests for report query logic
- [ ] Implement GET /reports/profit-and-loss
- [ ] Implement GET /reports/balance-sheet

**Integration**
- [ ] Replace Vue mock data layer with real API calls
- [ ] Handle loading and error states in the UI
- [ ] End-to-end smoke test of all features

---

### Phase 2 — Nuxt.js Frontend + Fastify Backend
- Follow the same checklist structure as Phase 1
- Key difference: Nuxt introduces SSR — pay attention to data fetching patterns (useFetch, useAsyncData)
- Fastify is close to Express but has a schema-based validation system worth learning

---

### Phase 3 — React Frontend + Laravel Backend
- React introduces a new mental model (hooks, JSX) — take the time to understand it before rushing
- Laravel has its own ORM (Eloquent) and opinionated structure — lean into it rather than fighting it

---

### Phase 4 — Next.js Frontend + Django Backend
- Next.js blends frontend and backend — decide early whether to use it as frontend-only or use its API routes
- Django REST Framework is very productive once set up; the admin panel is a bonus

---

### Phase 5 — Angular Frontend + Spring Boot Backend
- Angular is the most opinionated frontend framework on this list — modules, decorators, dependency injection
- Spring Boot is similarly structured and verbose; expect more boilerplate than other stacks

---

### Phase 6 — Kotlin (Compose Multiplatform)
- Target desktop or Android
- Shares backend with any of the above

---

### Phase 7 — Swift (SwiftUI)
- Target iOS or macOS
- Shares backend with any of the above

---

## Folder Structure (Repository)

```
ledger/
├── frontend/
│   ├── vue/
│   ├── nuxt/
│   ├── react/
│   ├── next/
│   ├── angular/
│   ├── kotlin/
│   └── swift/
├── backend/
│   ├── express/
│   ├── fastify/
│   ├── laravel/
│   ├── django/
│   ├── spring/
│   └── dotnet/
└── README.md
```

---

## Definition of Done (Per Stack)

A stack implementation is considered complete when:

1. All listed features are implemented and functional
2. All tests pass
3. The frontend communicates with its paired backend
4. The app can be run locally with a single setup command
5. A brief `README.md` exists inside the stack folder explaining how to run it

---

## Current Focus

> **Phase 1A — Vue.js Frontend**
> Setting up project scaffold, routing, state management, and mock data layer.