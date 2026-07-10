# Agent Guide

> This document is for AI coding agents working on Steward. It summarizes the project's mental model, where to find authoritative context, and how to make changes that stay consistent with the architecture.

---

## What Steward Is

Steward is a **self-hosted operating environment** for managing knowledge, commitments, and context. It is not a single app or website; it is a coherent personal computing environment that can be accessed through many clients.

The long-term goal is to build a shared world model and expose it through multiple interfaces: web, terminal, handheld PADD, dashboards, e-paper displays, voice, and future clients.

The hardware is a client. The system is the product.

---

## Authoritative Context

When making changes, start here:

1. **[docs/roadmap.md](./docs/roadmap.md)** — vision, core principles, development phases, and build order.
2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** — how services, APIs, storage, sync, auth, and deployment fit together.
3. **[docs/spec.md](./docs/spec.md)** — original concept, PADD overview, system architecture diagram.
4. **[docs/philosophy/attention.md](./docs/philosophy/attention.md)** — pull-first attention philosophy.
5. **[docs/philosophy/naming.md](./docs/philosophy/naming.md)** — naming and branding direction.
6. **[docs/hardware/exploration.md](./docs/hardware/exploration.md)** — hardware and client platform exploration.
7. **[docs/research/prior-art.md](./docs/research/prior-art.md)** — projects and references worth studying.

Update these documents when the ideas they describe change. Do not let implementation drift silently away from documented intent.

---

## Core Principles to Preserve

### One Model

There is one source of truth: the knowledge graph. Every client operates against it. Keep business logic out of clients whenever possible.

### Local First

Everything should work without cloud services. External services are integrations, not dependencies.

### AI Is an Interface

LLMs translate, summarize, propose, and converse. They do not own the system of record. Business rules must remain deterministic and explainable.

### Deterministic State

Facts are explicit. Reasoning is repeatable. The system should always be able to answer *why* something happened.

### Pull First

Clients fetch state. The server does not continuously push to every device. Notifications and interruptions are intentional, explainable, and rare.

### Composable Layers

Storage, knowledge graph, logic engine, AI layer, API, and clients are independent. Each layer should be replaceable without redesigning the others.

---

## Architecture in Brief

```
+---------------------------+
|        Client Apps        |
+---------------------------+
|      Public API Layer     |
+---------------------------+
|     Logic / Automation    |
+---------------------------+
|      Knowledge Graph      |
+---------------------------+
|      Storage Layer        |
+---------------------------+
```

For the detailed treatment, see [ARCHITECTURE.md](./ARCHITECTURE.md).

- **Storage** persists entities, relationships, documents, attachments, version history, and the event log.
- **Knowledge Graph** represents the user's world and the relationships within it.
- **Logic Engine** owns deterministic behavior: routines, reminders, scheduling, state transitions, conflict detection.
- **AI Layer** proposes; the logic layer decides.
- **API Layer** is the stable boundary between clients and the system.
- **Clients** render and capture intent. They do not own business logic.

---

## Development Phases

Build in this order. Do not jump ahead unless the earlier phase genuinely supports it.

1. **Phase 0 — Foundation:** repository structure, backend, auth, database, API, entity model, local dev environment, deployment pipeline.
2. **Phase 1 — World Model:** entities, relationships, metadata, tagging, versioning.
3. **Phase 2 — Web Client:** navigation, editing, search, graph visualization, administration.
4. **Phase 3 — Automation:** routines, reminders, scheduling, workflows, event processing.
5. **Phase 4 — AI:** natural language, planning, semantic search, summarization.
6. **Phase 5 — Device Platform:** PADD firmware, dashboards, e-paper, voice, terminals.
7. **Phase 6 — Ecosystem:** plugins, integrations, public API, marketplace, reference hardware.

When in doubt, stay closer to the current phase.

---

## How to Make Changes

- Prefer minimal changes that achieve the goal.
- Keep concerns separated: storage, graph, logic, AI, API, clients.
- Do not duplicate business logic across clients.
- Do not introduce cloud-only assumptions.
- Do not make the AI layer required for core behavior.
- Preserve deterministic reasoning. If an LLM proposes a change, the system should verify and record it as an explicit fact.
- Update relevant documentation when structures, boundaries, or philosophies change.
- Follow the existing naming philosophy: calm, intentional, long-lived, practical, human, trustworthy. Avoid gimmicks, buzzwords, and direct sci-fi references.

---

## Naming Conventions

- Prefer nouns over verbs.
- Prefer existing English words.
- Avoid invented spellings, technology buzzwords, and obvious AI-assistant names.
- Avoid names tied to specific hardware.
- The project is **Steward**. Clients are things like "Steward Web," "Steward Handheld," "Steward Dashboard."
- Avoid direct Star Trek terminology in public identity. The feeling of LCARS/PADD/tricorder is fine; the names are not.

---

## Boundaries and Guardrails

### Do

- build against the shared world model
- expose capabilities through the API
- keep clients thin
- make AI optional
- prefer explicit, explainable rules
- design for local, self-hosted deployment
- treat attention as a limited resource

### Avoid

- hidden state
- client-specific business logic
- cloud dependencies as defaults
- AI-driven decisions without deterministic verification
- notification-heavy or engagement-driven design
- tying the project identity to one device or form factor

---

## Common Patterns

### Client Update Loop

Clients periodically ask:

> "What should I know right now?"

The server returns the relevant slice of state and may suggest a refresh interval. Urgent events escalate through separate channels, not the display client.

### AI as Translator

User intent → AI parses → structured operation → logic engine verifies → world model updates → response generated.

The final change must be inspectable and reversible.

### Deterministic Planning

Recommendations come from rules and graph queries, not from LLM improvisation. The system can explain its reasoning with facts and rules.

---

## When in Doubt

- Read the roadmap and architecture documents again.
- Prefer simpler, slower, and more explicit over clever, fast, and opaque.
- Ask before introducing dependencies, especially cloud services or heavy frameworks.
- Keep the system the product. The website and devices are windows into it.

---

## Session Notes

This document was created to give coding agents a shared mental model. It should evolve as the project does. If an implementation decision contradicts this guide, either update the guide or reconsider the decision.
