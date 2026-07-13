# Steward MVP Plan

> This document records the implementation plan for Steward's minimum viable product. It covers the chosen stack, project structure, data model, API surface, web client, MCP integration, and deployment approach.
>
> For the project's vision and long-term direction, see [roadmap.md](./roadmap.md) and [ARCHITECTURE.md](../ARCHITECTURE.md).

---

## Goal

Build a self-hosted, local-first foundation for Steward. The MVP delivers a single AdonisJS backend with a tasks-and-projects world model, a simple HTMX web client, auto-generated OpenAPI documentation, an MCP server module, and Docker-based deployment for a homelab.

This aligns with **Phase 0 — Foundation** and the beginning of **Phase 1 — World Model** from the roadmap.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Language | TypeScript |
| Backend framework | AdonisJS 6 |
| ORM | Lucid |
| Database | SQLite default, PostgreSQL optional via environment config |
| Validation | VineJS |
| Authentication | AdonisJS Auth with session cookie guard |
| Web templating | Edge.js |
| Frontend interactions | HTMX |
| Styling | TailwindCSS with CSS-variable themes |
| API documentation | `adonis-autoswagger` |
| MCP server | Module inside `apps/api`, stdio transport, `@modelcontextprotocol/sdk` |
| Monorepo tool | pnpm workspaces |
| Development environment | Nix flake |
| Containerization | Docker + Docker Compose |
| Test runner | Japa |

---

## Monorepo Structure

```
steward/
├── apps/
│   └── api/                      # AdonisJS backend + web client
│       ├── app/                  # Controllers, models, services, validators
│       ├── resources/
│       │   ├── views/            # Edge templates
│       │   └── css/              # App-specific styles
│       ├── database/
│       │   └── migrations/
│       ├── start/
│       │   ├── routes.ts
│       │   └── kernel.ts
│       ├── Dockerfile
│       ├── adonisrc.ts
│       ├── ace.js
│       └── package.json
│
├── packages/
│   ├── sdk/                      # Shared API types and client
│   │   ├── src/
│   │   │   └── types/            # Project, Task, etc.
│   │   └── package.json
│   │
│   └── ui/                       # Shared Tailwind theme and CSS
│       ├── src/
│       │   ├── theme.css         # CSS custom properties for themes
│       │   └── tailwind.config.ts
│       └── package.json
│
├── docker-compose.yml
├── .env.example
├── pnpm-workspace.yaml
├── package.json
├── flake.nix                     # Nix development environment
├── flake.lock
└── .envrc                        # direnv integration
```

---

## Data Model

### User

Managed by AdonisJS Auth:

- `id`
- `email`
- `password` (bcrypt)
- timestamps

### Project

- `id`: UUID
- `name`: string
- `description`: text, nullable
- `status`: enum `active` | `archived` | `completed`
- timestamps

### Task

- `id`: UUID
- `project_id`: foreign key to `projects.id`, nullable
- `title`: string
- `description`: text, nullable
- `status`: enum `todo` | `in_progress` | `done`
- `due_date`: datetime, nullable
- timestamps

**Relationship:** `Project hasMany Task`, `Task belongsTo Project`.

---

## REST API

All JSON endpoints are under `/api`.

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/projects` | List projects |
| `POST` | `/api/projects` | Create project |
| `GET` | `/api/projects/:id` | Get a project |
| `PATCH` | `/api/projects/:id` | Update a project |
| `DELETE` | `/api/projects/:id` | Delete a project |
| `GET` | `/api/projects/:id/tasks` | List tasks in a project |
| `GET` | `/api/tasks` | List tasks |
| `POST` | `/api/tasks` | Create task |
| `GET` | `/api/tasks/:id` | Get a task |
| `PATCH` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

OpenAPI documentation is served at `/docs` via Swagger UI.

---

## Web Client

HTML routes live outside `/api`. The client is intentionally thin: Edge templates render pages, and HTMX handles partial updates where helpful. Full-page form posts are acceptable to keep interactions simple.

| Route | Purpose |
|---|---|
| `GET /` | Dashboard / project list |
| `GET /projects` | Project list |
| `GET /projects/new` | New project form |
| `POST /projects` | Create project |
| `GET /projects/:id` | Project detail with tasks |
| `GET /projects/:id/edit` | Edit project form |
| `PATCH /projects/:id` | Update project |
| `DELETE /projects/:id` | Delete project |
| `GET /tasks` | Task list |
| `GET /tasks/new` | New task form |
| `POST /tasks` | Create task |
| `GET /tasks/:id/edit` | Edit task form |
| `PATCH /tasks/:id` | Update task |
| `DELETE /tasks/:id` | Delete task |

---

## Theme System

The MVP supports multiple themes from day one:

- `packages/ui/src/theme.css` defines CSS custom properties such as `--color-bg`, `--color-surface`, `--color-text`, and `--color-primary`.
- `packages/ui/tailwind.config.ts` maps these properties into Tailwind's color scale.
- Theme classes include `.theme-light`, `.theme-dark`, and `.theme-steward`.
- The active theme class is applied to `<html>` based on a user preference cookie or localStorage, falling back to `prefers-color-scheme`.
- Shared Edge components live in `packages/ui/src/components/`.

This makes themes swappable without rebuilding the application.

---

## MCP Server Module

Location: `apps/api/app/mcp/`

The MCP server uses the **stdio** transport, which is the standard for local MCP clients such as Claude Desktop. It exposes tools that call the shared service layer (`app/services/`), not the HTTP API directly. The REST API remains the canonical external boundary.

Initial tools:

- `list_projects`
- `create_project`
- `update_project`
- `delete_project`
- `list_tasks`
- `create_task`
- `update_task`
- `delete_task`
- `complete_task`

---

## Docker Deployment

- `apps/api/Dockerfile` builds the AdonisJS application in multiple stages.
- `docker-compose.yml` defines the `steward-api` service and persists the SQLite database file via a named volume at `/app/data`.
- An optional `steward-db` PostgreSQL service can be enabled by uncommenting it in `docker-compose.yml` and switching `DB_CONNECTION`.
- `.env.example` documents all required configuration:
  - `DB_CONNECTION=sqlite` or `pg`
  - `DATABASE_URL`
  - `SESSION_DRIVER=cookie`
  - `APP_KEY`
  - `NODE_ENV`

---

## Key Dependencies

### Root workspace

- `pnpm`
- `pnpm-workspace.yaml`

### `apps/api`

- `@adonisjs/core`
- `@adonisjs/lucid`
- `@adonisjs/auth`
- `@adonisjs/session`
- `@adonisjs/static`
- `@adonisjs/cors`
- `edge.js`
- `better-sqlite3`
- `pg`
- `adonis-autoswagger`
- `@modelcontextprotocol/sdk`
- `luxon`
- `typescript`, `ts-node`, `pino-pretty`

### `packages/ui`

- `tailwindcss`
- `@tailwindcss/forms`
- `postcss`
- `autoprefixer`

---

## Implementation Milestones

| # | Milestone | Acceptance Criteria |
|---|---|---|
| 1 | Scaffold monorepo | `pnpm install` works; `docker compose up` starts the app; Adonis dev server runs |
| 2 | Auth and users | Login/logout HTML flows work; session cookie auth is in place; a seeded admin user exists |
| 3 | Project/Task CRUD (API) | All `/api/*` endpoints work; Japa tests pass for create, read, update, and delete |
| 4 | Project/Task CRUD (Web UI) | HTMX and Edge forms work; list, detail, create, edit, and delete flows are functional |
| 5 | Themes | Light, dark, and steward themes render correctly; theme preference persists |
| 6 | OpenAPI docs | `/docs` serves Swagger UI generated from validators |
| 7 | MCP server | The MCP server starts over stdio; tools call the service layer successfully |
| 8 | Homelab deploy docs | Docker Compose deployment guide is written; SQLite backup notes are included |

---

## Risks and Notes

- **AdonisJS v6 is ESM-only.** Configuration files and imports must use ESM syntax.
- **MCP stdio transport** runs the server as a subprocess of the client. HTTP or SSE transports can be added later without changing the tool implementations.
- **SQLite concurrency** is sufficient for a single AdonisJS process. If multiple app instances are deployed, switch to PostgreSQL.
- **Session cookies in containers** require a stable `APP_KEY`. Using the cookie session driver avoids server-side session storage for the MVP.
- **AI is an interface, not a decision maker.** The MCP server proposes operations; the user or deterministic system confirms them. The world model remains the source of truth.

---

## Related Documents

- [roadmap.md](./roadmap.md) — Vision, principles, and development phases
- [ARCHITECTURE.md](../ARCHITECTURE.md) — How the major components fit together
- [spec.md](./spec.md) — Original system concept and PADD overview
