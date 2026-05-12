---
title: Typography
nav: Components
group: Basics
order: 10
---

# Typography

Title, Text, Paragraph, and Link components mapped to Talon Pilot's type scale. Four lightweight wrappers around the Talon Pilot type tokens — semantic by default, customisable via `tone` and `asChild`.

## Headings

<code src="./demos/headings.tsx"></code>

| Level | Token | Element |
|---|---|---|
| `display` | `text-display` (32/40) | `<h1>` |
| `1` (default) | `text-h1` (24/32) | `<h1>` |
| `2` | `text-h2` (20/28) | `<h2>` |
| `3` | `text-h3` (16/24) | `<h3>` |

All titles render at weight 600.

## Body

<code src="./demos/body.tsx"></code>

| Text variant | Token | Notes |
|---|---|---|
| `body` (default) | `text-body` (14/22/400) | Default reading text. |
| `body-strong` | `text-body-strong` (14/22/500) | Emphasised inline labels. |
| `caption` | `text-caption` (12/18/400) | Timestamps, secondary metadata. |
| `mono-sm` | `text-mono-sm` (12/18/500) | Node IDs, paths, log lines. Pairs with `nums` for tabular numerals. |

`Paragraph` is the block-level companion of `Text`. It accepts `tone` and a `spacing` prop (`tight | normal | loose | none`).

## Links

<code src="./demos/link.tsx"></code>

`Link` uses Talon primary-600 by default and underlines on hover. Pass `tone="muted"` for inline references that shouldn't pull attention.

## API

### Title

<API id="Title"></API>

### Text

<API id="Text"></API>

### Paragraph

<API id="Paragraph"></API>

### Link

<API id="Link"></API>

All native `<a>` attributes are accepted.

## Don't

- Don't use `<Title>` levels out of order in the document outline. Use the visual `level` prop with the matching semantic level.
- Don't override the type tokens with raw `text-[14px]` utilities. Always go through the prop.
