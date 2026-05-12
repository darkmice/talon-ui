---
title: Tokens Overview
nav:
  title: Tokens
  order: 2
---

# Tokens Overview

The full token catalog lives in `packages/tokens/src/tokens.css`. Highlights:

## Colour

| Token | Light | Dark |
|---|---|---|
| `--tp-bg-app` | `#F6F7F9` | `#0B1220` |
| `--tp-bg-surface` | `#FFFFFF` | `#131A2A` |
| `--tp-text-primary` | `#0F172A` | `#E6E9F2` |
| `--tp-primary-500` | `#4F60FF` | (stable) |
| `--tp-status-done-fg` | `#0E8A55` | `#6CD89F` |

## Spacing

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 80` available as `--tp-space-{1..20}` and Tailwind utilities `p-tp-N`, `gap-tp-N`, `m-tp-N`.

## Radius

`sm 6 · md 10 · lg 14 · xl 20 · pill 999` available as `rounded-{sm|md|lg|xl|pill}` Tailwind utilities.

## Typography

`display 32/40 · h1 24/32 · h2 20/28 · h3 16/24 · body 14/22 · caption 12/18 · mono-sm 12/18` available as `text-display`, `text-h1`, and so on.
