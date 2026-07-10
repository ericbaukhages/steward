# Steward Roadmap

> This document is a living architectural roadmap for Steward. It exists to guide implementation decisions, not to prescribe exact technologies. Individual implementation details may change over time, but the overall direction should remain stable.

---

# Vision

Steward is a self-hosted operating environment designed to reduce cognitive load.

Rather than building another collection of productivity tools, Steward maintains a single, shared understanding of a person's world—projects, tasks, notes, inventory, locations, people, routines, media, calendars, and devices.

Every interface becomes another window into the same underlying model.

The long-term goal is **not** to build a website.

The long-term goal is **not** to build a handheld.

The goal is to build a coherent personal computing environment that can exist across many devices while always presenting the same underlying state.

The hardware is simply another client.

---

# Core Principles

## One Model

There should only be one source of truth.

Whether interacting through:

* the web UI
* a terminal
* an API
* a PADD
* an e-paper display
* a dashboard
* voice
* future clients

...they should all operate against the same world model.

Clients should contain as little business logic as possible.

---

## Local First

Steward is designed assuming ownership of data.

Everything should function without cloud services whenever possible.

External services are integrations, not dependencies.

---

## AI is an Interface

LLMs are translators.

They should help users express intent, summarize information, generate plans, and interpret natural language.

They should never become the system of record.

The world model remains deterministic.

---

## Deterministic State

Facts should be represented explicitly.

Reasoning should be repeatable.

Business rules should not depend on LLM output.

The system should always be able to explain *why* something happened.

---

## Pull First

Steward follows a pull-first notification philosophy.

Attention is treated as a finite resource.

Clients should assume the user will choose when to check for updates.

Most devices periodically fetch state rather than remaining permanently connected.

This philosophy provides:

* reduced interruption
* simpler synchronization
* improved battery life
* lower infrastructure complexity
* user-directed interaction

Urgent situations are exceptions.

When necessary, Steward may escalate through channels such as:

* phone call
* SMS
* smart speaker announcement
* email

Interruptions should be intentional, explainable, and rare.

---

# System Architecture

Steward is composed of independent layers.

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

Each layer should remain independently replaceable.

---

# Major Components

## Storage

Responsible for persistence.

Potential responsibilities include:

* entities
* documents
* attachments
* version history
* relationships
* event log

Storage should avoid embedding business rules.

---

## Knowledge Graph

Represents the user's world.

Examples include:

* projects
* tasks
* people
* devices
* locations
* inventory
* routines
* notes
* documents
* media
* schedules

Relationships are first-class.

The graph should answer questions like:

* "What belongs to this project?"
* "Where did I leave this?"
* "Who is waiting on me?"
* "What blocks this task?"

---

## Logic Engine

Responsible for deterministic behavior.

Examples:

* recurring tasks
* dependency resolution
* reminders
* automation
* scheduling
* state transitions
* conflict detection

The logic engine owns decisions.

---

## AI Layer

Responsible for language.

Examples:

* parsing requests
* summarization
* planning
* semantic search
* conversation

The AI layer proposes.

The logic layer decides.

---

## API Layer

Every client communicates through a stable API.

Clients should not require knowledge of database internals.

This allows entirely new interfaces to be built without changing the core system.

---

# Clients

The website is the first client.

It is **not** the system.

Future clients may include:

* web application
* terminal interface
* mobile application
* desktop application
* PADD handheld
* wall dashboards
* e-paper displays
* voice interfaces
* wearable devices

Every client should expose the same capabilities where practical.

Differences should primarily exist because of hardware constraints.

---

# Development Phases

## Phase 0 — Foundation

Goal:

Build the minimum architecture.

Deliverables:

* repository structure
* backend
* authentication
* database
* API
* entity model
* local development environment
* deployment pipeline

Nothing user-facing needs to be polished.

---

## Phase 1 — World Model

Implement the foundational object system.

Examples:

* entities
* relationships
* metadata
* tagging
* versioning

Everything else builds upon this.

---

## Phase 2 — Web Client

The browser becomes the primary development interface.

Focus on:

* navigation
* editing
* search
* graph visualization
* administration

This phase optimizes developer velocity rather than end-user polish.

---

## Phase 3 — Automation

Introduce deterministic behavior.

Examples:

* routines
* reminders
* scheduling
* workflows
* recurring actions
* event processing

---

## Phase 4 — AI

Introduce conversational interaction.

Focus on:

* natural language
* planning
* semantic search
* summarization

The AI layer should remain optional.

Core functionality should continue working without it.

---

## Phase 5 — Device Platform

Expand beyond the browser.

Potential clients include:

* PADD firmware
* e-paper displays
* dashboards
* voice interfaces
* terminals

These should primarily consume the existing API rather than introducing new capabilities.

---

## Phase 6 — Ecosystem

Long-term goals:

* plugin system
* third-party integrations
* public API
* automation marketplace
* hardware reference implementations

---

# Website Goals

The website serves multiple purposes.

Initially it is:

* administration console
* development interface
* debugging tool

Over time it becomes:

* primary desktop client
* management interface
* visualization platform

The website should expose nearly every capability of Steward.

Future clients may intentionally expose smaller subsets optimized for their form factor.

---

# Design Philosophy

Prefer:

* composable systems
* declarative configuration
* deterministic behavior
* inspectable state
* explicit relationships
* local ownership
* offline capability
* incremental complexity

Avoid:

* hidden state
* duplicated business logic
* client-specific behavior
* cloud-only assumptions
* AI-driven decisions without deterministic verification

---

# Success Criteria

Steward succeeds if:

* every client presents the same underlying world
* users own their data
* AI enhances rather than replaces understanding
* automation is predictable
* devices cooperate without feeling fragmented
* new interfaces can be added without redesigning the backend

The website is only the beginning.

The system itself is the product.
