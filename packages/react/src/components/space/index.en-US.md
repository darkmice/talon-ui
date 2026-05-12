---
title: Space
nav: Components
group: Basics
order: 9
---

# Space

Flex container that puts a configurable gap between children. Use it instead of ad-hoc `flex` + `gap-*` utilities when the spacing is part of a documented surface.

## Horizontal

<code src="./demos/horizontal.tsx"></code>

## Vertical

<code src="./demos/vertical.tsx"></code>

## Wrapping

<code src="./demos/responsive.tsx"></code>

## Sizes

| Token | Pixels |
|---|---|
| `xs` | 4 |
| `sm` | 8 |
| `md` (default) | 12 |
| `lg` | 16 |
| `xl` | 20 |

## API

<API id="Space"></API>

## Don't

- Don't use `Space` for grid layouts — use CSS grid directly when the layout has 2D structure.
- Don't pass arbitrary inline `style={{ gap: ... }}` — go through the `size` prop so the gap stays tokenised.
