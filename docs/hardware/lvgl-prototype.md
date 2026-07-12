# LVGL Simulator Prototype

## Purpose

Develop the first interactive prototype of **Steward** using the LVGL simulator rather than physical hardware.

The objective is **not** to build a production application. Instead, this prototype should answer questions about interaction design, information density, navigation, and overall usability before investing time in embedded hardware.

This prototype should be treated as a stand-in for the eventual dedicated Steward client device.

---

## Goals

* Build an interactive prototype using the LVGL simulator.
* Validate the Steward interaction model.
* Experiment with layouts designed for small, always-available displays.
* Iterate quickly without hardware constraints.
* Keep the implementation portable so it can later target ESP32 or Linux-based devices with minimal redesign.

---

## Non-Goals

* Hardware integration
* Networking architecture
* Authentication
* Battery optimization
* Production-quality persistence
* Final visual design

The simulator exists to answer UX questions first.

---

## Prototype Requirements

Implement a small but complete vertical slice of the Steward experience.

Suggested screens include:

* Home dashboard
* Current focus
* Task list
* Daily agenda
* Notifications or inbox
* Settings (minimal)

Navigation should be simple, responsive, and optimized for devices that may rely on touch, buttons, or rotary encoders.

---

## Data

For the initial prototype:

* Use static or mock data.
* Avoid external services.
* Keep the data model simple and replaceable.

The emphasis is interaction, not infrastructure.

---

## Design Principles

The prototype should reinforce Steward's philosophy:

* Calm rather than attention-grabbing.
* Information should be available at a glance.
* Minimize unnecessary interaction.
* Prioritize clarity over visual complexity.
* Support quick check-ins instead of prolonged sessions.

---

## Deliverables

* Working LVGL simulator project.
* Mock data representing a typical household.
* Basic navigation between screens.
* Clean project structure suitable for future expansion.
* Documentation describing:

  * Build process
  * Project layout
  * Known limitations
  * Hardware considerations for future ports

---

## Future Direction

Once the interaction model feels natural in the simulator, the project should be portable to one or more hardware targets, such as:

* ESP32-based devices
* Linux handhelds
* E-ink displays
* Matte LCD displays
* Future dedicated Steward hardware

The simulator should remain the primary environment for rapid UX iteration even after hardware development begins.
