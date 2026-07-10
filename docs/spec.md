# Steward

> A personal operating environment for managing knowledge, commitments, and context.

## Vision

Steward is a self-hosted operating environment designed to reduce cognitive load.

Instead of organizing life around isolated applications, Steward maintains a structured model of the world: people, projects, places, inventory, commitments, activities, and the relationships between them.

From that shared understanding, Steward can determine what information is relevant in a given moment, recommend the next best action, explain its reasoning, and present that information through whichever interface is most appropriate.

The goal is not to remember more.

The goal is to remember less.

---

# Philosophy

Modern software tends to separate information into applications.

Your calendar knows nothing about your pantry.

Your shopping list knows nothing about your projects.

Your task manager knows nothing about where you're going today.

Steward treats these as different views of the same underlying world.

Instead of asking:

> Which app should I open?

The system asks:

> Given everything I know right now, what deserves my attention?

---

# Core Principles

## One Model, Many Interfaces

Every interface interacts with the same declarative household model.

Current and future clients may include:

* Web application
* CLI
* Purpose-built e-ink PADDs
* Mobile applications
* Voice interfaces
* Home dashboards
* AI agents

Clients do not own data.

They render and manipulate the shared model.

---

## Declarative World Model

The structured model describes the current state of the household.

Examples include:

* people
* projects
* activities
* inventory
* places
* documents
* devices
* relationships
* commitments

Relationships themselves are first-class objects with semantic meaning.

The model becomes the source of truth for every client.

---

## Deterministic Reasoning

Natural language is not the decision engine.

The LLM exists to translate between human intent and the structured model.

Planning is performed by deterministic systems.

The architecture intentionally separates:

* understanding
* knowledge
* reasoning
* presentation

This keeps recommendations predictable, explainable, and testable.

---

## Context-Aware Planning

Recommendations should emerge naturally from context.

Examples:

"I'm heading to the hardware store."

↓

The system evaluates:

* active projects
* inventory
* travel
* deadlines
* available time
* dependencies
* household responsibilities

↓

Then decides what is worth surfacing.

Sometimes the correct answer is agreement.

Sometimes the correct answer is:

> Before you leave, stop at Aldi first.

---

## Progressive Structure

Historically, structured personal information systems failed because they required users to become data-entry clerks.

Steward reverses that relationship.

People communicate naturally.

The system proposes structure.

The user confirms or corrects it.

Over time the household model becomes richer without requiring constant manual maintenance.

---

## Explainable Intelligence

Every recommendation should have provenance.

The system should always be able to answer:

> Why?

with facts and rules rather than opaque AI reasoning.

Trust comes from transparency.

---

# System Architecture

```text
                 Natural Language
                         │
                         ▼
                       LLM
                         │
                         ▼
              Declarative World Model
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
      Knowledge Graph         Rules Engine
             │                       │
             └───────────┬───────────┘
                         ▼
             Recommendation Engine
                         │
             ┌───────────┼────────────┐
             ▼           ▼            ▼
          Web UI       PADD         CLI
```

The AI communicates.

The graph remembers.

The rules engine decides.

The clients present.

---

# PADD

One client envisioned for Steward is a dedicated e-ink PADD inspired by *Star Trek: The Next Generation*.

Unlike a tablet, the PADD is not intended to be a general-purpose computer.

Its purpose is to provide a calm, distraction-free window into Steward.

Possible characteristics include:

* monochrome e-ink
* Wi-Fi
* Bluetooth
* USB-C
* week-long battery life
* OTA updates
* inexpensive enough to deploy throughout the home

Multiple PADDs may exist simultaneously, each surfacing different aspects of the same shared model.

The PADD is an interface.

Steward is the system.

---

## See Also

- [roadmap.md](./roadmap.md) — living architectural roadmap and development phases
- [ARCHITECTURE.md](../ARCHITECTURE.md) — how the pieces fit together
