# Bills Domain Design

> A design for integrating the `bills` prototype data model into Steward as a first-class domain in the knowledge graph.
>
> Source: `../bills/AGENTS.md` and `../bills/README.md`
> Related: [ARCHITECTURE.md](../../ARCHITECTURE.md), [roadmap.md](../roadmap.md), [mvp-plan.md](../mvp-plan.md)

---

## Purpose

The `bills` prototype describes a small, human-readable YAML model for tracking recurring and one-off payment obligations. This document translates that prototype into Steward's layered architecture so it can become part of the shared world model rather than a separate file-based data source.

---

## Concepts

The prototype defines three core ideas:

- **Responsibility** — an abstract grouping for obligations or investments the user cares about.
- **Bill** — a recurring or one-off payment obligation.
- **Account** — a source of funds used to pay bills.

These become entity types in the knowledge graph. Business rules that the prototype encodes through convention move into the logic engine.

---

## Entity Types

### Responsibility

A responsibility represents an area of obligation or investment.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | yes | Stable identifier. |
| `name` | string | yes | Human-readable name. |
| `slug` | string | yes | URL-safe identifier, lowercase, no spaces. |
| `weight` | integer | yes | Relative importance. Higher is more important. |
| `description` | text | no | Short explanation of what belongs here. |
| `created_at` | datetime | yes | Timestamp. |
| `updated_at` | datetime | yes | Timestamp. |

Suggested initial responsibilities:

- `house` — Home, shelter, utilities, maintenance.
- `kids` — Children, activities, childcare.
- `wife` — Partner and shared family obligations.
- `work` — Employment income and obligations.
- `self` — Personal health, growth, and individual needs.

### Account

An account is a source of funds. It may be backed by a manual record, a bank feed integration, or both.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | yes | Stable identifier. |
| `name` | string | yes | Human-readable name. |
| `slug` | string | yes | URL-safe identifier. |
| `kind` | enum | yes | `checking`, `savings`, `credit_card`, `investment`, or `other`. |
| `description` | text | no | Short explanation. |
| `balance` | decimal | no | Last known balance, in account currency. |
| `currency` | string | yes | ISO 4217 code, default `USD`. |
| `data_source` | string | no | Identifier of the integration that provides this account (e.g., `simplefin`). |
| `created_at` | datetime | yes | Timestamp. |
| `updated_at` | datetime | yes | Timestamp. |

Suggested initial accounts:

- `checking` — where bills are paid from.
- `credit_card` — day-to-day expenses.
- `savings` — general savings.
- `photography_savings` — earmarked savings goal.

### Bill

A bill is a payment obligation. It may recur or be one-off.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | yes | Stable identifier. |
| `name` | string | yes | Human-readable name. |
| `slug` | string | yes | URL-safe identifier. |
| `frequency` | enum | yes | `monthly` or `one_off`. Other frequencies may be added later. |
| `due_day_of_month` | integer | no | Required when `frequency` is `monthly`. Day of month, `1`–`31`. |
| `due_date` | date | no | Required when `frequency` is `one_off`. ISO date (`YYYY-MM-DD`). |
| `estimated_amount` | decimal | yes | Expected amount, maintained by the user. |
| `real_amount` | decimal | no | Amount confirmed by a data source. `null` until imported. |
| `currency` | string | yes | ISO 4217 code, default `USD`. |
| `payee_url` | string | no | Login or payment URL for the bill. |
| `account_id` | UUID | yes | Account used for payment. |
| `status` | enum | no | `pending` or `paid`. Required for one-off bills; omitted for recurring. |
| `created_at` | datetime | yes | Timestamp. |
| `updated_at` | datetime | yes | Timestamp. |

The prototype stores `due_date` as either an integer or a string depending on frequency. In Steward, this is split into two explicit fields so the graph model is normalized and queryable.

---

## Relationships

| From | Relationship | To | Cardinality |
|------|--------------|----|-------------|
| `Bill` | `serves` | `Responsibility` | many-to-many |
| `Bill` | `paid_from` | `Account` | many-to-one |
| `Account` | `provides_data_via` | `DataSource` | many-to-one (optional) |

A bill can serve many responsibilities. A responsibility can have many bills.

---

## Logic Engine Rules

The logic engine owns deterministic behavior. Rules should operate on the graph and produce explainable output.

### Upcoming Bills

For a given date range, return bills whose next due date falls within the range, ordered by due date then by the highest responsibility `weight`.

### Overdraft Warning

Given an account balance and the set of upcoming bills paid from that account, warn if the projected balance would fall below a configurable threshold after scheduled payments.

### Payment Queue

For one-off bills with `status: pending`, present a single-item-at-a-time queue ordered by due date and responsibility weight.

### Reconciliation

When a data source reports a transaction matching a bill, update `real_amount` and transition `status` from `pending` to `paid`. Record the source and timestamp.

---

## External Data Sources

SimpleFIN is a good candidate for the first account integration. It should be modeled as an optional data source, not a dependency.

- A scheduled task pulls balances and transactions at a configured interval.
- Imported data is stored as facts in the graph.
- The system continues to work if the integration is absent or fails.

---

## API Surface

REST endpoints under `/api`:

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/responsibilities` | List responsibilities |
| `POST` | `/api/responsibilities` | Create responsibility |
| `GET` | `/api/responsibilities/:id` | Get responsibility |
| `PATCH` | `/api/responsibilities/:id` | Update responsibility |
| `DELETE` | `/api/responsibilities/:id` | Delete responsibility |
| `GET` | `/api/accounts` | List accounts |
| `POST` | `/api/accounts` | Create account |
| `GET` | `/api/accounts/:id` | Get account |
| `PATCH` | `/api/accounts/:id` | Update account |
| `DELETE` | `/api/accounts/:id` | Delete account |
| `GET` | `/api/bills` | List bills |
| `POST` | `/api/bills` | Create bill |
| `GET` | `/api/bills/:id` | Get bill |
| `PATCH` | `/api/bills/:id` | Update bill |
| `DELETE` | `/api/bills/:id` | Delete bill |
| `GET` | `/api/bills/upcoming` | Upcoming bills for a date range |
| `GET` | `/api/accounts/:id/projection` | Projected balance with upcoming bills |

---

## Migration from the Prototype

The `bills` prototype stores data in `data/responsibilities.yml` and `data/bills.yml`. When Steward's graph storage is ready, a one-time importer can convert those files into entities and relationships.

Mapping rules for the importer:

- Each responsibility entry becomes a `Responsibility` entity.
- Each account referenced in a bill becomes an `Account` entity if it does not already exist.
- Each bill becomes a `Bill` entity.
- `frequency: monthly` maps to `frequency: monthly` plus `due_day_of_month`.
- `frequency: one-off` maps to `frequency: one_off` plus `due_date`.
- `responsibilities` maps to `serves` relationships.
- `account` maps to `paid_from` relationship.
- `status: pending` is preserved for one-off bills.

---

## Open Questions

- Should `frequency` support `weekly`, `quarterly`, or `annual`?
- Should recurring bills store a richer recurrence rule, or is `due_day_of_month` sufficient for v1?
- How should paid one-off bills be handled? Mark `status: paid` and retain for history, or archive?
- Should the system support multiple currencies per household?
- What is the right default overdraft threshold? Per-account or global?
- How should the daily conversational summary be generated? Template-based or deterministic summary engine?

---

## Relation to the Roadmap

This domain belongs to **Phase 1 — World Model** and **Phase 3 — Automation**. It should not be added before the MVP foundation (auth, Project/Task CRUD, API, MCP, Docker deploy) is complete, because it depends on the entity and relationship primitives that the foundation introduces.

Once the MVP is stable, the bills domain is a strong candidate for the first real-world domain beyond tasks and projects.
