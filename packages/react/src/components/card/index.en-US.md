---
title: Card
nav: Components
group: Basics
order: 6
---

# Card

Surface container with padding, hoverable, and interactive variants. `Card` is the standard surface container: white background, 1px border, 14px radius, soft shadow.

## Basic

<code src="./demos/basic.tsx"></code>

## Padding

<code src="./demos/padding.tsx"></code>

| Padding | Spacing token |
|---|---|
| `sm` | 12 |
| `md` (default) | 20 |
| `lg` | 24 |
| `none` | 0 (use for full-bleed children) |

## Interactive

<code src="./demos/interactive.tsx"></code>

- `hoverable` swaps the border to indigo-200 and bumps the shadow on hover.
- `interactive` adds `role="button"`, makes the card keyboard-focusable, and shows the focus ring on `:focus-visible`.

## API

<API id="Card"></API>

All native `<div>` attributes are accepted; `role` is automatically `button` when `interactive` unless explicitly overridden.

## Don't

- Don't stack hoverable cards without a parent grid — too many interactive cards in a row creates noise.
- Don't combine `interactive` with no obvious affordance — the user should know the card is clickable.
