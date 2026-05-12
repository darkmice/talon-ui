---
title: Button
nav: Components
group: Basics
order: 1
---

# Button

The primary call-to-action surface. Variants map to action priority; sizes map to control density.

## Basic

<code src="./demos/basic.tsx"></code>

## Variants

<code src="./demos/variants.tsx"></code>

| Variant | Use |
|---|---|
| `primary` | The single main action per screen. |
| `secondary` | Supporting actions. White background + 1px border. |
| `ghost` | Tertiary or inline actions. Transparent. |
| `danger` | Destructive actions. Must be paired with text — icon-only danger is forbidden. |

## Sizes

<code src="./demos/sizes.tsx"></code>

| Size | Height | Typography |
|---|---|---|
| `sm` | 28 | `text-caption` |
| `md` (default) | 36 | `text-body` |
| `lg` | 44 | `text-body` |

## API

<API id="Button"></API>

All native `<button>` attributes are accepted.

## Don't

- Don't use `iconOnly` on `danger` — the destructive action needs a label.
- Don't put two primary buttons on the same screen.
- Don't disable a button without explaining why (use a tooltip or inline help).
