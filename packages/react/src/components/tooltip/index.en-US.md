---
title: Tooltip
nav: Components
group: Feedback & Navigation
order: 35
---

# Tooltip

Dark-background hint label that appears on hover or focus. `Tooltip` is the dark, low-contrast hint that appears next to its trigger. Wraps `@radix-ui/react-tooltip`.

## Basic

<code src="./demos/basic.tsx"></code>

## Sides

<code src="./demos/sides.tsx"></code>

## On an icon trigger

<code src="./demos/on-icon.tsx"></code>

## Usage

`Tooltip` requires a parent `<TooltipProvider>`. Place it once at your app root — usually wrapping the entire component tree:

```tsx
<TooltipProvider delayDuration={200} skipDelayDuration={300}>
  <App />
</TooltipProvider>
```

`delayDuration` controls how long users hover before the tooltip appears; `skipDelayDuration` controls how long after closing one tooltip the next one opens instantly.

## API

<API id="TooltipContent"></API>

## Don't

- Don't use Tooltip for critical information — it's hidden by default and not reachable on touch devices.
- Don't ship without `<TooltipProvider>` — the tooltip will silently fail to render.
