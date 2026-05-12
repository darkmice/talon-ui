---
title: Popover
nav: Components
group: Feedback & Navigation
order: 34
---

# Popover

Persistent overlay anchored to a trigger element. Unlike `Tooltip` it requires explicit click to open and stays open until the user dismisses it.

## Basic

<code src="./demos/basic.tsx"></code>

## With explicit close button

<code src="./demos/close-button.tsx"></code>

## Anchored (custom positioning target)

<code src="./demos/anchor.tsx"></code>

## Exports

`Popover`, `PopoverTrigger`, `PopoverAnchor`, `PopoverContent` (floating surface with `width` prop), `PopoverClose`, `PopoverArrow`.

## API

### PopoverContent

<API id="PopoverContent"></API>

### PopoverClose

<API id="PopoverClose"></API>

### PopoverArrow

<API id="PopoverArrow"></API>

## Don't

- Don't put long-form forms inside `Popover` — use `Modal` or `Drawer` for that.
- Don't nest two popovers; combine into one.
