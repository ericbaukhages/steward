# Steward

A self-hosted operating environment for managing knowledge, commitments, and context.

The system is the product. The website, handheld clients, dashboards, and voice interfaces are windows into the same shared world model.

- [docs/roadmap.md](./docs/roadmap.md) — vision, principles, and development phases
- [docs/mvp-plan.md](./docs/mvp-plan.md) — implementation plan for the minimum viable product
- [ARCHITECTURE.md](./ARCHITECTURE.md) — how the pieces fit together
- [AGENTS.md](./AGENTS.md) — guide for coding agents working on Steward
- [docs/spec.md](./docs/spec.md) — original system concept and PADD overview

---

## Development setup

This repository is a **pnpm workspace** managed with a **Nix flake**. Enter the development shell with:

```bash
nix develop
# or, if you use direnv:
direnv allow
```

The flake provides Node.js 22 and pnpm. No system-wide installation required.

## Project structure

```
steward/
├── apps/
│   └── api/              # AdonisJS v6 backend + Edge/HTMX web client
├── packages/
│   ├── sdk/              # Shared API types and client
│   └── ui/               # Shared Tailwind theme and CSS variables
├── docker-compose.yml
├── flake.nix             # Nix development environment
└── package.json          # pnpm workspace root
```

## Common commands

```bash
# Install all workspace dependencies
pnpm install

# Build shared packages
pnpm --filter @steward/sdk build

# Start the Adonis dev server
pnpm --filter @steward/api dev

# Typecheck the API
pnpm --filter @steward/api typecheck

# Build the API for production
pnpm --filter @steward/api build
```

## Docker deployment

Copy `.env.example` to `.env`, set a real `APP_KEY`, then run:

```bash
docker compose up --build
```

The API will be available at http://localhost:3333. SQLite data is persisted in the `steward-data` Docker volume.
