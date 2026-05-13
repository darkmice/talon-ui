---
title: Avatar
nav: Components
group: Basics
order: 5
---

# Avatar

Round person mark with image, fallback, status dot, and overlapping group. `Avatar` wraps Radix Avatar primitive with Talon Pilot sizing, fallback, and an optional status dot. `AvatarGroup` overlays multiple avatars with an automatic `+N` overflow chip.

## Basic

<code src="./demos/basic.tsx"></code>

## Sizes

<code src="./demos/sizes.tsx"></code>

| Size | Pixel | Use |
|---|---|---|
| `sm` | 28 | List rows, inline mentions |
| `md` (default) | 32 | Group members, default chat |
| `lg` | 40 | Hero / profile header |

## Status dot

<code src="./demos/status.tsx"></code>

The dot is 8px and rings the avatar with the surrounding `bg-bg-surface` so it reads on any background.

| Status | Colour token |
|---|---|
| `online` | `--tp-status-done-fg` (Talon green) |
| `away` | `--tp-status-pending-fg` (Talon amber) |
| `offline` | `--tp-text-tertiary` (Talon grey) |

## Group

<code src="./demos/group.tsx"></code>

When more avatars are passed than `max` allows, the remainder collapse into a `+N` chip that matches the group's size.
If you want overlapped avatars without the separator ring, pass `ring="none"`.

## API

### Avatar

<API id="Avatar"></API>

### AvatarGroup

<API id="AvatarGroup"></API>

## Don't

- If the `status` dot clashes with the neighboring overlap ring, use `ring="none"`.
- Don't use `lg` size inside a dense list row; use `sm` or `md`.
