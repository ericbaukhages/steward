# Steward's Attention Philosophy

## Purpose

Steward is designed to help people focus, not to compete for their attention.

Many modern systems are built around maximizing engagement through continuous notifications, real-time updates, and persistent dashboards. Steward takes the opposite approach. Information should be available when it is needed, while interruptions should be rare and intentional.

This philosophy shapes both the user experience and the system architecture.

---

## Attention Is a Limited Resource

Every interruption has a cost.

Rather than assuming every change deserves immediate visibility, Steward assumes that most information can wait until the user is ready to engage with it.

The goal is not to keep users constantly informed.

The goal is to ensure that, when they ask, the system provides exactly what they need.

---

## Pull Before Push

Steward is a pull-first system.

Clients periodically ask the server:

> "What should I know right now?"

The server responds with the information most relevant to that client and context.

This differs from traditional dashboard architectures, where the server continuously pushes updates to every connected device.

Benefits include:

* Reduced complexity
* Lower network usage
* Better support for low-power devices
* A calmer user experience
* One protocol that works across many classes of hardware

The server may recommend when a client should check in again by providing a suggested refresh interval.

For example:

* A static dashboard may refresh every few minutes.
* An active timer may refresh every second.
* A battery-powered device may sleep for much longer between requests.

---

## Interruptions Require Justification

Notifications are not the default interaction.

Most information remains available until the user chooses to view it.

Only events that meaningfully benefit from immediate attention should interrupt the user.

Steward should encourage the question:

> "Does this deserve an interruption?"

before sending anything proactively.

---

## Escalation

Some events cannot wait.

Rather than treating every client as a notification endpoint, Steward supports escalation through appropriate communication channels.

Examples include:

* Phone notifications
* SMS
* Smart speakers
* Email
* Other automation systems

The display client is not responsible for delivering urgent information—it is simply one way to interact with Steward.

---

## Client Philosophy

A Steward client exists to grant clarity without garnering distraction.

Clients should not compete for the user's attention.

Instead, they should reduce the effort required to understand:

- What matters now.
- What can wait.
- What is changing.
- What action, if any, is appropriate.

The measure of a client is not the number of features it supports.

The measure of a client is how effortlessly it fits into someone's life.

---

## Device Independence

This philosophy allows very different devices to participate in the same ecosystem.

Examples include:

* Tiny OLED status displays
* Battery-powered handheld devices
* Touchscreen desktop dashboards
* Raspberry Pi PADDs
* E-paper information panels

Each client decides when to request updates based on its capabilities and power constraints.

The server provides the same logical state regardless of the hardware rendering it.

---

## Design Principles

* Pull before push.
* Preserve the user's attention whenever possible.
* Interrupt only when the benefit outweighs the cost.
* Allow hardware to optimize for its own capabilities.
* Keep the protocol simple and stateless.
* Make power efficiency a client capability rather than a protocol requirement.

---

## Long-Term Vision

Steward should feel less like another stream of notifications and more like a trusted assistant.

It should be available when the user seeks guidance, remain quiet when it has nothing important to say, and reserve interruptions for moments that genuinely matter.
