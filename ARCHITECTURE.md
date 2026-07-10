# Steward Architecture

> This document describes how Steward's major components fit together. It covers services, API boundaries, authentication, storage, synchronization, and deployment.
>
> For the project's vision, principles, and build order, see [docs/roadmap.md](./docs/roadmap.md).
> For the original system concept, see [docs/spec.md](./docs/spec.md).

---

## Overview

Steward is a self-hosted, local-first operating environment. Its architecture is layered so that each major concern can be understood, replaced, or extended independently.

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

---

## Layers

### Client Apps

Clients render the shared world model and forward user intent to the API. They own as little business logic as possible.

Examples:

* web application
* terminal interface
* PADD handheld
* wall dashboard
* e-paper display
* voice interface

Clients communicate only through the public API.

---

### Public API Layer

The API is the boundary between clients and the system.

Responsibilities:

* expose a stable interface for entities, relationships, and actions
* authenticate and authorize requests
* validate input
* translate between transport concerns and internal models

Goals:

* new clients can be built without changing the backend
* internal storage decisions do not leak into client contracts

---

### Logic / Automation Engine

The logic engine owns deterministic behavior.

Responsibilities:

* recurring tasks and routines
* dependency resolution
* reminders and scheduling
* state transitions
* conflict detection
* automation rules

Rules operate on the knowledge graph and produce changes that are themselves persisted as facts. The system should always be able to explain why a change occurred.

---

### Knowledge Graph

The knowledge graph is the shared world model.

It contains:

* entities (projects, tasks, people, places, inventory, notes, etc.)
* relationships between entities
* metadata and tags
* versioning history

The graph is the source of truth for every client.

---

### Storage Layer

Storage is responsible for persistence.

Concerns:

* entity storage
* documents and attachments
* version history
* event log
* indexing for search and relationships

Storage should not embed business rules. It persists the graph and makes it queryable.

---

## Cross-Cutting Concerns

### Authentication

Steward assumes a small number of trusted users in a self-hosted context.

Authentication should:

* be simple to configure
* not depend on external identity providers unless explicitly chosen
* support local accounts and, optionally, passkeys or SSO integrations

### Authorization

Authorization boundaries should be coarse at first. The initial target is a single household or small group of users.

### Synchronization

Clients are pull-first by default. They periodically fetch relevant state from the API.

The server may suggest refresh intervals based on context (static dashboard vs. active timer vs. battery-powered device).

Urgent escalation happens through separate channels, not through the display client.

### AI Integration

The AI layer is an interface, not a decision maker.

It may:

* parse natural language into structured intent
* summarize information
* propose plans
* power semantic search and conversation

It must not:

* become the system of record
* make unsupervised changes to the world model
* replace deterministic business rules

### Deployment

Steward is designed to run self-hosted.

Deployment targets may include:

* local server or NAS
* single-board computer
* container environment
* home server appliance

The local-first assumption means the system should function without cloud services. External integrations are optional.

---

## Open Questions

* Which database technology best fits the graph model and local-first constraint?
* How should the event log and version history be exposed?
* What is the minimum viable API surface for the first client?
* How are files and attachments stored and referenced by entities?
* What authentication scheme is appropriate for a single-household deployment?
* How should offline or intermittently connected clients synchronize state?

---

## Related Documents

* [docs/roadmap.md](./docs/roadmap.md) — vision, principles, and development phases
* [docs/spec.md](./docs/spec.md) — original system concept and PADD overview
* [docs/philosophy/attention.md](./docs/philosophy/attention.md) — pull-first attention philosophy
* [docs/hardware/exploration.md](./docs/hardware/exploration.md) — hardware and client platform exploration
