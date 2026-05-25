# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start with ts-node-dev (auto-reload, dev env)
npm run new          # Start with ts-node-dev (stage env)
npm run build        # Compile TypeScript to dist/
npm start            # Run compiled code from dist/
npm run migration    # Run Sequelize migrations
npm run docker:local # Start local PostgreSQL + Redis via Docker
npm run prettier     # Format code
```

There is no test runner configured.

## Architecture

This is a **Clean Architecture + DDD** API. The four layers are:

| Layer | Path | Responsibility |
|---|---|---|
| Domain | `src/domain/entities/` | Pure TS classes; `BaseEntity` provides property-setting utils |
| Application | `src/app/services/`, `src/app/operations/` | Business logic; complex multi-service workflows |
| Infrastructure | `src/infrastructure/database/` | Sequelize models, repositories, mappers; Redis; external integrations |
| Interfaces | `src/interfaces/http/`, `src/interfaces/cron/` | Express controllers, routes, Joi schemas, middlewares, cron jobs |

### Dependency Injection

Awilix container (`container.ts`) auto-registers everything: services, repositories, operations, schemas, cron jobs, and core utilities (`createError`, `db`, `jwt`, `bcrypt`, `joi`). All classes receive dependencies via constructor injection.

### Base Classes

- **`BaseService<TModel, TRepository>`** — provides `getAll()`, `getById()`, `create()`, `bulkCreate()`, `updateById()`, `deleteById()`, pagination, and auto-validates `sub_id` (multi-tenancy guard).
- **`BaseRepository<TModel>`** — wraps Sequelize with filters, ordering, includes, and image compression (`reduceImages()` via `sharp`).
- **`BaseController<Service, Schema>`** — maps HTTP verbs to service methods; provides `getAll`, `getById`, `create`, `updateById`, `deleteById` by default.

Routes are declared with awilix-express's `createController`:

```typescript
export default createController(AchievementsController)
  .prefix('/achievements')
  .get('/', 'getAll')
  .post('/', 'create')
  .get('/:id', 'getById')
  .put('/:id', 'updateById')
  .delete('/:id', 'deleteById');
```

## Database

- **PostgreSQL** schema `task_deck`, ORM is **Sequelize v6**.
- Migrations live in `src/interfaces/http/migrations/`, run via `npm run migration`.
- Model associations defined in `src/infrastructure/database/models/associations.ts`.
- `WerWeekReports` → has many `AchAchievements`, `ChaChallenges`, `LeaLearnings`; has one `MetMetrics`.

### Field Naming Convention

All DB columns use a 3-letter entity prefix:

| Prefix | Entity |
|---|---|
| `usr_` | User |
| `wer_` | WeekReports |
| `ach_` | Achievements |
| `cha_` | Challenges |
| `lea_` | Learnings |
| `met_` | Metrics |
| `gro_` | Group |

Every entity has `[prefix]_id`, `[prefix]_sub_id`, `[prefix]_created_at`, `[prefix]_updated_at`.

## Authentication & Multi-Tenancy

1. `POST /login` → `CreateAuthenticateOperation` validates credentials, issues a JWT.
2. JWT and user status are cached in **Redis** (TTL: 1 hour, or 30 days if `keepConnected`).
3. `authSubscriber.ts` middleware validates every protected route: checks JWT signature and Redis presence; rejects if token is invalid/expired or `usr_status = 0`.
4. Decoded payload (`usr_id`, `gro_id`, `email`, `sub_id`) is attached to the request object.
5. `BaseService` enforces `sub_id` on every read/write — cross-tenant access is blocked automatically.

## Error Handling

Use the injected `createError` (wraps `http-errors`) to throw errors with HTTP status codes. Express catches them centrally — no manual try/catch needed in most service/operation code.

## Key Environment Variables

| Variable | Purpose |
|---|---|
| `NODE_ENV` | `local`, `develop_ext`, `stage_ext`, `production` |
| `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_HOST`, `DB_PORT` | PostgreSQL |
| `REDIS_URL` | Redis connection |
| `TOKEN_SECRET` | JWT signing key |
| `PORT` | HTTP port (default 3000) |

In `local`/`develop_ext`, TypeScript is executed directly. In production, only the compiled `dist/` output runs.
