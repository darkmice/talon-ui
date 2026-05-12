---
title: Tag
nav: Components
group: Basics
order: 4
---

# Tag

Status pills and skill chips with six status tones plus neutral. `Tag` is a 22px-tall pill for short labels: status markers, skill chips, and removable filters.

## Basic

<code src="./demos/basic.tsx"></code>

## Tones

<code src="./demos/tones.tsx"></code>

| Tone | Use |
|---|---|
| `neutral` (default) | Skill chips. Grey background. |
| `progress` | Task or node running. |
| `pending` | Awaiting human or AI sign-off. |
| `done` | Completed / online. |
| `blocked` | Failed / offline. |
| `idle` | Not started / draft. |
| `info` | System-level info. |

All status tones add `role="status"` automatically for assistive tech.

## Removable

<code src="./demos/removable.tsx"></code>

## API

<API id="Tag"></API>

## Don't

- Don't pair two status tones in a single visual unit — pick the most specific one.
- Don't use removable inside a non-editable list — the affordance implies mutability.
