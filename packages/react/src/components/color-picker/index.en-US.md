---
title: ColorPicker
nav: Components
group: Forms
order: 23
---

# ColorPicker

Compact preset-driven color picker with hex input and system fallback. `ColorPicker` is the **compact** Phase-1 picker: preset grid + hex input + system native fallback. A full HSL/HSV canvas lands in v0.4.

## Basic

<code src="./demos/basic.tsx"></code>

## Custom presets

<code src="./demos/presets.tsx"></code>

## Inside a Form

<code src="./demos/form.tsx"></code>

## API

<API id="ColorPicker"></API>

## Don't

- Don't ship a giant preset list — keep it under ~18 for a compact picker.
- Don't expect alpha support in Phase 1. Hex is `#RRGGBB` only.
