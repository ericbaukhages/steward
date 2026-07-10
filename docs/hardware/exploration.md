# Hardware Exploration

## Goal

The PADD should feel like a dedicated appliance, not an app running on someone else's device.

The hardware exists to showcase the software. It should be inexpensive, approachable, and easy for others to reproduce.

## Current Priorities

In rough order:

1. Dedicated device experience
2. Hackable/open platform
3. Inexpensive (~$40-70 preferred)
4. Touchscreen
5. Wi-Fi
6. Bluetooth
7. USB-C
8. Good battery life
9. Color display
10. eInk (nice to have, not required)

One important realization was that eInk is not a requirement.

While eInk offers excellent battery life and a unique aesthetic, a matte LCD provides:

- lower cost
- color
- faster refresh
- better touch responsiveness
- richer UI possibilities

Those benefits may outweigh eInk for the first generation.

---

# Project Philosophy

Rather than building a custom computer, the goal is to build a **software platform** that can target multiple devices.

```
             Mainframe
                │
         PADD Runtime
                │
    ┌───────────┼────────────┐
    │           │            │
 Desktop     ESP32      Android
    │           │            │
 ePaper     Touch LCD    Phone
```

The hardware is simply another client.

---

# Why ESP32?

Several factors make the ESP32 ecosystem attractive.

## Mature ecosystem

Problems are already solved.

Examples include:

- Wi-Fi
- Bluetooth
- OTA updates
- Touchscreens
- Battery charging
- Audio
- SD cards
- Sleep modes
- LVGL integration

This dramatically reduces time spent fighting hardware.

## Strong community

Instead of inventing solutions from scratch, it's possible to reference existing projects.

Searches like:

```
esp32-s3 lvgl launcher
esp32-s3 websocket
esp32-s3 microphone
```

already return substantial prior art.

## Shared software stack

Most modern ESP32 UI projects converge on:

```
Application
    │
LVGL
    │
ESP-IDF
    │
ESP32-S3
```

That means software investment transfers between vendors.

Examples:

- Waveshare
- LilyGO
- M5Stack

---

# ESP32 Families

## C3

Small, inexpensive, efficient.

Good for:

- sensors
- eInk
- simple interfaces

## S3

Preferred target.

Advantages:

- dual core
- more RAM
- USB OTG
- much better graphics capability
- excellent LVGL support

Recommendation:

Target the ESP32-S3 family.

Avoid choosing hardware that requires constant optimization simply to function.

---

# Guiding Principle

Optimize for developer experience over hardware efficiency.

It is preferable to spend an extra $10-20 on hardware than spend months optimizing around unnecessary constraints.

The project is about building the system, not proving how little memory can be used.

---

# Hardware Candidates

## Existing Xteink X4

Pros

- Already owned
- Existing CrossPoint ecosystem
- Proven custom firmware
- Good developer community

Cons

- No touchscreen
- Buttons are optimized for reading
- Doesn't fit the desired LCARS interaction model

The X4 remains an excellent development platform, but may not be the long-term reference hardware.

---

## Android eInk Phones

Examples:

- BOOX Palma
- Bigme HiBreak

Pros

- Excellent hardware
- Touchscreen
- Battery life

Cons

- Expensive
- Android customization
- Harder to reproduce
- Not ideal as an open hardware reference

---

## LilyGO T-Deck Plus

Interesting because it already resembles a handheld computer.

Features:

- ESP32-S3
- Keyboard
- Wi-Fi
- Bluetooth
- Battery
- microSD
- GPS
- LoRa

Pros

- Complete package
- Large community

Cons

- No touchscreen

This would naturally encourage a keyboard-first UI instead of a touch-first interface.

---

## Waveshare ESP32-S3 LCD 1.54"

One of the strongest candidates.

Features:

- ESP32-S3
- Capacitive touchscreen
- Battery charging
- Speaker
- Microphone
- IMU
- microSD
- USB-C
- Enclosure included

Advantages

- Extremely inexpensive
- Already looks like a finished product
- Great development target
- Easy for others to purchase

Disadvantages

- 240×240 display
- Very limited screen real estate

Could make an excellent voice terminal.

---

## Waveshare ESP32-S3 Touch LCD 4"

Currently one of the most exciting options.

Features:

- ESP32-S3
- 480×480 capacitive touch
- Battery support
- Wi-Fi
- Bluetooth
- microSD

Advantages

- Large enough for meaningful UI
- Square layout works well for LCARS-inspired interfaces
- Blank canvas for industrial design

Potentially the best handheld reference hardware.

---

## Waveshare 13.3" ePaper Controller

Not a handheld.

Instead, this could become the "Mainframe Console."

Potential uses:

- Dashboard
- Calendar
- Home status
- AI conversations
- Family information center

Runs the same software as the handheld.

---

# User Interface Direction

One important realization:

The desired interface is spatial rather than menu-driven.

An LCARS-inspired design naturally benefits from:

- persistent navigation
- direct touch
- large touch targets
- information-dense layouts

Touch is therefore considered a primary requirement for the handheld reference device.

---

# Voice Interface

Small displays become significantly more useful when paired with voice.

Rather than replacing the UI, voice complements it.

Example:

```
User:
"Computer, summarize my day."

↓

ESP32 records audio

↓

Mainframe processes request

↓

Summary appears on screen
```

The handheld becomes a communicator or tricorder rather than a full workstation.

---

# System Architecture

```
          Mainframe
       (Home Server)
             │
      HTTP / WebSocket
             │
     ┌───────┴────────┐
     │                │
 Desktop          Handheld
                     │
                ESP32-S3
                     │
                  LVGL UI
```

The handheld performs:

- rendering
- local storage
- audio capture
- networking
- synchronization

The mainframe performs:

- AI
- indexing
- search
- synchronization
- long-running services

---

# Hardware Strategy

Avoid designing custom electronics initially.

Instead:

1. Buy an existing ESP32-S3 development board.
2. Build the software.
3. Design a 3D-printed enclosure.
4. Add accessories (keyboard, dock, etc.).
5. Only consider custom PCBs once the software is mature.

---

# Reference Platform

Rather than targeting one specific device, target the ecosystem.

Target:

- ESP32-S3
- ESP-IDF
- LVGL

Any compatible board becomes a potential PADD.

Recommended reference devices may change over time without affecting the software architecture.

---

# Future Device Matrix

| Role | Example |
|-------|---------|
| Pocket | Waveshare 1.54" Touch |
| Handheld | Waveshare 4" Touch |
| Keyboard Device | LilyGO T-Deck Plus |
| eReader | Xteink X4 |
| Desk Display | Waveshare 13.3" ePaper |
| Desktop | Native application |
| Web | Browser client |

The long-term goal is not to build a single device.

The long-term goal is to build a computing environment that feels coherent across every form factor.
