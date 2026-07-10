# Steward

> A personal operating environment that reduces cognitive load through a declarative household model, deterministic reasoning, and purpose-built devices.

## Vision

Build a dedicated e-ink "PADD" inspired by *Star Trek: The Next Generation* that serves as the primary interface to a self-hosted household management system.

Rather than building another web app or mobile application, the goal is to create a collection of inexpensive, purpose-built devices that act as windows into a central home server.

The experience should feel closer to using paper than a smartphone.

---

# Goals

- Dedicated hardware with a distraction-free interface
- Instant-on experience with long battery life
- Self-hosted
- Offline-capable where practical
- Wi-Fi synchronization
- Bluetooth support for peripherals and future integrations
- Over-the-air firmware updates
- Fast iteration during development
- Multiple devices working together
- Reduce cognitive overhead rather than maximize feature count

---

# Design Principles

## The House Is The Computer

The household server owns:

- knowledge
- business logic
- planning
- AI
- synchronization
- scheduling
- relationships

Clients own:

- rendering
- input
- connectivity
- local cache
- device-specific capabilities

Devices should remain intentionally simple.

---

## Declarative First

Everything should be represented as structured information.

Interfaces consume the model rather than owning it.

```
PADD
Web
CLI
LLM
Future Clients
        │
        ▼
 Declarative Model
```

The structured model is the source of truth.

---

## Activities Instead of Applications

The system organizes around activities rather than apps.

Instead of:

> Launch Shopping App

The experience becomes:

> Continue Grocery Shopping

Instead of:

> Launch Notes

The experience becomes:

> Continue Guest Bedroom Project

Activities become the primary abstraction.

---

# Architecture

```
                 Natural Language
                         │
                         ▼
                       LLM
                         │
                         ▼
              Declarative Household Model
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
      Knowledge Graph         Rules Engine
             │                       │
             └───────────┬───────────┘
                         ▼
              Recommendation Engine
                         │
         ┌───────────────┼────────────────┐
         ▼               ▼                ▼
      PADD            Web UI             CLI
```

---

# Household Model

The household is represented as a semantic graph.

Potential entities:

- Person
- Activity
- Project
- Task
- Event
- Place
- Inventory Item
- Tool
- Recipe
- Shopping List
- Document
- Device
- Reminder

Relationships are first-class citizens.

---

# Relationship Metadata

Relationships contain semantics.

Possible metadata:

- responsibility
- estimated duration
- deadline
- location
- cost
- confidence
- priority
- prerequisite type
- blocking status

Example:

```yaml
relationship:
  type: prerequisite

from: buy-paint
to: paint-bedroom

responsibility: Eric
location: Hardware Store
estimated-duration: 30m
deadline: before-parents-visit
```

Because relationships carry meaning, they can be reasoned about.

---

# Omnidirectional Navigation

The graph should be traversable from any point.

Examples:

- "I'm going to the hardware store."
- "What can I finish in twenty minutes?"
- "What projects are blocked?"
- "What depends on this inventory item?"
- "What's affected if I postpone this project?"

The graph stays the same.

Only the starting point changes.

---

# AI Philosophy

The LLM is not the source of truth.

The household model is.

The LLM is responsible for:

- understanding natural language
- extracting entities
- enriching incomplete information
- asking clarifying questions
- proposing new rules

The LLM should never determine what is important.

---

# Decision Model

Knowledge and decision making are separate concerns.

The LLM translates.

The rules engine decides.

The knowledge graph remembers.

This separation makes the system predictable, testable, and explainable.

---

# Deterministic Planning

Recommendations should come from deterministic rules rather than LLM output.

Possible inputs include:

- urgency
- deadline proximity
- dependency unlocks
- household impact
- estimated duration
- travel cost
- location
- context match
- context switching cost

Priority should be calculated.

Not hallucinated.

---

# Contextual Planning

The assistant reasons over current context.

Context includes things like:

- current activity
- intended destination
- current location
- available time
- weather
- inventory
- household responsibilities
- calendar

Example:

User:

> I'm heading to the hardware store.

The assistant evaluates:

- What projects become cheaper to complete?
- What errands can be combined?
- Is there a more important task?
- Are there dependencies this trip would unblock?

Possible response:

> Before heading there, stop at Aldi first. School pickup leaves little time afterward, and you'll also need painter's tape and wood glue while you're already near the hardware store.

The assistant should occasionally push back when it can justify a better plan.

---

# Explainability

Every recommendation should be traceable.

Example:

> Why should I buy paint rollers?

```
Guest Bedroom Project
        │
Requires Paint Rollers
        │
Inventory = 0
        │
Destination = Hardware Store
        │
Rule #17 increased priority
```

Nothing should happen because "the AI thought so."

---

# Progressive Structure

Historically, personal information systems failed because maintaining structured data required too much manual effort.

Natural language changes that.

Instead of filling out forms:

> I want to repaint the guest bedroom before my parents visit.

The system extracts:

- project
- deadline
- location
- likely materials
- estimated duration
- responsible person

It asks only the questions that matter.

Structure should emerge over time rather than being required immediately.

---

# Learning

The AI improves the system without becoming the planner.

Examples:

- suggesting new rules
- identifying recurring behavior
- enriching entities
- proposing relationships

Example:

> I've noticed you usually stop at Aldi after Costco. Would you like me to consider those trips together?

Once accepted, this becomes a deterministic rule.

---

# Executive Function

The goal is not organization.

The goal is reducing cognitive load.

The user should not need to remember:

- dependencies
- prerequisites
- inventory
- schedules
- project state
- future consequences

The system carries that context and surfaces only what matters.

---

# Human Assistant Model

A good assistant does more than remember facts.

They manage context.

Instead of simply answering requests, they evaluate whether a better course of action exists.

The system should behave similarly.

It should understand:

- opportunity cost
- urgency
- context
- dependencies
- timing
- location
- responsibility

Sometimes the best response is agreement.

Sometimes the best response is:

> "Before you do that, there's something more important."

---

# Hardware

Initial target:

- Monochrome e-ink
- ESP32-S3
- Wi-Fi
- Bluetooth
- USB-C
- Battery powered
- OTA firmware updates

Color e-ink is a future enhancement.

The hardware should remain inexpensive enough that multiple devices can exist throughout the home.

---

# Long-Term Vision

This is not primarily a household management application.

It is a personal operating environment.

The declarative model describes the world.

The knowledge graph stores relationships.

The rules engine provides judgment.

The LLM provides communication.

Purpose-built devices provide presence.

Together they create a system that behaves less like a chatbot and more like a trusted human assistant—one that understands context, explains its reasoning, and helps surface the right information at the right time.
