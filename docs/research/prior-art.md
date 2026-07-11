# Prior Art

> This document collects projects, hardware, ecosystems, and design references worth studying while building Steward.
>
> The purpose is not to copy these projects, but to understand the problems they solved well.
>
> Every entry should answer one or more questions:
>
> - What did they build?
> - What can we learn?
> - What should we avoid?
> - How does it influence Steward?

---

# Philosophy

Steward should stand on mature ecosystems rather than reinventing solved problems.

Good prior art helps answer questions like:

- How should firmware be organized?
- How should multiple hardware targets be supported?
- How should devices be provisioned?
- How should updates work?
- What interaction patterns already work well?
- What hardware ecosystems are worth investing in?

Whenever possible, prefer learning from projects with active communities and long maintenance histories.

---

# Software Projects

## ESP32 Marauder

Repository

https://github.com/justcallmekoko/ESP32Marauder

Focus

Multi-board ESP32 firmware.

Lessons

- Single firmware supporting many hardware variants.
- Hardware abstraction.
- Board capability management.
- Excellent flashing documentation.
- OTA updates.
- Reference hardware without vendor lock-in.

Questions

- How is board support organized?
- How are optional features represented?
- How much code is shared?
- How is the build system structured?

---

## WLED

Repository

https://github.com/Aircoookie/WLED

Focus

Consumer-quality ESP32 firmware.

Lessons

- Captive portal provisioning.
- OTA updates.
- Appliance-first UX.
- Web configuration.
- Excellent polish.

Questions

- How is configuration stored?
- How are updates delivered?
- How much should Steward expose through a browser?

---

## ESPHome

Repository

https://github.com/esphome/esphome

Focus

Declarative firmware generation.

Lessons

- Hardware abstraction.
- Declarative configuration.
- Device discovery.
- Excellent documentation.

Questions

- What abstractions simplify supporting new hardware?
- What ideas apply to Steward's runtime?

---

## Meshtastic

Repository

https://github.com/meshtastic/firmware

Focus

Open handheld communication platform.

Lessons

- Multiple hardware targets.
- Companion applications.
- Community-maintained hardware support.
- Shared firmware architecture.

Questions

- How are capabilities represented?
- How are community ports managed?

---

## CrossPoint

Repository

(Add link)

Focus

Alternative firmware for the Xteink X4.

Lessons

- ESP32 UI architecture.
- eInk rendering.
- Battery-conscious design.
- Navigation patterns.

Questions

- How portable is the rendering layer?
- Could Steward share infrastructure?

---

# Hardware Platforms

These are not software projects.

Instead, they represent categories of inexpensive hardware suitable for custom firmware.

The ideal platform:

- inexpensive
- readily available
- Wi-Fi
- ESP32 family
- flashable
- existing enclosure
- battery-powered (preferred)
- active community

## Orion PDA

https://orionpda.org/yt

Focus

Minimal pocket computer for notes, music, and disconnecting from notifications. Sharp display, solar charging, open hardware.

Lessons

- Intentionally limited scope: notes, music, no notifications.
- Solar charging as a path to ambient, low-maintenance devices.
- Open hardware and calm industrial design.
- Pocket form factor as a deliberate alternative to smartphones.

Questions

- What can Steward learn from devices that deliberately do less?
- How might solar or low-power design influence reference hardware?
- What is the right balance between capability and calm?

---

## PocketMage

https://pocketmage.org/

https://github.com/ashtf8/PocketMage_PDA

Focus

Tinker-friendly PDA with a dual E Ink/OLED display, full keyboard, and productivity-oriented OS. Side-loadable apps and open hardware/software.

Lessons

- Dual-display design: E Ink for reading, OLED for responsiveness.
- Built-in keyboard with modifier layers enables real text input on a pocket device.
- Side-loading and a community app store extend capability without centralizing control.
- Open source hardware and software invites community ports and longevity.

Questions

- Could Steward benefit from a split fast/responsive + low-power display architecture?
- What productivity apps are essential for a pocket computing device?
- How should third-party apps be sandboxed or distributed?

---

## Cheap Yellow Display (CYD)

Focus

Community-standard touchscreen ESP32 board.

Lessons

- Massive ecosystem.
- Excellent documentation.
- Countless enclosure designs.
- Frequently used as the basis for finished products.

Research

- LVGL projects
- Home Assistant dashboards
- MakerWorld designs
- Community firmware

---

## GeekMagic Ultra

https://geekmagic.com/products/geekmagic-ultra-4

Focus

Consumer gadget built around commodity hardware.

Lessons

- Existing enclosure.
- Existing display.
- Flashable firmware.
- Demonstrates how inexpensive consumer products can become entirely different devices.

Research

- Other GeekMagic products.
- Similar desk gadgets.
- Firmware replacement process.

---

## ESP32 HMI Panels

Examples

- Waveshare
- Sunton
- Guition

Focus

Industrial touchscreen modules.

Lessons

- Excellent ESP-IDF support.
- Multiple screen sizes.
- Strong LVGL ecosystem.
- Ready-made hardware.

Potential

Strong candidates for Steward reference hardware.

---

## MakerWorld Appliance Builds

Example

https://makerworld.com/en/models/2725262-deskbuddy-your-personal-dashboard

Focus

Finished products built around off-the-shelf modules.

Lessons

Rather than designing electronics, many successful projects combine:

- commodity ESP32 board
- custom firmware
- 3D printed enclosure

This dramatically lowers the barrier to creating polished hardware.

Research

- enclosure techniques
- assembly workflow
- battery integration
- mounting systems
- user experience

---

# Hardware Families

Rather than collecting individual products, identify ecosystems.

## Consumer Gadgets

Examples

- GeekMagic
- Pixel clocks
- Weather displays
- Crypto tickers
- Desk dashboards

Question

Can the firmware be replaced?

---

## Industrial HMIs

Examples

- Waveshare
- Sunton
- Guition

Question

Can these become the Steward reference hardware?

---

## Maker Handhelds

Examples

- LilyGO
- M5Stack
- Cardputer
- T-Deck
- T-Embed

Question

Which hardware is mature enough to support long-term development?

---

## Community Hardware

Examples

- Cheap Yellow Display
- XIAO projects
- ESP32 badge computers
- Cyberdeck builds

Question

Which hardware has the strongest community support?

---

# UI Frameworks

## LVGL

https://lvgl.io/

Focus

Embedded user interface toolkit.

Lessons

- Portable UI.
- Mature widget system.
- Hardware abstraction.
- Large ecosystem.

Questions

- How should Steward organize rendering?
- Which widgets should be wrapped?
- What should be custom?

---

# Platform

## ESP-IDF

https://docs.espressif.com/

Focus

Official ESP32 development framework.

Lessons

- Stable APIs.
- OTA.
- Networking.
- Bluetooth.
- Filesystems.
- Sleep modes.
- Official vendor support.

Current expectation

Steward should target ESP-IDF directly rather than Arduino.

---

# Design Inspiration

These projects are not direct competitors.

Instead they embody ideas worth studying.

## Kindle

Lessons

- Instant resume.
- Calm interface.
- Long battery life.
- Single-purpose computing.

---

## PalmPilot

Lessons

- Fast workflows.
- Information-first interaction.
- Hardware designed around software.

---

## Optimistic Science Fiction

Lessons

- Calm interfaces.
- Personal computing.
- Technology serving people.
- Devices that fade into the background.

Avoid

Direct references to existing fictional universes.

Steward should establish its own identity.

---

# Platform Projects

These projects define complete embedded operating environments rather than single applications.

Study:

- application lifecycle
- plugin architecture
- storage model
- update mechanism
- SDK
- UI framework

Examples:

- FlipperZero

---

# Research Topics

## Firmware

- OTA updates
- Device provisioning
- Captive portals
- Synchronization
- Crash recovery
- Filesystems

---

## Hardware

- Battery management
- Deep sleep
- Capacitive touch
- Docking
- Keyboard accessories
- ESP32-S3 reference boards

---

## User Experience

- Voice-first interaction
- Ambient information displays
- Offline-first design
- Information density
- Notification philosophy

---

# Search Strategy

Instead of searching for hardware components, search for finished products.

Useful searches:

- ESP32 firmware
- ESP32 appliance
- ESP32 dashboard
- ESP32 desk gadget
- ESP32 kiosk
- ESP32 launcher
- ESP32 smart display
- ESP32 HMI
- ESP32 LVGL

The goal is to discover products that can be repurposed rather than building hardware from scratch.

---

# Open Questions

- What defines a reference device?
- What hardware capabilities are required?
- Which capabilities should be optional?
- How should community-supported boards be handled?
- What is the minimum supported specification?
- Should Steward support reflashing existing consumer gadgets as a first-class installation method?

---

# Notes

A recurring realization:

Steward should target an ecosystem rather than a specific board.

The goal is not to invent new hardware.

The goal is to build firmware and software that can turn inexpensive, readily available devices into purposeful computing tools.

Whenever a new project is discovered, document:

- what it does well
- what problems it solves
- what assumptions differ from Steward
- whether it represents software, hardware, or an ecosystem

The goal is not imitation.

The goal is to stand on proven foundations while building something original.
